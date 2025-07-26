import path from "path";
import type { NextConfig } from "next";
import webpack from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  webpack(config) {
    // Needed for Cesium CSS and widgets
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader", "postcss-loader"],
      include: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "node_modules/cesium"),
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      cesium: path.resolve(__dirname, "node_modules/cesium/Source"),
    };

    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("/cesium"),
      })
    );

    return config;
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;

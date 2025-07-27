# 🌐 Latency Topology Visualizer

The **Latency Topology Visualizer** is a powerful interactive web application that displays **real-time** and **historical** latency data between major cryptocurrency exchanges and cloud providers like **AWS**, **GCP**, and **Azure** on a **3D globe** using **CesiumJS**.

> 📊 Built with Next.js, React, TypeScript, Tailwind CSS, and CesiumJS.

---


## 🚀 Live Demo

👉 [Latency Topology Visualizer](https://latency-topology-visualizer-aditi.netlify.app/) 🌐


---

## 📌 Features

- 🗺️ **3D Globe View** using CesiumJS  
- 🌍 **2D & Columbus Views** available for flexible exploration  
- 📍 **Exchange Locations** shown with colored markers based on cloud provider  
- 🔁 **Real-Time Latency** lines update every 5 seconds  
- 📊 **Historical Latency Chart** with selectable time ranges (1hr, 24hrs, 7d, 30d)  
- 📲 **Responsive UI** for both desktop and mobile  
- 🧭 **Interactive Controls**: Rotate, zoom, pan with mouse or touch  
- 🧪 **Mock Data** simulates realistic latency values

---

## 🧑‍💻 Technologies Used

- **Next.js** – Server-rendered React framework  
- **React** – UI rendering and component-based architecture  
- **CesiumJS** – 3D geospatial globe rendering  
- **Tailwind CSS** – Utility-first styling  
- **TypeScript** – Strong typing and code safety  
- **Recharts** – For visualizing historical data  
- **Mock APIs / JSON** – Simulated real-time and historical latency

---

## 📷 Project Screenshots


### 🌐 3D Globe View
![3D Globe](./public/screenshots/3D-Globe.png)

### 🔍 Zoomed-In View
![Zoom In](./public/screenshots/Zoom-in-View.png)

### 🗺️ 2D View
![2D View](./public/screenshots/2D-View.png)

### 🧭 Columbus View
![Columbus View](./public/screenshots/Columbus-View.png)

### ⚡ Real-Time Latency  
![Real-Time Latency](./public/screenshots/Real-Time-Latency.png)

### 📱 Samsung Galaxy S8+ View
![Mobile View](./public/screenshots/Samsung-Galaxy-S8+.png)

### 📱 iPad Mini View
![iPad Mini](./public/screenshots/iPad-Mini.png)

### 📊 Historical Chart - iPad Mini
![Historical Chart - iPad Mini](./public/screenshots/Historical-Chart-iPadMini.png)

### ⏱️ Historical Latency - 1 Hour
![1 Hour](./public/screenshots/Historical-Latency-Chart-1hr.png)

### 🕖 Historical Latency - 7 Days
![7 Days](./public/screenshots/Historical-Latency-Chart-7days.png)

### 📆 Historical Latency - 30 Days
![30 Days](./public/screenshots/Historical-Latency-Chart-30days.png)

### 🕛 Historical Latency - 24 Hours
![24 Hours](./public/screenshots/Historical-Latency-Chart-24hrs.png)




---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/latency-visualizer.git
cd latency-visualizer


2. Install Dependencies

npm install


3. Setup Environment

Create a .env.local file and add your Cesium Ion access token:

NEXT_PUBLIC_CESIUM_ION_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2N2M5MTRjZS0yZTkyLTRjOWEtODZkOS1mNGJhNTQ0ODM4YjQiLCJpZCI6MzIzNzk4LCJpYXQiOjE3NTMxNzY1Mzd9.4fPTFSe54VmZYIJtSE0IYF0nqdiKm9PfGb-Zp6Wx460

You can get one at: https://cesium.com/ion/


4. Run the Development Server

npm run dev

Visit http://localhost:3000 in your browser.


---

📦 Build for Production

npm run build
npm start


---

✅ Future Improvements

Integrate real API data from cloud or monitoring services

Authentication and user-customized views

Filter latency by region or provider

Improve visual transitions and tooltips



---

🧑‍🎓 Author

Aditi Dwivedi
MCA Graduate | Front-end Developer
LinkedIn | https://github.com/Aditi71 | aditi441401@gmail.com


---

📝 License

This project is for educational and demonstration purposes only.

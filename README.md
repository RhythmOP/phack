# AgriPlanner - Weather-Based Crop Planning Assistant

> **Project ID:** AD010 | **Domain:** Agriculture

AgriPlanner is a comprehensive agricultural planning suite designed to help farmers make data-driven decisions. By leveraging real-time weather analysis, AI-powered crop recommendations, and risk forecasting, AgriPlanner ensures optimal yields and reduced agricultural risks.

## 🌟 Key Features

### 1. 🌦️ Weather Dashboard
- **Real-time Updates:** Get current temperature, humidity, wind speed, and visibility data.
- **7-Day Forecast:** Plan ahead with detailed weekly weather outlooks.
- **Visual Insights:** Intuitive weather icons and clear data visualization.

### 2. 🌱 Crop Recommendation Engine
- **Personalized Suggestions:** specific crop advice based on:
  - **Growing Season:** Kharif, Rabi, Zaid
  - **Soil Type:** Clay Loam, Sandy Loam, Red Soil, Black Soil, Alluvial
- **Detailed Insights:**
  - Expected yield
  - Water requirements
  - Temperature tolerance
  - Growth period
  - Suitability score

### 3. ⚠️ Risk Assessment
- **Early Warnings:** Alerts for floods, droughts, and extreme temperatures.
- **Mitigation Strategies:** Actionable advice to protect crops from adverse conditions.

### 4. 📅 Crop Calendar
- **Dynamic Scheduling:** Optimized timelines for sowing, irrigation, fertilization, and harvesting.
- **Lifecycle Tracking:** Track every stage of your crop's growth cycle.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **3D Graphics:** [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites
- Node.js (v18 or higher)
- npm, yarn, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RhythmOP/phack.git
   cd phack
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📂 Project Structure

```
src/
├── app/                  # Next.js App Router pages
├── components/           # React components
│   ├── ui/               # Reusable UI components (buttons, cards, etc.)
│   ├── WeatherDashboard  # Weather feature components
│   ├── CropRecommendation# Recommendation engine
│   └── ...
├── lib/                  # Utility functions
└── hooks/                # Custom React hooks
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open-source and available for educational and non-commercial use.

---
*Built with ❤️ for the farming community.*

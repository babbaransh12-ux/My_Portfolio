# My Portfolio Website 🚀

Welcome to the repository of my modern, interactive, and high-performance open-source personal portfolio website. This project showcases my skills, experience, and projects through a visually striking 3D experience.

[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-React%20%7C%20Three.js%20%7C%20GSAP-blue.svg)](https://react.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

---

## 🌟 Key Features

### 1. Interactive 3D Character Model
- **Dynamic Interaction:** Powered by **React Three Fiber (R3F)**, a custom 3D model tracks the user's cursor or touch inputs with realistic head-rotation animations.
- **Cinematic Lighting:** Custom shaders and dynamic lighting transitions create a dramatic intro when the page loads.

### 2. Physics-Based 3D Tech Stack
- **Rapier Physics:** Built using `@react-three/rapier`, technology logos are rendered on iridescence-glass spheres that bounce and collide dynamically.
- **Cursor Attractor:** The spheres are drawn toward the mouse pointer, providing a fun and highly interactive playground.

### 3. Sleek Typography & Smooth Animations
- **GSAP Integration:** Powered by GreenSock (GSAP) and ScrollTrigger for buttery-smooth scroll-linked entry and transition animations.
- **Glassmorphic Design:** Curated dark mode theme with glassmorphic containers, vibrant gradients, and fine micro-interactions.

---

## 🛠️ Tech Stack & Libraries

| Category | Technologies / Libraries |
| :--- | :--- |
| **Core** | React 18, TypeScript, HTML5, Vanilla CSS |
| **3D & Physics** | Three.js, `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier` |
| **Animations** | GSAP, `@gsap/react`, `react-fast-marquee` |
| **Post-Processing** | `@react-three/postprocessing` (Ambient Occlusion & Bloom) |
| **Build Tooling** | Vite |

---

## 📸 Preview

![Portfolio-Preview](public/images/preview.png)

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/babbaransh12-ux/My_Portfolio.git
   cd My_Portfolio/ansh_portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` (or the port specified in terminal).

### Production Build
To create a production-ready bundle:
```bash
npm run build
npm run preview
```

---

## ⚠️ Important Note regarding GSAP Club Plugins

> [!IMPORTANT]
> This project has been configured with trial versions of GSAP Club plugins for development purposes. **Trial plugins cannot be hosted on public production sites.**
> 
> To deploy this project or get access to official premium club features, please review the installation guide on the [GSAP Installation Docs](https://gsap.com/docs/v3/Installation/).

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).

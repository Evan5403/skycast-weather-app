# 🌤️ Skycast Weather App

Skycast is a modern weather dashboard built with a **Next.js + TypeScript** frontend and a **Laravel API backend**. It fetches real-time weather and 3-day forecasts using the OpenWeatherMap API.

---

## 📁 Project Structure
skycast-weather-app
  ├── back-end/
    │ └── weather-api/ # Laravel API (OpenWeatherMap integration) 
  └── front-end/
    └── weather-app/ # Next.js 14 + TypeScript UI (ShadCN + TailwindCSS + Framer Motion)

---

## 🚀 Technologies Used

### Frontend
- [Next.js](https://nextjs.org/) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- Fetch API (AJAX) for backend communication

### Backend
- [Laravel 10+](https://laravel.com/)
- [HTTP Client](https://laravel.com/docs/10.x/http-client)
- OpenWeatherMap API

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/skycast-weather-app.git
cd skycast-weather-app
```
### 2. Backend (Laravel API)
```bash
cd back-end/weather-api

# Install dependencies
composer install

# Copy .env and configure your API key
cp .env.example .env
php artisan key:generate

# Set OpenWeatherMap API key in .env
OPENWEATHER_API_KEY=your_api_key_here

# Start Laravel server
php artisan serve

```
Backend will run at: http://localhost:8000

### 3. Frontend (Next.js App)
```bash
cd ../../front-end/weather-app

# Install dependencies
npm install

# Start development server
npm run dev

```
Frontend runs at: http://localhost:3000


## 📸 UI Features

The frontend layout follows a sidebar-dashboard pattern for clean UX:

### 🧭 Sidebar (Left)
- Shows current weather:
  - Weather icon
  - Temperature (°C/°F)
  - Weather description
  - City name and current date

### 🔎 Top Navigation (Main)
- **SearchBar** with city input and search button
- **Unit toggle switch** to change between Celsius (°C) and Fahrenheit (°F)

### 📅 Forecast Section
- Displays 3-day forecast cards
  - Date (e.g., "Wed")
  - Weather icon
  - Min/Max temperatures
  - Description

### 🌬️ Weather Metrics
- **Wind Card**
  - Displays wind speed (in m/s or mph based on unit)
  - Compass icon rotates to indicate wind direction

- **Humidity Card**
  - Displays current humidity %
  - Visual progress bar fills based on value

### ✨ Animations (Framer Motion)
- Smooth fade-in on page load
- Slide + scale transitions for weather cards
- Compass icon and humidity bar animate on unit/city change

### 📱 Responsive Design
- Mobile-first layout
- Sidebar stacks on small screens
- Forecast + metric cards adapt to screen size

![Image](https://github.com/user-attachments/assets/092b2e8b-a29b-4714-92a0-617e6c11147a)

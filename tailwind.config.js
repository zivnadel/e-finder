/** @type {import('tailwindcss').Config} */
module.exports = {
  jit: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#74BDCB",
        secondary: "#FFA384",
      },
      fontFamily: {
        quicksand: ["Quicksand", "sans-serif"],
        lato: ["Lato", "sans-serif"],
      },
      backgroundImage: {
        "sports": "url('/sports.jpg')",
        "academic": "url('/academic.jpg')",
        "community": "url('/community.jpg')",
        "concerts": "url('/concerts.jpg')",
        "conferences": "url('/conferences.jpg')",
        "expos": "url('/expos.jpg')",
        "festivals": "url('/festivals.jpg')",
        "performing-arts": "url('/performing-arts.jpg')",
        "daylight-savings": "url('/daylight-savings.jpg')",
        "observances": "url('/observances.jpg')",
        "politics": "url('/politics.jpg')",
        "public-holidays": "url('/public-holidays.jpg')",
        "school-holidays": "url('/school-holidays.jpg')",
        "severe-weather": "url('/severe-weather.jpg')",
        "airport-delays": "url('/airport-delays.jpg')",
        "disasters": "url('/disasters.jpg')",
        "terror-attacks": "url('/terror-attacks.jpg')",
        "health-warnings": "url('/health-warnings.jpg')",
        "protests": "url('/protests.jpg')",
      }
    },
  },
  plugins: [],
  important: true,
};

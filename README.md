# Weather Check & Forecast

A simple, responsive weather application that allows users to check the current location weather and various cities. And also user can get forecaset weather details for current location. 
The app uses the OpenWeatherMap API to fetch weather data and provides a user-friendly interface for a seamless experience.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Responsive Design](#responsive-design)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- Check current weather conditions for any city.
- Get a 5-day weather forecast for current location.
- Responsive design for mobile and desktop devices.
- Display weather icons/img based on conditions.
- Loader animation while fetching data.

## Tech Stack

- **HTML**
- **CSS**
- **JavaScript**
- **OpenWeatherMap API**

## Getting Started

### Prerequisites

- A modern web browser.
- Internet connection.

### Installation

1. Clone the repository:
   ```bash
   [git clone https://github.com/thilankacg1/Simple-Weather-App.git]

2. Navigate to the project directory:
    cd Simple-Weather-App
   
4. Open index.html in your web browser to view the application.

## API Integration
This project integrates with the OpenWeatherMap API to fetch current weather data and forecasts. You need an API key from OpenWeatherMap to make requests.

Fetch Current Weather:
[ function getWeather(latitude, longitude, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  // Fetch and display weather data
} ]
Fetch weather forecast
[
function getForecast(latitude, longitude, apiKey) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  // Fetch and display forecast data
}
]

## Responsive Design
The application uses CSS Flexbox for layout management to ensure a responsive design. The layout adapts to different screen sizes, providing an optimal user experience on both mobile and desktop devices.

### Loader Animation
A loader animation is displayed while fetching weather data to improve user experience.

## Screenshots

![Screenshot 2024-07-09 105432](https://github.com/thilankacg1/Simple-Weather-App/assets/25998139/35f40d4d-aa4c-463c-b998-e87fed68775e)
![Screenshot 2024-07-09 105453](https://github.com/thilankacg1/Simple-Weather-App/assets/25998139/ade6a89a-4519-499b-a6b2-6782fc3682fb)
![Screenshot 2024-07-09 105516](https://github.com/thilankacg1/Simple-Weather-App/assets/25998139/14e688cf-64fc-40f5-afc0-168249c18397)
![Screenshot 2024-07-09 105552](https://github.com/thilankacg1/Simple-Weather-App/assets/25998139/efe9a757-cbd9-4816-9e1d-2d468f42074e)
![Screenshot 2024-07-09 105609](https://github.com/thilankacg1/Simple-Weather-App/assets/25998139/0b8c2372-5758-40ce-b412-04044a42cfe9)
![Screenshot 2024-07-09 105626](https://github.com/thilankacg1/Simple-Weather-App/assets/25998139/136f0e86-7f14-471e-903c-4244f094d825)


## Contributing
Contributions are welcome! Please follow these steps to contribute:

### Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature-name).
Open a pull request.


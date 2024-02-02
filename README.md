![Trip_Planner_Logo](./assets/tp_logo.png)

# Trip Planner Application

This Trip Planner Application is a React-based web app designed to help users plan their trips with ease. It integrates various functionalities including a login system, country selection, attractions listing, and visa information retrieval. 

## Features

- **User Authentication:** Allows users to sign in or sign up for accessing personalized trip planning features.
- **Country Selection:** Users can select a country to explore, which dynamically updates the map and attractions list based on the selected country.
- **Attractions List:** Fetches and displays a list of attractions within the selected country's bounds, offering pagination for ease of access.
- **Visa Information:** Provides detailed visa information for the chosen destination, including requirements and application processes.
- **Dynamic Map Rendering:** Displays a map with markers indicating the location of attractions and the selected country's borders.

## Technologies

- **React** for building the user interface.
- **Firebase Authentication** for handling user authentication.
- **OpenTripMap API** for fetching attractions data.
- **Google Maps API** for rendering maps and location data.
- **React Bootstrap** and **PrimeReact** for UI components and styling.

## Setup and Installation

1. **Clone the repository:**

git clone <repository-url>

2. **Install dependencies:**

Navigate to the project directory and run:

npm install

3. **Environment Variables:**

Set up the necessary environment variables for Firebase and Google Maps API keys in a `.env` file at the root of your project:

REACT_APP_FIREBASE_API_KEY=your-firebase-api-key  
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key  
REACT_APP_OPEN_TRIP_MAP_API_KEY=your-opentripmap-api-key  

This functionality is to be expanded so the API keys will be provided by the backend. Right now it is hidden due to security.

4. **Start the Development Server:**

npm start

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

After starting the app, navigate through the application:

- **Login/Sign Up:** Authenticate to access the application's features.
- **Select a Country:** Use the country select dropdown to choose a country for your trip planning.
- **Explore Attractions:** View and paginate through attractions listed based on the selected country.
- **View Visa Information:** Access visa requirements and application details for your travel destination.

## Contributing

Contributions to the Trip Planner Application are welcome. Please ensure to follow the project's coding standards and submit pull requests for any new features or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or suggestions, please reach out to [przemyslaw.podolski@yahoo.com](mailto:przemyslaw.podolski@yahoo.com).

## Author
- Przemysław Podolski

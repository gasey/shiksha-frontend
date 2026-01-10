# Shiksha Homepage Frontend

## Overview

This is the frontend application for Shiksha, an educational platform designed to connect teachers, students, and educational resources. Built with React and Vite, it provides a responsive and modern homepage with various sections including landing, about, vision, mission, values, services, contact, current affairs, and upcoming features.

## Features

- **Homepage**: Includes landing header, main grid showcasing key offerings, lower grid, explore services section, user feedback, and footer.
- **About**: Detailed information about the platform in multiple sections.
- **Vision, Mission, Values**: Pages outlining the core philosophy and principles of Shiksha.
- **Why Shiksha**: Highlights the benefits and reasons to choose the platform.
- **Contact**: Interactive contact form integrated with EmailJS for sending messages.
- **Current Affairs**: Section for news, updates, or relevant educational content.
- **Upcoming**: Roadmap displaying planned features and developments.
- **Authentication**: Login and Signup pages for user access.

## Technologies Used

- **React 19**: For building the user interface.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Router DOM**: For client-side routing.
- **EmailJS**: For handling contact form submissions.
- **React Icons**: For icons throughout the application.

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd HomepageFrontend-02/my-react-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173` (default Vite port).

3. Navigate through the application using the navbar or by directly accessing routes:
   - `/` : Home page
   - `/about` : About Shiksha
   - `/vision` : Our Vision
   - `/mission` : Our Mission
   - `/values` : Our Values
   - `/why-shiksha` : Why Choose Shiksha
   - `/contact` : Contact Us
   - `/current-affairs` : Current Affairs
   - `/upcoming` : Upcoming Features

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── App.jsx         # Main application component with routing
│   ├── Navbar.jsx      # Navigation bar
│   ├── Footer.jsx      # Footer component
│   ├── LandingHeader.jsx
│   ├── MainGrid.jsx
│   ├── LowerGrid.jsx
│   ├── ExploreServices.jsx
│   ├── Feedback.jsx
│   ├── About.jsx
│   ├── About2.jsx
│   ├── Vision.jsx
│   ├── Mission.jsx
│   ├── Values.jsx
│   ├── WhySiksha.jsx
│   ├── Contact.jsx
│   ├── CurrentAffairs.jsx
│   └── Upcoming.jsx
├── auth/               # Authentication-related components
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Login.css
│   └── Signup.css
├── css/                # Custom CSS stylesheets
├── assets/             # Images, icons, and other static assets
└── main.jsx            # Application entry point
```

## Scripts

- `npm run dev` : Starts the development server with hot reloading.
- `npm run build` : Builds the application for production.
- `npm run lint` : Runs ESLint to check for code quality issues.
- `npm run preview` : Previews the production build locally.

## Contributing

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

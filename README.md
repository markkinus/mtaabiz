# MtaaBiz — Local Business Discovery and Booking Platform

## 1. Introduction of the Project

MtaaBiz is a web-based platform designed to connect customers with local businesses and service providers. It allows business owners to showcase their businesses, list their services and prices, and manage customer bookings. Customers can discover businesses, explore available services, and book appointments conveniently online.

The goal of MtaaBiz is to make local services easier to find and help small businesses improve their online visibility and customer management.

## 2. Project Overview


Customers can browse published businesses, search for services, view business details, and make bookings. Business owners can register, create and manage their business listings, publish their services, and view and confirm booking requests.

The application is built using React and Firebase, providing a responsive user interface, user authentication, and cloud-based data storage.

## 3. Problem Statement

Many small and local businesses rely on word-of-mouth referrals, social media posts, or physical visits to attract customers. This can make it difficult for potential customers to discover their services, compare prices, and arrange appointments.

Additionally, managing customer bookings manually through phone calls and messages can become time-consuming and disorganized.

There is a need for a simple, accessible platform that helps customers discover local service providers while enabling business owners to showcase their services and manage bookings more efficiently.

## 4. Solution

MtaaBiz addresses these challenges by providing a centralized online directory and booking platform.

The platform allows business owners to create business profiles, display services and prices, and manage booking requests. Customers can search for businesses, review their available services, and submit booking requests online.

By bringing business discovery and appointment booking together, MtaaBiz aims to improve convenience for customers and support the digital growth of local businesses.

## 5. Features

### Customer Features
- Browse published local businesses.
- Search businesses by name, category, location, or description.
- View business information, services, and prices.
- Book a service by selecting a date and time.
- View personal bookings and their current status.
- Track whether bookings are pending or confirmed.

### Business Owner Features
- Register and log in securely.
- Create and publish a business listing.
- Add business details, contact information, services, and prices.
- Edit existing business information.
- View customer booking requests.
- Confirm pending bookings.
- Access the business dashboard.

### Technical Features
- Responsive user interface built with React.
- Client-side navigation using React Router.
- User authentication with Firebase Authentication.
- Cloud-based data storage using Cloud Firestore.
- Real-time booking status updates.
- Reusable React components and state management.

## 6. Installation and Setup Process

### Prerequisites

Ensure that you have the following installed:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- [Git](https://git-scm.com/)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)
- A Firebase account

### Step 1: Clone the Repository


```bash
git clone https://github.com/mtaabiz.git
```

### Step 2: Navigate to the Project Folder

```bash
cd mtaabiz
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Configure Firebase

1. Create a project in the [Firebase Console](https://console.firebase.google.com/).
2. Register a web application in your Firebase project.
3. Enable Email/Password authentication.
4. Create a Cloud Firestore database.
5. Copy your Firebase web application configuration into the project's Firebase configuration file, usually `src/firebase/config.js`.
6. Configure Firestore security rules to protect user and business data.


### Step 5: Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal:

```text
http://localhost:5173
```


## 6. How to Contribute and Collaborate

Contributions, suggestions, and improvements are welcome.

### Contributing Guidelines

1. Fork the repository on GitHub.
2. Clone your fork to your computer.
3. Create a new branch for your changes.
4. Make your changes and test the application.
5. Commit your changes with a clear message.
6. Push your branch to GitHub.
7. Open a pull request describing your changes.

### Example Commands

```bash
git clone https://github.com/mtaabiz.git
cd mtaabiz
git checkout -b feature/your-feature
npm install
```

After making and testing your changes:

```bash
git add .
git commit -m "feat: describe your changes"
git push origin feature/your-feature
```

Then open a pull request on GitHub for review.

### Collaboration Best Practices

- Use descriptive branch names and commit messages.
- Test changes before pushing them.
- Avoid committing sensitive credentials or environment files.
- Communicate clearly when working with other contributors.
- Keep changes focused and update documentation when necessary.

## 7. License — MIT License

This project is licensed under the [MIT License](LICENSE).


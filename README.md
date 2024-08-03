# Cinelux Dashboard

## Overview

This repository is an admin dashboard and server for Cinelux movie ticketing app (https://github.com/fayzanrj/cinelux).

## Features
- Book tickets
- Manage movies
- Manage showtimes
- User management

## Tech Stack
- **Admin Dashboard** : Vite + React.js 
- **Backend**: Express.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Movie info** : TMDB
- **State Management**: React Hooks
- **User authetication** : React context and jwt


### Prerequisites

List of software and tools required to run the project locally.

- Node.js
- npm or yarn

### Installation

Steps to install project dependencies and get the project running locally.

1. Clone the repository:

   ```sh
   git clone https://github.com/fayzanrj/cinelux-dashboard.git

   ```

2. Install dependencies

   npm install

   For both client and server in their respective folders

3. Include environment variables

- For Client
- - VITE_SERVER_HOST
- - VITE_IMDB_API_KEY
- - VITE_USER_ACCESS_TOKEN

- For Server
- - STRIPE_WEBHOOK_SECRET
- - PAYMENT_SUCCESS_URL
- - STRIPE_SECRET_KEY
- - EMAIL
- - EMAIL_PASS
- - REFRESH_JWT_SECRET_KEY
- - DATABASE_URI
- - JWT_SECRET_KEY
- - USER_ACCESS_TOKEN

4. Running

   npm run dev for client

   npm run nodemon for server

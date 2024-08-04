# IMDB Clone

## Overview

IMDB Clone is a web application designed to replicate the core functionalities of the IMDb platform. The project includes features such as user authentication, movie details, trending movies, and user-generated ratings and reviews. It uses a combination of Express.js for server-side logic, Sequelize for database management, and Axios for API interactions.

## Features

- **User Authentication**: Register and login users with JWT-based authentication.
- **Movie Management**: Retrieve movie details, discover movies, and view trending movies using TMDB API.
- **User Interactions**: Users can rate and review movies.
- **List Management**: Create and manage custom movie lists.

## Project Structure

- **`src`**: Contains the source code for the application.
  - **`config`**: Configuration files.
  - **`controllers`**: Business logic for handling requests.
  - **`db`**: Database setup, including models, migrations, and helpers.
  - **`middlewares`**: Middleware functions such as authentication.
  - **`routes`**: Route definitions for various endpoints.
  - **`utils`**: Utility functions, such as API interactions with TMDB.
- **`tests`**: Test files for the application, organized by feature.
- **`.husky`**: Git hooks for commit messages and pre-commit checks.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/VanshWadhwa/imdb-clone.git
    cd imdb-clone
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Copy `.env.example` to `.env` and update the values with your local setup.

    ```bash
    cp .env.example .env
    ```

4. **Run migrations:**

    ```bash
    npm run migrate
    ```

5. **Start the application:**

    ```bash
    npm run dev
    ```

## API Endpoints

- **Authentication**
  - `POST /login`: Log in a user.
  - `POST /register`: Register a new user.
  - `GET /protected`: Access a protected route (authentication required).

- **Movie**
  - `GET /movie/detail/:id`: Get details of a specific movie.
  - `GET /movie/trending`: Get trending movies.
  - `GET /movie/discover`: Discover movies by genre and year.
  - `POST /movie/:contentId/rating`: Rate a movie.
  - `POST /movie/:contentId/review`: Review a movie.

- **List**
  - `GET /list/all`: Get all lists (authentication required).
  - `GET /list/show/:id`: Get details of a specific list.
  - `POST /list/create`: Create a new list (authentication required).
  - `POST /list/delete`: Delete a list (authentication required).
  - `POST /list/add-item`: Add an item to a list (authentication required).
  - `POST /list/remove-item`: Remove an item from a list (authentication required).

## Testing

Run the test suite using Jest:

```bash
npm test
```

## Linting and Formatting

- **Lint the code:**

    ```bash
    npm run lint
    ```

- **Fix linting issues:**

    ```bash
    npm run lint:fix
    ```

# Input Form Project

This project is a simple input form built with React and Vite. It allows users to submit their profile information, which is then saved to a SQLite database via an Express server.

## Project Structure

.gitignore 
eslint.config.js 
index.html 
package.json 
public/ README.md 
server/ server.js 
src/ App.css App.jsx 
assets/ index.css main.jsx vite.config.js

## Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd input-form
   ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Running the Project
1. Start the development server:
    ```sh
    npm run dev
    ```
2. Start the backend server:
    ```sh
    node server/server.js
    ```

## Usage
Open your browser and navigate to http://localhost:3000. Fill out the form and submit it. The data will be saved to the SQLite database.

## Linting
To lint the project, run:
    ```sh
    npm run lint
    ```

## Building
To build the project, run:
    ```sh
    npm run build
    ```
## For Running this project, I have created a repository. My backend and frontend code is present in this repository.

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/LAVI9966/internship_task.git
    ```

2. **Navigate to the project directory:**
    ```sh
    cd internship_task
    ```

3. **Install dependencies for both backend and frontend:**
    ```sh
    npm install 
    cd server
    npm install
    cd ..
    ```

## Usage

For installation, you have to visit two folders and install `node_modules`:

- The **frontend server**, which is in the root directory.
- The **backend server**, which is inside the `server` folder.

Use the `cd` command to navigate to the respective folders and install dependencies.

After installation, come back to the root directory and then run both servers.

1. **Start the Frontend Server:**
    ```sh
    npm run dev
    ```

2. **Start the Backend Server:**
    ```sh
    cd server
    nodemon index.js
    ```
    or
    ```sh
    node index.js
    ```

3. **Open your browser and visit:**
    ```sh
    http://localhost:5173
    ```

You can also run the backend server using `server/index.js` with Nodemon.


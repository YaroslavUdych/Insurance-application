# Insurance Management Application

This is a simple application for the registration of insured persons and management of insurance data.

## Features

- Add new insured persons
- Edit insured persons data
- Delete insured persons
- User roles: ADMIN and EMPLOYEE
- ADMIN can register a new users, edit their roles, and delete them
- EMPLOYEE can add new insured persons, edit their data, and delete them

## Technologies Used

- React.js for the frontend
- Node.js and Express.js for the backend
- MongoDB for storing data.

## Security

The app is secured with a login system.

## Getting Started

To get the files on your local machine, use the git clone command.
To install dependencies for the backend, navigate to the back_end folder and run the command 'npm init'.
To install dependencies for the frontend, navigate to the front_end folder and run the command 'npm init'.
To start the server in development mode, navigate to the back_end folder and run the command 'npm run dev' to start nodemon or 'node index.js' to start node.
To start the frontend part in development mode, navigate to the front_end folder and run the command 'npm start'.

To log in as EMPLOYEE, use: username - employee, password - employee.
To log in as ADMIN, use: username - admin, password - admin.



## Project Structure

- `back_end/`: Contains the backend code.
	- `index.js`: Entry point for the backend server.
	- `Routers/`: Contains the route handlers for different API endpoints.
	- `Controllers/`: Contains the logic for handling requests and responses.
	- `Models/`: Contains the data models for the application.
	- `Middlewares/`: Contains the middleware functions.
	- `Services/`:  Contains the service functions for interacting with external services or performing complex operations in the application
	- `uploads/`: Contains the uploaded files of application.


- `front_end/`: Contains the frontend code.
	- `src/`: Contains the source code for the frontend.
		- `components/`: Contains reusable components used in the application.
			- `api/`: Contains configuration for api requests.
			- `helpers/`: Сontains auxiliary functions.
			- `images/`: Contains static images.
			- `pages/`: Contains containers - components that are responsible for logic and state interaction.
			- `UI/`: Contains presentational components - components that simply accept data and display it.
		- `routing/`: Contains routes of application.
		- `AuthContext.js`: Component is used to create a context for the user authentication status and user data
		- `App.js`: Entry point for the frontend application.
		- `index.js`: Renders the root component and mounts it to the DOM.
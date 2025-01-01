# PDF Extraction App

This is a full-stack PDF extraction application built using Flask for the backend and React for the frontend.

## Features
- Role-based access control for Admin and Super Admin.
- PDF upload and text extraction.
- Dynamic viewing of extracted text.
- CRUD operations for template keys.

## Technologies Used
- **Backend**: Flask, PostgreSQL, SQLAlchemy, PyPDF2
- **Frontend**: React.js, Material-UI, Axios
- **Auth**: JWT

## Installation

### Backend

1. `cd backend`

    `pip install flask`

2. Install dependencies: `pip install -r requirements.txt`
3. Configure environment variables in `.env`.

    `python -m venv venv`
    Activate Virtual Environment:

    Windows: `venv\Scripts\activate`.

4. Common: `Flask-Migrate`:

    `flask db init`	Initialize the migration directory.
    `flask db migrate -m "Message"`	Create a new migration script.
    `flask db upgrade`	Apply migrations to the database.
    `flask db downgrade`	Revert the last migration.
    `flask db history`	Show migration history.
    `flask db current`	Display the current migration version.
    `flask db stamp head`	Mark the database as up-to-date.

5. Run the app: `python app.py`.

## API Endpoints
- `POST /auth/signup`
- `POST /auth/login`
- `GET /templates/`
- `POST /files/upload`

###################################################################################

# Getting Started with Create React App

How to Use It: If someone else wants to replicate the environment using this requirements.txt file, they need to install each dependency using:

### Frontend
1. `cd frontend`

`npm install $(cat requirements.txt)`

`npm install`

<!-- `npm install @mui/material @emotion/react @emotion/styled react-hook-form zod axios` -->

<!-- `npm install eslint prettier husky --save-dev` -->

<!-- `npm install react@18 react-dom@18` -->

<!-- `npm install @testing-library/react @testing-library/jest-dom @testing-library/user-event web-vitals` -->

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

2. `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

#############################################################################

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

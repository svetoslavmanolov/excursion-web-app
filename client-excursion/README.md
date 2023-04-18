# Excursion Web App 

This simple web application allows you to view created different excursions to any part of the world as well as leave comments under each one even if you do not have a registered account. You can see their creator as well as the people who have made a reservation for this excursion. 
There is additional functionality that you can take advantage of when creating an account. This gives you the right to create your own excursions to different destinations, you can change already created ones and delete existing ones.

# Project architecture

The application uses services that perform basic requests to the server (back end) of the application. The data received from the server serves the functional components that render the individual pages in the application. Also used is a context in which the main functions for processing the data from the server are performed via a useReducer hook. The useContext hook provides the data to each component that needs the relevant data avoiding props drilling. A routing guard has also been created to prevent unauthorized routing. The application uses cookies, which when a user logs in, a JsonWebToken is created with the necessary data for the user. 
In the app is used MongoDB database for storage data.

# To run locally on your machine:

## Installation

First you must install dependencies in the root directory of client and server and then run command 'npm install':

Client:  `...cd/client` and then `npm install` \
Server:  `...cd/server` and then `npm install`

## Usage

To run the project in the root directory you can run the following commands:

Client:  `...cd/client` and then `npm start` \
Server:  `...cd/server` and then `npm start`

Open (http://localhost:3000) to view it in your browser.





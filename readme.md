## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Required for installation:

- [Node.js](https://nodejs.org/en/)
- [PostgresSQL v9.6](https://www.postgresql.org/download/)


### Installing

Once your prerequisities are installed, run ```npm install``` to download and install all project dependencies. 

Run the script from ```database.sql``` to create your tables.

NOTE! Database tables should be populated with your own preexisting pitch data; there is no option to add this data via the app.



### Run
- Download and clone the project files: ```$ git clone https://github.com/katyasoup/mlb-project.git```
- Adjust database variables in ```server/modules/pool.js``` as needed  
	- Alternatively, create a ```.env``` file to store your Postgres credentials 
- Spin it up! ```$ npm start``` The project will be available on port 5000 by default. New users will have to create a username and password to login.

## About

### Tech Used

- Express.js
- AngularJS
- Node.js
- PostgresSQL
- Bootstrap  

### Stretch Goals  

- Graphing/visualization of data (using Chart.js or similar)
- Side-by-side comparisons of pitcher stats
- Search pitchers (by ID/name or by specific stats)

# AIDb Web Application
This project was developed as a submission for the "Program Systems Development" university course in the Spring semester of 2024.

## Project Description
The project is an IMDb-like website with the following roles:
- **Guest:** Unregistered visitors who can view the list of movies, movie details, and existing reviews and critiques but cannot write anything.
- **User:** Registered users who can log in to the site and write reviews about movies. These reviews can be seen and rated by others.
- **Critic:** Special users who can write official movie critiques that appear in a separate section and have a higher weight in the movie ratings.
- **Moderator:** Pre-selected users who oversee the website content and can delete or modify offensive, false, or irrelevant reviews and critiques. Moderators are also responsible for updating and maintaining movie data.

## Prerequisites
To run the project, you will need the following:
- Node.js(version 18.13.0 or >=20.9.0)
- npm (version 6.11.0 or >=8.0.0)
- Docker

## Running the Project
### Frontend
1. Navigate to the frontend directory:
```
cd client/my-first-project
```
2. Install the dependencies:
```
npm install
```
3. Build the Angular application:
```
npm run build
```
4. Serve the Angular application:
```
ng serve
```
### Backend
1. Navigate to the backend directory:
```
cd server
```
2. Build the backend:
```
npm run build
```
3. Start the backend:
```
npm run start
```
## Database
To set up the MongoDB database, follow these steps:
1. Build the Docker image for MongoDB:
```
docker build -t aidb_mongo_image 
```
2. Run the Docker container for MongoDB:
```
docker run -it --name aidb_mongo_container -p 6000:27017 aidb_mongo_image
```
3. To start the MongoDB container later on:
```
docker start 
```

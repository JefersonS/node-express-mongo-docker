# node-express-mongo-docker

# Running with Docker:

- Git clone repository;
- Navigate to folder;
- Run: `docker-compose build`;
- Run: `docker-compose up`;
- Access: `localhost:3000`;

# Running without Docker:

- Git clone repository;
- Navigate to folder;
- Fix mongoDB connection string to your local connection settings;
- Run: `npm install`;
- Run: `npm start`;

# Endpoints:

- GET/PUT/POST/DELETE + GET All and GET with regexp (auto-complete);
- API: `localhost:3000/services/names`;
- API query params: `id: string, name: string`;
- API body params: `id:string, name: string, position: string enum(Junior, Middle, Senior)`;
- View: `localhost:3000`;

# Quick observations:

- The test is simple, however it was built considering a possible real situation with a small amount of time. Parts of code look like an overkill for the situation while others can be improved;
- Unit test was done for the main API calls;
- API call validateRequest and sendResponse utils can be improved for bigger and more complex situations;
- Backend was the focus, frontend is a full simple JQuery/Bootstrap page, nothing fancy over there;
- Overall files archtecture can be improved to reduce amount of files;

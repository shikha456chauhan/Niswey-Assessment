# NISWEY_ASSESSMENT
 Code for assessment

### Clone and Default Branch
1. git clone https://github.com/shikha456chauhan/Niswey-Assessment
2. The default branch is `main`, which contains the project logic.

## Techonologies used in this application

1. MongoDB
2. Express.js
3. Node.js

## Install dependencies
 Open git bash or command line tools at application file and run `npm install` command or if you know what to do, just look at `package.json` file

## Run the application
- run `npm run start`
- app will work at (http://localhost:8000)

## Testing
 Once the server is running, you can access the following endpoints:
 1. GET (`/`) - Shows a welcome message and guide about file upload endpoint.
 2. POST (`/upload`) - Uploads an XML file , processes it and store the data in database.

### Uploading XML Files

- To test the upload endpoint, follow these steps:

1. Use a tool like cURL or Postman to send a POST request to the `/upload` endpoint.
2. Include an XML file as form data in the request body, with the key named "file".
3. Send the request to `http://localhost:8000/upload`.



//This line imports the express library, which is used to create and manage the web server. Express is a popular framework for Node.js that simplifies handling HTTP requests and responses.
import express from "express";
//This imports the path module, which provides utilities for working with file and directory paths. It helps in handling and resolving paths in a way that's compatible with different operating systems.
import path from "path";
//This imports the fileURLToPath function from the url module. It is used to convert a file URL (like those used in ES modules) to a path that can be used by Node.js.
import { fileURLToPath } from "url";
//This imports the routes defined in the index.js file located in the routes directory. These routes will be used to handle incoming requests at the root path (/).
import indexRoutes from "./routes/index.js";

//This creates an instance of an Express application. This instance will be used to configure and run the web server.
const app = express();
const port = 3000;
//This line converts the URL of the current module (import.meta.url) to a file path. __filename represents the path of the current file.
const __filename = fileURLToPath(import.meta.url);
//This gets the directory name of the current file path (__filename). __dirname represents the directory in which the current file is located.
const __dirname = path.dirname(__filename);

// MIDDLEWARES
//This middleware function parses incoming requests with URL-encoded payloads (typically from forms). extended: true allows for richer objects and arrays to be encoded into the URL-encoded format.
app.use(express.urlencoded({ extended: true }));
//This middleware function parses incoming requests with JSON payloads. It makes the req.body property available in request handlers with JSON data.
app.use(express.json()); // For handling JSON request bodies

//This sets the view engine to EJS (Embedded JavaScript). EJS allows you to use templates for rendering HTML with dynamic content.
app.set("view engine", "ejs");

//This serves static files (like CSS, JavaScript, images) from the public directory. The path.join(__dirname, "public") part resolves the path to the public directory.
app.use(express.static(path.join(__dirname, "public")));

//This tells Express to use the routes defined in indexRoutes for any requests to the root path (/). Essentially, it routes requests to the handlers defined in ./routes/index.js.
app.use("/", indexRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});

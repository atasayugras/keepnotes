// Handles rendering of the dashboard view
//Imports the Express library.
import express from "express";
//Imports the filesystem module for reading and writing files.
import fs from "fs";
//Imports the path module for working with file and directory paths.
import path from "path";
//Imports the fileURLToPath function for converting a URL to a file path.
import { fileURLToPath } from "url";

//Creates a new router object.
const router = express.Router();
//fileURLToPath(import.meta.url);: Gets the path of the current file.
const __filename = fileURLToPath(import.meta.url);
//Gets the directory of the current file.
const __dirname = path.dirname(__filename);
//Constructs the path to the posts.json file.
const postsFilePath = path.join(__dirname, "../posts.json");

// Get all posts and render dashboard
//Defines a route handler for GET requests to /. Reads the posts from posts.json, parses them, and renders the dashboard view with the posts.
router.get("/", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));
  res.render("pages/dashboard", { posts });
});

//Exports the router.
export default router;

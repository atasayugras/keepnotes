// Handles rendering of the dashboard view

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router(); // defines dashboardRoutes router module
const __filename = fileURLToPath(import.meta.url); // "C:\Users\Atasay\Desktop\Dev\25 Keep Notes Web Service\routes\dashboard.js"
const __dirname = path.dirname(__filename); // "C:\Users\Atasay\Desktop\Dev\25 Keep Notes Web Service\"
const postsFilePath = path.join(__dirname, "../posts.json"); // "C:\Users\Atasay\Desktop\Dev\25 Keep Notes Web Service\posts.json"

// Get all posts and render dashboard
//Defines a route handler for GET requests to /. Reads the posts from posts.json, changes JSON to JS object, and renders the dashboard view with the posts.
router.get("/", (req, res) => {
  const posts = JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));
  res.render("pages/dashboard", { posts });
});

export default router;

//Any route defined in router file (like '/' or '/:id') will now be prefixed with /nameOfRouter.
//eg. '/edit/:id' you don't need to include '/posts' before /edit/:id

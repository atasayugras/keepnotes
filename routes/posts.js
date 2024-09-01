// Handles CRUD operations (POST, PUT, DELETE) for posts
//Imports the Express library.
import express from "express";
//Imports the filesystem module.
import fs from "fs";
//Imports the path module.
import path from "path";
//Imports fileURLToPath function.
import { fileURLToPath } from "url";

//Creates a new router object.
const router = express.Router();
//Gets the current file path.
const __filename = fileURLToPath(import.meta.url);
//Gets the directory of the current file.
const __dirname = path.dirname(__filename);
//Constructs the path to posts.json.
const postsFilePath = path.join(__dirname, "../posts.json");

// Utility function to read posts
//Reads and parses posts from posts.json.
const readPosts = () => JSON.parse(fs.readFileSync(postsFilePath, "utf-8"));

// Utility function to write posts
//Writes posts to posts.json.
const writePosts = (posts) =>
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2));

// Serve the form for creating a new post
//Renders the form for creating a new post.
router.get("/create", (req, res) => {
  res.render("pages/create");
});

// Create a new post
//Handles form submission to create a new post, adds it to the list, and redirects to the root path.
router.post("/create", (req, res) => {
  const posts = readPosts();
  const newPost = {
    id: Date.now(),
    title: req.body.title,
    message: req.body.message,
  };
  posts.push(newPost);
  writePosts(posts);
  res.redirect("/");
});

// Edit a post using PUT
//Handles updating a post by ID. If the post exists, it updates and saves it. If not, it sends a "not found" response.
router.put("/edit/:id", (req, res) => {
  const posts = readPosts();
  const postIndex = posts.findIndex(
    (post) => post.id === parseInt(req.params.id)
  );

  if (postIndex !== -1) {
    posts[postIndex] = {
      id: parseInt(req.params.id),
      title: req.body.title,
      message: req.body.message,
    };
    writePosts(posts);
    res.status(200).send("Post updated");
  } else {
    res.status(404).send("Post not found");
  }
});

// Get a specific post for editing
//Retrieves a specific post by ID for editing and renders the edit view.
router.get("/edit/:id", (req, res) => {
  const posts = readPosts();
  const post = posts.find((post) => post.id === parseInt(req.params.id));

  if (post) {
    res.render("pages/edit", { post });
  } else {
    res.status(404).send("Post not found");
  }
});

// Delete a post using DELETE
//Deletes a post by ID and sends a confirmation response.
router.delete("/delete/:id", (req, res) => {
  let posts = readPosts();
  posts = posts.filter((post) => post.id !== parseInt(req.params.id));
  writePosts(posts);
  res.status(200).send("Post deleted");
});

export default router;

// Handles CRUD operations (POST, PUT, DELETE) for posts

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router(); //// defines postsRoutes router module
const __filename = fileURLToPath(import.meta.url); // "C:\Users\Atasay\Desktop\Dev\25 Keep Notes Web Service\routes\posts.js"
const __dirname = path.dirname(__filename); // "C:\Users\Atasay\Desktop\Dev\25 Keep Notes Web Service\"
const postsFilePath = path.join(__dirname, "../posts.json"); // "C:\Users\Atasay\Desktop\Dev\25 Keep Notes Web Service\posts.json"

// Read posts inside the JSON file
const readPosts = () => JSON.parse(fs.readFileSync(postsFilePath, "utf-8")); // Read the JSON file at the specified path, decode it as a UTF-8 encoded string, and convert it into a JS object (key/value pairs)

// Write posts to JSON file
const writePosts = (posts) =>
  fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2)); // Write the JS object 'posts'(key/value pairs) to the specified file path as a JSON string, with an indentation of 2 spaces for readability

//Renders the form for creating a new post.
router.get("/create", (req, res) => {
  res.render("pages/create");
});

//Handles form submission to create a new post, adds it to the list, and redirects to the root path.
router.post("/create", (req, res) => {
  const posts = readPosts();
  const newPost = {
    id: Date.now(), // Assign a unique ID based on the number of milliseconds elapsed since January 1, 1970 (Unix epoch)
    title: req.body.title,
    message: req.body.message,
  };
  posts.push(newPost);
  writePosts(posts);
  res.redirect("/");
});

//Gets a specific post by ID for editing and renders the edit view.
router.get("/edit/:id", (req, res) => {
  const posts = readPosts();
  // posts.find searches through the posts array and returns the first element that matches the condition
  // post => post.id === parseInt(req.params.id)  // Check if there is a post where the post.id matches the id from req.params (converted to an integer)
  const post = posts.find((post) => post.id === parseInt(req.params.id)); // params accesses route parameters, which are part of the URL path. For example, in a URL like /posts/edit/123
  // if yes, open the edit page for that particular post
  if (post) {
    res.render("pages/edit", { post });
    // if no 404
  } else {
    res.status(404).send("Post not found");
  }
});

//Handles updating a post by ID.
//In scenarios where data might be updated, deleted, or otherwise modified, using let to declare arrays or objects(key: value pairs) is common practice.
router.post("/edit/:id", (req, res) => {
  const posts = readPosts();
  // // Find the index of the post in the posts array where the post.id matches the id from req.params (converted to an integer)
  const postIndex = posts.findIndex(
    (post) => post.id === parseInt(req.params.id)
  );

  /*findIndex() returns -1 if no element in the array matches the provided condition. 
  This means that if postIndex is not equal to -1, 
  it indicates that a post with the given id was found (because its index is a valid non-negative number).*/
  if (postIndex !== -1) {
    posts[postIndex] = {
      id: parseInt(req.params.id), // Convert the ID from string to number
      title: req.body.title,
      message: req.body.message,
    };
    writePosts(posts);
    res.redirect("/");
  } else {
    res.status(404).send("Post not found");
  }
});

//Deletes a post by ID and sends a confirmation response.
//In scenarios where data might be updated, deleted, or otherwise modified, using let to declare arrays or objects(key: value pairs) is common practice.
router.delete("/delete/:id", (req, res) => {
  let posts = readPosts();
  posts = posts.filter((post) => post.id !== parseInt(req.params.id)); //// Creates a new array that excludes the post with the id matching req.params.id
  writePosts(posts);
  res.status(200).send("Post deleted");
});

export default router;

// ':' before ':id' means it is a dynamic parameter

//Any route defined in router file (like '/' or '/:id') will now be prefixed with /nameOfRouter.
//eg. '/edit/:id' you don't need to include '/posts' before /edit/:id

//posts array
//()=> callback
// post.id === parseInt(req.params.id) condition

/* post.find //Searches through an array and returns the first element that satisfies a provided testing function.
array.find(callback(element, index, array), thisArg)
posts.find((post) => post.id === parseInt(req.params.id));
thisArg (optional): Value to use as this when executing callback
*/

/*  post.findIndex //Searches through an array and returns the index of the first element that satisfies a provided testing function.
array.findIndex(callback(element, index, array), thisArg)
posts.findIndex((post) => post.id === parseInt(req.params.id));
thisArg (optional): Value to use as this when executing callback.
*/

/*  post.filter //Creates a new array with all elements that pass a test provided by a function.
array.filter(callback(element, index, array), thisArg)
posts.filter((post) => post.id !== parseInt(req.params.id));
thisArg (optional): Value to use as this when executing callback.
*/

//Main router entry, redirects to dashboard.js and posts.js

//Imports the Express library.
import express from "express";
//Imports routes from dashboard.js.
import dashboardRoutes from "./dashboard.js";
//Imports routes from posts.js.
import postsRoutes from "./posts.js";

//Creates a new router object to handle routing.
const router = express.Router();

// Use the dashboard and posts routes
//Uses the routes defined in dashboardRoutes for the root path (/).
router.use("/", dashboardRoutes);
//Uses the routes defined in postsRoutes for any path starting with /posts.
router.use("/posts", postsRoutes);

//Exports the router to be used in other parts of the application.
export default router;

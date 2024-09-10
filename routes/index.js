//Main router entry, redirects to dashboard.js and posts.js

import express from "express";
import dashboardRoutes from "./dashboard.js";
import postsRoutes from "./posts.js";

const router = express.Router(); // defines indexRoutes router module

// Use the dashboard and posts routes
router.use("/", dashboardRoutes);
router.use("/posts", postsRoutes);

//Exports the router to be used in other parts of the application.
export default router;

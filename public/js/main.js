import { handleEditButtonClick } from "./modules/editPost.js";
import { handleDeleteButtonClick } from "./modules/deletePost.js";

$(document).ready(function () {
  handleEditButtonClick();
  handleDeleteButtonClick();
});

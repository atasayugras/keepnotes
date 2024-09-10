// deletePost.js
export function handleDeleteButtonClick() {
  $(".delete-btn").on("click", function () {
    const postId = $(this).data("id");

    $.ajax({
      url: `/posts/delete/${postId}`,
      type: "DELETE",
      success: function () {
        $(`.card[data-id="${postId}"]`).remove();
      },
      error: function (err) {
        alert("Failed to delete the post");
      },
    });
  });
}

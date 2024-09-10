// editPost.js
export function handleEditButtonClick() {
  $(".edit-btn").on("click", function () {
    const postId = $(this).data("id");
    window.location.href = `/posts/edit/${postId}`;
  });
}

document.querySelectorAll('.video-link').forEach(link => {
  link.addEventListener('click', function(event) {
    // Prevent the default behavior (optional)
    event.preventDefault();

    // Get the row of the clicked link
    let row = this.closest('tr');
    
    // Get the "Last Clicked" cell in the same row
    let lastClickedCell = row.querySelector('.last-clicked');

    // Get the current time
    let currentTime = new Date();

    // Calculate the time difference in minutes since the page loaded
    let timeDiffInMinutes = Math.floor((currentTime - window.startTime) / 60000);

    // Update the "Last Clicked" cell with the formatted time difference
    lastClickedCell.textContent = `${timeDiffInMinutes} phút trước`;

    // Store the last clicked time in localStorage using the URL as the key
    let videoId = this.href;  // Use the URL as the key
    localStorage.setItem(videoId, `${timeDiffInMinutes} phút trước`);

    // Optionally, open the video in a new tab
    window.open(this.href, '_blank');
  });
});

// Load the stored "Last Clicked" data when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Store the start time when the page loads
  window.startTime = new Date();

  // Iterate through each row and check if there is a stored time for that video
  document.querySelectorAll('.video-link').forEach(link => {
    let videoId = link.href;
    let lastClickedTime = localStorage.getItem(videoId);
    
    if (lastClickedTime) {
      // If a time is stored, update the "Last Clicked" cell with that time
      let row = link.closest('tr');
      let lastClickedCell = row.querySelector('.last-clicked');
      lastClickedCell.textContent = lastClickedTime;
    }
  });
});

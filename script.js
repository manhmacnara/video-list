document.querySelectorAll('.video-link').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    let lastClickedCell = this.closest('tr').querySelector('.last-clicked');
    let currentTime = new Date();
    let timeDiffInMinutes = Math.floor((currentTime - window.startTime) / 60000);
    lastClickedCell.textContent = `${timeDiffInMinutes} phút trước`;
    window.open(this.href, '_blank');
  });
});

// Lưu thời gian khi trang được tải
window.startTime = new Date();

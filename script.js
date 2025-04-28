// Khi người dùng nhấp vào một liên kết
document.querySelectorAll('.video-link').forEach(link => {
  link.addEventListener('click', function(event) {
    // Ngăn chặn hành động mặc định của liên kết (chuyển hướng)
    event.preventDefault();

    // Lấy dòng (row) của liên kết đã nhấp
    let row = this.closest('tr');
    
    // Lấy ô "Last Clicked" trong cùng dòng
    let lastClickedCell = row.querySelector('.last-clicked');

    // Lấy thời gian hiện tại
    let currentTime = new Date();

    // Tính toán thời gian chênh lệch giữa lần tải trang và thời điểm nhấp vào link (tính theo phút)
    let timeDiffInMinutes = Math.floor((currentTime - window.startTime) / 60000);

    // Cập nhật ô "Last Clicked" với thời gian tính được
    lastClickedCell.textContent = `${timeDiffInMinutes} phút trước`;

    // Lưu thông tin "Last Clicked" vào localStorage, sử dụng URL của video làm khóa (key)
    let videoId = this.href;  // Sử dụng URL làm khóa
    localStorage.setItem(videoId, `${timeDiffInMinutes} phút trước`);

    // Mở video trong tab mới (tùy chọn)
    window.open(this.href, '_blank');
  });
});

// Khi trang được tải lại, kiểm tra và cập nhật thông tin "Last Clicked"
document.addEventListener('DOMContentLoaded', function() {
  // Lưu thời gian khi trang được tải
  window.startTime = new Date();

  // Kiểm tra xem có dữ liệu "Last Clicked" đã được lưu trong localStorage không
  document.querySelectorAll('.video-link').forEach(link => {
    let videoId = link.href;
    
    // Lấy dữ liệu từ localStorage
    let lastClickedTime = localStorage.getItem(videoId);
    
    // Nếu có dữ liệu "Last Clicked" lưu trữ, hiển thị nó
    if (lastClickedTime) {
      let row = link.closest('tr');
      let lastClickedCell = row.querySelector('.last-clicked');
      lastClickedCell.textContent = lastClickedTime;
    }
  });
});

document.querySelectorAll('.video-link').forEach(link => {
  link.addEventListener('click', function(event) {
    // Ngăn chặn hành động mặc định của liên kết (tránh việc chuyển hướng)
    event.preventDefault();

    // Lấy dòng (row) của liên kết đã nhấp
    let row = this.closest('tr');
    
    // Lấy ô "Last Clicked" trong cùng dòng
    let lastClickedCell = row.querySelector('.last-clicked');

    // Lưu thời gian nhấp vào localStorage
    let currentTime = new Date().getTime(); // Lấy thời gian hiện tại (tính bằng milliseconds)
    
    // Lưu thời gian nhấp chuột vào localStorage (sử dụng URL làm khóa)
    let videoId = this.href;  // Sử dụng URL làm khóa
    localStorage.setItem(videoId, currentTime);

    // Tính toán thời gian nhấp và lưu lại (hiển thị ngay sau khi click)
    lastClickedCell.textContent = `Đã click lúc ${new Date(currentTime).toLocaleTimeString()}`;

    // Mở video trong tab mới (tùy chọn)
    window.open(this.href, '_blank');
  });
});

// Khi trang được tải lại, kiểm tra và cập nhật thông tin "Last Clicked"
document.addEventListener('DOMContentLoaded', function() {
  // Kiểm tra xem có dữ liệu "Last Clicked" đã được lưu trong localStorage không
  document.querySelectorAll('.video-link').forEach(link => {
    let videoId = link.href;

    // Lấy thời gian nhấp chuột đã lưu trong localStorage
    let clickTime = localStorage.getItem(videoId);
    
    if (clickTime) {
      // Nếu có thời gian nhấp chuột, tính toán thời gian đã trôi qua từ lúc nhấp đến hiện tại
      let currentTime = new Date().getTime();
      let timeDiffInSeconds = Math.floor((currentTime - clickTime) / 1000); // Tính thời gian chênh lệch theo giây

      // Cập nhật ô "Last Clicked" với thời gian chênh lệch
      let row = link.closest('tr');
      let lastClickedCell = row.querySelector('.last-clicked');
      lastClickedCell.textContent = `${timeDiffInSeconds} giây trước`;
    }
  });
});

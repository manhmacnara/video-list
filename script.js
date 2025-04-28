document.querySelectorAll('.video-link').forEach(link => {
  link.addEventListener('click', function(event) {
    // Ngăn chặn hành động mặc định của liên kết (tránh việc chuyển hướng)
    event.preventDefault();

    // Lấy dòng (row) của liên kết đã nhấp
    let row = this.closest('tr');
    
    // Lấy ô "Last Clicked" trong cùng dòng
    let lastClickedCell = row.querySelector('.last-clicked');

    // Lấy thời gian hiện tại
    let currentTime = new Date();

    // Lấy thời gian bắt đầu trang từ localStorage (nếu đã lưu)
    let startTime = localStorage.getItem('startTime');
    if (!startTime) {
      // Nếu lần đầu tiên, lưu thời gian bắt đầu trang vào localStorage
      startTime = currentTime.getTime();
      localStorage.setItem('startTime', startTime);
    }

    // Tính toán thời gian chênh lệch giữa lần tải trang và thời điểm nhấp vào liên kết (tính theo giây)
    let timeDiffInSeconds = Math.floor((currentTime.getTime() - startTime) / 1000); // tính thời gian chênh lệch theo giây

    // Cập nhật ô "Last Clicked" với thời gian tính được
    lastClickedCell.textContent = `${timeDiffInSeconds} giây trước`;

    // Lưu thông tin "Last Clicked" vào localStorage, sử dụng URL của video làm khóa (key)
    let videoId = this.href;  // Sử dụng URL làm khóa
    localStorage.setItem(videoId, `${timeDiffInSeconds} giây trước`);

    // Mở video trong tab mới (tùy chọn)
    window.open(this.href, '_blank');
  });
});

// Khi trang được tải lại, kiểm tra và cập nhật thông tin "Last Clicked"
document.addEventListener('DOMContentLoaded', function() {
  // Lấy thời gian bắt đầu từ localStorage (đã lưu từ lần tải trước)
  let startTime = localStorage.getItem('startTime');
  
  // Nếu không có startTime (trang mới tải lần đầu), lấy thời gian hiện tại
  if (!startTime) {
    startTime = new Date().getTime();
    localStorage.setItem('startTime', startTime);
  }

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

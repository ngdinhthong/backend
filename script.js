document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('booking-form');
    const successMessage = document.getElementById('success-message');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Lấy dữ liệu từ form
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const guests = document.getElementById('guests').value;
  
      // Kiểm tra dữ liệu đơn giản
      if (!name || !phone || !date || !time || !guests) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
      }
  
      // Tạo đối tượng đặt bàn mới
      const newBooking = {
        id: Date.now().toString(),
        name,
        phone,
        date,
        time,
        guests
      };
  
      // Lưu vào localStorage
      const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
      bookings.push(newBooking);
      localStorage.setItem('bookings', JSON.stringify(bookings));
  
      // Hiển thị thông báo thành công có hiệu ứng
      successMessage.textContent = '✅ Đặt bàn thành công!';
      successMessage.style.display = 'block';
      successMessage.classList.add('show');
  
      // Ẩn thông báo sau 2.5 giây, sau đó chuyển trang
      setTimeout(() => {
        successMessage.classList.remove('show');
        successMessage.style.display = 'none';
        form.reset(); // Reset form
        window.location.href = 'list.html';
      }, 2500);
    });
  });
  
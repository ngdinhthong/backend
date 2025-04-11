document.getElementById('edit-form').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
  
    const bookingData = {
      name,
      phone,
      date,
      time,
      guests,
    };
  
    fetch('/insert-booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
      .then((res) => {
        if (res.ok) {
          alert('✅ Đặt bàn thành công!');
          window.location.href = 'list.html';
        } else {
          alert('❌ Lỗi khi đặt bàn!');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('❌ Lỗi kết nối server!');
      });
  });
  
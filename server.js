const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Đọc file HTML và JS từ thư mục "html"
app.use(express.static(path.join(__dirname, 'html')));

// Middleware để xử lý JSON từ frontend
app.use(bodyParser.json());

// Dữ liệu booking sẽ lưu vào file JSON
const BOOKINGS_FILE = 'bookings.json';

// Load dữ liệu booking (nếu có sẵn)
let bookings = [];
if (fs.existsSync(BOOKINGS_FILE)) {
  bookings = JSON.parse(fs.readFileSync(BOOKINGS_FILE, 'utf-8'));
}

// Route nhận dữ liệu từ form
app.post('/insert-booking', (req, res) => {
  const booking = { id: Date.now().toString(), ...req.body };
  bookings.push(booking);
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2));
  res.status(200).send('Đã nhận đặt bàn!');
});

// Route để frontend lấy danh sách booking (dùng cho list.html)
app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});

# ARENA LEGENDS

Trò chơi MOBA 5v5 chạy hoàn toàn trên trình duyệt: React + TypeScript + Vite + Phaser 3 + Tailwind CSS + Zustand. Không cần Backend, Database hay API bên ngoài.

> Dự án đang phát triển theo từng giai đoạn. Xem tiến độ và tài liệu kiến trúc tại [docs/README.md](docs/README.md).

## Chạy local

Yêu cầu Node.js ≥ 20.19.

```bash
npm install
npm run dev        # máy chủ phát triển: http://localhost:5173
npm run build      # build production vào dist/
npm run preview    # xem thử bản production
```

## Kiểm tra chất lượng

```bash
npm run verify     # typecheck + lint + test + check:placeholders + build
```

## Deploy tĩnh

Đặt biến `VITE_BASE` khi build nếu website nằm trong thư mục con (ví dụ GitHub Pages: `VITE_BASE=/arena-legends/`). Hướng dẫn chi tiết sẽ được bổ sung ở Giai đoạn 16.

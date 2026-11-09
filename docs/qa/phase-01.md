# QA – Giai đoạn 01: Khởi tạo dự án

**Ngày kiểm tra:** 2026-11-09 · **Môi trường:** Windows 11, Node 24.15.0, npm 11.12.1, Chrome (headless, WebGL qua SwiftShader)

## Phiên bản đã khóa

| Gói | Phiên bản | Ghi chú |
|-----|-----------|---------|
| react / react-dom | 19.3.1 | |
| phaser | **3.90.0** | Bản 3.x mới nhất (đặc tả bắt buộc Phaser 3; npm đã có 4.x) |
| vite | 8.3.6 | |
| typescript | **6.0.3** | typescript-eslint 8.72 chỉ hỗ trợ TS < 6.1 nên chưa dùng TS 7 |
| tailwindcss / @tailwindcss/vite | 4.3.5 | Cần Safari ≥ 16.4, Chrome ≥ 111 |
| zustand | 5.1.0 | |
| vitest | 5.1.0 | |

`npm audit`: 10 cảnh báo mức *moderate*, tất cả đều nằm trong `minimatch`, một phụ thuộc của bộ công cụ ESLint (chỉ dùng lúc phát triển, không có trong bản build). Chờ bản vá upstream, không ép hạ cấp ESLint.

## Kết quả lệnh

| Lệnh | Kết quả |
|------|---------|
| `npm install` | ✅ |
| `npm run typecheck` | ✅ 0 lỗi |
| `npm run lint` | ✅ 0 lỗi |
| `npm run test` | ✅ 5 file, 27 test |
| `npm run check:placeholders` | ✅ |
| `npm run build` | ✅ JS ban đầu **74.8 KB gzip** (ngân sách ≤ 250 KB). Phaser ở chunk lười `createGame-*.js` 320 KB gzip |
| `npm run preview` | ✅ |

## Kiểm thử trên trình duyệt thật (production preview)

| # | Kiểm tra | Kết quả |
|---|---------|---------|
| 1 | Main Menu hiển thị logo nguyên bản | ✅ |
| 2 | Main Menu không có canvas, **chưa tải Phaser** | ✅ |
| 3 | Bấm "Vào đấu trường" ⇒ đúng 1 canvas, Phaser được tải lười | ✅ |
| 4 | Scene báo `game:ready` về React (Renderer: WebGL) | ✅ |
| 5 | Canvas co giãn theo cửa sổ (1600×900 → 1024×700) | ✅ |
| 6 | Vào/ra đấu trường 10 lần: tối đa 1 canvas mọi lúc | ✅ |
| 7 | Rời đấu trường ⇒ 0 canvas | ✅ |
| 8 | Main Menu ở 375px không tràn ngang | ✅ |
| 9 | Không request ra ngoài localhost (font tự host) | ✅ |
| 10 | Không có lỗi/cảnh báo trong console | ✅ |
| 11 | React StrictMode (dev) chỉ tạo 1 instance | ✅ (unit test `GameHost` mô phỏng start → stop → start) |
| 12 | Luật ranh giới lớp: import `phaser` trong `src/game/sim` bị ESLint chặn | ✅ (thử thủ công rồi gỡ) |

## Chưa làm trong giai đoạn này (đúng phạm vi)

- Các mục Chọn tướng, Cửa hàng, Hồ sơ, Cài đặt chưa xuất hiện ở Main Menu. Chúng sẽ được thêm ở GĐ 02 kèm chức năng thật.
- Đấu trường hiện là **bản xem trước isometric thu nhỏ** (lưới 16×16), chưa có gameplay. Bản đồ thật 120×120 làm ở GĐ 03.
- Âm thanh đang tắt (`noAudio`), sẽ bật ở GĐ 13.

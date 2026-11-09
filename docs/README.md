# ARENA LEGENDS – Tài liệu kỹ thuật

> MOBA 5v5 chạy hoàn toàn trên trình duyệt · React + TypeScript + Vite + Phaser 3 + Tailwind CSS + Zustand
> Không Backend · Không Database · Không API bên ngoài · Deploy dạng website tĩnh

**Trạng thái hiện tại:** Giai đoạn 01 – Khởi tạo dự án: **hoàn thành** (xem [qa/phase-01.md](qa/phase-01.md)). Tiếp theo: Giai đoạn 02.
**Cập nhật lần cuối:** 2026-11-09

## Mục lục tài liệu

| # | Tài liệu | Nội dung |
|---|----------|----------|
| 00 | [00-phan-tich-yeu-cau.md](00-phan-tich-yeu-cau.md) | Phân tích yêu cầu, phạm vi v1, thông số thiết kế game, các điểm mâu thuẫn trong đặc tả và cách xử lý |
| 01 | [01-kien-truc-tong-the.md](01-kien-truc-tong-the.md) | Kiến trúc phân lớp, tích hợp React ↔ Phaser, luồng dữ liệu, hệ tọa độ isometric, cấu trúc thư mục, quy ước code |
| 02 | [02-entity-va-system.md](02-entity-va-system.md) | Danh sách Entity, Component, System, thứ tự cập nhật, đồ thị phụ thuộc, mô hình dữ liệu (TypeScript) |
| 03 | [03-thiet-ke-gameplay.md](03-thiet-ke-gameplay.md) | Công thức chiến đấu, kinh tế, bản đồ, AI (State Machine), nội dung khởi điểm: 10 tướng, trang bị, quái |
| 04 | [04-ke-hoach-phat-trien.md](04-ke-hoach-phat-trien.md) | Lộ trình 16 giai đoạn, phụ thuộc, mốc chơi được, **tiêu chí nghiệm thu từng giai đoạn** |
| 05 | [05-tai-nguyen-do-hoa-am-thanh.md](05-tai-nguyen-do-hoa-am-thanh.md) | Danh sách tài nguyên đồ họa/âm thanh cần tạo, kích thước, quy trình, giấy phép |
| 06 | [06-rui-ro-va-hieu-nang.md](06-rui-ro-va-hieu-nang.md) | Rủi ro kỹ thuật & cách giải quyết, ngân sách hiệu năng, kỹ thuật tối ưu |

## Bảng tiến độ

Cập nhật bảng này khi kết thúc mỗi giai đoạn (sau bước Review chất lượng).

| GĐ | Tên | Trạng thái | Ghi chú |
|----|-----|-----------|---------|
| 00 | Phân tích & kế hoạch | ✅ Xong | Tài liệu trong `docs/` |
| 01 | Khởi tạo dự án | ✅ Xong | Phaser 3.90, TS 6.0, Vite 8, React 19, Tailwind 4. JS ban đầu 74.8 KB gzip |
| 02 | Giao diện (các màn hình) | ⬜ | |
| 03 | Bản đồ isometric | ⬜ | |
| 04 | Hệ thống tướng | ⬜ | |
| 05 | Điều khiển & di chuyển | ⬜ | Mốc M1 |
| 06 | Chiến đấu & kỹ năng | ⬜ | |
| 07 | Lính & trụ | ⬜ | Mốc M2 |
| 08 | Rừng & Boss | ⬜ | |
| 09 | AI 5v5 | ⬜ | Mốc M3 – trận 5v5 chơi được |
| 10 | Trang bị & cửa hàng | ⬜ | |
| 11 | Hệ thống trận đấu | ⬜ | |
| 12 | Battle HUD hoàn chỉnh | ⬜ | Mốc M4 |
| 13 | Hiệu ứng & âm thanh | ⬜ | |
| 14 | Lưu dữ liệu client | ⬜ | |
| 15 | Kiểm thử & tối ưu | ⬜ | |
| 16 | Build & deploy | ⬜ | Mốc M5 – phát hành |

## Quyết định kiến trúc chính (ADR tóm tắt)

| Mã | Quyết định | Lý do ngắn |
|----|-----------|------------|
| ADR-01 | **Mô phỏng (simulation) viết bằng TypeScript thuần**, nằm trong `src/game/sim/`, **không import Phaser**. Phaser là "host": chạy vòng lặp, render, nhận input, phát âm thanh. | Test được bằng Vitest không cần trình duyệt; chạy được trận AI-vs-AI headless để kiểm chứng "chơi trọn vẹn một trận"; tránh dính logic vào GameObject. |
| ADR-02 | **Logic dùng tọa độ Descartes (mặt phẳng 2D vuông góc), chỉ khi render mới chiếu sang isometric.** | Tầm đánh, va chạm, vùng kỹ năng là hình tròn/nón/đường thẳng chuẩn; isometric chỉ là phép chiếu hiển thị. Tránh lỗi va chạm lệch trong không gian iso. |
| ADR-03 | **Va chạm & truy vấn phạm vi tự viết** (lưới điều hướng + spatial hash + circle collider), không dùng Arcade Physics. | Arcade Physics hoạt động trong tọa độ màn hình, không khớp với iso; MOBA chỉ cần va chạm hình tròn và tường lưới. |
| ADR-04 | **Fixed timestep 30 Hz** cho mô phỏng + nội suy vị trí khi render. AI suy nghĩ 4–7 Hz, Vision 10 Hz, đồng bộ HUD 10 Hz. | Ổn định, giảm tải CPU, kết quả lặp lại được với cùng seed. |
| ADR-05 | **Một Phaser.Game duy nhất cho mỗi trận**, tạo khi vào màn trận đấu, hủy khi rời. Quản lý bởi `GameHost` (singleton). | Không rò rỉ bộ nhớ giữa các trận; chịu được React StrictMode mount 2 lần. |
| ADR-06 | **Phaser/sim là nguồn sự thật duy nhất trong trận.** Zustand chỉ giữ trạng thái UI và *bản phản chiếu* (snapshot) của trận. React gửi **lệnh** (command), không sửa trực tiếp dữ liệu trận. | Tránh hai nguồn dữ liệu lệch nhau; mọi kiểm tra (đủ vàng, hồi chiêu…) nằm ở một chỗ. |
| ADR-07 | **Điều hướng màn hình bằng state machine trong Zustand**, không dùng router URL. | Deploy GitHub Pages/Netlify/Vercel không bị lỗi 404 khi refresh; luồng màn hình khớp với trạng thái trận. |
| ADR-08 | **Dữ liệu cấu hình (tướng, kỹ năng, trang bị, quái, bản đồ) là module TypeScript** có kiểu, kèm hàm kiểm tra toàn vẹn. | Lỗi dữ liệu bị bắt khi biên dịch/test; thêm tướng mới chỉ cần thêm dữ liệu. |
| ADR-09 | **Bản đồ được sinh từ `MapConfig` hình học** (đường lane, sông, tường, bụi, vị trí trụ/quái) + **đối xứng tâm** tự động cho đội Đỏ. | Không cần công cụ ngoài; cân bằng hai đội được bảo đảm bằng code và test. |
| ADR-10 | **Người chơi và AI dùng chung một đường ống lệnh `UnitIntent`.** `PlayerController` (từ input) và `AiController` (từ Brain) chỉ khác nguồn ý định. | Không lặp logic; AI không có "đặc quyền" ngoài luật chơi. |
| ADR-11 | **AI chỉ đọc thế giới qua `Perception`** (lọc theo tầm nhìn đội). | Đáp ứng yêu cầu AI không biết vị trí người chơi khi không hợp lệ. |
| ADR-12 | **Asset: ảnh placeholder sinh bằng code ở giai đoạn đầu → thay bằng atlas nguyên bản**; mọi asset tham chiếu qua khóa trong `manifest`, có nhật ký giấy phép. | Không bị chặn tiến độ vì đồ họa; thay hình không phải sửa logic. |

## Quy trình sau mỗi giai đoạn

1. Chạy `npm run typecheck`, `npm run lint`, `npm run test`, `npm run build` – tất cả phải đạt.
2. Kiểm tra theo checklist trong `docs/qa/phase-XX.md` (tạo ở từng giai đoạn).
3. Review chất lượng theo "PROMPT KIỂM TRA CHẤT LƯỢNG" (phân loại Critical/High/Medium/Low, sửa trong phạm vi).
4. Cập nhật bảng tiến độ ở trên và ghi rõ phần **chưa** hoàn thành.

## Khi tiếp tục dự án bị ngắt giữa chừng

Đọc theo thứ tự: file này → `04-ke-hoach-phat-trien.md` (giai đoạn hiện tại + tiêu chí) → `01-kien-truc-tong-the.md` (quy tắc phụ thuộc) → mã nguồn liên quan. Không tạo lại dự án, không thay đổi ADR khi chưa ghi lý do vào bảng trên.

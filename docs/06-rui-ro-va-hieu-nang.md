# 06 – Rủi ro kỹ thuật & tối ưu hiệu năng

## 1. Bảng rủi ro

Mức: **C** = Cao, **TB** = Trung bình, **T** = Thấp (kết hợp khả năng xảy ra × ảnh hưởng).

| Mã | Rủi ro | Mức | Giải pháp | GĐ xử lý |
|----|-------|-----|----------|---------|
| R01 | **Khối lượng đồ họa nguyên bản lớn** (10 tướng × animation, quái, công trình, VFX, icon) | C | Placeholder sinh bằng code với khóa asset thật (ADR-12); giảm hướng vẽ (2 hướng + lật); mặt nạ màu đội dùng chung; ưu tiên particle; asset CC0; thay dần không đụng logic | 01→13 |
| R02 | **Isometric gây lệch logic/hiển thị**: va chạm sai, chọn chuột sai, depth sai | C | Logic thuần Descartes (ADR-02); `IsoProjector` có test round-trip; depth theo chân; vòng tầm vẽ elip; làm mờ vật che | 03 |
| R03 | **React StrictMode mount 2 lần ⇒ 2 Phaser.Game**, hoặc không hủy khi rời trận | C | `GameHost` singleton + token thế hệ; cleanup trong `useEffect`; test đếm instance; kiểm tra số canvas | 01 |
| R04 | **Bão re-render React** khi đồng bộ trạng thái 60 lần/giây | C | Snapshot 10 Hz; cập nhật theo lát + so sánh nông; selector Zustand; `React.memo`; Minimap vẽ canvas trực tiếp qua `store.subscribe`; cooldown dùng CSS transition | 02, 12 |
| R05 | **CPU quá tải** khi giao tranh: ~150 unit, đạn, AI, va chạm | C | Spatial hash; fixed 30 Hz; AI so le & giới hạn ngân sách; tránh cấp phát trong vòng lặp nóng; so sánh bình phương khoảng cách; pool | 05→15 |
| R06 | **AI ngớ ngẩn hoặc kẹt** (đứng im, đi qua lại, lao vào trụ) | C | Utility + hysteresis; phát hiện kẹt; debug overlay; test headless nhiều seed với chỉ số đo được | 09 |
| R07 | **Tìm đường tốn kém / tắc nghẽn ở lane** | TB | A* chỉ cho tướng, giới hạn N yêu cầu/tick, cache đường; lính đi theo waypoint lane + đẩy tách mềm; làm mượt đường (line-of-sight trên lưới) | 05, 07 |
| R08 | **Mất cân bằng** (một tướng/đội quá mạnh) | TB | Mọi số liệu trong `src/data`; chạy headless 20+ seed thống kê tỉ lệ thắng theo tướng/độ khó | 09→15 |
| R09 | **Xung đột phím & focus** (WASD vs W, Ctrl+W đóng tab, Tab mất focus, chuột phải mở menu) | TB | 2 preset; phát hiện trùng; cấm gán phím hệ thống; `preventDefault` có chọn lọc trên canvas; chặn context menu trên canvas; chặn phím game khi modal/ô nhập đang mở | 05 |
| R10 | **Tab bị ẩn ⇒ delta khổng lồ**, sim nhảy cóc | TB | Kẹp delta 250 ms, tối đa 4 bước/frame; tự Pause khi `visibilitychange` | 05 |
| R11 | **Rò rỉ bộ nhớ**: listener, tween, timer, texture sau khi hủy scene | C | Pattern `Disposable`; dọn ở `SHUTDOWN`; `GameHost.listenerCount()` về 0 trong test; heap snapshot 5 trận | 01, 11, 15 |
| R12 | **localStorage lỗi** (private mode, đầy, bị chặn, dữ liệu hỏng) | TB | `safeStorage` try/catch + fallback bộ nhớ; validate + migrate; giới hạn lịch sử 30 trận; sao lưu bản hỏng | 02, 14 |
| R13 | **Sai đường dẫn khi deploy** (GitHub Pages có tiền tố repo) | TB | `VITE_BASE`; asset qua `import.meta.env.BASE_URL`; không router URL; kiểm tra `preview --base` | 16 |
| R14 | **Bundle lớn** (Phaser ~1 MB chưa nén) làm menu chậm | TB | `import()` động; `manualChunks`; menu ≤ 250 KB gzip | 01, 16 |
| R15 | **Chính sách autoplay âm thanh** chặn nhạc | T | Mở khóa AudioContext ở thao tác đầu tiên (nút Play); không phát nhạc trước đó | 13 |
| R16 | **Phạm vi phình to** (đặc tả rất rộng) | C | Mốc M1–M5; định nghĩa "không làm ở v1"; mỗi GĐ chỉ làm trong phạm vi + tiêu chí nghiệm thu rõ | Toàn bộ |
| R17 | **Vi phạm bản quyền** (ảnh trong `IMG/`, tên giống game khác) | C | Không import `IMG/`; `CREDITS.md`; `check-ip`; tra cứu tên trước khi chốt | 05, 16 |
| R18 | **Không tương thích phiên bản** (Tailwind v4 + trình duyệt cũ, kiểu Phaser với TS strict) | T | Khóa phiên bản chính xác ở GĐ 01; Tailwind v4 cần Safari ≥ 16.4/Chrome ≥ 111 – nếu cần hỗ trợ cũ hơn dùng v3.4 | 01 |
| R19 | **AI "gian lận" thấy xuyên tầm nhìn** do tiện tay truy cập toàn bộ entity | TB | Chỉ đọc qua `Perception`; lint chặn import `EntityRegistry` trong `ai/`; test bụi cỏ | 09 |
| R20 | **Đạn xuyên mục tiêu** ở 30 Hz (tốc độ cao) | TB | Va chạm quét đoạn thẳng–hình tròn giữa vị trí cũ và mới | 06 |
| R21 | **Canvas mờ / sai tỉ lệ** trên màn hình HiDPI hoặc khi đổi kích thước | T | `Scale.RESIZE`; kiểm tra DPR 1x/2x; HUD bằng DOM nên sắc nét sẵn | 01, 12 |
| R22 | **Đồng hồ không nhất quán** (setTimeout trong logic chạy cả khi Pause) | TB | Cấm timer trình duyệt trong sim (lint `no-restricted-globals` cho `setTimeout`, `setInterval`, `Date` trong `src/game/sim`) – chỉ dùng `SimClock` | 01, 06 |
| R23 | **Sim không tất định** làm test headless chập chờn | T | RNG có seed tách luồng; không dùng `Math.random` trong sim (lint); thứ tự duyệt entity ổn định (theo id) | 04, 09 |

## 2. Ngân sách hiệu năng

**Máy chuẩn:** laptop CPU 4 nhân ~2018, GPU tích hợp, Chrome mới, 1920×1080, chất lượng Trung bình.

| Hạng mục | Ngân sách / frame (16.6 ms) |
|---------|------------------------------|
| Sim (30 Hz ⇒ ~1 bước mỗi 2 frame) | ≤ 4 ms trung bình mỗi bước, ≤ 8 ms đỉnh |
| — trong đó AI | ≤ 2 ms trung bình |
| Render Phaser (WebGL) | ≤ 6 ms |
| React (HUD) | ≤ 1 ms trung bình |
| Dự phòng (GC, trình duyệt) | còn lại |

**Số lượng dự kiến cùng lúc:** 10 tướng, ≤ 90 lính, ≤ 22 quái, 22 công trình, ≤ 150 đạn, ≤ 40 vùng, particle: Thấp 150 / Trung bình 400 / Cao 800.

## 3. Kỹ thuật tối ưu

### 3.1 Mô phỏng
- **Spatial hash** (ô 256 đơn vị) cho mọi truy vấn phạm vi: tìm mục tiêu, va chạm, tầm nhìn, AoE.
- **Fixed 30 Hz** + nội suy; hệ nặng chạy thưa & so le (AI 4–7 Hz chia nhóm theo `id % n`, Vision 10 Hz, chọn mục tiêu trụ/lính 5 Hz).
- **Không cấp phát trong vòng lặp nóng:** tái sử dụng `Vec2` tạm, mảng kết quả truy vấn dùng lại, tránh closure/`map/filter` mỗi tick trong system nóng.
- So sánh **bình phương khoảng cách**; dùng `for` thường trên mảng entity đã sắp theo id.
- `StatSheet` cache + cờ dirty, chỉ tính lại khi modifier thay đổi.
- A*: heap nhị phân, giới hạn số yêu cầu/tick, cache theo (ô đầu, ô đích) có hạn; lính không dùng A*.

### 3.2 Render (Phaser)
- **Texture atlas** để WebGL gộp lô vẽ (batch); hạn chế đổi texture giữa các sprite liền kề.
- Nền đất bằng **isometric Tilemap** (Phaser tự cull); vật trang trí tĩnh tạo 1 lần.
- **Ẩn view ngoài camera** (`setVisible(false)` khi ngoài khung nhìn + lề) cho unit và trang trí.
- **Thanh máu**: sprite chữ nhật (scaleX) trong pool, không vẽ lại Graphics mỗi frame.
- **Object pooling**: view lính, đạn, VFX, số sát thương, thanh máu.
- Particle có giới hạn theo chất lượng; emitter dùng chung.
- `depth` chỉ cập nhật cho vật thể di chuyển.
- FogRenderer (nếu bật): render texture độ phân giải thấp, cập nhật 10 Hz.

### 3.3 React
- Snapshot 10 Hz; mỗi widget chỉ chọn lát dữ liệu nó cần (`useHudStore(s => s.player.hp)`), so sánh nông.
- Minimap & cooldown overlay cập nhật **imperative** (canvas/CSS variable qua ref), không qua re-render.
- Animation bằng CSS `transform`/`opacity` (GPU), tránh thay đổi layout.
- Kill feed/thông báo giới hạn số mục (5) và tự hết hạn.

### 3.4 Tải & bộ nhớ
- Code splitting: Phaser + `src/game/**` là chunk lười; màn ít dùng (Profile, Hero Shop, Settings) dùng `React.lazy`.
- Nạp asset theo gói (`menu`, `match-core`, `match-heroes`); portrait WebP; nhạc dạng stream (HTML5 Audio) thay vì giải mã toàn bộ.
- Hủy Phaser.Game sau mỗi trận (ADR-05) ⇒ giải phóng texture GPU.

### 3.5 Thiết lập chất lượng (người chơi chọn)

| Tùy chọn | Thấp | Trung bình | Cao |
|---------|------|-----------|-----|
| Particle tối đa | 150 | 400 | 800 |
| Hiệu ứng trạng thái trên unit | Đơn giản | Đầy đủ | Đầy đủ |
| Bóng đổ (ellipse dưới chân) | Tắt | Bật | Bật |
| Sương mù chiến tranh (hiển thị) | Tắt | Bật | Bật, mượt |
| Rung màn hình | Theo cài đặt riêng | | |
| Độ phân giải render | 0.75× | 1× | 1× (DPR tối đa 2) |

### 3.6 Đo đạc
- `DebugOverlay` (dev, hoặc `?debug=1` ở production): FPS, ms sim/AI/render, số entity theo loại, số particle, số view trong pool.
- Chrome Performance + Memory (heap snapshot) ở GĐ 15, ghi kết quả vào `docs/qa/phase-15.md`.
- `runHeadlessMatch` in ra thời gian tính toán trung bình mỗi tick để phát hiện hồi quy hiệu năng sim.

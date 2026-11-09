# 00 – Phân tích yêu cầu

## 1. Tóm tắt sản phẩm

**ARENA LEGENDS** là game MOBA 5v5 chơi một người trên trình duyệt. Người chơi điều khiển 1 tướng thuộc **Đội Xanh (Blue)**, 9 tướng còn lại (4 đồng minh, 5 đối thủ) do AI cục bộ điều khiển. Trận đấu diễn ra trên bản đồ **isometric 2D** có 3 đường, rừng, sông, trụ, hai căn cứ. Người chơi farm lính/quái, nhận vàng và kinh nghiệm, mua trang bị, giao tranh, phá trụ và **thắng khi phá được Nhà Chính đối phương**.

Toàn bộ chạy phía client, build ra file tĩnh và deploy lên GitHub Pages / Netlify / Vercel.

## 2. Ràng buộc bắt buộc

| Nhóm | Ràng buộc |
|------|-----------|
| Công nghệ bắt buộc | React, TypeScript (strict), Vite, Phaser 3, Tailwind CSS, Zustand, Canvas/WebGL, localStorage |
| Cấm | Backend (ASP.NET, Node server…), mọi database (SQL Server, PostgreSQL, MongoDB, Firebase, Supabase), API bên ngoài, dịch vụ cần server để chơi, AI tạo sinh điều khiển trận |
| Bản quyền | Không sao chép mã, hình, nhân vật, icon, bản đồ, âm thanh, tên thương hiệu của game khác. Tên tướng/kỹ năng/trang bị đều nguyên bản |
| Chất lượng code | SOLID, không file khổng lồ, không lặp logic, interface rõ ràng, dữ liệu tách khỏi logic, xử lý lỗi + kiểm tra null/undefined, **không TODO / hàm rỗng / nút không hoạt động / dữ liệu giả thay logic thật** |
| Quy trình | Phát triển theo giai đoạn, mỗi giai đoạn phải typecheck + build + kiểm thử thực tế trước khi báo hoàn thành |

> **Hệ quả kỹ thuật quan trọng của "Không API bên ngoài":** font chữ phải **tự host** (không gọi Google Fonts CDN lúc chạy), không dùng analytics, không tải asset từ CDN. Mọi thứ nằm trong bundle hoặc thư mục `public/`.

## 3. Yêu cầu chức năng

Mã `FR-xx` dùng để tham chiếu trong kế hoạch và tiêu chí nghiệm thu.

### 3.1 Ứng dụng & giao diện (React)

| Mã | Yêu cầu | GĐ |
|----|---------|----|
| FR-01 | Main Menu: logo nguyên bản, Play, chọn chế độ (5v5 vs AI) + độ khó, danh sách tướng, cửa hàng (mở khóa tướng), hồ sơ, cài đặt | 01–02 |
| FR-02 | Hero Selection: chọn tướng, xem chỉ số/kỹ năng, không chọn trùng, chỉ chọn tướng đã mở khóa, chọn đường ưu tiên | 02, 04 |
| FR-03 | Loading Screen có tiến độ tải thật (từ Phaser loader) | 02, 11 |
| FR-04 | Battle HUD: minimap, thanh máu/năng lượng, cấp, Q/W/E/R + đánh thường, bảng điểm, thời gian, vàng, trang bị, biến về, thông báo hạ gục/Boss/phá trụ | 02, 12 |
| FR-05 | Item Shop trong trận: duyệt theo nhóm, gợi ý theo vai trò, mua/bán, giá sau khi trừ thành phần | 10 |
| FR-06 | Scoreboard (giữ Tab) | 11–12 |
| FR-07 | Pause Menu: tiếp tục, cài đặt, thoát trận | 02, 11 |
| FR-08 | Settings: âm lượng (tổng/nhạc/hiệu ứng, tắt tiếng), đồ họa (chất lượng, FPS), điều khiển (preset + đổi phím) | 02, 05, 13, 14 |
| FR-09 | Match Result: thắng/thua, KDA, tổng sát thương, vàng, lính hạ, trụ phá, thời gian | 11 |
| FR-10 | Player Profile: tên, thống kê cá nhân, lịch sử trận, thành tích | 02, 14 |

### 3.2 Gameplay (Phaser + sim)

| Mã | Yêu cầu | GĐ |
|----|---------|----|
| FR-20 | Bản đồ isometric: 2 căn cứ, 3 đường, rừng, sông, bụi cỏ, vật cản, vị trí trụ, trại quái, hang Rồng, hang Boss, đường đi của lính, vùng căn cứ an toàn; camera theo người chơi, giới hạn trong bản đồ; minimap | 03 |
| FR-21 | 10 tướng nguyên bản, 6 vai trò, mỗi tướng có Nội tại + Q/W/E/R; tăng chỉ số theo cấp; trạng thái sống/chết; animation đứng/chạy/đánh/chết | 04 |
| FR-22 | Điều khiển: WASD/click-to-move, kỹ năng, khóa mục tiêu, biến về, đánh thường; phím tùy chỉnh; không xuyên tường, không ra ngoài bản đồ | 05 |
| FR-23 | Chiến đấu: đánh thường (theo mục tiêu/theo hướng), đạn bay, kỹ năng định hướng/chọn mục tiêu/diện rộng; hiệu ứng Slow, Stun, Knockback, Silence, Shield, Heal, Burn, Poison; DamageSystem riêng | 06 |
| FR-24 | Lính cận chiến/đánh xa/công thành, sinh theo đợt, đi 3 đường, tự tìm mục tiêu, cho vàng + KN | 07 |
| FR-25 | Trụ: máu, tầm, sát thương, tốc đánh, ưu tiên mục tiêu, bảo vệ đồng minh, chuỗi phá trụ mở đường vào căn cứ; Nhà Chính | 07 |
| FR-26 | Rừng: quái nhỏ, quái lớn, Bùa Xanh, Bùa Đỏ, Rồng, Boss lớn; AI quái Idle→Detect→Chase→Attack→Return→Dead→Respawn; Boss nhiều giai đoạn, có cảnh báo trước kỹ năng; phần thưởng có tác động rõ | 08 |
| FR-27 | AI 9 tướng: chọn đường, farm, đi rừng, phát hiện địch, dùng kỹ năng, né kỹ năng, rút lui, hỗ trợ, đẩy trụ, giao tranh, tranh Boss, thủ nhà; hành vi theo vai trò; 3 độ khó; không "nhìn xuyên" tầm nhìn | 09 |
| FR-28 | Trang bị: 6 nhóm, mua/bán, kiểm tra vàng, 6 ô, cập nhật chỉ số, trang bị ghép, gợi ý theo vai trò | 10 |
| FR-29 | Trận đấu: trạng thái Waiting/HeroSelection/Loading/Playing/Paused/Victory/Defeat; quản lý thời gian, vàng, KN, hạ gục, trụ, Boss; thắng/thua theo Nhà Chính | 11 |
| FR-30 | Hiệu ứng hình ảnh & âm thanh cho các sự kiện chính; tải asset theo nhu cầu | 13 |
| FR-31 | Lưu localStorage có version, kiểm tra dữ liệu, mặc định, nâng cấp cấu trúc, xử lý lỗi | 14 |

## 4. Yêu cầu phi chức năng (NFR)

| Mã | Yêu cầu | Cách đo |
|----|---------|---------|
| NFR-01 | **60 FPS** trên "thiết bị phù hợp": laptop CPU 4 nhân ~2018 trở lên (ví dụ Core i5 gen 8), GPU tích hợp, Chrome/Edge/Firefox 2 phiên bản mới nhất, màn hình 1920×1080, chất lượng "Trung bình". Không dưới 45 FPS trong giao tranh 10 tướng | Overlay debug FPS + Performance panel của Chrome |
| NFR-02 | Màn hình tối thiểu 1280×720; giao diện menu responsive tới 375px chiều ngang (chỉ menu; trận đấu yêu cầu bàn phím + chuột) | Kiểm tra thủ công nhiều kích thước |
| NFR-03 | JS ban đầu (tới Main Menu, **chưa gồm Phaser**) ≤ 250 KB gzip; Phaser và mã trận đấu tải lười (lazy) khi vào trận | Báo cáo `vite build` |
| NFR-04 | Tổng asset tải cho một trận ≤ 15 MB (chất lượng cao), Main Menu ≤ 3 MB | Tab Network |
| NFR-05 | Không rò rỉ bộ nhớ: chơi 5 trận liên tiếp, heap sau GC chênh lệch ≤ 10% so với sau trận 1; chỉ có tối đa 1 canvas Phaser | Heap snapshot, đếm `canvas` |
| NFR-06 | Mô phỏng tất định với cùng `seed` + cùng chuỗi lệnh (phục vụ test, tái hiện lỗi) | Test headless |
| NFR-07 | Trận AI-vs-AI headless kết thúc có người thắng trong ≤ 35 phút game ở ≥ 90% seed thử | Test headless |
| NFR-08 | Không lỗi console ở chế độ dev và production preview | Kiểm tra thủ công + Playwright (tùy chọn) |
| NFR-09 | Chơi được hoàn toàn offline sau khi tải trang | Tắt mạng sau khi tải |

## 5. Thông số thiết kế game khởi điểm (v1)

Các giá trị dưới đây là **giá trị khởi điểm**, sẽ nằm trong `src/data/rules/*.ts` để cân bằng sau, không hardcode trong logic.

| Hạng mục | Giá trị v1 |
|----------|-----------|
| Thời lượng trận mục tiêu | 15–20 phút (ngắn hơn MOBA PC để hợp với web) |
| Bản đồ logic | Lưới 120 × 120 ô, mỗi ô 64 đơn vị → 7680 × 7680 đơn vị thế giới |
| Tick mô phỏng | 30 Hz |
| Cấp tối đa | 15; Q/W/E tối đa cấp 4, R tối đa cấp 3 (mở ở cấp 4/8/12) → đúng 15 điểm kỹ năng |
| Vàng khởi điểm | 500; vàng thụ động 3/giây từ 0:30 |
| Lính | Đợt đầu 0:30, mỗi 30 giây một đợt; 3 cận chiến + 2 đánh xa; lính công thành mỗi đợt thứ 3; chỉ số tăng mỗi 90 giây |
| Trụ mỗi đội | Mỗi đường: Trụ Ngoài + Trụ Trong (6 trụ) · Căn cứ: 2 Trụ Hộ Vệ · 1 Nhà Chính · 1 Bệ Hồi Sinh (không phá được) |
| Chuỗi phá trụ | Ngoài → Trong → (bất kỳ Trụ Trong nào bị phá) Trụ Hộ Vệ có thể bị tấn công → (cả 2 Trụ Hộ Vệ bị phá) Nhà Chính có thể bị tấn công |
| Trại rừng mỗi phía | 2 trại quái nhỏ, 1 quái lớn, 1 Bùa Xanh, 1 Bùa Đỏ (tổng 10 trại) |
| Rồng | Xuất hiện 3:00, hồi sinh 4:00; mỗi lần hạ: cả đội +6% sát thương vật lý & phép (cộng dồn tối đa 3 lần, vĩnh viễn) |
| Boss lớn | Xuất hiện 8:00, hồi sinh 5:00; phần thưởng: buff 150 giây cho cả đội còn sống (+sát thương, biến về 3 giây, lính gần đó được cường hóa) + 250 vàng/người |
| Hồi sinh tướng | `5 + 2.5 × cấp` giây (cấp 15 ≈ 42 giây) |
| Biến về | Vận 6 giây, bị ngắt khi nhận sát thương/di chuyển/dùng kỹ năng |
| Mua trang bị | Chỉ khi đứng trong vùng căn cứ hoặc đang chết; cửa hàng mở xem được mọi lúc (nút Mua bị vô hiệu kèm lý do) |
| Ô trang bị | 6 |
| Hạ gục tướng | 300 vàng (+chuỗi hạ gục/khắc chế chuỗi), 150 vàng chia cho người hỗ trợ; Chiến công đầu +100 |
| Nhận thưởng lính | Đòn kết liễu nhận 100% vàng; tướng phe ta trong bán kính 900 không kết liễu nhận 40% (giảm áp lực farm cho người mới, AI dễ cân bằng) |

## 6. Phạm vi KHÔNG làm ở v1

- Chơi mạng nhiều người, tài khoản, đăng nhập (kể cả giả lập), bảng xếp hạng, chat.
- Điều khiển cảm ứng / joystick mobile (kiến trúc input vẫn cho phép thêm sau).
- Skin, hiệu ứng mua bằng tiền, cửa hàng tiền thật.
- Replay đầy đủ (dù sim tất định cho phép làm sau).
- Chọn Đội Đỏ cho người chơi (v1 cố định Đội Xanh như đặc tả PROMPT 09; bản đồ đối xứng nên mở rộng sau dễ dàng).
- Ngọc/bảng bổ trợ, phép bổ trợ (Flash/Heal kiểu summoner spell).

## 7. Mâu thuẫn & điểm mơ hồ trong đặc tả – quyết định xử lý

| # | Vấn đề | Quyết định |
|---|--------|-----------|
| 1 | PROMPT 05: WASD di chuyển nhưng W cũng là kỹ năng 2 | Hai preset điều khiển. **Preset "Bàn phím" (mặc định):** WASD di chuyển, Q = kỹ năng 1, **F = kỹ năng 2 (slot W)**, E = kỹ năng 3, R = chiêu cuối, J/chuột trái = đánh thường, Space = khóa mục tiêu, B = biến về. **Preset "Chuột (cổ điển)":** chuột phải click-to-move/tấn công, Q/W/E/R kỹ năng. Mọi phím đổi được, có phát hiện trùng phím. Dữ liệu kỹ năng vẫn gọi theo slot Q/W/E/R. |
| 2 | PROMPT 04 "10 tướng chia đều 6 vai trò" – không chia đều được | Fighter 2, Mage 2, Marksman 2, Tank 2, Assassin 1, Support 1 (xem `03-thiet-ke-gameplay.md`). |
| 3 | Không chọn trùng tướng + 10 tướng + 10 vị trí ⇒ mọi trận dùng đủ 10 tướng | Chấp nhận ở v1; AI tự chia đội theo vai trò sau khi người chơi chọn. Kiến trúc dữ liệu cho phép thêm tướng chỉ bằng file dữ liệu. Khuyến nghị nâng lên ≥ 12 tướng ở bản sau. |
| 4 | "Tướng đã mở khóa" trong dữ liệu lưu + "Cửa hàng" ở Main Menu, nhưng không có tiền tệ ngoài trận | Thêm **Điểm Vinh Danh** (lưu local) nhận sau mỗi trận (thắng nhiều hơn thua). Ban đầu mở 6 tướng (mỗi vai trò 1), 4 tướng còn lại mở bằng Điểm Vinh Danh ở **Cửa hàng Main Menu**. AI vẫn dùng mọi tướng. Như vậy nút Cửa hàng có chức năng thật. |
| 5 | PROMPT 02 thiết kế toàn bộ giao diện **trước** khi có hệ thống game, nhưng cấm dữ liệu giả và nút không hoạt động | GĐ 02 làm thật các màn không phụ thuộc trận (Menu, Chọn tướng, Cài đặt, Hồ sơ, Cửa hàng mở khóa) với dữ liệu thật từ `src/data`. Các widget HUD/Shop trong trận được dựng thành component nhận `props` có kiểu, **chỉ được gắn vào màn trận khi hệ thống cung cấp dữ liệu đã tồn tại** (feature registry). Kiểm thử component bằng fixture trong file test (không phải dữ liệu giả trong sản phẩm). |
| 6 | PROMPT 11 "Chọn đội" vs PROMPT 09 "người chơi thuộc Blue Team" | v1 cố định Đội Xanh; `MatchSetup.playerTeam` vẫn là tham số để mở rộng. |
| 7 | Main Menu có "Chọn chế độ" nhưng chỉ có 1 chế độ | Mục chế độ hiển thị **5v5 vs AI** + chọn **độ khó** (Easy/Normal/Hard) – đây là lựa chọn có tác dụng thật. |
| 8 | "Hình ảnh chất lượng cao" vs không dùng tài nguyên bản quyền, không API | Tài nguyên đồ họa là rủi ro số 1 – xem `05-tai-nguyen-do-hoa-am-thanh.md` và `06-rui-ro-va-hieu-nang.md` (R01). |
| 9 | Space = "khóa mục tiêu" nhưng nhiều MOBA dùng Space cho camera | Space khóa mục tiêu như đặc tả; camera luôn bám tướng, có phím **Y** bật/tắt camera tự do (cuộn mép màn hình). |
| 10 | Thứ tự PROMPT: AI (09) trước Trang bị (10) | Giữ thứ tự. GĐ 10 bổ sung hành vi "AI về nhà mua đồ" vào AI đã có. |

## 8. Phân tích ảnh tham khảo trong `IMG/`

| File | Nội dung | Cách dùng |
|------|---------|-----------|
| `anh1.png` | Concept tổng thể "Eternal Arena": HUD (minimap trái trên, tỉ số + thời gian giữa trên, cụm kỹ năng phải dưới, vàng bên trái), phong cách tím–xanh–vàng kim | Tham khảo bố cục HUD & bảng màu. Không dùng lại tên/hình |
| `hethongmap.jpg` | Concept bản đồ: căn cứ xanh trái dưới, đỏ phải trên, sông chéo, rừng rậm, đèn đuốc | Tham khảo bố cục và không khí bản đồ |
| `trangbi.jpg` | Giao diện bộ sưu tập trang bị dạng thẻ + panel chi tiết | Tham khảo bố cục Shop: lưới thẻ + panel chi tiết bên phải + lọc theo nhóm bên trái |
| `tru1.jpg`, `bot1.jpg`, `anh8.jpg`, `ảnh6.jpg`, `anh2/3/4.jpg`, `ảnh4.jpg` | Ảnh chụp màn hình game MOBA thương mại (trụ, lính, Nhà Chính, Rồng) | **Chỉ tham khảo tỉ lệ & khả năng đọc hình.** Tuyệt đối không cắt ghép hay vẽ lại sát |
| `nv1.jpg` … `nv7.jpg` | Artwork nhân vật (có thể thuộc game thương mại) | **Chỉ tham khảo mức độ chi tiết**. Không dùng làm portrait |

**Quy tắc:** thư mục `IMG/` không bao giờ được import vào `src/` hoặc copy vào `public/`. Thêm kiểm tra trong GĐ 16 (grep build output) để chắc chắn.

## 9. Định nghĩa "Hoàn thành v1"

Đúng như "TIÊU CHÍ NGHIỆM THU CUỐI CÙNG" trong đặc tả, và được kiểm chứng bằng:

1. Một trận người chơi thật từ Main Menu → Chọn tướng → Loading → Trận đấu → phá Nhà Chính (hoặc bị phá) → Màn kết quả → về Main Menu → chơi trận thứ 2 không cần tải lại trang.
2. Bộ test headless AI-vs-AI (NFR-07) đạt.
3. `npm run build` + `npm run preview` chạy đúng với base path của GitHub Pages.

# 05 – Tài nguyên đồ họa & âm thanh

## 1. Chiến lược

Tài nguyên là **rủi ro lớn nhất** (R01): cần đẹp, nguyên bản, không bản quyền, không gọi API. Làm theo 3 tầng để không bị chặn tiến độ:

| Tầng | Khi nào | Cách làm | Ghi chú |
|------|---------|----------|---------|
| **T0 – Placeholder sinh bằng code** | GĐ 01–12 | `placeholderArt.ts` vẽ bằng Phaser Graphics → `generateTexture()` (hình khối, màu đội, biểu tượng vai trò, vòng hướng nhìn); icon UI vẽ bằng SVG inline | Đây là **ảnh tạm**, không phải dữ liệu giả: logic vẫn thật. Mỗi texture placeholder dùng **đúng khóa** asset thật sẽ dùng sau |
| **T1 – Asset nguyên bản / CC0** | Từ GĐ 13 (có thể thay dần sớm hơn) | Tự vẽ (Krita, Aseprite, Inkscape), dựng 3D low-poly trong Blender rồi render ra sprite isometric, hoặc dùng gói **CC0** (ví dụ Kenney.nl). Công cụ tạo ảnh AI chỉ dùng nếu điều khoản cho phép sử dụng thương mại; ghi lại công cụ và điều khoản | Mỗi file ghi vào `public/assets/CREDITS.md` |
| **T2 – Đánh bóng** | Sau v1 | Thêm hướng nhìn, khung hình, skin | Ngoài phạm vi v1 |

**Nguyên tắc:** code chỉ tham chiếu **khóa** (`assetKeys.ts`) và `manifest.ts`; thay hình không phải sửa logic. Ảnh trong `IMG/` không bao giờ dùng làm asset.

## 2. Thông số kỹ thuật chung

| Mục | Quy định |
|-----|----------|
| Tile isometric | 128 × 64 px (hình thoi), vẽ ở 1x; vật thể cao (vách đá) dùng sprite riêng neo theo chân |
| Neo (origin) sprite | Chân nhân vật/công trình: `(0.5, 0.85)` – khớp `depth` theo chân |
| Hướng nhìn v1 | 2 hướng vẽ (Đông-Nam, Đông-Bắc) + lật ngang ⇒ 4 hướng hiển thị |
| Màu đội | Lớp "mặt nạ đội" vẽ trắng xám, tô màu lúc chạy (`setTint`) ⇒ 1 bộ hình dùng cho cả 2 đội (lính, trụ, Nhà Chính) |
| Định dạng | Atlas PNG + JSON (đóng gói bằng `free-tex-packer-cli`, giấy phép MIT); portrait/splash WebP; atlas ≤ 2048 × 2048 |
| Âm thanh | OGG (chính) + MP3 (dự phòng Safari); SFX mono 44.1 kHz; nhạc stereo, ≤ 128 kbps |
| Font | Tự host, giấy phép OFL, hỗ trợ tiếng Việt: tiêu đề **Cinzel** (chỉ chữ Latin không dấu như logo "ARENA LEGENDS"), tiêu đề tiếng Việt **Playfair Display** hoặc **Be Vietnam Pro**, nội dung **Be Vietnam Pro** |
| Ngân sách | Menu ≤ 3 MB · một trận ≤ 15 MB (chất lượng cao) |

## 3. Danh sách tài nguyên cần tạo

### 3.1 Bản đồ

| Tài nguyên | Số lượng | Kích thước | Ghi chú |
|-----------|---------|-----------|---------|
| Tile cỏ (biến thể) | 4 | 128×64 | Tránh lặp hoa văn |
| Tile đất rừng | 3 | 128×64 | |
| Tile đường lane đá lát + chuyển tiếp cạnh | 1 + 12 | 128×64 | Bộ chuyển tiếp 4 cạnh + 4 góc trong + 4 góc ngoài |
| Tile nước sông (động) + bờ sông | 4 khung + 12 | 128×64 | |
| Tile nền căn cứ (2 phong cách: Bình Minh/Hoàng Hôn) | 2 × 3 | 128×64 | |
| Bụi cỏ (sprite phủ, mờ khi tướng ta đứng trong) | 3 | 128×96 | |
| Vách đá / tường | 6 | 128×128–256 | |
| Cây lớn | 5 | 128×192 | Làm mờ khi che tướng |
| Đá, gốc cây, tàn tích, đuốc (động 4 khung), pha lê | ~12 | 64–128 | Trang trí |
| Hang Rồng & hang Boss (nền trang trí) | 2 | 512×256 | |
| Ảnh nền minimap | 1 | sinh tự động từ MapConfig | `MinimapBaker` |

### 3.2 Công trình

| Tài nguyên | Trạng thái | Kích thước |
|-----------|-----------|-----------|
| Trụ (Ngoài/Trong/Hộ Vệ – cùng kiểu, khác chi tiết) | nguyên vẹn, hư hại, đống đổ nát | 128×256 |
| Nhà Chính | nguyên vẹn, hư hại, hiệu ứng nổ (8 khung) | 256×320 |
| Bệ Hồi Sinh | phát sáng (4 khung) | 256×192 |
| Tia trụ / đạn trụ | 1 đạn + 1 tia trúng | 64×64 |

### 3.3 Tướng (×10)

| Tài nguyên | Mỗi tướng | Kích thước | Tổng |
|-----------|----------|-----------|------|
| Portrait (chọn tướng, hồ sơ) | 1 | 512×512 WebP | 10 |
| Splash (chi tiết tướng) | 1 | 1024×1024 WebP | 10 |
| Icon (HUD, kill feed, scoreboard) | 1 | 96×96 | 10 |
| Sprite trong trận | idle 4 · run 6 · attack 5 · cast 5 · death 6 khung × 2 hướng = 52 khung | 128×128 / khung | 520 khung |
| Icon kỹ năng (nội tại + Q/W/E/R) | 5 | 128×128 (hiển thị 64) | 50 |

### 3.4 Lính & quái

| Tài nguyên | Animation | Kích thước |
|-----------|-----------|-----------|
| Chiến Binh Thép / Pháp Sư Tập Sự / Xe Công Thành (mặt nạ đội) | idle 2 · run 4 · attack 4 · death 4 × 2 hướng | 64×64 (xe 96×96) |
| Sói Đá, Nấm Độc, Cự Thạch Quy | idle · attack · death | 64–128 |
| Thạch Linh Lam, Hỏa Mãng | idle · attack · death | 128×128 |
| Phong Long | idle · attack · cast · death | 256×256 |
| Titan Hư Không | idle · attack · 3 cast · enrage · death | 384×384 |

### 3.5 Hiệu ứng (VFX)

Ưu tiên **particle Phaser** (texture nhỏ dùng chung) + vài sprite sheet:

| Hiệu ứng | Kiểu | Ghi chú |
|---------|------|--------|
| Vệt chém đánh thường | sprite 5 khung | 3 màu theo tướng (tint) |
| Đạn bay: mũi tên, cầu lửa, mũi băng, phi dao, cầu ánh sáng, đạn phép lính, đạn trụ | sprite 1–4 khung | |
| Tia va chạm | particle | |
| Cháy nổ (thiên thạch, pháo kích) | sprite 8 khung + particle | |
| Burn / Poison / Slow (băng) / Stun (sao xoay) / Silence (biểu tượng) | sprite loop nhỏ trên đầu/chân | |
| Khiên (bong bóng) / Hồi máu (lấp lánh) | sprite + particle | |
| Lên cấp (cột sáng), biến về (vòng xoáy), chết (mờ dần + tro), hồi sinh (tia sáng) | sprite + particle | |
| Phá trụ (khói, đá vỡ), Boss xuất hiện (vòng hư không), chiến thắng (pháo hoa / Nhà Chính nổ) | sprite + particle | |
| Cảnh báo kỹ năng Boss & vùng kỹ năng | **vẽ bằng Graphics** (elip/nón/đường) | Không cần ảnh |
| Chỉ báo tầm đánh/tầm kỹ năng | vẽ bằng Graphics | |

### 3.6 Giao diện (UI)

| Tài nguyên | Ghi chú |
|-----------|--------|
| Logo ARENA LEGENDS | SVG nguyên bản (khiên + hai thanh kiếm cách điệu, vàng kim trên nền tím) |
| Nền Main Menu | Ảnh WebP 1920×1080 (hoặc cảnh vẽ bằng CSS gradient + SVG để nhẹ) |
| Khung panel, nút, khung icon (theo độ hiếm trang bị), thanh máu/năng lượng | CSS + SVG (không cần ảnh bitmap) |
| Icon chỉ số (AD, AP, giáp, kháng phép, tốc chạy, tốc đánh, chí mạng, hồi chiêu, vàng) | SVG tự vẽ, ~12 icon |
| Icon vai trò ×6, icon vị trí ×5 | SVG |
| Icon trang bị ×22 | 128×128 (hiển thị 64) |
| Icon buff ×5 (Bùa Xanh, Bùa Đỏ, Rồng, Ấn Hư Không, Bình Máu) | 64×64 |
| Icon minimap (tướng = icon tướng thu nhỏ có viền màu đội, trụ, quái, Rồng, Boss) | vẽ bằng canvas |
| Con trỏ chuột (thường, tấn công, chọn mục tiêu) | 32×32 PNG |

### 3.7 Âm thanh

| Nhóm | Danh sách | Nguồn gợi ý |
|------|-----------|------------|
| Nhạc | Menu (loop), Trận đấu (loop 2–3 phút), Chiến thắng (stinger), Thất bại (stinger) | Tự sáng tác hoặc CC0 |
| Đánh thường | Chém, bắn cung, phép, trúng thịt, trúng giáp | jsfxr/ChipTone (âm tự tạo thuộc về mình) hoặc CC0 |
| Kỹ năng | Lửa, băng, gió, đá, ánh sáng, bóng tối, lướt, dịch chuyển, khiên, hồi máu | |
| Sự kiện | Hạ gục, chuỗi hạ gục, chiến công đầu, phá trụ, Nhà Chính nổ, lên cấp, kỹ năng sẵn sàng, mua đồ, không đủ vàng, biến về | |
| Boss & Rồng | Gầm xuất hiện, đập đất, chuyển giai đoạn, chết | |
| UI | Hover, click, mở/đóng panel | |
| Môi trường | Gió rừng, nước sông (loop nhỏ) | |

Tổng ~45 SFX + 4 bản nhạc. **Không** dùng giọng đọc thông báo ở v1 (dùng chữ + âm hiệu).

## 4. Nạp tài nguyên (loading)

| Gói | Khi nào nạp | Nội dung |
|----|------------|---------|
| `boot` | Mở trang | Logo, font, UI icon SVG (trong bundle) |
| `menu` | Main Menu | Nền menu, portrait tướng (lazy theo màn), nhạc menu |
| `match-core` | PreloadScene | Tileset, công trình, lính, quái, VFX chung, SFX chung, nhạc trận |
| `match-heroes` | PreloadScene | **Chỉ atlas của 10 tướng trong trận** (v1 là đủ 10, nhưng cơ chế sẵn sàng khi roster lớn hơn) |

Tiến độ tải được gửi qua UiEvent `load:progress` cho Loading Overlay.

## 5. Giấy phép & kiểm soát bản quyền

- `public/assets/CREDITS.md`: bảng `file | tác giả/công cụ | giấy phép | nguồn | ngày`.
- Chỉ chấp nhận: tự tạo, CC0, hoặc giấy phép cho phép phân phối kèm game (ghi rõ điều kiện ghi công, ví dụ CC BY).
- Script `scripts/check-ip.mjs` (GĐ 16): đảm bảo `dist/` không chứa file có tên/hash trùng với file trong `IMG/`.
- Tên tướng/kỹ năng/trang bị kiểm tra trùng với các game MOBA lớn trước khi chốt (tra cứu thủ công).

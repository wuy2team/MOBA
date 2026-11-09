# MASTER PROMPT – ARENA LEGENDS
## Phát triển game MOBA 5v5 bằng React + TypeScript + Phaser 3

### 1. VAI TRÒ CỦA AI

Bạn là Senior Game Developer, Game Architect và Frontend Engineer có kinh nghiệm xây dựng game MOBA trên nền tảng Web.

Nhiệm vụ của bạn là phân tích, thiết kế, lập trình và hoàn thiện một trò chơi MOBA 5v5 có thể chơi trực tiếp trên trình duyệt.

Game lấy cảm hứng từ thể loại MOBA như League of Legends và Arena of Valor, nhưng phải có thương hiệu, nhân vật, bản đồ, hình ảnh, âm thanh, kỹ năng và nội dung nguyên bản.

Không sao chép mã nguồn, hình ảnh, nhân vật, biểu tượng, bản đồ, âm thanh hoặc thương hiệu có bản quyền của trò chơi khác.

### 2. MỤC TIÊU DỰ ÁN

Tên dự án: ARENA LEGENDS.

Thể loại: Multiplayer Online Battle Arena (MOBA).

Chế độ ban đầu: 5v5 với AI điều khiển 9 nhân vật còn lại.

Nền tảng: Website.

Mục tiêu: Người chơi có thể chọn tướng, tham gia trận đấu, chiến đấu, mua trang bị, nâng cấp sức mạnh và phá hủy nhà chính đối phương.

### 3. CÔNG NGHỆ BẮT BUỘC

- React.
- TypeScript.
- Vite.
- Phaser 3.
- Tailwind CSS.
- Zustand.
- HTML5 Canvas / WebGL.
- localStorage.

Không sử dụng:
- ASP.NET Core.
- Node.js Backend.
- SQL Server.
- PostgreSQL.
- MongoDB.
- Firebase.
- Supabase.
- API bên ngoài.
- Dịch vụ yêu cầu máy chủ để chơi.

Ứng dụng phải có khả năng chạy hoàn toàn ở phía Client.

### 4. KIẾN TRÚC

React chịu trách nhiệm:
- Trang chủ.
- Chọn tướng.
- Cài đặt.
- Cửa hàng.
- Bảng thống kê.
- Giao diện người chơi.

Phaser chịu trách nhiệm:
- Bản đồ.
- Nhân vật.
- Camera.
- Di chuyển.
- Va chạm.
- Chiến đấu.
- Kỹ năng.
- Lính.
- Trụ.
- Quái vật.
- AI.
- Logic trận đấu.

Zustand chịu trách nhiệm quản lý trạng thái giao diện và đồng bộ các dữ liệu cần thiết giữa React và Phaser.

Tách biệt Game Engine, Game Systems, Game Entities, UI và dữ liệu cấu hình.

### 5. QUY TẮC CODE

- Sử dụng TypeScript strict.
- Ưu tiên SOLID.
- Không viết toàn bộ logic trong một file.
- Không tạo component quá lớn.
- Không lặp lại logic.
- Sử dụng interface/type rõ ràng.
- Tách dữ liệu tướng, trang bị, kỹ năng ra khỏi logic xử lý.
- Có cơ chế xử lý lỗi.
- Có kiểm tra null/undefined.
- Không sử dụng dữ liệu giả để thay thế logic thật khi đã triển khai hệ thống.
- Không để nút bấm hoặc chức năng giao diện không hoạt động.
- Không tạo code giả, TODO hoặc hàm rỗng để tuyên bố đã hoàn thành.

### 6. YÊU CẦU ĐẦU RA

Trước khi code:
1. Phân tích yêu cầu.
2. Đọc cấu trúc dự án hiện tại.
3. Đề xuất kiến trúc.
4. Lập danh sách file cần tạo và chỉnh sửa.
5. Xác định các phụ thuộc giữa hệ thống.

Trong quá trình code:
1. Viết source code thực tế.
2. Kiểm tra import/export.
3. Kiểm tra TypeScript.
4. Chạy build.
5. Sửa lỗi phát sinh.
6. Không tự ý xóa chức năng đang hoạt động.

Sau khi hoàn thành:
- Liệt kê các chức năng đã hoàn thành.
- Liệt kê file đã tạo và chỉnh sửa.
- Hướng dẫn chạy dự án.
- Nêu rõ những chức năng chưa hoàn thành.
- Không tuyên bố hoàn thành nếu chưa kiểm chứng.

Bắt đầu bằng việc phân tích dự án và lập kế hoạch phát triển theo từng giai đoạn. Không code toàn bộ hệ thống trong một lần.

---

# PROMPT 00 – PHÂN TÍCH VÀ LẬP KẾ HOẠCH

Hãy phân tích toàn bộ yêu cầu xây dựng ARENA LEGENDS.

Chưa cần lập trình ngay.

Thực hiện:

1. Xác định đầy đủ các hệ thống cần có của game MOBA.
2. Thiết kế kiến trúc React + Phaser.
3. Xác định luồng dữ liệu giữa React, Phaser và Zustand.
4. Thiết kế cấu trúc thư mục.
5. Xây dựng danh sách Entity và System.
6. Xây dựng mô hình dữ liệu cho Hero, Skill, Item, Minion, Tower, Monster và Match.
7. Xác định các dependency giữa các hệ thống.
8. Lập kế hoạch phát triển theo thứ tự.
9. Xác định rủi ro kỹ thuật và cách giải quyết.
10. Đề xuất cách tối ưu hiệu năng trình duyệt.

Yêu cầu:
- Kiến trúc có thể mở rộng.
- Không phụ thuộc Backend.
- Không phụ thuộc Database.
- Không sử dụng tài nguyên có bản quyền.
- Không thiết kế hệ thống quá phức tạp ở giai đoạn đầu.

Đầu ra là tài liệu kiến trúc và kế hoạch triển khai cụ thể.

# PROMPT 01 – KHỞI TẠO DỰ ÁN

Hãy khởi tạo dự án ARENA LEGENDS bằng React, TypeScript, Vite, Phaser 3, Tailwind CSS và Zustand.

Yêu cầu:

1. Khởi tạo project.
2. Cấu hình TypeScript strict.
3. Cài đặt và cấu hình Phaser.
4. Cấu hình Tailwind CSS theo phiên bản tương thích.
5. Thiết lập Zustand.
6. Tạo cấu trúc thư mục chuẩn.
7. Tạo MainLayout.
8. Tạo trang MainMenu.
9. Tạo GameContainer để tích hợp Phaser vào React.
10. Tạo cơ chế khởi tạo và hủy Phaser Game đúng vòng đời React.
11. Tạo cấu hình môi trường cần thiết.
12. Thiết lập alias import.
13. Tạo các file type và interface nền tảng.

Yêu cầu giao diện ban đầu:
- Phong cách Fantasy MOBA.
- Tông màu xanh đậm, tím, vàng kim.
- Thiết kế cao cấp.
- Có logo ARENA LEGENDS nguyên bản.
- Responsive.

Kiểm tra npm install, npm run dev và npm run build.

# PROMPT 02 – THIẾT KẾ GIAO DIỆN

Thiết kế toàn bộ giao diện ARENA LEGENDS.

Các màn hình:

1. Main Menu.
2. Hero Selection.
3. Loading Screen.
4. Battle HUD.
5. Item Shop.
6. Scoreboard.
7. Pause Menu.
8. Settings.
9. Match Result.
10. Player Profile.

Phong cách:
- Fantasy MOBA.
- Giao diện hiện đại.
- Có chiều sâu.
- Hiệu ứng hover.
- Animation mượt.
- Typography rõ ràng.
- Hình ảnh chất lượng cao.

Main Menu phải có:
- Logo game.
- Nút Play.
- Chọn chế độ.
- Danh sách tướng.
- Cửa hàng.
- Hồ sơ người chơi.
- Cài đặt.

Battle HUD phải có:
- Minimap.
- Thanh máu.
- Thanh năng lượng.
- Cấp độ.
- Kỹ năng.
- Đánh thường.
- Bảng điểm.
- Thời gian trận đấu.
- Vàng.
- Trang bị.

Tách từng màn hình thành component React riêng.

Không chỉ tạo giao diện tĩnh. Các nút phải được kết nối với logic tương ứng.

# PROMPT 03 – XÂY DỰNG BẢN ĐỒ MOBA

Phát triển bản đồ MOBA 5v5 bằng Phaser 3.

Yêu cầu:

1. Bản đồ dạng Isometric 2D.
2. Có căn cứ xanh và căn cứ đỏ.
3. Có 3 đường:
   - Top Lane.
   - Mid Lane.
   - Bot Lane.
4. Có khu vực rừng.
5. Có sông.
6. Có bụi cỏ.
7. Có vật cản.
8. Có các vị trí đặt trụ.
9. Có vị trí quái rừng.
10. Có khu vực Boss lớn.
11. Có đường đi của lính.
12. Có vùng căn cứ an toàn.

Yêu cầu kỹ thuật:

- Tách MapScene và MapConfig.
- Sử dụng tilemap hoặc hệ thống địa hình phù hợp.
- Xây dựng collision.
- Camera có thể theo dõi người chơi.
- Có giới hạn camera trong bản đồ.
- Có cơ chế chuyển đổi tọa độ giữa thế giới game và giao diện.
- Có minimap.
- Tối ưu số lượng object được render.

Thiết kế bản đồ đối xứng tương đối giữa hai đội để bảo đảm cân bằng.

Sử dụng asset tự tạo hoặc asset có giấy phép phù hợp.

# PROMPT 04 – HỆ THỐNG TƯỚNG

Xây dựng hệ thống Hero hoàn chỉnh.

Mỗi Hero gồm:

- ID.
- Tên.
- Hình đại diện.
- Vai trò.
- Máu.
- Năng lượng.
- Sát thương vật lý.
- Sức mạnh phép thuật.
- Giáp.
- Kháng phép.
- Tốc độ di chuyển.
- Tốc độ đánh.
- Tầm đánh.
- Cấp độ.
- Kinh nghiệm.
- Vàng.

Các vai trò:

1. Fighter.
2. Mage.
3. Marksman.
4. Tank.
5. Assassin.
6. Support.

Mỗi tướng phải có:

- Nội tại.
- Kỹ năng Q.
- Kỹ năng W.
- Kỹ năng E.
- Kỹ năng R.

Yêu cầu:

1. Tạo Hero base class.
2. Tạo các Hero riêng biệt.
3. Tạo HeroConfig.
4. Tạo HeroFactory.
5. Có hệ thống tăng chỉ số theo cấp.
6. Có trạng thái sống/chết.
7. Có animation đứng yên, di chuyển, tấn công và chết.
8. Có cơ chế chọn tướng.
9. Có kiểm tra tướng đã được chọn.
10. Có thể mở rộng danh sách tướng bằng cấu hình dữ liệu.

Ban đầu tạo 10 tướng nguyên bản, chia đều các vai trò.

Không sao chép tên hoặc thiết kế tướng từ game có bản quyền.

# PROMPT 05 – HỆ THỐNG DI CHUYỂN

Xây dựng hệ thống điều khiển nhân vật.

Phiên bản desktop:

- WASD: Di chuyển.
- Q: Kỹ năng 1.
- W: Kỹ năng 2 nếu dùng sơ đồ điều khiển riêng phù hợp; tránh xung đột với di chuyển.
- E: Kỹ năng 3.
- R: Chiêu cuối.
- Space: Khóa mục tiêu.
- B: Biến về.
- J hoặc chuột trái: Đánh thường.

Hãy thiết kế key binding có thể tùy chỉnh.

Yêu cầu:

1. Nhân vật di chuyển mượt.
2. Có gia tốc hoặc chuyển động phù hợp.
3. Có kiểm tra vật cản.
4. Không xuyên tường.
5. Không đi ra ngoài bản đồ.
6. Có animation theo hướng di chuyển.
7. Camera bám theo nhân vật.
8. Có cơ chế click-to-move tùy chọn.
9. Hỗ trợ điều khiển bằng chuột.
10. Hỗ trợ cấu hình điều khiển.

Tách InputSystem, MovementSystem và CollisionSystem.

# PROMPT 06 – HỆ THỐNG CHIẾN ĐẤU VÀ KỸ NĂNG

Phát triển Combat System.

Yêu cầu:

1. Đánh thường.
2. Đánh theo mục tiêu.
3. Đánh theo hướng.
4. Đạn bay.
5. Kỹ năng định hướng.
6. Kỹ năng chọn mục tiêu.
7. Kỹ năng diện rộng.
8. Kỹ năng khống chế.
9. Kỹ năng hồi máu.
10. Kỹ năng tạo lá chắn.

Mỗi kỹ năng có:

- Skill ID.
- Tên.
- Mô tả.
- Sát thương.
- Phạm vi.
- Tầm sử dụng.
- Thời gian hồi chiêu.
- Tiêu hao năng lượng.
- Loại kỹ năng.
- Hiệu ứng.
- Cấp độ kỹ năng.

Các hiệu ứng:

- Slow.
- Stun.
- Knockback.
- Silence.
- Shield.
- Heal.
- Burn.
- Poison.

Logic sử dụng kỹ năng:

1. Kiểm tra nhân vật còn sống.
2. Kiểm tra năng lượng.
3. Kiểm tra hồi chiêu.
4. Kiểm tra phạm vi.
5. Xác định mục tiêu.
6. Thực thi kỹ năng.
7. Tính sát thương.
8. Cập nhật trạng thái.
9. Hiển thị hiệu ứng.
10. Bắt đầu cooldown.

Xây dựng DamageSystem riêng.

Sát thương phải tính đến giáp, kháng phép, chỉ số tấn công và các hiệu ứng liên quan.

Không hardcode sát thương trực tiếp trong từng component.

# PROMPT 07 – HỆ THỐNG LÍNH VÀ TRỤ

Phát triển Minion System và Tower System.

Minion:

- Lính cận chiến.
- Lính đánh xa.
- Lính công thành.

Yêu cầu:

1. Hai căn cứ tự động sinh lính.
2. Lính đi theo ba đường.
3. Lính có máu và sát thương.
4. Lính tự phát hiện kẻ địch.
5. Lính tấn công mục tiêu.
6. Lính chết và biến mất.
7. Lính hồi sinh theo chu kỳ.
8. Lính tạo vàng và kinh nghiệm theo quy tắc trận đấu.

Tower:

- Có máu.
- Có tầm đánh.
- Có sát thương.
- Có tốc độ đánh.
- Có mục tiêu ưu tiên.
- Có hiệu ứng tấn công.
- Có hiệu ứng phá hủy.

Trụ phải có logic bảo vệ đồng minh và tấn công mục tiêu theo quy tắc MOBA.

Xây dựng cơ chế phá trụ để mở đường vào căn cứ đối phương.

# PROMPT 08 – HỆ THỐNG RỪNG VÀ BOSS

Xây dựng Jungle System.

Quái rừng gồm:

- Quái nhỏ.
- Quái lớn.
- Bùa xanh.
- Bùa đỏ.
- Rồng.
- Boss lớn.

Mỗi quái có:

- Máu.
- Sát thương.
- Giáp.
- Phạm vi phát hiện.
- Phạm vi tấn công.
- Thời gian hồi sinh.
- Phần thưởng.

AI của quái:

Idle → Detect → Chase → Attack → Return → Dead → Respawn.

Boss:

1. Có lượng máu lớn.
2. Có nhiều kỹ năng.
3. Có các giai đoạn chiến đấu.
4. Có hiệu ứng cảnh báo trước kỹ năng.
5. Có phần thưởng cho đội hạ được Boss.
6. Có thể thay đổi hành vi theo lượng máu.

Các phần thưởng phải có tác động rõ ràng đến trận đấu.

# PROMPT 09 – HỆ THỐNG AI 5V5

Phát triển AI cho 9 nhân vật còn lại.

Có hai đội:

- Blue Team.
- Red Team.

Người chơi điều khiển một nhân vật thuộc Blue Team.

AI đảm nhiệm các nhân vật còn lại.

AI phải có khả năng:

1. Chọn đường.
2. Di chuyển đến đường.
3. Farm lính.
4. Đánh quái rừng.
5. Phát hiện kẻ địch.
6. Sử dụng kỹ năng.
7. Né kỹ năng.
8. Rút lui khi thấp máu.
9. Hỗ trợ đồng đội.
10. Tấn công trụ.
11. Tham gia giao tranh.
12. Tranh chấp Boss.
13. Bảo vệ căn cứ.

Sử dụng State Machine hoặc Behavior Tree.

Các trạng thái:

- Idle.
- Move.
- Farming.
- Attack.
- Chase.
- Retreat.
- Support.
- TeamFight.
- PushTower.
- DefendBase.
- Jungle.

AI phải có hành vi khác nhau theo vai trò tướng.

Không cho AI biết vị trí của người chơi nếu vị trí đó không nằm trong tầm phát hiện hoặc thông tin hợp lệ.

Có độ khó:
- Easy.
- Normal.
- Hard.

Không sử dụng AI tạo sinh hoặc API bên ngoài để điều khiển trận đấu. Toàn bộ AI hoạt động bằng logic cục bộ.

# PROMPT 10 – HỆ THỐNG TRANG BỊ VÀ CỬA HÀNG

Phát triển Item System.

Nhóm trang bị:

- Công kích.
- Phép thuật.
- Phòng thủ.
- Tốc độ.
- Hỗ trợ.
- Hồi phục.

Mỗi item gồm:

- ID.
- Tên.
- Hình ảnh.
- Giá.
- Chỉ số cộng thêm.
- Nội tại.
- Hiệu ứng đặc biệt.
- Nhóm trang bị.

Yêu cầu:

1. Cửa hàng trang bị.
2. Hiển thị vàng.
3. Mua trang bị.
4. Bán trang bị.
5. Kiểm tra đủ vàng.
6. Quản lý inventory.
7. Giới hạn số ô trang bị.
8. Cập nhật chỉ số tướng.
9. Hỗ trợ trang bị kết hợp.
10. Gợi ý trang bị theo vai trò.

Giao diện cửa hàng phải dễ sử dụng và hiển thị trực quan.

# PROMPT 11 – HỆ THỐNG TRẬN ĐẤU

Phát triển Match System.

Các trạng thái trận đấu:

- Waiting.
- HeroSelection.
- Loading.
- Playing.
- Paused.
- Victory.
- Defeat.

Logic:

1. Chọn đội.
2. Chọn tướng.
3. Khởi tạo bản đồ.
4. Khởi tạo 10 nhân vật.
5. Sinh lính.
6. Bắt đầu bộ đếm thời gian.
7. Quản lý vàng.
8. Quản lý kinh nghiệm.
9. Quản lý hạ gục.
10. Quản lý phá trụ.
11. Quản lý Boss.
12. Kiểm tra nhà chính.
13. Kết thúc trận đấu.

Điều kiện thắng:

Nhà chính đối phương bị phá hủy.

Điều kiện thua:

Nhà chính đội người chơi bị phá hủy.

Sau trận đấu hiển thị:

- Kết quả.
- KDA.
- Tổng sát thương.
- Vàng.
- Số lính tiêu diệt.
- Số trụ phá hủy.
- Thời gian trận đấu.

# PROMPT 12 – BATTLE HUD

Thiết kế Battle HUD hoàn chỉnh.

Giao diện phải có:

1. Minimap góc trên.
2. Bảng điểm hai đội.
3. Thời gian trận đấu.
4. Thanh máu.
5. Thanh năng lượng.
6. Cấp độ tướng.
7. Kỹ năng Q/W/E/R.
8. Đánh thường.
9. Trang bị.
10. Vàng.
11. Nút biến về.
12. Thông báo hạ gục.
13. Thông báo Boss.
14. Thông báo phá trụ.

Yêu cầu:

- Đồng bộ với trạng thái Phaser.
- Không sử dụng dữ liệu giả.
- Có animation.
- Có cooldown overlay.
- Có hiệu ứng khi tăng cấp.
- Có hiệu ứng khi kỹ năng sẵn sàng.
- Có tooltip mô tả kỹ năng.
- Hỗ trợ các kích thước màn hình phù hợp.

# PROMPT 13 – HIỆU ỨNG VÀ ÂM THANH

Hoàn thiện trải nghiệm hình ảnh.

Hiệu ứng cần có:

- Đánh thường.
- Đạn bay.
- Va chạm.
- Kỹ năng.
- Phép thuật.
- Cháy nổ.
- Chết.
- Hồi sinh.
- Tăng cấp.
- Hạ gục.
- Phá trụ.
- Boss xuất hiện.
- Chiến thắng.

Âm thanh:

- Nhạc nền.
- Tiếng đánh thường.
- Tiếng kỹ năng.
- Tiếng hạ gục.
- Tiếng phá trụ.
- Tiếng Boss.
- Âm thanh chiến thắng/thất bại.

Có tùy chọn tắt/mở âm thanh và điều chỉnh âm lượng.

Tài nguyên phải được tối ưu, không tải toàn bộ asset không cần thiết cùng lúc.

# PROMPT 14 – LƯU DỮ LIỆU CLIENT

Phát triển hệ thống lưu dữ liệu bằng localStorage.

Lưu:

- Tên người chơi.
- Tướng đã mở khóa.
- Cài đặt.
- Âm lượng.
- Điều khiển.
- Lịch sử trận đấu.
- Thống kê cá nhân.
- Thành tích.

Yêu cầu:

1. Có version cho dữ liệu lưu.
2. Có kiểm tra dữ liệu trước khi đọc.
3. Có xử lý khi localStorage bị lỗi.
4. Có mặc định nếu chưa có dữ liệu.
5. Có cơ chế nâng cấp cấu trúc dữ liệu.
6. Không lưu trạng thái chiến đấu liên tục nếu không cần thiết.

Không giả lập hệ thống đăng nhập online.

# PROMPT 15 – KIỂM THỬ VÀ TỐI ƯU

Kiểm tra toàn bộ dự án.

Các nội dung:

1. Kiểm tra TypeScript.
2. Kiểm tra build.
3. Kiểm tra import.
4. Kiểm tra lỗi runtime.
5. Kiểm tra khởi tạo Phaser.
6. Kiểm tra hủy Phaser.
7. Kiểm tra di chuyển.
8. Kiểm tra collision.
9. Kiểm tra kỹ năng.
10. Kiểm tra sát thương.
11. Kiểm tra AI.
12. Kiểm tra lính.
13. Kiểm tra trụ.
14. Kiểm tra Boss.
15. Kiểm tra điều kiện thắng/thua.
16. Kiểm tra lưu dữ liệu.

Tối ưu:

- Object Pooling.
- Texture Atlas.
- Giới hạn số lượng particle.
- Giảm số lượng phép tính mỗi frame.
- Tối ưu AI tick.
- Tối ưu camera.
- Tối ưu asset.
- Lazy loading.
- Code splitting.

Mục tiêu hiệu năng:
- Mục tiêu 60 FPS trên thiết bị phù hợp.
- Không memory leak.
- Không tạo nhiều Phaser Game instance.
- Không để timer hoặc listener tồn tại sau khi hủy scene.

Hãy kiểm tra thực tế, không chỉ nhận xét bằng lý thuyết.

# PROMPT 16 – BUILD VÀ DEPLOY

Hoàn thiện khả năng triển khai website tĩnh.

Yêu cầu:

1. Kiểm tra npm run build.
2. Sửa tất cả lỗi build.
3. Cấu hình Vite base path.
4. Cấu hình asset path.
5. Kiểm tra đường dẫn khi deploy.
6. Tối ưu bundle.
7. Tối ưu hình ảnh.
8. Tạo README.
9. Hướng dẫn chạy local.
10. Hướng dẫn deploy.

Mục tiêu triển khai:

- GitHub Pages.
- Netlify.
- Vercel static deployment.

Game phải chạy được mà không cần Backend.

Kiểm tra trực tiếp bản production preview trước khi kết luận hoàn thành.

---

# PROMPT KIỂM TRA CHẤT LƯỢNG SAU MỖI GIAI ĐOẠN

Hãy đóng vai trò Senior Reviewer để kiểm tra phần code vừa triển khai.

Không code thêm tính năng mới trước khi kiểm tra.

Thực hiện:

1. Đọc toàn bộ file liên quan.
2. Kiểm tra kiến trúc.
3. Kiểm tra SOLID.
4. Kiểm tra TypeScript.
5. Kiểm tra logic.
6. Kiểm tra hiệu năng.
7. Kiểm tra lỗi bảo mật phía Client.
8. Kiểm tra tương thích giữa React và Phaser.
9. Kiểm tra khả năng mở rộng.
10. Kiểm tra chức năng thực tế.

Phân loại lỗi:

- Critical.
- High.
- Medium.
- Low.

Sau đó:
- Đưa ra nguyên nhân.
- Đưa ra phương án sửa.
- Sửa các lỗi trong phạm vi hiện tại.
- Chạy lại build.
- Báo cáo kết quả.

Không được tự ý thay đổi kiến trúc nếu chưa giải thích lý do.

# PROMPT TIẾP TỤC KHI AI BỊ NGẮT GIỮA CHỪNG

Tiếp tục phát triển dự án ARENA LEGENDS từ trạng thái hiện tại.

Trước tiên:
1. Đọc lại source code hiện tại.
2. Đọc README và tài liệu kiến trúc.
3. Kiểm tra các file đã tạo.
4. Xác định giai đoạn đang thực hiện.
5. Xác định phần đã hoàn thành.
6. Xác định phần còn thiếu.
7. Kiểm tra build.

Không tạo lại dự án từ đầu.

Không ghi đè những chức năng đã hoàn thành.

Tiếp tục từ công việc còn dang dở, giữ nguyên kiến trúc và quy tắc code đã thống nhất.

# TIÊU CHÍ NGHIỆM THU CUỐI CÙNG

ARENA LEGENDS chỉ được coi là hoàn thành phiên bản đầu khi:

- Có trang chủ.
- Có chọn tướng.
- Có bản đồ MOBA 3 đường.
- Có 2 đội, mỗi đội 5 nhân vật.
- Người chơi điều khiển được tướng.
- Có AI đồng minh và đối thủ.
- Có đánh thường.
- Có kỹ năng.
- Có lính.
- Có trụ.
- Có quái rừng.
- Có Boss.
- Có vàng và kinh nghiệm.
- Có trang bị.
- Có giao tranh.
- Có điều kiện thắng/thua.
- Có màn hình kết quả.
- Có thể chơi trọn vẹn một trận.
- Có thể build và triển khai website tĩnh.

Không được tuyên bố hoàn thành nếu mới chỉ có giao diện hoặc các nút bấm mô phỏng.




Yêu cầu:

Không Backend.

Không Database.

Không API bên ngoài.

Chế độ ban đầu 5v5 với AI điều khiển 9 nhân vật.

Bản đồ Isometric 2D có 3 đường, rừng, sông, trụ và hai căn cứ.

Có hệ thống tướng, kỹ năng, lính, quái rừng, Boss, trang bị và điều kiện thắng/thua.

Người chơi có thể chơi trọn vẹn một trận đấu.

Có thể deploy dưới dạng website tĩnh.

Hãy thực hiện GIAI ĐOẠN 00:

Phân tích yêu cầu.

Thiết kế kiến trúc tổng thể.

Thiết kế cấu trúc thư mục.

Xác định các Entity và Game Systems.

Xác định cách tích hợp React với Phaser.

Xác định luồng dữ liệu.

Lập kế hoạch phát triển theo từng giai đoạn.

Xác định tài nguyên đồ họa cần tạo.

Xác định các rủi ro kỹ thuật.

Đề xuất tiêu chí nghiệm thu từng giai đoạn.


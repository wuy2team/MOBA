/** Văn bản giao diện tiếng Việt – gom một chỗ để dễ đổi ngôn ngữ (docs/01 §8). */
export const vi = {
  app: {
    name: 'Arena Legends',
    tagline: 'Đấu trường huyền thoại 5v5 – ngay trên trình duyệt',
    version: 'Phiên bản 0.1.0',
  },
  mainMenu: {
    play: 'Vào đấu trường',
    playHint: 'Xem trước Thung Lũng Hoàng Hôn – đấu trường 3 đường của Arena Legends',
    mode: 'Chế độ: 5v5 đấu với AI',
    footer: 'Chạy hoàn toàn trên trình duyệt · Không cần máy chủ',
  },
  arena: {
    title: 'Thung Lũng Hoàng Hôn',
    subtitle: 'Bản xem trước đấu trường',
    back: 'Về sảnh chính',
    loading: 'Đang khởi tạo đấu trường…',
    legendBlue: 'Căn cứ Đội Xanh',
    legendRed: 'Căn cứ Đội Đỏ',
    legendRiver: 'Sông',
    legendLane: 'Đường',
    renderer: (name: string) => `Đồ họa: ${name === 'webgl' ? 'WebGL' : 'Canvas'}`,
    errorTitle: 'Không thể khởi tạo đấu trường',
    retry: 'Thử lại',
  },
  errors: {
    title: 'Đã xảy ra lỗi',
    description: 'Giao diện gặp lỗi không mong muốn. Bạn có thể quay về sảnh chính hoặc tải lại trang.',
    backToMenu: 'Về sảnh chính',
    reload: 'Tải lại trang',
  },
} as const;

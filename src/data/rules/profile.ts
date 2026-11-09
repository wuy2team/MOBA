/** Luật hồ sơ người chơi (lưu cục bộ, không có tài khoản trực tuyến). */
export const PROFILE_RULES = {
  /** Điểm Vinh Danh tặng khi tạo hồ sơ mới – đủ để mở khóa 1 tướng đầu tiên. */
  startingHonorPoints: 500,
  playerNameMinLength: 2,
  playerNameMaxLength: 16,
  defaultPlayerName: 'Người chơi',
} as const;

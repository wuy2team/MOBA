/** Id runtime của một entity trong trận – số tăng dần, nhanh cho Map/Set. */
export type EntityId = number;

/**
 * Id của một định nghĩa dữ liệu, có tiền tố theo loại:
 * `hero.thorne`, `skill.thorne.q`, `item.iron_sword`, `monster.blue_sentinel`.
 */
export type DefinitionId = string;

const DEFINITION_ID_PATTERN = /^[a-z]+(\.[a-z0-9_]+)+$/;

/** Kiểm tra định dạng DefinitionId (dùng khi validate dữ liệu cấu hình). */
export function isValidDefinitionId(value: string): boolean {
  return DEFINITION_ID_PATTERN.test(value);
}

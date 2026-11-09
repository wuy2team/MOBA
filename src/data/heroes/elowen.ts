import type { HeroDefinition } from '@/data/types/hero';
import { heroStats } from './stats';

export const elowen: HeroDefinition = {
  id: 'hero.elowen',
  name: 'Elowen',
  title: 'Tư Tế Suối Nguồn',
  lore: 'Người canh giữ suối nguồn thiêng giữa rừng sâu, Elowen mang ánh sáng chữa lành tới bất cứ chiến trường nào cần đến.',
  role: 'support',
  positions: ['support'],
  difficulty: 1,
  resource: 'mana',
  attackKind: 'ranged',
  baseStats: heroStats({
    maxHp: 530,
    hpRegen: 1.3,
    maxMana: 400,
    manaRegen: 2.1,
    attackDamage: 48,
    armor: 24,
    magicResist: 30,
    moveSpeed: 330,
    attackSpeed: 0.62,
    attackRange: 525,
  }),
  growth: {
    maxHp: 86,
    hpRegen: 0.12,
    maxMana: 55,
    manaRegen: 0.16,
    attackDamage: 2.6,
    armor: 3.6,
    magicResist: 1.4,
    attackSpeed: 0.015,
  },
  passive: {
    name: 'Mạch Nguồn',
    description: 'Định kỳ hồi một lượng máu nhỏ cho các đồng minh đứng quanh Elowen.',
    tags: ['heal'],
  },
  skills: {
    q: {
      name: 'Cầu Ánh Sáng',
      description: 'Phóng cầu ánh sáng theo đường thẳng, gây sát thương phép và làm chậm kẻ địch đầu tiên.',
      tags: ['damage', 'skillshot', 'cc'],
    },
    w: {
      name: 'Hồi Sinh Lực',
      description: 'Hồi máu cho một đồng minh được chọn hoặc bản thân.',
      tags: ['heal', 'targeted'],
    },
    e: {
      name: 'Ban Phước',
      description: 'Ban lá chắn và tăng tốc độ di chuyển cho một đồng minh.',
      tags: ['shield', 'buff', 'targeted'],
    },
    r: {
      name: 'Vòng Thánh Quang',
      description: 'Giải phóng vòng ánh sáng: hồi lượng lớn máu cho đồng minh xung quanh và xóa hiệu ứng làm chậm.',
      tags: ['heal', 'area'],
    },
  },
  palette: { primary: '#f2d27a', secondary: '#2a2410', accent: '#a7f3d0' },
  unlock: { byDefault: true },
};

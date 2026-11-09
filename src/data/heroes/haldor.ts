import type { HeroDefinition } from '@/data/types/hero';
import { heroStats } from './stats';

export const haldor: HeroDefinition = {
  id: 'hero.haldor',
  name: 'Haldor',
  title: 'Hiệp Sĩ Khiên Tháp',
  lore: 'Haldor từng một mình giữ cổng thành suốt ba ngày đêm. Tấm khiên tháp của ông mang hàng trăm vết chém chưa từng xuyên thủng.',
  role: 'tank',
  secondaryRole: 'support',
  positions: ['support', 'top'],
  difficulty: 2,
  resource: 'mana',
  attackKind: 'melee',
  baseStats: heroStats({
    maxHp: 680,
    hpRegen: 1.8,
    maxMana: 330,
    manaRegen: 1.5,
    attackDamage: 56,
    armor: 38,
    magicResist: 34,
    moveSpeed: 335,
    attackSpeed: 0.63,
    attackRange: 150,
  }),
  growth: {
    maxHp: 112,
    hpRegen: 0.17,
    maxMana: 42,
    manaRegen: 0.1,
    attackDamage: 3,
    armor: 4.5,
    magicResist: 2.2,
    attackSpeed: 0.015,
  },
  passive: {
    name: 'Đội Hình Khiên',
    description: 'Đồng minh đứng gần Haldor được tăng giáp.',
    tags: ['buff'],
  },
  skills: {
    q: {
      name: 'Ném Khiên',
      description: 'Ném khiên vào một kẻ địch, gây sát thương vật lý và làm choáng.',
      tags: ['damage', 'targeted', 'cc'],
    },
    w: {
      name: 'Che Chắn',
      description: 'Tạo lá chắn cho một đồng minh được chọn.',
      tags: ['shield', 'targeted'],
    },
    e: {
      name: 'Đẩy Khiên',
      description: 'Đẩy khiên về phía trước theo hình nón, hất lùi kẻ địch.',
      tags: ['area', 'cc'],
    },
    r: {
      name: 'Thánh Vực',
      description: 'Dựng vùng thánh vực: đồng minh bên trong được hồi máu và giảm sát thương nhận vào.',
      tags: ['heal', 'zone', 'buff'],
    },
  },
  palette: { primary: '#c8b27a', secondary: '#2b2414', accent: '#7fb8ff' },
  unlock: { byDefault: false, honorCost: 450 },
};

import type { HeroDefinition } from '@/data/types/hero';
import { heroStats } from './stats';

export const quillon: HeroDefinition = {
  id: 'hero.quillon',
  name: 'Quillon',
  title: 'Xạ Thủ Đá Lửa',
  lore: 'Thợ mỏ trở thành xạ thủ, Quillon nhồi đá lửa vào nòng súng tự chế và biến mỗi phát bắn thành một vụ nổ nhỏ.',
  role: 'marksman',
  positions: ['carry'],
  difficulty: 2,
  resource: 'mana',
  attackKind: 'ranged',
  baseStats: heroStats({
    maxHp: 570,
    hpRegen: 1.3,
    maxMana: 300,
    manaRegen: 1.3,
    attackDamage: 62,
    armor: 27,
    magicResist: 30,
    moveSpeed: 325,
    attackSpeed: 0.66,
    attackRange: 600,
  }),
  growth: {
    maxHp: 94,
    hpRegen: 0.13,
    maxMana: 38,
    manaRegen: 0.1,
    attackDamage: 3.3,
    armor: 3.8,
    magicResist: 1.2,
    attackSpeed: 0.028,
  },
  passive: {
    name: 'Đạn Đá Lửa',
    description: 'Đòn chí mạng thiêu đốt mục tiêu, gây sát thương phép theo thời gian.',
    tags: ['damage'],
  },
  skills: {
    q: {
      name: 'Phát Bắn Xuyên Tuyến',
      description: 'Bắn một phát xuyên thẳng, gây sát thương vật lý cho mọi kẻ địch trên đường đi.',
      tags: ['damage', 'skillshot'],
    },
    w: {
      name: 'Bẫy Đá Lửa',
      description: 'Đặt bẫy tại điểm chỉ định; kẻ địch dẫm phải bị choáng và chịu sát thương.',
      tags: ['zone', 'cc'],
    },
    e: {
      name: 'Lăn Né',
      description: 'Lăn nhanh một quãng ngắn theo hướng chỉ định.',
      tags: ['dash'],
    },
    r: {
      name: 'Pháo Kích',
      description: 'Gọi ba loạt pháo nổ liên tiếp xuống vùng chỉ định.',
      tags: ['damage', 'area'],
    },
  },
  palette: { primary: '#c9772e', secondary: '#2a1a0c', accent: '#ffe08a' },
  unlock: { byDefault: false, honorCost: 600 },
};

import type { HeroDefinition } from '@/data/types/hero';
import { heroStats } from './stats';

export const arwyn: HeroDefinition = {
  id: 'hero.arwyn',
  name: 'Arwyn',
  title: 'Cung Thủ Phong Vũ',
  lore: 'Arwyn có thể bắn trúng chiếc lá đang rơi từ khoảng cách trăm bước – gió luôn đổi hướng để chiều theo mũi tên của cô.',
  role: 'marksman',
  positions: ['carry'],
  difficulty: 1,
  resource: 'mana',
  attackKind: 'ranged',
  baseStats: heroStats({
    maxHp: 560,
    hpRegen: 1.3,
    maxMana: 320,
    manaRegen: 1.4,
    attackDamage: 60,
    armor: 26,
    magicResist: 30,
    moveSpeed: 330,
    attackSpeed: 0.7,
    attackRange: 575,
  }),
  growth: {
    maxHp: 92,
    hpRegen: 0.13,
    maxMana: 40,
    manaRegen: 0.1,
    attackDamage: 3.2,
    armor: 3.8,
    magicResist: 1.2,
    attackSpeed: 0.03,
  },
  passive: {
    name: 'Mũi Tên Xuyên Gió',
    description: 'Mỗi đòn đánh thường thứ tư xuyên qua mục tiêu, trúng thêm kẻ địch phía sau.',
    tags: ['damage'],
  },
  skills: {
    q: {
      name: 'Mưa Tên',
      description: 'Bắn mưa tên xuống vùng chỉ định, gây sát thương vật lý cho mọi kẻ địch bên trong.',
      tags: ['damage', 'area'],
    },
    w: {
      name: 'Tập Trung',
      description: 'Tăng mạnh tốc độ đánh trong vài giây.',
      tags: ['buff'],
    },
    e: {
      name: 'Lùi Gió',
      description: 'Nhảy lùi về sau và làm chậm kẻ địch gần nhất.',
      tags: ['dash', 'cc'],
    },
    r: {
      name: 'Mũi Tên Thiên Phong',
      description: 'Bắn mũi tên gió bay rất xa theo đường thẳng, gây sát thương vật lý và làm choáng kẻ địch đầu tiên.',
      tags: ['damage', 'skillshot', 'cc'],
    },
  },
  palette: { primary: '#4fbf8a', secondary: '#10302a', accent: '#f4f1c9' },
  unlock: { byDefault: true },
};

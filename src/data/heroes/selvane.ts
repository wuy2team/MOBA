import type { HeroDefinition } from '@/data/types/hero';
import { heroStats } from './stats';

export const selvane: HeroDefinition = {
  id: 'hero.selvane',
  name: 'Selvane',
  title: 'Pháp Sư Băng Tinh',
  lore: 'Tu luyện trong tu viện trên đỉnh tuyết, Selvane điều khiển băng tinh lặng lẽ và chính xác như hơi thở mùa đông.',
  role: 'mage',
  secondaryRole: 'support',
  positions: ['mid', 'support'],
  difficulty: 2,
  resource: 'mana',
  attackKind: 'ranged',
  baseStats: heroStats({
    maxHp: 540,
    hpRegen: 1.3,
    maxMana: 400,
    manaRegen: 1.9,
    attackDamage: 49,
    armor: 24,
    magicResist: 30,
    moveSpeed: 330,
    attackSpeed: 0.63,
    attackRange: 525,
  }),
  growth: {
    maxHp: 90,
    hpRegen: 0.12,
    maxMana: 52,
    manaRegen: 0.14,
    attackDamage: 2.7,
    armor: 3.8,
    magicResist: 1.4,
    attackSpeed: 0.015,
  },
  passive: {
    name: 'Đóng Băng',
    description: 'Kẻ địch trúng hiệu ứng làm chậm của Selvane ba lần liên tiếp sẽ bị choáng trong chốc lát.',
    tags: ['cc'],
  },
  skills: {
    q: {
      name: 'Mũi Băng Xuyên',
      description: 'Bắn mũi băng xuyên qua mọi kẻ địch trên đường thẳng, gây sát thương phép và làm chậm.',
      tags: ['damage', 'skillshot', 'cc'],
    },
    w: {
      name: 'Khiên Băng',
      description: 'Tạo lá chắn băng cho một đồng minh hoặc bản thân.',
      tags: ['shield', 'targeted'],
    },
    e: {
      name: 'Vùng Băng Giá',
      description: 'Đóng băng mặt đất tại điểm chỉ định, gây sát thương phép và làm chậm mạnh.',
      tags: ['damage', 'area', 'cc'],
    },
    r: {
      name: 'Bão Tuyết',
      description: 'Triệu hồi bão tuyết quanh bản thân, liên tục gây sát thương phép và làm chậm kẻ địch.',
      tags: ['damage', 'area', 'zone', 'cc'],
    },
  },
  palette: { primary: '#6fd3ff', secondary: '#13304a', accent: '#e8faff' },
  unlock: { byDefault: false, honorCost: 600 },
};

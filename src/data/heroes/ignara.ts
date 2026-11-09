import type { HeroDefinition } from '@/data/types/hero';
import { heroStats } from './stats';

export const ignara: HeroDefinition = {
  id: 'hero.ignara',
  name: 'Ignara',
  title: 'Pháp Sư Hỏa Ngục',
  lore: 'Ignara đánh cắp ngọn lửa từ lòng núi lửa đã ngủ yên ngàn năm, và từ đó ngọn lửa ấy không bao giờ tắt trong tay nàng.',
  role: 'mage',
  positions: ['mid'],
  difficulty: 2,
  resource: 'mana',
  attackKind: 'ranged',
  baseStats: heroStats({
    maxHp: 520,
    hpRegen: 1.2,
    maxMana: 420,
    manaRegen: 2,
    attackDamage: 50,
    armor: 22,
    magicResist: 30,
    moveSpeed: 330,
    attackSpeed: 0.62,
    attackRange: 525,
  }),
  growth: {
    maxHp: 88,
    hpRegen: 0.12,
    maxMana: 55,
    manaRegen: 0.15,
    attackDamage: 2.8,
    armor: 3.6,
    magicResist: 1.4,
    attackSpeed: 0.015,
  },
  passive: {
    name: 'Tro Tàn',
    description: 'Kỹ năng của Ignara thiêu đốt mục tiêu, gây sát thương phép theo thời gian.',
    tags: ['damage'],
  },
  skills: {
    q: {
      name: 'Cầu Lửa',
      description: 'Phóng cầu lửa theo đường thẳng, gây sát thương phép cho mục tiêu đầu tiên.',
      tags: ['damage', 'skillshot'],
    },
    w: {
      name: 'Biển Lửa',
      description: 'Tạo vùng lửa tại điểm chỉ định, liên tục gây sát thương phép cho kẻ địch đứng bên trong.',
      tags: ['damage', 'area', 'zone'],
    },
    e: {
      name: 'Bước Lửa',
      description: 'Dịch chuyển tức thời một quãng ngắn.',
      tags: ['blink'],
    },
    r: {
      name: 'Thiên Thạch',
      description: 'Sau một khoảng trễ ngắn, thiên thạch giáng xuống vùng rộng, gây sát thương phép cực lớn.',
      tags: ['damage', 'area'],
    },
  },
  palette: { primary: '#d9481f', secondary: '#3a1208', accent: '#ffd36b' },
  unlock: { byDefault: true },
};

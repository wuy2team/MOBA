import type { HeroDefinition } from '@/data/types/hero';
import { heroStats } from './stats';

export const zerith: HeroDefinition = {
  id: 'hero.zerith',
  name: 'Zerith',
  title: 'Sát Thủ Bóng Đêm',
  lore: 'Không ai thấy gương mặt thật của Zerith. Người ta chỉ biết khi bụi cỏ khẽ lay động, đã quá muộn để chạy.',
  role: 'assassin',
  positions: ['jungle', 'mid'],
  difficulty: 3,
  resource: 'mana',
  attackKind: 'melee',
  baseStats: heroStats({
    maxHp: 590,
    hpRegen: 1.4,
    maxMana: 300,
    manaRegen: 1.4,
    attackDamage: 66,
    armor: 28,
    magicResist: 32,
    moveSpeed: 345,
    attackSpeed: 0.68,
    attackRange: 150,
  }),
  growth: {
    maxHp: 95,
    hpRegen: 0.14,
    maxMana: 40,
    manaRegen: 0.1,
    attackDamage: 3.8,
    armor: 3.9,
    magicResist: 1.8,
    attackSpeed: 0.022,
  },
  passive: {
    name: 'Đòn Từ Bóng Tối',
    description: 'Đòn đánh đầu tiên sau khi rời bụi cỏ gây thêm sát thương vật lý.',
    tags: ['damage'],
  },
  skills: {
    q: {
      name: 'Phi Dao Tẩm Độc',
      description: 'Phóng dao theo đường thẳng, gây sát thương vật lý và nhiễm độc mục tiêu.',
      tags: ['damage', 'skillshot'],
    },
    w: {
      name: 'Lướt Bóng',
      description: 'Lướt nhanh qua kẻ địch theo hướng chỉ định.',
      tags: ['dash'],
    },
    e: {
      name: 'Phong Ấn',
      description: 'Phong ấn một kẻ địch, khiến mục tiêu không thể dùng kỹ năng trong thời gian ngắn.',
      tags: ['targeted', 'cc'],
    },
    r: {
      name: 'Ám Sát',
      description: 'Dịch chuyển ra sau lưng mục tiêu và tung đòn chí mạng; sát thương tăng theo lượng máu đã mất của mục tiêu.',
      tags: ['damage', 'targeted', 'blink'],
    },
  },
  palette: { primary: '#7a4fd1', secondary: '#150c2a', accent: '#ff5a9e' },
  unlock: { byDefault: true },
};

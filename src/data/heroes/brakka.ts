import type { HeroDefinition } from '@/data/types/hero';
import { heroStats } from './stats';

export const brakka: HeroDefinition = {
  id: 'hero.brakka',
  name: 'Brakka',
  title: 'Chiến Binh Rìu Đá',
  lore: 'Lớn lên giữa bầy thú hoang của rừng Đá Xám, Brakka săn mồi bằng chiếc rìu đá nặng gấp đôi người thường.',
  role: 'fighter',
  positions: ['jungle', 'top'],
  difficulty: 1,
  resource: 'mana',
  attackKind: 'melee',
  baseStats: heroStats({
    maxHp: 660,
    hpRegen: 1.7,
    maxMana: 280,
    manaRegen: 1.3,
    attackDamage: 66,
    armor: 33,
    magicResist: 32,
    moveSpeed: 345,
    attackSpeed: 0.65,
    attackRange: 160,
  }),
  growth: {
    maxHp: 108,
    hpRegen: 0.16,
    maxMana: 38,
    manaRegen: 0.08,
    attackDamage: 3.7,
    armor: 4,
    magicResist: 2,
    attackSpeed: 0.022,
  },
  passive: {
    name: 'Bản Năng Thợ Săn',
    description: 'Hạ gục quái rừng giúp Brakka hồi một phần máu.',
    tags: ['heal'],
  },
  skills: {
    q: {
      name: 'Ném Rìu',
      description: 'Ném rìu theo đường thẳng, gây sát thương vật lý và làm chậm mục tiêu đầu tiên.',
      tags: ['damage', 'skillshot', 'cc'],
    },
    w: {
      name: 'Gầm Thét',
      description: 'Gầm vang khiến bản thân tăng mạnh tốc độ đánh trong thời gian ngắn.',
      tags: ['buff'],
    },
    e: {
      name: 'Nhảy Bổ',
      description: 'Nhảy tới vị trí chỉ định, hất lùi kẻ địch tại điểm đáp.',
      tags: ['dash', 'area', 'cc'],
    },
    r: {
      name: 'Cuồng Nộ Hoang Dã',
      description: 'Bước vào trạng thái cuồng nộ: tăng sát thương vật lý và hút máu.',
      tags: ['buff'],
    },
  },
  palette: { primary: '#8a6a4a', secondary: '#2e2218', accent: '#d9f99d' },
  unlock: { byDefault: false, honorCost: 450 },
};

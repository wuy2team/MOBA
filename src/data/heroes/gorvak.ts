import type { HeroDefinition } from '@/data/types/hero';
import { heroStats } from './stats';

export const gorvak: HeroDefinition = {
  id: 'hero.gorvak',
  name: 'Gorvak',
  title: 'Người Khổng Lồ Đá',
  lore: 'Gorvak thức giấc khi ngọn núi quê hương bị đào rỗng. Mỗi bước chân của hắn khiến mặt đất rung chuyển.',
  role: 'tank',
  positions: ['top', 'jungle'],
  difficulty: 1,
  resource: 'mana',
  attackKind: 'melee',
  baseStats: heroStats({
    maxHp: 700,
    hpRegen: 1.9,
    maxMana: 280,
    manaRegen: 1.3,
    attackDamage: 60,
    armor: 40,
    magicResist: 34,
    moveSpeed: 335,
    attackSpeed: 0.62,
    attackRange: 150,
  }),
  growth: {
    maxHp: 118,
    hpRegen: 0.18,
    maxMana: 38,
    manaRegen: 0.08,
    attackDamage: 3.2,
    armor: 4.6,
    magicResist: 2.2,
    attackSpeed: 0.015,
  },
  passive: {
    name: 'Thân Đá',
    description: 'Khi máu dưới 30%, Gorvak nhận ít sát thương hơn.',
    tags: ['buff'],
  },
  skills: {
    q: {
      name: 'Đập Đất',
      description: 'Nện xuống đất, gây sát thương vùng tròn quanh bản thân và làm chậm kẻ địch.',
      tags: ['damage', 'area', 'cc'],
    },
    w: {
      name: 'Da Đá',
      description: 'Phủ đá lên người: nhận lá chắn và tăng giáp trong vài giây.',
      tags: ['shield', 'buff'],
    },
    e: {
      name: 'Húc Núi',
      description: 'Lao tới theo hướng chỉ định, hất lùi kẻ địch đầu tiên va phải.',
      tags: ['dash', 'cc'],
    },
    r: {
      name: 'Động Đất',
      description: 'Sau một nhịp ngắn, mặt đất quanh Gorvak nứt toác, gây sát thương và làm choáng diện rộng.',
      tags: ['damage', 'area', 'cc'],
    },
  },
  palette: { primary: '#7d8a6a', secondary: '#23281c', accent: '#9be7ff' },
  unlock: { byDefault: true },
};

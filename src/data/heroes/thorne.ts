import type { HeroDefinition } from '@/data/types/hero';
import { heroStats } from './stats';

export const thorne: HeroDefinition = {
  id: 'hero.thorne',
  name: 'Thorne',
  title: 'Kiếm Sĩ Gai Thép',
  lore: 'Người gác cổng cuối cùng của pháo đài Gai Thép, Thorne mang thanh trọng kiếm rèn từ gai sắt của chính tường thành đã sụp đổ.',
  role: 'fighter',
  positions: ['top'],
  difficulty: 1,
  resource: 'mana',
  attackKind: 'melee',
  baseStats: heroStats({
    maxHp: 640,
    hpRegen: 1.6,
    maxMana: 300,
    manaRegen: 1.4,
    attackDamage: 64,
    armor: 34,
    magicResist: 32,
    moveSpeed: 340,
    attackSpeed: 0.68,
    attackRange: 150,
  }),
  growth: {
    maxHp: 105,
    hpRegen: 0.15,
    maxMana: 40,
    manaRegen: 0.08,
    attackDamage: 3.6,
    armor: 4.2,
    magicResist: 2,
    attackSpeed: 0.02,
  },
  passive: {
    name: 'Nhịp Thép',
    description: 'Mỗi đòn đánh thường thứ ba gây thêm sát thương vật lý.',
    tags: ['damage'],
  },
  skills: {
    q: {
      name: 'Chém Vòng Cung',
      description: 'Vung kiếm theo hình nón phía trước, gây sát thương vật lý cho mọi kẻ địch trúng chiêu.',
      tags: ['damage', 'area'],
    },
    w: {
      name: 'Giáp Gai',
      description: 'Tạo lá chắn hấp thụ sát thương trong vài giây.',
      tags: ['shield'],
    },
    e: {
      name: 'Xung Phong',
      description: 'Lướt tới theo hướng chỉ định, làm chậm kẻ địch đầu tiên trúng phải.',
      tags: ['dash', 'cc'],
    },
    r: {
      name: 'Phán Quyết Gai Thép',
      description: 'Cắm kiếm xuống đất, gây sát thương vùng tròn và làm choáng kẻ địch xung quanh.',
      tags: ['damage', 'area', 'cc'],
    },
  },
  palette: { primary: '#5b6b80', secondary: '#1f2a3a', accent: '#ffb347' },
  unlock: { byDefault: true },
};

/** Đốm sáng trôi nổi – vị trí cố định để render tất định (không random lúc render). */
const MOTES = [
  { left: '8%', top: '22%', size: 6, delay: '0s' },
  { left: '18%', top: '68%', size: 4, delay: '1.2s' },
  { left: '30%', top: '40%', size: 3, delay: '2.4s' },
  { left: '46%', top: '82%', size: 5, delay: '0.6s' },
  { left: '62%', top: '18%', size: 4, delay: '1.8s' },
  { left: '74%', top: '58%', size: 6, delay: '3s' },
  { left: '86%', top: '32%', size: 3, delay: '0.9s' },
  { left: '92%', top: '76%', size: 5, delay: '2.1s' },
] as const;

/** Nền huyền ảo nhiều lớp (gradient + lưới isometric + đốm sáng), chỉ trang trí. */
export function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,#2a1a5c_0%,#0b1026_55%,#070a1a_100%)]" />
      <div className="absolute -left-1/4 top-1/3 h-[60vh] w-[60vh] rounded-full bg-team-blue/10 blur-3xl" />
      <div className="absolute -right-1/4 top-1/4 h-[60vh] w-[60vh] rounded-full bg-team-red/10 blur-3xl" />
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-25 [mask-image:linear-gradient(to_top,black,transparent)]"
        style={{
          backgroundImage:
            'linear-gradient(30deg, rgba(245,196,81,0.18) 1px, transparent 1px), linear-gradient(150deg, rgba(245,196,81,0.18) 1px, transparent 1px)',
          backgroundSize: '56px 32px',
        }}
      />
      {MOTES.map((mote) => (
        <span
          key={`${mote.left}-${mote.top}`}
          className="absolute rounded-full bg-gold-300/70 shadow-[0_0_12px_rgba(255,224,138,0.9)] animate-float"
          style={{
            left: mote.left,
            top: mote.top,
            width: mote.size,
            height: mote.size,
            animationDelay: mote.delay,
          }}
        />
      ))}
    </div>
  );
}

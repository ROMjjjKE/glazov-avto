import { useEffect, useRef, useState } from 'react';

const V_MIN = 8;
const V_MAX = 16;
const START_V = 8.4;
const END_V = 14.4;

const ACTS = [
  {
    v: 8.4,
    state: 'не крутит',
    label: 'АКБ разряжен',
    text: 'Стартер щёлкает, приборка гаснет при попытке запуска. Замер под нагрузкой: 8,4 В — аккумулятор не держит заряд.',
  },
  {
    v: 12.6,
    state: 'прикурили',
    label: 'двигатель работает',
    text: 'Запуск от второй машины или бустера. 12,6 В на клеммах в покое — двигатель схватил, можно ехать.',
  },
  {
    v: 14.4,
    state: 'генератор в норме',
    label: 'заряд идёт',
    text: '14,4 В на холостых — генератор держит заряд. Если 12,8–13,2 В, разряд повторится: генератор в ремонт.',
  },
];

const cx = 260;
const cy = 250;
const r = 158;

const angleFor = (v: number) => -120 + ((v - V_MIN) / (V_MAX - V_MIN)) * 240;

function polar(angleDeg: number, radius: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return [cx + radius * Math.cos(a), cy + radius * Math.sin(a)];
}

function arcPath(from: number, to: number, radius: number) {
  const [x1, y1] = polar(from, radius);
  const [x2, y2] = polar(to, radius);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${radius} ${radius} 0 ${large} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

const clamp = (n: number, a: number, b: number) => Math.min(b, Math.max(a, n));

export default function VoltScene() {
  const [v, setV] = useState(START_V);
  const [pin, setPin] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const actIndex = v < 10.5 ? 0 : v < 13.6 ? 1 : 2;
  const angle = angleFor(v);
  const [nx, ny] = polar(angle, r - 34);
  const ignition = clamp((v - 9.2) / 4.4, 0, 1);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1100px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tall = window.innerHeight >= 700;
    if (!desktop.matches || calm.matches || !tall) {
      setV(END_V);
      setPin(false);
      return;
    }
    let killed = false;
    let cleanup: (() => void) | null = null;
    let timer: number | undefined;

    const begin = () =>
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (killed || !wrapRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        setPin(true);
        const trigger = ScrollTrigger.create({
          trigger: wrapRef.current,
          start: 'top top',
          end: '+=175%',
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const p = Math.min(1, self.progress / 0.94);
            const value = START_V + (END_V - START_V) * p;
            setV(Math.round(value * 10) / 10);
          },
        });
        cleanup = () => trigger.kill();
      });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          timer = window.setTimeout(begin, 60);
        }
      },
      { rootMargin: '320px 0px' }
    );
    if (wrapRef.current) io.observe(wrapRef.current);

    return () => {
      killed = true;
      io.disconnect();
      if (timer) window.clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []);

  const act = ACTS[actIndex];

  return (
    <section className="volt" id="volt">
      <div className="wrap volt__head">
        <div className="cols shead">
          <div className="shead__num mono">01 / напряжение</div>
          <h2 className="shead__title reveal">Что показывает вольтметр</h2>
          <p className="shead__note body-s reveal">
            Один выезд, три замера: 8,4 В — не крутит, 12,6 В — прикурили, 14,4 В — генератор держит.
            Ниже — то же самое на шкале.
          </p>
        </div>
      </div>

      <div ref={wrapRef} className={pin ? 'volt__pin' : 'volt__pin volt__pin--manual'}>
        <div className="wrap">
          <div className="cols volt__grid">
            <div className="volt__stage">
              <svg className="volt__svg" viewBox="0 0 900 430" role="img" aria-label={`Вольтметр: ${v.toFixed(1)} вольта, ${act.state}`}>
                {/* шкала */}
                <path d={arcPath(-120, 120, r)} fill="none" stroke="rgba(220,230,236,0.42)" strokeWidth="1.6" />
                <path d={arcPath(angleFor(12.2), angleFor(14.8), r)} fill="none" stroke="#e9a13b" strokeWidth="3" opacity={0.25 + 0.75 * ignition} />
                {Array.from({ length: 17 }).map((_, i) => {
                  const value = V_MIN + i * 0.5;
                  const a = angleFor(value);
                  const major = i % 2 === 0;
                  const [x1, y1] = polar(a, r - (major ? 20 : 11));
                  const [x2, y2] = polar(a, r - 2);
                  const [lx, ly] = polar(a, r + 26);
                  return (
                    <g key={value}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(220,230,236,0.7)" strokeWidth={major ? 1.9 : 1.2} />
                      {major && (
                        <text x={lx} y={ly + 4} textAnchor="middle" fontSize="13" fontFamily="var(--f-display)" fontWeight="600" fill="rgba(220,230,236,0.62)">
                          {value % 1 === 0 ? value : value.toFixed(1)}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* стрелка */}
                <g transform={`rotate(${angle} ${cx} ${cy})`}>
                  <line x1={cx} y1={cy} x2={cx} y2={cy - (r - 34)} stroke="#e9a13b" strokeWidth="3" strokeLinecap="round" />
                </g>
                <circle cx={nx} cy={ny} r="3" fill="#f5c06b" opacity={ignition} />
                <circle cx={cx} cy={cy} r="9" fill="none" stroke="#e9a13b" strokeWidth="2" />
                <circle cx={cx} cy={cy} r="3" fill="#e9a13b" />

                <text x={cx} y={cy + 78} textAnchor="middle" fontSize="12" fontFamily="var(--f-display)" letterSpacing="3" fill="rgba(220,230,236,0.55)">
                  ВОЛЬТ
                </text>

                {/* лампы: АКБ / двигатель / заряд */}
                {[
                  { y: 92, label: 'АКБ', on: v > 11.8 },
                  { y: 190, label: 'ДВИГАТЕЛЬ', on: v > 10.4 },
                  { y: 288, label: 'ЗАРЯД', on: v > 13.8 },
                ].map((lamp, i) => (
                  <g key={lamp.label}>
                    <rect x="540" y={lamp.y - 22} width="34" height="34" fill="none" stroke={lamp.on ? '#e9a13b' : 'rgba(220,230,236,0.24)'} strokeWidth="1.4" />
                    <path
                      d={`M ${556} ${lamp.y - 14} l -7 12 h 7 l -4 12 l 10 -14 h -7 z`}
                      fill={lamp.on ? '#e9a13b' : 'rgba(220,230,236,0.22)'}
                    />
                    <text x="592" y={lamp.y + 2} fontSize="13" fontFamily="var(--f-display)" fontWeight="600" letterSpacing="2" fill={lamp.on ? '#dce6ec' : 'rgba(220,230,236,0.34)'}>
                      {lamp.label}
                    </text>
                    <line x1="592" y1={lamp.y + 14} x2={592 + 210 * (i === 2 ? ignition : i === 1 ? clamp((v - 9.4) / 3, 0, 1) : clamp((v - 11) / 2, 0, 1))} y2={lamp.y + 14} stroke="#e9a13b" strokeWidth="2" opacity="0.7" />
                    <line x1="592" y1={lamp.y + 14} x2="802" y2={lamp.y + 14} stroke="rgba(220,230,236,0.12)" strokeWidth="2" />
                  </g>
                ))}

                {/* дорога */}
                <line x1="40" y1="404" x2="860" y2="404" stroke="rgba(220,230,236,0.16)" strokeWidth="1" />
                {Array.from({ length: 14 }).map((_, i) => (
                  <line key={i} x1={60 + i * 58} y1="411" x2={44 + i * 58} y2="419" stroke="rgba(220,230,236,0.1)" strokeWidth="1" />
                ))}
              </svg>
            </div>

            <div className="volt__side">
              <div className="readout">
                <div className="readout__label mono">
                  <span>замер</span>
                  <span>{act.label}</span>
                </div>
                <div className="readout__v num">
                  {v.toFixed(1).replace('.', ',')}
                  <small>В</small>
                </div>
                <p className="readout__state">{act.state}</p>
                <p className="readout__text">{act.text}</p>
              </div>

              <ol className="acts">
                {ACTS.map((a, i) => (
                  <li key={a.v} className={i <= actIndex ? 'is-on' : ''}>
                    <b>{a.v.toFixed(1).replace('.', ',')} В</b>
                    <span>{a.state}</span>
                  </li>
                ))}
              </ol>

              {pin && <p className="volt__hint mono">скролл опускает заряд до 14,4</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

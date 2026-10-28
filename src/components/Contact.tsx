import { useId, useState } from 'react';

const CARS = ['Легковая', 'Грузовая', 'Автобус / микроавтобус', 'Прицеп / спецтехника'];
const JOBS = [
  'Не заводится, не крутит',
  'Прикурить / запустить',
  'Отогрев в мороз',
  'Электрика: проводка, свет, приборка',
  'Аргоновая сварка',
  'Другое',
];

const WA = '375333069977';

type Errors = Partial<Record<'name' | 'phone' | 'place' | 'car' | 'job', string>>;

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [place, setPlace] = useState('');
  const [car, setCar] = useState(CARS[0]);
  const [job, setJob] = useState(JOBS[0]);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const uid = useId();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Как к вам обращаться?';
    if (phone.replace(/\D/g, '').length < 9) next.phone = 'Нужен номер, чтобы перезвонить.';
    if (place.trim().length < 3) next.place = 'Улица, район или километр трассы.';
    setErrors(next);
    if (Object.keys(next).length) return;

    const text = [
      'Вызов автоэлектрика',
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      `Где машина: ${place}`,
      `Машина: ${car}`,
      `Что нужно: ${job}`,
      comment ? `Комментарий: ${comment}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    setSending(true);
    window.setTimeout(() => {
      window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
      setSending(false);
      setSent(true);
    }, 420);
  };

  return (
    <section className="section" id="vyzov">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num mono">06 / вызов</div>
          <h2 className="shead__title reveal">Скажите, где вы и что с машиной</h2>
        </div>

        <div className="cols call__grid">
          <div className="call__left">
            <a className="tel-big num call__tel" href="tel:+375333069977">+375 33 306-99-77</a>
            <p className="call__note body-s">
              Круглосуточно, без выходных. Если не беру трубку — я под машиной: перезвоню на этот номер сам.
            </p>
            <a className="call__wa" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">
              Написать в WhatsApp
            </a>
            <ul className="call__geo">
              <li><b>Гомель</b><span>все районы, круглосуточно</span></li>
              <li><b>Область</b><span>трассы М8, М10, Р30 и районные центры</span></li>
              <li><b>Грузовые</b><span>выезд к фуре и автобусу</span></li>
            </ul>
          </div>

          <div className="call__right">
            {sent ? (
              <p className="note-ok" role="status">
                WhatsApp открыт с готовым текстом вызова — отправьте сообщение, и я увижу адрес и симптомы.
                Если мессенджер не открылся, наберите номер: +375 33 306-99-77.
              </p>
            ) : (
              <form className="request" onSubmit={submit} noValidate>
                <div className="field--half">
                  <div>
                    <label htmlFor={`${uid}-name`}>Имя</label>
                    <input
                      id={`${uid}-name`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Как обращаться"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && <span className="err">{errors.name}</span>}
                  </div>
                  <div>
                    <label htmlFor={`${uid}-phone`}>Телефон</label>
                    <input
                      id={`${uid}-phone`}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+375 __ ___ __ __"
                      inputMode="tel"
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                    />
                    {errors.phone && <span className="err">{errors.phone}</span>}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor={`${uid}-place`}>Где машина</label>
                  <input
                    id={`${uid}-place`}
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="Улица, район, километр трассы"
                    aria-invalid={!!errors.place}
                  />
                  {errors.place && <span className="err">{errors.place}</span>}
                </div>

                <div className="field--half">
                  <div>
                    <label htmlFor={`${uid}-car`}>Машина</label>
                    <select id={`${uid}-car`} value={car} onChange={(e) => setCar(e.target.value)}>
                      {CARS.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`${uid}-job`}>Что нужно</label>
                    <select id={`${uid}-job`} value={job} onChange={(e) => setJob(e.target.value)}>
                      {JOBS.map((j) => <option key={j}>{j}</option>)}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor={`${uid}-comment`}>Что происходит с машиной</label>
                  <textarea
                    id={`${uid}-comment`}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Например: дизель, не схватывает после ночи на улице, −18"
                  />
                </div>

                <button type="submit" className="btn btn--wide" disabled={sending} aria-busy={sending}>
                  {sending ? 'Собираю вызов…' : 'Отправить вызов в WhatsApp'}
                </button>
                <p className="form-small">
                  Текст вызова вы увидите до отправки. Срочно и нет времени заполнять — звоните:
                  <a href="tel:+375333069977" style={{ borderBottom: '1px solid currentColor' }}> +375 33 306-99-77</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

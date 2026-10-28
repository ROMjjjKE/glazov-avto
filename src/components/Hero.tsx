export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="cols hero__grid">
          <div className="hero__left">
            <span className="hero__plate mono">Гомель и Гомельская область · круглосуточно</span>
            <h1>
              Не заводится? <em>Выезжаю</em> круглосуточно
            </h1>
            <p className="lead">
              Автоэлектрик и автомеханик на выезде: прикурить, отогреть в мороз, найти причину и починить
              на месте. Легковые и грузовые, аргоновая сварка.
            </p>
            <div className="hero__actions">
              <div>
                <a className="tel-big num" href="tel:+375333069977">+375 33 306-99-77</a>
                <span className="tel-note body-s">Звонок в любое время. Если не беру — я под машиной, перезвоню сам.</span>
              </div>
              <a className="btn" href="#vyzov">Вызвать сейчас</a>
            </div>
            <div className="hero__specs">
              <div><span className="mono">Режим</span><b>24/7, без выходных</b></div>
              <div><span className="mono">Выезд</span><b>Гомель и область</b></div>
              <div><span className="mono">Машины</span><b>легковые, грузовые</b></div>
              <div><span className="mono">Зимой</span><b>отогрев в морозы</b></div>
            </div>
          </div>

          <aside className="hero__right reveal" aria-label="Что беру в выезд">
            <div className="duty">
              <div className="duty__time num">24/7</div>
              <p className="duty__cap body-s">
                Ночь, выходные, мороз — выезд не отменяется. В машине бустер, провода 12 и 24 В, инструмент,
                тепловая пушка для отогрева.
              </p>
              <ul className="duty__list">
                <li><b>Прикурить</b><span>12 / 24 В</span></li>
                <li><b>Отогрев</b><span>дизель, бензин</span></li>
                <li><b>Диагностика</b><span>АКБ, стартер, генератор</span></li>
                <li><b>Сварка</b><span>аргон, алюминий</span></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

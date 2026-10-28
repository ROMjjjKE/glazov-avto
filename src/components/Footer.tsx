export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div className="ftr__brand">
            <div className="ftr__name">Глазов Е.А.</div>
            <p className="ftr__cap">
              Выездная диагностика и ремонт авто. Гомель и Гомельская область. Круглосуточно.
            </p>
          </div>
          <div className="ftr__col">
            <span className="mono">Связь</span>
            <a href="tel:+375333069977">+375 33 306-99-77</a><br />
            <a href="https://wa.me/375333069977" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
          <div className="ftr__col">
            <span className="mono">Зона</span>
            <a href="#vyzov">Гомель</a><br />
            <a href="#vyzov">Гомельская область</a>
          </div>
          <div className="ftr__col">
            <span className="mono">Режим</span>
            <a href="#vyzov">Круглосуточно, 24/7</a><br />
            <a href="#moroz">Отогрев в морозы</a>
          </div>
          <p className="ftr__legal">
            Информация на сайте не является публичной офертой: стоимость и сроки называются по телефону до
            выезда. Фотографии и отзывы клиентов не публикуются без их согласия.
          </p>
        </div>
      </div>
    </footer>
  );
}

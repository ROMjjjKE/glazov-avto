export default function Winter() {
  return (
    <section className="section" id="moroz">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num mono">04 / мороз</div>
          <h2 className="shead__title reveal">Отогрев вместо эвакуации</h2>
          <p className="shead__note body-s reveal">
            В −25 эвакуатор стоит денег и часа ожидания. Чаще дешевле отогреть на месте и уехать своим ходом.
          </p>
        </div>
        <div className="cols">
          <div className="winter">
            <div className="frost reveal">
              <h3>Дизель не схватывает</h3>
              <p>Летняя солярка и парафин в фильтре: <b>отогрев топливной</b>, замена фильтра, прокачка магистрали.</p>
            </div>
            <div className="frost reveal">
              <h3>Аккумулятор «сдался»</h3>
              <p>На морозе ёмкость падает почти вдвое. Заряженный старый АКБ всё равно не крутит — <b>замер под нагрузкой</b> покажет это за минуту.</p>
            </div>
            <div className="frost reveal">
              <h3>Замёрзли замки и стёкла</h3>
              <p>Отогрев без кипятка и ломика: <b>тёплый воздух</b> и разморозка, чтобы не треснуло стекло и не сорвать личинку.</p>
            </div>
            <p className="winter__note">
              Мороз не меняет порядок выезда: сначала звонок, адрес и симптомы, потом дорога. Если понимаю, что
              на месте не отогреть — скажу по телефону, не заставляя ждать на холоде.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

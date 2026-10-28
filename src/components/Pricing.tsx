const ROWS = [
  { title: 'Выезд', tag: 'по адресу' },
  { title: 'Работа', tag: 'по факту' },
  { title: 'Материалы', tag: 'отдельно' },
  { title: 'Грузовые', tag: 'дороже легковых' },
];

export default function Pricing() {
  return (
    <section className="section section--light" id="cena">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num mono">05 / цена</div>
          <h2 className="shead__title reveal">Как складывается сумма</h2>
          <p className="shead__note body-s reveal">
            Прайс-листа нет намеренно: одна и та же неисправность на легковой и на дизельном тягаче стоит
            по-разному.
          </p>
        </div>
        <div className="cols">
          <div className="price">
            {ROWS.map((r) => (
              <div className="price__row reveal" key={r.title}>
                <h3>{r.title}</h3>
                <span>{r.tag}</span>
              </div>
            ))}
            <p className="price__note">
              Точную сумму называю до выезда — после трёх вопросов: что с машиной, где она стоит и как к ней
              подъехать. Если по телефону понятно, что дело не в электрике, скажу это сразу и денег за
              диагностику не возьму.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

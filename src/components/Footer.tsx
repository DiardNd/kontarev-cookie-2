function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <p className="footer-title">Контакты</p>
        <div className="footer-contacts">
          <a
            href="https://maps.google.com/?q=г. Азов ул. Красногоровская 4"
            target="_blank"
            rel="noopener noreferrer">
            Адрес: г. Азов ул. Красногоровская 4,
          </a>

          <a
            href="https://maps.google.com/?q=с. Пешково ул. Строителей 12а"
            target="_blank"
            rel="noopener noreferrer">
            с. Пешково ул. Строителей 12а
          </a>

          <a href="tel:+7 (86342) 6-59-49">Телефон: +7 (86342) 6-59-49</a>
          <a href="mailto:Aksenov.uspex@yandex.ru">Email: Aksenov.uspex@yandex.ru</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

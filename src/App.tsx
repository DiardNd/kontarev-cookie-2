import { useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';

type DocumentItem = {
  id: string;
  title: string;
  description: string;
  archivePath: string;
  fileName: string;
};

const documents: DocumentItem[] = [
  {
    id: 'candies',
    title: 'Прайс',
    description: '',
    archivePath: '/kontarev-cookie-clean/archives/price.pdf',
    fileName: 'price.pdf'
  },
  {
    id: 'glazing',
    title: 'Каталог',
    description: '',
    archivePath: '/kontarev-cookie-clean/archives/catalog.pdf',
    fileName: 'catalog.pdf'
  }
  // Надо сделать другие пути к pdf. Разобраться с шириной дивов, заменить название вкладки.
  //   {
  //     id: 'cakes-pies-rolls',
  //     title: 'Пирожные, пироги, рулеты',
  //     description: 'Мягкое тесто, сочная начинка и тот самый домашний вкус.',
  //     archivePath: '/kontarev-cookie-clean/archives/cakes-pies-rolls.zip',
  //     fileName: 'cakes-pies-rolls.zip'
  //   },
  //   {
  //     id: 'gingerbread',
  //     title: 'Пряники',
  //     description: 'Аромат специй и уют в каждом укусе.',
  //     archivePath: '/kontarev-cookie-clean/archives/gingerbread.zip',
  //     fileName: 'gingerbread.zip'
  //   },
  //   {
  //     id: 'sugar-cookies',
  //     title: 'Сахарное печенье',
  //     description: 'Легкий хруст, сливочная сладость и идеальная пара к чаю.',
  //     archivePath: '/kontarev-cookie-clean/archives/sugar-cookies.zip',
  //     fileName: 'sugar-cookies.zip'
  //   },
  //   {
  //     id: 'sweet-pastry',
  //     title: 'Сдобное',
  //     description: 'Пышное, румяное и только из печи.',
  //     archivePath: '/kontarev-cookie-clean/archives/sweet-pastry.zip',
  //     fileName: 'sweet-pastry.zip'
  //   },
  //   {
  //     id: 'puff-pastry',
  //     title: 'Слойка',
  //     description: 'Воздушные слои и аппетитный хруст с первого укуса.',
  //     archivePath: '/kontarev-cookie-clean/archives/puff-pastry.zip',
  //     fileName: 'puff-pastry.zip'
  //   },
  //   {
  //     id: 'sandwiches',
  //     title: 'Сэндвич',
  //     description: 'Сытный перекус, который хочется повторить еще раз.',
  //     archivePath: '/kontarev-cookie-clean/archives/sandwiches.zip',
  //     fileName: 'sandwiches.zip'
  //   }
];

function App() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (documentItem: DocumentItem) => {
    try {
      setLoadingId(documentItem.id);
      setError(null);

      const response = await fetch(documentItem.archivePath);
      if (!response.ok) {
        throw new Error(`Не удалось загрузить файл: ${response.status}`);
      }

      const fileBlob = await response.blob();
      const objectUrl = URL.createObjectURL(fileBlob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = documentItem.fileName;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      setError('Ошибка загрузки. Проверьте, что архивы есть в папке public/archives.');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      <Header />

      <main className="landing">
        <section id="home" className="hero">
          <p className="eyebrow">Кондитерские изделия Аксенова</p>
          <h1>Домашние кексы для любого события</h1>
          <p className="lead">
            Нежные кексы ручной работы, печенье, пирожные, пряники из натуральных ингриндиентов.
          </p>
        </section>

        <section id="products">
          <h2 className="section-title">Продукция</h2>
          <div className="documents">
            {documents.map((documentItem) => (
              <article key={documentItem.id} className="document-card">
                <h3>{documentItem.title}</h3>
                <p>{documentItem.description}</p>
                <button
                  type="button"
                  onClick={() => handleDownload(documentItem)}
                  disabled={loadingId === documentItem.id}>
                  {loadingId === documentItem.id ? 'Загрузка...' : 'Скачать'}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="about">
          <h2 className="section-title">О нас</h2>
          <p>
            Всё начинается с простого — желания делать вкусное печенье, к которому хочется
            возвращаться. С 1996 года мы развиваем производство, сохраняя главное: внимание к
            качеству и деталям. Мы создаём более 100 видов печенья — от классических рецептов до
            современных вкусов. Каждое изделие проходит через контроль на всех этапах производства,
            чтобы сохранить стабильный вкус и качество. Мы выбираем качественное сырьё и работаем
            только с надёжными поставщиками. Это позволяет нам быть уверенными в каждом продукте,
            который попадает к нашим клиентам. Сегодня нам доверяют партнёры из разных регионов, и
            мы продолжаем развиваться, расширяя ассортимент и совершенствуя производство.
          </p>
        </section>

        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;

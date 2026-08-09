"use client";
import React, { useState } from 'react';
import { Poiret_One, Inter } from 'next/font/google';

const poiret = Poiret_One({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function PremiumLandingPage() {
  const whatsappLink = "https://chat.whatsapp.com/HhezTjiTNenL14YwoOpk0J";

  const [selectedBook, setSelectedBook] = useState<null | any>(null);

  // Función de checkout para Mercado Pago
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: 'ingresso' })
      });
      
      const data = await response.json();
      
      // Redirige al ambiente seguro de Mercado Pago
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error("Error en checkout", error);
    }
  };

  const books = [
    { 
      title: "A arte de ler", 
      author: "Émile Faguet", 
      cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4EXMS42yQPY9rKIK6xypLQKrFE49y76c8abCAvR0J7A&s=10",
      reason: "Fundamental para transformar a leitura passiva em uma exploração ativa. Faguet nos ensina a degustar as palavras e a ler com o ritmo que as grandes obras exigem.",
      buyLink: "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwjVqPuioZKWAxXKlJUCHR3WB-EQFnoECCQQAQ&url=https%3A%2F%2Fwww.amazon.com.br%2FArte-ler-%25C3%2589mile-Faguet%2Fdp%2F658740412X&usg=AOvVaw3xfAnfw7T4VnIJfFb7nofk&opi=89978449"
    },
    { 
      title: "Lá é o tempo", 
      author: "Maria Fernanda Maglio", 
      cover: "https://m.media-amazon.com/images/I/814BCD1qfFL.jpg",
      reason: "Uma prosa poética e contundente que desafia nossa percepção de pertencimento, memória e dor. Uma leitura que ecoa por muito tempo após o ponto final.",
      buyLink: "https://todavialivros.com.br/livros/la-e-o-tempo"
    },
    { 
      title: "Pitangas Verdes", 
      author: "Mariana Lobato Botter", 
      cover: "https://m.media-amazon.com/images/I/81OOzTANgBL._AC_UF1000,1000_QL80_.jpg",
      reason: "Um mergulho visceral nas dinâmicas familiares. A força narrativa das vozes femininas nesta obra é um estudo de caso perfeito para quem busca personagens complexas.",
      buyLink: "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiut47FoZKWAxUOrJUCHS2nPXcQFnoECCEQAQ&url=https%3A%2F%2Fwww.amazon.com.br%2FPitangas-verdes-Mariana-Lobato-Botter%2Fdp%2F6550440769&usg=AOvVaw1ECfpCe1v8rOFDXE3pYcAE&opi=89978449"
    },
    { 
      title: "A cidade das gaivotas", 
      author: "Sabuat Urbina Ribeiro", 
      cover: "/images/gaivotas.png",
      reason: "Uma imersão na complexidade urbana e nas relações humanas. Essencial para entender como os espaços que habitamos moldam nossos silêncios e conexões.",
      buyLink: "https://www.editoraminimalismos.com/product-page/a-cidade-das-gaivotas-de-sabuat-urbina-ribeiro"
    },
    { 
      title: "Ressuscitar mamutes", 
      author: "Silvana Tavano", 
      cover: "https://m.media-amazon.com/images/I/81eYTG+0x0L._AC_UF1000,1000_QL80_.jpg",
      reason: "Uma obra instigante que mapeia o luto e o esforço monumental que fazemos para manter o passado vivo. Uma leitura sensível e impecável.",
      buyLink: "https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwiuvfjvoZKWAxVpq5UCHcUuOqIQFnoECBoQAQ&url=https%3A%2F%2Fwww.amazon.com.br%2FRessuscitar-mamutes-Silvana-Tavano%2Fdp%2F6559284034&usg=AOvVaw03QMuThMXIe8AXg0EM2BWV&opi=89978449"
    },
    { 
      title: "A sagração da matéria", 
      author: "Sihan Felix", 
      cover: "/images/materia.png",
      reason: "Um ensaio narrativo que nos obriga a parar e repensar nossa conexão com o tangível, a rotina e a espiritualidade escondida no cotidiano.",
      buyLink: "https://www.editoraminimalismos.com/product-page/a-sagra%C3%A7%C3%A3o-da-mat%C3%A9ria-de-sihan-felix"
    },
    { 
      title: "A palavra que resta", 
      author: "Stênio Gardel", 
      cover: "https://m.media-amazon.com/images/I/814ChnoRCFL.jpg",
      reason: "Um testamento poderoso sobre o letramento tardio. Uma jornada de libertação através das palavras e da aceitação da própria história.",
      buyLink: "https://www.amazon.com.br/palavra-que-resta-St%C3%AAnio-Gardel/dp/6559210286"
    },
    { 
      title: "Nadando no escuro", 
      author: "Tomasz Jedrowski", 
      cover: "https://m.media-amazon.com/images/I/7157nJy-mIL.jpg",
      reason: "Uma narrativa sensível e política sobre descoberta e sobrevivência em tempos de opressão. Um romance brutalmente belo sobre o despertar.",
      buyLink: "https://www.amazon.com.br/Nadando-no-escuro-Tomasz-Jedrowski/dp/6555664878"
    }
  ];

  return (
    <div className={`min-h-screen bg-[#F7F5F0] text-stone-900 ${inter.className}`}>
      
      {/* Modal de Livro */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm">
          <div className="bg-[#F7F5F0] w-full max-w-2xl flex flex-col md:flex-row rounded-sm overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 text-xl font-light"
            >
              ✕
            </button>
            <div className="md:w-1/2 bg-stone-800 hidden md:block">
              <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <h3 className={`text-3xl mb-2 text-stone-800 ${poiret.className}`}>{selectedBook.title}</h3>
              <p className="text-sm uppercase tracking-widest text-stone-500 mb-6">{selectedBook.author}</p>
              <p className="text-stone-700 font-light leading-relaxed mb-8 text-sm">
                {selectedBook.reason}
              </p>
              <a 
                href={selectedBook.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#c8aa77] text-white text-center px-6 py-3 rounded-sm uppercase tracking-widest text-xs font-medium hover:bg-[#b0925f] transition-all"
              >
                Comprar Livro
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <header className="relative w-full h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTMxMTY5ODcxMTMyODgzNjI2/original/3bd6b47b-718c-4ae2-839c-c4a7fe2cdc86.jpeg?im_w=1440" 
            alt="Casa em São Paulo" 
            className="w-full h-full object-cover brightness-30"
          />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mt-16">
          <p className="text-stone-300 tracking-[0.3em] font-bold uppercase text-sm mb-4">16 a 18 de Outubro • Apenas 16 vagas</p>
          <h1 className={`text-6xl md:text-8xl text-white mb-6 tracking-wide ${poiret.className}`}>
            Oásis Literário SP
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 font-light mb-12 max-w-2xl mx-auto">
            Na urgência da cidade, o verdadeiro luxo é o tempo. Um refúgio urbano desenhado exclusivamente para leitoras.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button 
              onClick={handleCheckout}
              className="bg-[#c8aa77] text-white px-8 py-4 rounded-sm text-sm uppercase tracking-widest font-medium hover:bg-[#b0925f] transition-all"
            >
              Garantir minha vaga (Pix / Cartão)
            </button>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-8 py-4 rounded-sm text-sm uppercase tracking-widest font-medium hover:bg-white hover:text-stone-900 transition-all"
            >
              Entrar no Grupo VIP
            </a>
          </div>
        </div>
      </header>

      {/* O Refúgio & Por que participar */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center">
        <h2 className={`text-4xl text-stone-800 mb-8 ${poiret.className}`}>Por que um Retiro Literário?</h2>
        <div className="space-y-6 text-lg text-stone-600 font-light leading-relaxed">
          <p>
            Lemos no metrô, na fila do banco, nos raros quinze minutos antes de dormir. A vida moderna fragmentou nossa capacidade de imersão profunda. O <strong>Oásis Literário</strong> nasce como um antídoto contra a dispersão.
          </p>
          <p>
            Não é necessário viajar horas para longe da capital. Encontramos um refúgio arquitetônico no coração de São Paulo. Paredes de vidro, madeira, silêncio e o isolamento perfeito para você cruzar a porta e deixar o caos do lado de fora.
          </p>
          <p>
            São três dias onde sua única responsabilidade será escolher a próxima página. Sem notificações, sem urgências. Apenas o convívio com mulheres que compartilham da mesma paixão e o encontro ininterrupto com as palavras.
          </p>
        </div>
      </section>

      {/* A Experiência e O Espaço */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[650px] w-full rounded-sm overflow-hidden shadow-xl">
          <img 
            src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTMxMTY5ODcxMTMyODgzNjI2/original/da72bab6-b6e2-46df-9018-281566d541a6.jpeg?im_w=1440" 
            alt="Interior da casa" 
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h2 className={`text-4xl text-stone-800 mb-12 ${poiret.className}`}>A Experiência All-Inclusive</h2>
          
          <ul className="space-y-10">
            <li className="flex items-start">
              <span className={`text-2xl text-[#c8aa77] mr-6 mt-1 ${poiret.className}`}>01.</span>
              <div>
                <h3 className="text-xl font-medium text-stone-800 mb-2 tracking-wide uppercase text-sm">Sprints de Leitura Guiada</h3>
                <p className="text-stone-600 font-light leading-relaxed">Blocos de silêncio absoluto curados com iluminação correta e chá quente, projetados para induzir o estado de "flow" na leitura.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className={`text-2xl text-[#c8aa77] mr-6 mt-1 ${poiret.className}`}>02.</span>
              <div>
                <h3 className="text-xl font-medium text-stone-800 mb-2 tracking-wide uppercase text-sm">Gastronomia & Wine Nights</h3>
                <p className="text-stone-600 font-light leading-relaxed">Pausas acolhedoras com comfort food, noites de massas artesanais e degustação de vinhos para embalar os debates literários noturnos.</p>
              </div>
            </li>
            <li className="flex items-start">
              <span className={`text-2xl text-[#c8aa77] mr-6 mt-1 ${poiret.className}`}>03.</span>
              <div>
                <h3 className="text-xl font-medium text-stone-800 mb-2 tracking-wide uppercase text-sm">Masterclasses Exclusivas</h3>
                <p className="text-stone-600 font-light leading-relaxed">Acesso aos bastidores da escrita e do mercado editorial digital. Descubra como histórias são arquitetadas, desde o rascunho até a publicação.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Welcome Kit */}
      <section className="py-20 px-6 bg-[#eae7de]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl text-stone-800 mb-6 ${poiret.className}`}>O Welcome Kit</h2>
          <p className="text-lg text-stone-600 font-light leading-relaxed mb-10">
            Acreditamos que a estética faz parte do ritual de leitura. Ao cruzar a porta do nosso retiro, cada leitora será recebida com um kit pensado para acompanhar sua jornada no fim de semana e além.
          </p>
        </div>
      </section>

      {/* Pílulas Literárias */}
      <section className="py-24 px-6 bg-[#2a3426] text-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-5xl mb-6 ${poiret.className}`}>Pílulas Literárias</h2>
            <p className="text-lg text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
              Durante o retiro, conduziremos micro-palestras de 20 minutos focadas em obras essenciais. Clique nas capas para explorar a curadoria.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {books.map((book, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => setSelectedBook(book)}
              >
                <div className="w-48 h-72 mb-5 overflow-hidden rounded-sm shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 bg-stone-800 relative">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10"></div>
                  <img 
                    src={book.cover} 
                    alt={`Capa do livro ${book.title}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-center font-medium text-[#c8aa77] px-2">{book.title}</h3>
                <p className="text-xs text-stone-400 mt-2 uppercase tracking-wider">{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O Anfitrião */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center border-b border-stone-200">
        <h2 className={`text-5xl text-stone-800 mb-12 ${poiret.className}`}>O Anfitrião</h2>
        <div className="w-28 h-28 bg-stone-300 rounded-full mx-auto mb-6 overflow-hidden">
           <div className="w-full h-full bg-[#c8aa77] flex items-center justify-center text-white text-4xl font-light">S</div>
        </div>
        <h3 className="text-2xl font-medium mb-4 text-stone-800 tracking-wide">Sabuat Urbina Ribeiro</h3>
        <p className="text-lg text-stone-600 leading-relaxed font-light mb-8 max-w-3xl mx-auto">
          Como autor e engenheiro de plataformas para publicação digital, entende que as histórias só ganham vida verdadeira quando encontram ressonância. Com vasta experiência no ecossistema de publicações digitais, guia este encontro com a premissa de que a tecnologia deve facilitar, e não roubar, nossa capacidade humana de imersão.
        </p>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6 bg-[#F7F5F0] text-center">
        <h2 className={`text-5xl text-stone-900 mb-6 ${poiret.className}`}>Pronta para a imersão?</h2>
        <p className="mb-12 text-stone-500 text-lg font-light tracking-wide">As portas do nosso Oásis fecham ao atingirmos 16 vagas.</p>
        <button 
          onClick={handleCheckout}
          className="inline-block bg-stone-900 text-stone-50 px-12 py-5 rounded-sm uppercase tracking-widest font-medium text-sm hover:bg-stone-800 transition-all shadow-xl hover:shadow-2xl"
        >
          Comprar Passaporte (Pix / Cartão)
        </button>
      </section>

    </div>
  );
}
"use client";
import React, { useState } from 'react';
import { Poiret_One, Inter } from 'next/font/google';

const poiret = Poiret_One({ weight: '400', subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export default function PremiumLandingPage() {
  const whatsappLink = "https://chat.whatsapp.com/HhezTjiTNenL14YwoOpk0J";

  const [selectedBook, setSelectedBook] = useState<null | any>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  
  // Estado para el Checkout
  const [formData, setFormData] = useState({ nome: '', telefone: '', email: '', canal: '' });
  
  // Estado para la Lista de Espera (AQUÍ ESTÁN LOS 4 DATOS CORREGIDOS)
  const [waitlistData, setWaitlistData] = useState({ nome: '', telefone: '', email: '', dataFutura: '' });

  // SIMULACIÓN: Cambia este número para probar los estados
  const vagasVendidas = 0; 
  const precoAtual = vagasVendidas < 10 ? "R$ 800,00" : "R$ 1.000,00";
  const esgotado = vagasVendidas >= 20;

  // Manejador del formulario de Pre-Pago
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 1. Enviar datos al webhook (para n8n -> Google Sheets / WhatsApp)
      await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'novo_checkout', ...formData })
      });

      // 2. Llamada a Mercado Pago
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item: 'ingresso', preco: precoAtual, cliente: formData })
      });
      
      const data = await response.json();
      
      if (data.init_point) {
        window.location.href = data.init_point;
      }
    } catch (error) {
      console.error("Error en checkout", error);
    }
  };

  // Manejador de la Lista de Espera (CORREGIDO PARA MANDAR LOS 4 DATOS)
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Esto envía: type, nome, telefone, email, dataFutura
        body: JSON.stringify({ type: 'lista_espera', ...waitlistData })
      });
      alert("Interesse registrado com sucesso! Entraremos em contato.");
      // Limpia el formulario después de enviar
      setWaitlistData({ nome: '', telefone: '', email: '', dataFutura: '' });
    } catch (error) {
      console.error("Error salvando lista de espera", error);
    }
  };

  const books = [
    { 
      title: "Você me espera para morrer", 
      author: "Maria Fernanada Maglio", 
      cover: "https://m.media-amazon.com/images/I/A1EMMEPSL9L._UF1000,1000_QL80_.jpg",
      reason: "Uma narrativa envolvente que nos confronta com os limites da mortalidade e o peso das escolhas não feitas. Essencial para o nosso debate.",
      buyLink: "https://www.amazon.com.br/Você-me-espera-para-morrer-ebook/dp/B0DF9G9LNP"
    },
    { 
      title: "Açúcar queimado", 
      author: "Avni Doshi", 
      cover: "https://m.media-amazon.com/images/I/91VhageLVlL.jpg",
      reason: "Uma exploração afiada e desconfortável sobre os laços entre mãe e filha. Um retrato visceral sobre memória, ressentimento e amor.",
      buyLink: "https://www.amazon.com.br/Açúcar-queimado-Avni-Doshi/dp/6555530286"
    },
    { 
      title: "Pitangas Verdes", 
      author: "Mariana Lobato Botter", 
      cover: "https://m.media-amazon.com/images/I/81OOzTANgBL._AC_UF1000,1000_QL80_.jpg",
      reason: "Um mergulho visceral nas dinâmicas familiares. A força narrativa das vozes femininas nesta obra é um estudo de caso perfeito para quem busca personagens complexas.",
      buyLink: "#"
    },
    { 
      title: "A cidade das gaivotas", 
      author: "Sabuat Urbina Ribeiro", 
      cover: "/images/gaivotas.png",
      reason: "Uma imersão na complexidade urbana e nas relações humanas. Essencial para entender como os espaços que habitamos moldam nossos silêncios e conexões.",
      buyLink: "https://www.editoraminimalismos.com/product-page/a-cidade-das-gaivotas-de-sabuat-urbina-ribeiro"
    },
    { 
      title: "Voltar a Quando", 
      author: "María Elena Morán ", 
      cover: "https://m.media-amazon.com/images/I/715N4F4mpYL._AC_UF1000,1000_QL80_.jpg",
      reason: "Uma reflexão literária poderosa sobre o tempo, os retornos impossíveis e a reconstrução de si mesmo através da memória.",
      buyLink: "https://www.amazon.com.br/Voltar-quando-María-Elena-Morán/dp/6558302373"
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
      
      {/* Modal de Detalhes do Livro */}
      {selectedBook && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/80 backdrop-blur-sm">
          <div className="bg-[#F7F5F0] w-full max-w-2xl flex flex-col md:flex-row rounded-sm overflow-hidden shadow-2xl relative">
            <button onClick={() => setSelectedBook(null)} className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 text-xl font-light">✕</button>
            <div className="md:w-1/2 bg-stone-800 hidden md:block">
              <img src={selectedBook.cover} alt={selectedBook.title} className="w-full h-full object-cover" />
            </div>
            <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
              <h3 className={`text-3xl mb-2 text-stone-800 ${poiret.className}`}>{selectedBook.title}</h3>
              <p className="text-sm uppercase tracking-widest text-stone-500 mb-6">{selectedBook.author}</p>
              <p className="text-stone-700 font-light leading-relaxed mb-8 text-sm">{selectedBook.reason}</p>
              <a href={selectedBook.buyLink} target="_blank" rel="noopener noreferrer" className="bg-[#c8aa77] text-white text-center px-6 py-3 rounded-sm uppercase tracking-widest text-xs font-medium hover:bg-[#b0925f] transition-all">
                Comprar Livro
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Inscrição e Pagamento */}
      {isCheckoutModalOpen && !esgotado && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-stone-900/90 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#F7F5F0] w-full max-w-md p-8 rounded-sm shadow-2xl relative mt-10 md:mt-0">
            <button onClick={() => setIsCheckoutModalOpen(false)} className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 text-xl font-light">✕</button>
            <h3 className={`text-3xl mb-2 text-stone-800 ${poiret.className}`}>Garantir Vaga</h3>
            <p className="text-sm text-stone-600 font-light mb-6">Faltam poucos passos para sua imersão. Valor atual: <strong className="text-stone-900">{precoAtual}</strong>.</p>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1">Nome Completo</label>
                <input required type="text" className="w-full p-3 border border-stone-300 rounded-sm bg-transparent" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1">Telefone (WhatsApp)</label>
                <input required type="tel" className="w-full p-3 border border-stone-300 rounded-sm bg-transparent" value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1">E-mail</label>
                <input required type="email" className="w-full p-3 border border-stone-300 rounded-sm bg-transparent" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1">Como ficou sabendo do retiro?</label>
                <select required className="w-full p-3 border border-stone-300 rounded-sm bg-transparent text-stone-700" value={formData.canal} onChange={e => setFormData({...formData, canal: e.target.value})}>
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="amigas">Indicação de Amigas</option>
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="web">Pesquisa na Web</option>
                </select>
              </div>
              
              <div className="bg-stone-200 p-4 rounded-sm mt-4 border-l-2 border-[#c8aa77]">
                <p className="text-xs text-stone-700 font-light">
                  <strong>Aviso:</strong> Após a confirmação da inscrição, enviaremos para o seu e-mail um formulário específico sobre restrições alimentares e outras indicações importantes para o evento.
                </p>
              </div>

              <button type="submit" className="w-full bg-[#c8aa77] text-white mt-6 px-6 py-4 rounded-sm uppercase tracking-widest text-sm font-medium hover:bg-[#b0925f] transition-all">
                Pagar com Mercado Pago
              </button>
            </form>
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
          <p className="text-stone-300 tracking-[0.3em] font-bold uppercase text-sm mb-4">16 a 18 de Outubro • Apenas 20 vagas</p>
          <h1 className={`text-6xl md:text-8xl text-white mb-6 tracking-wide ${poiret.className}`}>
            Oásis Literário SP
          </h1>
          <p className="text-xl md:text-2xl text-stone-200 font-light mb-12 max-w-2xl mx-auto">
            Um refúgio para finalmente por a sua leitura em dia. Uma experiência íntima com direito a noites de conversa, vinho, boa comida e mimos durante a sua estadia.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {!esgotado ? (
              <button 
                onClick={() => setIsCheckoutModalOpen(true)}
                className="bg-[#c8aa77] text-white px-8 py-4 rounded-sm text-sm uppercase tracking-widest font-medium hover:bg-[#b0925f] transition-all"
              >
                Garantir minha vaga (Pix / Cartão)
              </button>
            ) : (
              <a href="#lista-espera" className="bg-stone-800 border border-stone-500 text-stone-300 px-8 py-4 rounded-sm text-sm uppercase tracking-widest font-medium hover:bg-stone-700 transition-all">
                Vagas Esgotadas - Lista de Espera
              </a>
            )}
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
          <p>Lemos no metrô, na fila do banco, nos raros quinze minutos antes de dormir. A vida moderna fragmentou nossa capacidade de imersão profunda. O <strong>Oásis Literário</strong> nasce como um antídoto contra a dispersão.</p>
          <p>Não é necessário viajar horas para longe da capital. Encontramos um refúgio arquitetônico no coração de São Paulo. Paredes de vidro, madeira, silêncio e o isolamento perfeito para você cruzar a porta e deixar o caos do lado de fora.</p>
          <p>São três dias onde sua única responsabilidade será escolher a próxima página. Sem notificações, sem urgências. Apenas o convívio com mulheres que compartilham da mesma paixão e o encontro ininterrupto com as palavras.</p>
        </div>
      </section>

      {/* A Experiência e O Espaço */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div className="relative h-[650px] w-full rounded-sm overflow-hidden shadow-xl">
          <img src="https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6OTMxMTY5ODcxMTMyODgzNjI2/original/da72bab6-b6e2-46df-9018-281566d541a6.jpeg?im_w=1440" alt="Interior da casa" className="w-full h-full object-cover" />
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
                <p className="text-stone-600 font-light leading-relaxed">Pausas acolhedoras com comfort food, noites de massas artesanais e vinhos para embalar os debates literários noturnos.</p>
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
          <p className="text-lg text-stone-600 font-light leading-relaxed mb-8">
            Acreditamos que a estética faz parte do ritual de leitura. Ao cruzar a porta do Oásis, você será recebida com um kit exclusivo, pensado para acompanhar sua jornada durante o fim de semana e muito além dele.
          </p>
          <div className="max-w-2xl mx-auto bg-[#F7F5F0] p-6 rounded-sm shadow-sm border border-stone-200 mb-10">
            <p className="text-stone-700 font-medium mb-3 uppercase tracking-widest text-sm">O que te espera:</p>
            <p className="text-stone-600 font-light leading-relaxed italic">
              Uma ecobag de edição limitada do retiro, um livro surpresa, fichas de leituras, marcadores de página exclusivos... e muito mais surpresas.
            </p>
          </div>
          <button 
            onClick={() => setIsCheckoutModalOpen(true)} 
            className="inline-block border-2 border-stone-800 text-stone-800 px-8 py-3 rounded-sm uppercase tracking-widest text-sm font-medium hover:bg-stone-800 hover:text-[#eae7de] transition-all"
          >
            Garantir minha vaga e meu kit
          </button>
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
              <div key={index} className="flex flex-col items-center group cursor-pointer" onClick={() => setSelectedBook(book)}>
                <div className="w-48 h-72 mb-5 overflow-hidden rounded-sm shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 bg-stone-800 relative">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 z-10"></div>
                  <img src={book.cover} alt={`Capa do livro ${book.title}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <h3 className="text-center font-medium text-[#c8aa77] px-2">{book.title}</h3>
                <p className="text-xs text-stone-400 mt-2 uppercase tracking-wider">{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A Anfitriã */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center border-b border-stone-200">
        <h2 className={`text-5xl text-stone-800 mb-12 ${poiret.className}`}>A Anfitriã</h2>
        <div className="w-32 h-32 bg-stone-300 rounded-full mx-auto mb-6 overflow-hidden relative shadow-lg">
           <img src="/images/host.jpeg" alt="Gabriele Motta" className="w-full h-full object-cover" />
        </div>
        <h3 className="text-2xl font-medium mb-4 text-stone-800 tracking-wide">Gabriele Motta</h3>
        <div className="text-lg text-stone-600 leading-relaxed font-light mb-8 max-w-3xl mx-auto">
          <p>Formada em <b>Artes Cênicas pela UNICAMP</b>, e atua como <i>atriz, dubladora, produtora cultural, educadora e curadora</i>. <b>Co-fundou a Suculenta Cia.</b>, onde realizou a pesquisa em fotoperformance intitulada <i>“Série: Eu daria um bom vaso?”</i>.</p>
          <br></br>
          <p>Com a companhia, já em 2022, foi <b>contemplada pelo edital do Proac Artistas Iniciantes</b>, para o desenvolvimento de um curta-metragem livremente inspirado na obra "Cartas a uma senhorita em Paris" de Cortázar, intitulado <i>"Como vomitar um coelhinho"</i>. É também <b>autora do livro "Tutano da Palavra", publicado pela Editora Pitanga</b>, 2026.</p>
        </div>
      </section>

      {/* CTA Final ou Formulário de Espera */}
      <section id="lista-espera" className="py-32 px-6 bg-[#F7F5F0] text-center">
        {!esgotado ? (
          <>
            <h2 className={`text-5xl text-stone-900 mb-6 ${poiret.className}`}>Pronta para a imersão?</h2>
            <p className="mb-12 text-stone-500 text-lg font-light tracking-wide">As portas do nosso Oásis fecham ao atingirmos 20 vagas.</p>
            <button 
              onClick={() => setIsCheckoutModalOpen(true)}
              className="inline-block bg-stone-900 text-stone-50 px-12 py-5 rounded-sm uppercase tracking-widest font-medium text-sm hover:bg-stone-800 transition-all shadow-xl hover:shadow-2xl"
            >
              Comprar Passaporte (Pix / Cartão)
            </button>
          </>
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-10 rounded-sm shadow-lg border-t-4 border-[#c8aa77]">
            <h2 className={`text-4xl text-stone-900 mb-4 ${poiret.className}`}>Vagas Esgotadas!</h2>
            <p className="text-stone-600 mb-8 font-light">Nosso retiro alcançou o limite de 20 leitoras. Preencha o formulário abaixo para registrar seu interesse nos próximos eventos e votar na melhor data.</p>
            
            {/* FORMULARIO DE LISTA DE ESPERA CORREGIDO */}
            <form className="space-y-6 text-left" onSubmit={handleWaitlistSubmit}>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1">Nome Completo</label>
                <input 
                  required 
                  type="text" 
                  className="w-full p-3 border border-stone-300 rounded-sm bg-stone-50" 
                  placeholder="Seu nome" 
                  value={waitlistData.nome}
                  onChange={e => setWaitlistData({...waitlistData, nome: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1">Telefone (WhatsApp)</label>
                <input 
                  required 
                  type="tel" 
                  className="w-full p-3 border border-stone-300 rounded-sm bg-stone-50" 
                  placeholder="(11) 99999-9999" 
                  value={waitlistData.telefone}
                  onChange={e => setWaitlistData({...waitlistData, telefone: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-1">Seu E-mail</label>
                <input 
                  required 
                  type="email" 
                  className="w-full p-3 border border-stone-300 rounded-sm bg-stone-50" 
                  placeholder="exemplo@email.com" 
                  value={waitlistData.email}
                  onChange={e => setWaitlistData({...waitlistData, email: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-stone-500 mb-3">Qual data funciona melhor para você?</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 border border-stone-200 rounded-sm hover:bg-stone-50">
                    <input type="radio" name="data-futura" value="nov" className="accent-[#c8aa77]" required onChange={e => setWaitlistData({...waitlistData, dataFutura: e.target.value})} />
                    <span className="text-stone-700">19 a 22 de Novembro</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 border border-stone-200 rounded-sm hover:bg-stone-50">
                    <input type="radio" name="data-futura" value="mar" className="accent-[#c8aa77]" required onChange={e => setWaitlistData({...waitlistData, dataFutura: e.target.value})} />
                    <span className="text-stone-700">15 a 17 de Março</span>
                  </label>
                </div>
              </div>
              
              <button type="submit" className="w-full bg-stone-900 text-stone-50 px-6 py-4 rounded-sm uppercase tracking-widest text-sm font-medium hover:bg-stone-800 transition-all">
                Registrar Interesse
              </button>
            </form>
          </div>
        )}
      </section>

    </div>
  );
}

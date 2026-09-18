"use client";

import { useEffect, useRef, useState } from "react";

/* =========================================================
   CLOOE — LANDING PAGE
   ========================================================= */

const BLUE = "#1677ff";
const PAYMENT_LINK = "https://pay.cakto.com.br/325sapc_1001528";

/* =========================================================
   TYPES
   ========================================================= */

type Testimonial = {
  name: string;
  text: string;
  initials: string;
  likes: number;
};

/* =========================================================
   DATA
   ========================================================= */

const testimonials: Testimonial[] = [
  {
    name: "Juliana Santos",
    initials: "JS",
    text: "Eu achava que nunca ia conseguir organizar meu dinheiro. Com a CLOOE ficou muito mais simples visualizar meus gastos e minhas obrigações.",
    likes: 128,
  },
  {
    name: "Lucas Ferreira",
    initials: "LF",
    text: "A CLOOE me ajudou a entender melhor meus gastos. Hoje consigo planejar melhor antes de gastar e tenho muito mais controle.",
    likes: 94,
  },
  {
    name: "Mariana Oliveira",
    initials: "MO",
    text: "Eu sempre chegava no fim do mês sem saber para onde meu dinheiro tinha ido. Agora consigo acompanhar tudo de forma muito mais clara.",
    likes: 87,
  },
  {
    name: "Rafael Almeida",
    initials: "RA",
    text: "Gostei principalmente da forma simples de visualizar minhas finanças. Não parece complicado e consigo consultar rapidamente.",
    likes: 76,
  },
  {
    name: "Camila Rodrigues",
    initials: "CR",
    text: "Comecei usando para controlar os gastos do mês e acabou me ajudando até a organizar minhas metas. Ficou muito mais fácil.",
    likes: 112,
  },
  {
    name: "Pedro Henrique",
    initials: "PH",
    text: "A visão geral dos meus gastos mudou bastante a forma como eu tomo decisões durante o mês.",
    likes: 63,
  },
  {
    name: "Ana Beatriz",
    initials: "AB",
    text: "É muito mais fácil visualizar quanto posso gastar e quanto preciso guardar. A organização ficou bem mais prática.",
    likes: 91,
  },
  {
    name: "Gabriel Martins",
    initials: "GM",
    text: "Antes eu anotava tudo de qualquer jeito. Agora consigo visualizar minhas categorias, metas e evolução em um só lugar.",
    likes: 58,
  },
];

/* =========================================================
   HOOK — COUNT UP
   ========================================================= */

function useCountUp(
  target: number,
  duration = 1600,
  start = false,
  decimals = 0
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrame = 0;
    const startTime = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - startTime) / duration, 1);

      // easeOut
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(target * eased);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration, start]);

  return decimals
    ? value.toFixed(decimals)
    : Math.floor(value).toLocaleString("pt-BR");
}

/* =========================================================
   COMPONENT — REVEAL
   ========================================================= */

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   ICONS
   ========================================================= */

function Arrow() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function Check() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function Heart({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

/* =========================================================
   MINI PHONE
   ========================================================= */

function PhoneMockup() {
  return (
    <div className="phone-wrap">
      <div className="phone-glow" />

      <div className="phone">
        <div className="phone-island" />

        <div className="phone-top">
          <span>Suas finanças</span>

          <div className="phone-dot" />
        </div>

        <div className="phone-label">Saldo disponível</div>

        <div className="phone-balance">R$ 2.847,32</div>

        <div className="phone-chart">
          <div className="chart-grid" />

          <svg
            className="chart-line"
            viewBox="0 0 280 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0 82 C25 70, 32 77, 50 55 C67 38, 79 62, 95 48 C113 34, 125 58, 143 42 C160 26, 174 42, 189 24 C208 3, 222 30, 238 13 C252 0, 267 13, 280 4"
              fill="none"
              stroke="#1677ff"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="phone-section-title">Categorias</div>

        <div className="phone-category">
          <span>
            <i className="cat-dot blue" />
            Moradia
          </span>
          <b>22%</b>
        </div>

        <div className="phone-category">
          <span>
            <i className="cat-dot red" />
            Alimentação
          </span>
          <b>18%</b>
        </div>

        <div className="phone-category">
          <span>
            <i className="cat-dot orange" />
            Transporte
          </span>
          <b>12%</b>
        </div>

        <div className="phone-category">
          <span>
            <i className="cat-dot purple" />
            Lazer
          </span>
          <b>10%</b>
        </div>

        <div className="phone-bottom-indicator" />
      </div>

      <div className="phone-floating-tag">
        <span>+</span>
        organização para sua vida
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD MOCKUP
   ========================================================= */

function DashboardMockup() {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-topbar">
        <div className="dashboard-brand">
          <img src="/images/icon%20CLOOE.png" alt="CLOOE" />
        </div>

        <div className="dashboard-user">
          <span />
        </div>
      </div>

      <div className="dashboard-body">
        <aside className="dashboard-sidebar">
          <div className="side-active">
            <span />
            Início
          </div>

          <div>
            <span />
            Transações
          </div>

          <div>
            <span />
            Metas
          </div>

          <div>
            <span />
            Relatórios
          </div>

          <div>
            <span />
            Configurações
          </div>
        </aside>

        <main className="dashboard-main">
          <div className="dashboard-welcome">
            <div>
              <small>Olá, Gustavo</small>
              <strong>Seu dinheiro</strong>
            </div>

            <div className="dashboard-live">
              <i />
              Atualizado
            </div>
          </div>

          <div className="dashboard-cards">
            <div>
              <small>Saldo disponível</small>
              <strong>R$ 4.286</strong>
            </div>

            <div>
              <small>Receitas</small>
              <strong>R$ 6.800</strong>
            </div>

            <div>
              <small>Despesas</small>
              <strong>R$ 2.513</strong>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-chart-card">
              <div className="card-heading">
                <div>
                  <small>Visão geral</small>
                  <strong>Seus gastos</strong>
                </div>

                <span>Este mês</span>
              </div>

              <div className="bars">
                {[42, 67, 50, 81, 62, 92, 72].map((height, index) => (
                  <div className="bar-wrap" key={index}>
                    <div
                      className="bar"
                      style={
                        {
                          "--bar-height": `${height}%`,
                          animationDelay: `${index * 100}ms`,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="dashboard-goal-card">
              <small>Sua meta</small>

              <strong>Comprar meu carro</strong>

              <div className="goal-progress">
                <span />
              </div>

              <div className="goal-info">
                <b>R$ 18.400</b>
                <small>de R$ 50.000</small>
              </div>

              <div className="goal-status">
                <div className="goal-avatar">AI</div>
                <span>
                  A CLOOE está acompanhando
                  <br />
                  seu progresso.
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   COUNT CARD
   ========================================================= */

function StatsCard({
  number,
  suffix,
  label,
}: {
  number: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const count = useCountUp(number, 1500, started);

  return (
    <div className="stats-card" ref={ref}>
      <strong>
        {count}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}

/* =========================================================
   PAGE
   ========================================================= */

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);

  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (index: number) => {
    setLiked((current) => ({
      ...current,
      [index]: !current[index],
    }));
  };

  return (
    <>
      <main className="clooe-page">
        {/* =================================================
            BACKGROUND EFFECTS
            ================================================= */}

        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="ambient ambient-three" />

        {/* =================================================
            NAVBAR
            ================================================= */}

        <header className="navbar">
          <a href="#" className="nav-logo">
            <img
              src="/images/icon%20CLOOE.png"
              alt="CLOOE"
            />
          </a>

          <nav className={`nav-links ${mobileMenu ? "open" : ""}`}>
            <a href="#como-funciona" onClick={() => setMobileMenu(false)}>
              Como funciona
            </a>

            <a href="#recursos" onClick={() => setMobileMenu(false)}>
              Recursos
            </a>

            <a href="#metas" onClick={() => setMobileMenu(false)}>
              Metas
            </a>

            <a href="#faq" onClick={() => setMobileMenu(false)}>
              FAQ
            </a>
          </nav>

          <a className="nav-button" href={PAYMENT_LINK}>
            Acessar agora
            <Arrow />
          </a>

          <button
            className="mobile-menu"
            onClick={() => setMobileMenu((v) => !v)}
            aria-label="Abrir menu"
          >
            <span />
            <span />
            <span />
          </button>
        </header>

        {/* =================================================
            HERO
            ================================================= */}

        <section className="hero">
          <div className="hero-content">
            <Reveal>
              <div className="eyebrow">
                <span />
                SEU CONSULTOR FINANCEIRO INTELIGENTE
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1>
                Seu dinheiro
                <br />
                não precisa
                <br />
                <span>desaparecer.</span>
              </h1>
            </Reveal>

            <Reveal delay={140}>
              <p className="hero-description">
                Organize sua vida financeira, descubra onde economizar e
                tome decisões melhores com a CLOOE.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="hero-buttons">
                <a href={PAYMENT_LINK} className="primary-button">
                  Começar agora
                  <Arrow />
                </a>

                <a href="#como-funciona" className="secondary-button">
                  Como funciona
                </a>
              </div>
            </Reveal>

            <Reveal delay={260}>
              <div className="hero-benefits">
                <span>
                  <Check />
                  Controle financeiro
                </span>

                <span>
                  <Check />
                  Mais organização
                </span>

                <span>
                  <Check />
                  Decisões melhores
                </span>
              </div>
            </Reveal>
          </div>

          <Reveal className="hero-dashboard" delay={160}>
            <DashboardMockup />
          </Reveal>
        </section>

        {/* =================================================
            STATS
            ================================================= */}

        <section className="stats-section">
          <StatsCard
            number={100}
            suffix="%"
            label="Mais clareza sobre suas finanças"
          />

          <StatsCard
            number={24}
            suffix="h"
            label="Para acompanhar sua vida financeira"
          />

          <StatsCard
            number={4}
            suffix="+"
            label="Formas de cuidar do seu dinheiro"
          />

          <StatsCard
            number={1}
            suffix=""
            label="Lugar para organizar tudo"
          />
        </section>

        {/* =================================================
            COMO FUNCIONA
            ================================================= */}

        <section
          className="light-section how-section"
          id="como-funciona"
        >
          <Reveal>
            <div className="section-eyebrow blue">
              <span />
              COMO FUNCIONA
            </div>
          </Reveal>

          <div className="how-layout">
            <div className="how-copy">
              <Reveal delay={70}>
                <h2>
                  Entender seu dinheiro
                  <br />
                  <span>muda a forma como</span>
                  <br />
                  você cuida dele.
                </h2>
              </Reveal>

              <Reveal delay={120}>
                <p>
                  A CLOOE reúne suas informações financeiras para você ter
                  uma visão clara, simples e prática da sua vida financeira.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="steps-grid">
                  <div className="step-card">
                    <small>01</small>
                    <strong>Conecte</strong>
                    <span>suas contas</span>
                  </div>

                  <div className="step-card">
                    <small>02</small>
                    <strong>Veja</strong>
                    <span>seu resumo</span>
                  </div>

                  <div className="step-card">
                    <small>03</small>
                    <strong>Planeje</strong>
                    <span>seus gastos</span>
                  </div>

                  <div className="step-card">
                    <small>04</small>
                    <strong>Conquiste</strong>
                    <span>suas metas</span>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal className="how-phone" delay={180}>
              <PhoneMockup />
            </Reveal>
          </div>
        </section>

        {/* =================================================
            DEPOIMENTOS
            ================================================= */}

        <section className="testimonials-section" id="recursos">
          <Reveal>
            <div className="section-eyebrow">
              <span />
              DEPOIMENTOS
            </div>
          </Reveal>

          <Reveal delay={70}>
            <h2>
              Você não precisa ganhar mais
              <br />
              para começar a <span>cuidar melhor</span>
              <br />
              do seu dinheiro.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="section-description">
              Veja o que usuários podem encontrar ao organizar suas finanças
              com a CLOOE.
            </p>
          </Reveal>

          <div className="reviews-wrapper">
            <div className="reviews-track">
              {testimonials.map((item, index) => {
                const isLiked = !!liked[index];

                return (
                  <article className="review-card" key={index}>
                    <div className="review-top">
                      <div className="review-person">
                        <div className="review-avatar">
                          {item.initials}
                        </div>

                        <div>
                          <strong>{item.name}</strong>

                          <div className="stars">
                            ★★★★★
                          </div>
                        </div>
                      </div>

                      <button
                        className={`like-button ${
                          isLiked ? "liked" : ""
                        }`}
                        onClick={() => toggleLike(index)}
                        aria-label="Curtir avaliação"
                      >
                        <Heart filled={isLiked} />
                        <span>
                          {item.likes + (isLiked ? 1 : 0)}
                        </span>
                      </button>
                    </div>

                    <p>“{item.text}”</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="reviews-scroll-hint">
            <span />
            Arraste para ver mais avaliações
            <Arrow />
          </div>
        </section>

        {/* =================================================
            ONDE SEU DINHEIRO ESTÁ SENDO GASTO
            ================================================= */}

        <section className="light-section spending-section">
          <Reveal>
            <div className="section-eyebrow blue centered">
              <span />
              SIMPLES E INTUITIVO
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2 className="center-title">
              Você sabe onde seu dinheiro
              <br />
              <span>está sendo gasto?</span>
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="center-description">
              Com a CLOOE, você visualiza seus gastos de forma clara e
              prática, com categorias, gráficos, metas e informações
              importantes.
            </p>
          </Reveal>

          <div className="spending-visual">
            <Reveal className="spending-left" delay={180}>
              <div className="info-pill">
                <div className="info-icon">↗</div>
                <div>
                  <strong>Gastos por categoria</strong>
                  <span>Veja para onde seu dinheiro está indo.</span>
                </div>
              </div>

              <div className="info-pill">
                <div className="info-icon">◎</div>
                <div>
                  <strong>Metas financeiras</strong>
                  <span>Construa o futuro que você deseja.</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="center-phone" delay={230}>
              <PhoneMockup />
            </Reveal>

            <Reveal className="spending-right" delay={280}>
              <div className="info-pill">
                <div className="info-icon">✓</div>
                <div>
                  <strong>Relatórios completos</strong>
                  <span>Acompanhe seu progresso.</span>
                </div>
              </div>

              <div className="info-pill">
                <div className="info-icon">◌</div>
                <div>
                  <strong>Notificações inteligentes</strong>
                  <span>Saiba quando revisar seus gastos.</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =================================================
            SOBRE A CLOOE
            ================================================= */}

        <section className="about-section">
          <Reveal className="about-image">
            <div className="about-dashboard">
              <DashboardMockup />
            </div>
          </Reveal>

          <Reveal className="about-copy" delay={100}>
            <div className="section-eyebrow">
              <span />
              SOBRE NÓS
            </div>

            <h2>
              Mais do que uma IA,
              <br />
              é o seu <span>aliado financeiro.</span>
            </h2>

            <p>
              A CLOOE foi criada para pessoas que querem mais controle,
              liberdade e tranquilidade. Nossa missão é transformar números
              e informações complicadas em decisões que você realmente
              consegue entender.
            </p>

            <ul>
              <li>
                <span>
                  <Check />
                </span>
                Produto simples de usar
              </li>

              <li>
                <span>
                  <Check />
                </span>
                Acesso rápido às informações
              </li>

              <li>
                <span>
                  <Check />
                </span>
                Planejamento financeiro inteligente
              </li>
            </ul>

            <a href={PAYMENT_LINK} className="primary-button">
              Conheça a CLOOE
              <Arrow />
            </a>
          </Reveal>
        </section>

        {/* =================================================
            METAS — AVIÃO
            ================================================= */}

        <section className="airplane-section" id="metas">
          <div className="airplane-background">
            <img
              src="/images/avião%20clooe.png"
              alt=""
            />
          </div>

          <div className="airplane-overlay" />

          <div className="airplane-cloud-layer" />

          <Reveal className="airplane-content">
            <div className="section-eyebrow white">
              <span />
              NOSSA MISSÃO
            </div>

            <h2>
              Faça suas metas
              <br />
              <span>decolarem.</span>
            </h2>

            <p>
              Com mais controle, você tem mais liberdade para realizar o que
              realmente importa.
            </p>

            <a href={PAYMENT_LINK} className="white-button">
              Quero começar agora
              <Arrow />
            </a>
          </Reveal>
        </section>

        {/* =================================================
            PREÇO
            ================================================= */}

        <section className="price-section" id="preco">
          <Reveal>
            <div className="price-heading">
              <div className="section-eyebrow">
                <span />
                PLANO CLOOE
              </div>
              <h2>Seu dinheiro merece um plano.</h2>
              <p>Tenha a CLOOE ao seu lado para <strong>organizar, economizar e tomar decisões melhores</strong> — com um único pagamento.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="price-card">
              <div className="price-top-glow" />

              <div className="price-label">Plano Premium</div>

              <h3>Plano Premium</h3>

              <div className="price-row">
                <span className="price-value">R$197</span>
                <span className="price-period">pagamento único</span>
              </div>

              <p className="price-description">Tudo o que você precisa para organizar suas finanças em um só lugar.</p>

              <div className="price-divider" />

              <ul className="price-benefits">
                <li><span><Check /></span> Acesso completo à CLOOE</li>
                <li><span><Check /></span> Planejamento financeiro inteligente</li>
                <li><span><Check /></span> Controle e organização das suas finanças</li>
                <li><span><Check /></span> Metas e acompanhamento financeiro</li>
              </ul>

              <a href={PAYMENT_LINK} className="price-button">
                Quero começar agora
                <Arrow />
              </a>

              <div className="price-recommended">RECOMENDADO</div>
            </div>
          </Reveal>
        </section>

        {/* =================================================
            GARANTIA
            ================================================= */}

        <section className="guarantee-section">
          <Reveal>
            <div className="guarantee-icon">✓</div>
            <h2>30 dias de garantia de reembolso.</h2>
          </Reveal>
        </section>

        {/* =================================================
            FEATURES
            ================================================= */}

        <section className="features-section">
          <div className="features-copy">
            <Reveal>
              <div className="section-eyebrow">
                <span />
                JUNTE-SE À CLOOE
              </div>
            </Reveal>

            <Reveal delay={70}>
              <h2>
                Comece a cuidar melhor
                <br />
                do seu dinheiro.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p>
                Tenha mais clareza sobre suas finanças e transforme suas
                decisões em passos concretos para o futuro.
              </p>
            </Reveal>

            <Reveal delay={170}>
              <a href={PAYMENT_LINK} className="primary-button">
                Quero começar agora
                <Arrow />
              </a>
            </Reveal>
          </div>

          <div className="feature-cards">
            <Reveal delay={120}>
              <div className="feature-card">
                <div className="feature-icon">◆</div>
                <strong>Seguro</strong>
                <span>e confiável</span>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="feature-card">
                <div className="feature-icon">ϟ</div>
                <strong>Acesso</strong>
                <span>imediato</span>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="feature-card">
                <div className="feature-icon">◉</div>
                <strong>Suporte</strong>
                <span>especializado</span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* =================================================
            CTA
            ================================================= */}

        <section className="cta-section" id="comece">
          <div className="cta-glow" />

          <Reveal>
            <div className="section-eyebrow centered">
              <span />
              SUA VIDA FINANCEIRA PODE SER DIFERENTE
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2>
              Seu dinheiro não precisa
              <br />
              <span>desaparecer.</span>
            </h2>
          </Reveal>

          <Reveal delay={130}>
            <p>
              Tenha clareza sobre seu dinheiro, organize sua vida financeira
              e tome decisões melhores — tudo em um só lugar.
            </p>
          </Reveal>

          <Reveal delay={190}>
            <a href={PAYMENT_LINK} className="primary-button large">
              Começar agora
              <Arrow />
            </a>
          </Reveal>
        </section>

        {/* =================================================
            FAQ
            ================================================= */}

        <section className="faq-section" id="faq">
          <Reveal>
            <div className="section-eyebrow">
              <span />
              FAQ
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h2>
              Ficou com alguma
              <br />
              <span>dúvida?</span>
            </h2>
          </Reveal>

          <div className="faq-list">
            <Reveal delay={100}>
              <details>
                <summary>
                  O que é a CLOOE?
                  <span>+</span>
                </summary>

                <p>
                  A CLOOE é seu consultor financeiro inteligente, criado para
                  ajudar você a organizar suas finanças, visualizar seus
                  gastos, acompanhar metas e tomar decisões melhores.
                </p>
              </details>
            </Reveal>

            <Reveal delay={140}>
              <details>
                <summary>
                  Para quem a CLOOE foi criada?
                  <span>+</span>
                </summary>

                <p>
                  Para pessoas que querem ter mais clareza sobre o próprio
                  dinheiro e tornar sua organização financeira mais simples.
                </p>
              </details>
            </Reveal>

            <Reveal delay={180}>
              <details>
                <summary>
                  Preciso entender de finanças para usar?
                  <span>+</span>
                </summary>

                <p>
                  Não. A proposta da CLOOE é justamente tornar as informações
                  financeiras mais simples de visualizar e entender.
                </p>
              </details>
            </Reveal>

            <Reveal delay={220}>
              <details>
                <summary>
                  A CLOOE substitui um profissional financeiro?
                  <span>+</span>
                </summary>

                <p>
                  A CLOOE funciona como uma ferramenta de organização e
                  orientação financeira. Ela não substitui aconselhamento
                  profissional personalizado quando ele for necessário.
                </p>
              </details>
            </Reveal>
          </div>
        </section>

        {/* =================================================
            FOOTER
            ================================================= */}

        <footer className="footer">
          <div className="footer-main">
            <div className="footer-brand">
              <img
                src="/images/Logo%20CLOOE.png"
                alt="CLOOE"
              />

              <p>
                Seu consultor financeiro inteligente.
              </p>
            </div>

            <div className="footer-links">
              <div>
                <strong>Produto</strong>

                <a href="#como-funciona">
                  Como funciona
                </a>

                <a href="#recursos">
                  Recursos
                </a>

                <a href="#metas">
                  Metas
                </a>
              </div>

              <div>
                <strong>Empresa</strong>

                <a href="#">
                  Sobre nós
                </a>

                <a href="#faq">
                  FAQ
                </a>

                <a href="#">
                  Contato
                </a>
              </div>

              <div>
                <strong>Legal</strong>

                <a href="#">
                  Termos de uso
                </a>

                <a href="#">
                  Privacidade
                </a>

                <a href="#">
                  Cookies
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © 2026 CLOOE. Todos os direitos reservados.
            </span>

            <span>
              Feito para transformar sua relação com o dinheiro.
            </span>
          </div>
        </footer>
      </main>

      {/* =====================================================
          STYLES
          ===================================================== */}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #020406;
          color: #fff;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        button {
          font: inherit;
        }

        .clooe-page {
          min-height: 100vh;
          overflow: hidden;
          position: relative;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(14, 103, 255, 0.09),
              transparent 32%
            ),
            #020406;
        }

        /* =================================================
           AMBIENT BACKGROUND
           ================================================= */

        .ambient {
          position: fixed;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(100px);
          opacity: 0.13;
          z-index: 0;
          animation: ambientFloat 12s ease-in-out infinite alternate;
        }

        .ambient-one {
          background: #006aff;
          left: -300px;
          top: 15%;
        }

        .ambient-two {
          background: #1680ff;
          right: -300px;
          top: 45%;
          animation-delay: -4s;
        }

        .ambient-three {
          background: #0055ff;
          left: 35%;
          bottom: -400px;
          animation-delay: -7s;
        }

        @keyframes ambientFloat {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }

          to {
            transform: translate3d(50px, -30px, 0) scale(1.08);
          }
        }

        /* =================================================
           REVEAL
           ================================================= */

        .reveal {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity 0.8s cubic-bezier(0.2, 0.7, 0.2, 1),
            transform 0.8s cubic-bezier(0.2, 0.7, 0.2, 1);
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* =================================================
           NAVBAR
           ================================================= */

        .navbar {
          position: sticky;
          top: 14px;
          z-index: 50;

          width: min(1160px, calc(100% - 32px));
          margin: 14px auto 0;

          height: 58px;
          padding: 0 10px 0 18px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border: 1px solid rgba(78, 141, 225, 0.24);
          background: rgba(4, 9, 15, 0.78);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);

          border-radius: 999px;

          box-shadow:
            0 20px 70px rgba(0, 0, 0, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.035);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .nav-logo img {
          width: 76px;
          max-height: 28px;
          object-fit: contain;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          margin-left: auto;
          margin-right: 35px;
        }

        .nav-links a {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.68);
          transition:
            color 0.25s ease,
            transform 0.25s ease;
        }

        .nav-links a:hover {
          color: #fff;
          transform: translateY(-1px);
        }

        .nav-button,
        .primary-button,
        .white-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 999px;
          font-weight: 700;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background 0.25s ease;
        }

        .nav-button {
          min-height: 38px;
          padding: 0 19px;
          background: #1677ff;
          color: #fff;
          font-size: 11px;
          box-shadow: 0 8px 25px rgba(22, 119, 255, 0.25);
        }

        .nav-button:hover,
        .primary-button:hover,
        .white-button:hover {
          transform: translateY(-2px);
        }

        .nav-button:hover,
        .primary-button:hover {
          box-shadow: 0 14px 35px rgba(22, 119, 255, 0.28);
        }

        .mobile-menu {
          display: none;
          border: 0;
          background: transparent;
          padding: 8px;
        }

        .mobile-menu span {
          display: block;
          width: 20px;
          height: 2px;
          margin: 4px 0;
          background: #fff;
          border-radius: 99px;
        }

        /* =================================================
           HERO
           ================================================= */

        .hero {
          position: relative;
          z-index: 1;

          width: min(1160px, calc(100% - 32px));
          min-height: 420px;
          margin: 12px auto 0;

          padding: 55px 35px 48px;

          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 30px;
          align-items: center;

          border-radius: 28px;
          border: 1px solid rgba(34, 119, 255, 0.45);

          background:
            radial-gradient(
              circle at 70% 35%,
              rgba(18, 101, 255, 0.17),
              transparent 34%
            ),
            linear-gradient(
              135deg,
              #07101d 0%,
              #03070c 65%,
              #061329 100%
            );

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.035),
            0 35px 100px rgba(0, 0, 0, 0.3);

          overflow: hidden;
        }

        .hero::before {
          content: "";
          position: absolute;
          width: 500px;
          height: 500px;
          right: -220px;
          top: -280px;
          background: #006eff;
          filter: blur(150px);
          opacity: 0.14;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .eyebrow,
        .section-eyebrow {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #2b85ff;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }

        .eyebrow span,
        .section-eyebrow span {
          width: 5px;
          height: 5px;
          background: #1677ff;
          border-radius: 50%;
          box-shadow: 0 0 15px #1677ff;
        }

        .hero h1 {
          margin: 15px 0 16px;
          font-size: clamp(43px, 5vw, 70px);
          line-height: 0.95;
          letter-spacing: -0.055em;
          font-weight: 750;
        }

        .hero h1 span {
          color: #1677ff;
          text-shadow: 0 0 40px rgba(22, 119, 255, 0.17);
        }

        .hero-description {
          max-width: 450px;
          margin: 0;
          color: rgba(255, 255, 255, 0.64);
          font-size: 13px;
          line-height: 1.65;
        }

        .hero-buttons {
          display: flex;
          gap: 10px;
          margin-top: 23px;
        }

        .primary-button {
          min-height: 42px;
          padding: 0 18px;
          background: #1677ff;
          font-size: 11px;
          color: #fff;
        }

        .secondary-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 19px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.82);
          font-size: 11px;
          transition: all 0.25s ease;
        }

        .secondary-button:hover {
          border-color: rgba(22, 119, 255, 0.55);
          background: rgba(22, 119, 255, 0.07);
        }

        .hero-benefits {
          display: flex;
          gap: 16px;
          margin-top: 21px;
          flex-wrap: wrap;
        }

        .hero-benefits span {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 8px;
          color: rgba(255, 255, 255, 0.55);
        }

        .hero-benefits svg {
          color: #1681ff;
        }

        /* =================================================
           DASHBOARD
           ================================================= */

        .hero-dashboard {
          position: relative;
          z-index: 2;
          perspective: 1200px;
        }

        .dashboard-shell {
          position: relative;
          width: 100%;
          min-height: 285px;
          border-radius: 22px;
          overflow: hidden;

          background:
            linear-gradient(
              145deg,
              rgba(9, 20, 35, 0.98),
              rgba(2, 7, 13, 0.98)
            );

          border: 1px solid rgba(44, 127, 255, 0.5);

          box-shadow:
            0 35px 80px rgba(0, 0, 0, 0.42),
            0 0 50px rgba(0, 105, 255, 0.08);

          animation: dashboardFloat 6s ease-in-out infinite;
        }

        @keyframes dashboardFloat {
          0%,
          100% {
            transform: translateY(0) rotateX(0deg);
          }

          50% {
            transform: translateY(-7px) rotateX(1deg);
          }
        }

        .dashboard-topbar {
          height: 42px;
          padding: 0 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.055);
        }

        .dashboard-brand img {
          width: 43px;
          max-height: 17px;
          object-fit: contain;
        }

        .dashboard-user {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
        }

        .dashboard-body {
          display: flex;
          min-height: 243px;
        }

        .dashboard-sidebar {
          width: 94px;
          flex-shrink: 0;
          padding: 13px 8px;
          border-right: 1px solid rgba(255, 255, 255, 0.045);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .dashboard-sidebar div {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 7px;
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.34);
          font-size: 6px;
        }

        .dashboard-sidebar div span {
          width: 7px;
          height: 7px;
          border-radius: 2px;
          background: rgba(255, 255, 255, 0.12);
        }

        .dashboard-sidebar .side-active {
          background: rgba(22, 119, 255, 0.18);
          color: #63a7ff;
        }

        .dashboard-sidebar .side-active span {
          background: #1677ff;
        }

        .dashboard-main {
          flex: 1;
          padding: 16px;
          min-width: 0;
        }

        .dashboard-welcome {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dashboard-welcome small {
          display: block;
          color: rgba(255, 255, 255, 0.3);
          font-size: 6px;
          margin-bottom: 4px;
        }

        .dashboard-welcome strong {
          font-size: 11px;
          display: block;
        }

        .dashboard-live {
          font-size: 6px;
          color: rgba(255, 255, 255, 0.35);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .dashboard-live i {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #2b9dff;
          box-shadow: 0 0 10px #1677ff;
        }

        .dashboard-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 7px;
          margin-top: 13px;
        }

        .dashboard-cards > div {
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.07);
          background: rgba(255, 255, 255, 0.025);
          border-radius: 8px;
        }

        .dashboard-cards small,
        .dashboard-cards strong {
          display: block;
        }

        .dashboard-cards small {
          font-size: 5px;
          color: rgba(255, 255, 255, 0.3);
        }

        .dashboard-cards strong {
          margin-top: 4px;
          font-size: 9px;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 8px;
          margin-top: 8px;
        }

        .dashboard-chart-card,
        .dashboard-goal-card {
          border: 1px solid rgba(255, 255, 255, 0.065);
          background: rgba(255, 255, 255, 0.018);
          border-radius: 9px;
          padding: 11px;
        }

        .card-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-heading small,
        .card-heading strong {
          display: block;
        }

        .card-heading small {
          font-size: 5px;
          color: rgba(255, 255, 255, 0.32);
        }

        .card-heading strong {
          margin-top: 3px;
          font-size: 8px;
        }

        .card-heading > span {
          font-size: 5px;
          color: #5ca2ff;
        }

        .bars {
          height: 108px;
          margin-top: 10px;
          display: flex;
          align-items: flex-end;
          gap: 8px;
          padding: 0 3px;
        }

        .bar-wrap {
          flex: 1;
          height: 100%;
          display: flex;
          align-items: flex-end;
        }

        .bar {
          width: 100%;
          height: var(--bar-height);
          border-radius: 4px 4px 2px 2px;
          background: linear-gradient(
            to top,
            #1165df,
            #3b95ff
          );
          box-shadow: 0 0 15px rgba(22, 119, 255, 0.18);
          transform-origin: bottom;
          animation: barGrow 1.1s cubic-bezier(0.2, 0.8, 0.2, 1)
            both;
        }

        @keyframes barGrow {
          from {
            transform: scaleY(0);
          }

          to {
            transform: scaleY(1);
          }
        }

        .dashboard-goal-card > small {
          display: block;
          font-size: 5px;
          color: rgba(255, 255, 255, 0.3);
        }

        .dashboard-goal-card > strong {
          display: block;
          margin-top: 5px;
          font-size: 8px;
        }

        .goal-progress {
          height: 5px;
          margin-top: 14px;
          border-radius: 99px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }

        .goal-progress span {
          display: block;
          width: 37%;
          height: 100%;
          border-radius: inherit;
          background: #1677ff;
          animation: progressGrow 1.5s ease both;
        }

        @keyframes progressGrow {
          from {
            width: 0;
          }

          to {
            width: 37%;
          }
        }

        .goal-info {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
        }

        .goal-info b,
        .goal-info small {
          font-size: 5px;
        }

        .goal-info small {
          color: rgba(255, 255, 255, 0.35);
        }

        .goal-status {
          margin-top: 16px;
          display: flex;
          gap: 6px;
          align-items: center;
          padding: 7px;
          border-radius: 7px;
          background: rgba(22, 119, 255, 0.07);
          border: 1px solid rgba(22, 119, 255, 0.12);
        }

        .goal-avatar {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: rgba(22, 119, 255, 0.2);
          color: #4d9aff;
          font-size: 5px;
          flex-shrink: 0;
        }

        .goal-status span {
          font-size: 5px;
          line-height: 1.35;
          color: rgba(255, 255, 255, 0.42);
        }

        /* =================================================
           STATS
           ================================================= */

        .stats-section {
          position: relative;
          z-index: 2;
          width: min(1160px, calc(100% - 32px));
          margin: 18px auto 0;
          padding: 18px 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 22px;
          background: rgba(7, 12, 18, 0.68);
          backdrop-filter: blur(15px);
        }

        .stats-card {
          text-align: center;
          padding: 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.055);
        }

        .stats-card:last-child {
          border-right: 0;
        }

        .stats-card strong {
          display: block;
          font-size: 22px;
          letter-spacing: -0.04em;
          color: #fff;
        }

        .stats-card span {
          display: block;
          margin-top: 3px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 8px;
        }

        /* =================================================
           LIGHT SECTIONS
           ================================================= */

        .light-section {
          position: relative;
          z-index: 1;
          width: min(1160px, calc(100% - 32px));
          margin: 18px auto 0;
          border-radius: 28px;
          overflow: hidden;
          color: #07111e;

          background:
            radial-gradient(
              circle at 72% 45%,
              rgba(76, 150, 255, 0.14),
              transparent 30%
            ),
            linear-gradient(
              135deg,
              #eef5ff,
              #f8fbff 50%,
              #eaf3ff
            );

          border: 1px solid rgba(96, 145, 203, 0.23);

          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 25px 80px rgba(0, 20, 50, 0.12);
        }

        .light-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(
              rgba(23, 119, 255, 0.1) 1px,
              transparent 1px
            );
          background-size: 28px 28px;
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.12),
            transparent 70%
          );
          pointer-events: none;
        }

        .how-section {
          min-height: 390px;
          padding: 46px 34px;
        }

        .how-layout {
          display: grid;
          grid-template-columns: 1fr 0.65fr;
          align-items: center;
          gap: 25px;
          position: relative;
          z-index: 2;
        }

        .how-copy {
          max-width: 650px;
        }

        .section-eyebrow.blue {
          color: #0f73ff;
        }

        .how-copy h2 {
          margin: 17px 0 15px;
          font-size: clamp(37px, 4vw, 56px);
          line-height: 0.99;
          letter-spacing: -0.055em;
        }

        .how-copy h2 span {
          color: #1677ff;
        }

        .how-copy > p {
          max-width: 620px;
          margin: 0;
          font-size: 12px;
          line-height: 1.65;
          color: #526278;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-top: 25px;
        }

        .step-card {
          min-height: 82px;
          padding: 13px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          border: 1px solid rgba(77, 133, 197, 0.2);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.58);

          box-shadow:
            0 10px 30px rgba(24, 77, 130, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .step-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 35px rgba(24, 77, 130, 0.1);
        }

        .step-card small {
          color: #1677ff;
          font-size: 7px;
          font-weight: 800;
        }

        .step-card strong {
          margin-top: 10px;
          font-size: 10px;
        }

        .step-card span {
          color: #8b99aa;
          font-size: 7px;
        }

        /* =================================================
           PHONE
           ================================================= */

        .phone-wrap {
          position: relative;
          width: 205px;
          height: 325px;
          display: grid;
          place-items: center;
        }

        .phone-glow {
          position: absolute;
          width: 210px;
          height: 210px;
          border-radius: 50%;
          background: rgba(22, 119, 255, 0.23);
          filter: blur(55px);
          animation: phoneGlow 4s ease-in-out infinite;
        }

        @keyframes phoneGlow {
          0%,
          100% {
            transform: scale(0.95);
            opacity: 0.55;
          }

          50% {
            transform: scale(1.1);
            opacity: 0.85;
          }
        }

        .phone {
          position: relative;
          z-index: 2;
          width: 157px;
          height: 306px;
          padding: 34px 14px 15px;
          border-radius: 32px;
          background: linear-gradient(150deg, #fff, #edf4ff);
          border: 4px solid #121b27;
          box-shadow:
            0 25px 60px rgba(10, 49, 99, 0.18),
            inset 0 0 0 1px rgba(255, 255, 255, 0.8);
          animation: phoneFloat 5s ease-in-out infinite;
        }

        @keyframes phoneFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }

          50% {
            transform: translateY(-8px) rotate(0.5deg);
          }
        }

        .phone-island {
          position: absolute;
          width: 61px;
          height: 15px;
          background: #070b10;
          border-radius: 999px;
          left: 50%;
          top: 7px;
          transform: translateX(-50%);
        }

        .phone-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #9aa8b8;
          font-size: 5px;
        }

        .phone-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #1677ff;
          box-shadow: 0 0 10px rgba(22, 119, 255, 0.5);
        }

        .phone-label {
          margin-top: 22px;
          color: #a3afbc;
          font-size: 5px;
        }

        .phone-balance {
          margin-top: 7px;
          color: #101c2b;
          font-size: 15px;
          font-weight: 800;
          letter-spacing: -0.04em;
        }

        .phone-chart {
          position: relative;
          height: 65px;
          margin-top: 14px;
          border-radius: 10px;
          background: linear-gradient(
            145deg,
            #edf5ff,
            #dceaff
          );
          overflow: hidden;
        }

        .chart-grid {
          position: absolute;
          inset: 0;
          opacity: 0.45;
          background-image:
            linear-gradient(
              rgba(70, 135, 205, 0.11) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(70, 135, 205, 0.11) 1px,
              transparent 1px
            );
          background-size: 25px 20px;
        }

        .chart-line {
          position: absolute;
          inset: 12px 4px 7px;
          width: calc(100% - 8px);
          height: calc(100% - 19px);
        }

        .chart-line path {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: chartDraw 2s 0.4s ease forwards;
        }

        @keyframes chartDraw {
          to {
            stroke-dashoffset: 0;
          }
        }

        .phone-section-title {
          margin-top: 12px;
          font-size: 6px;
          font-weight: 800;
          color: #273547;
        }

        .phone-category {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 7px;
          font-size: 5px;
          color: #526070;
        }

        .phone-category span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .phone-category b {
          color: #a3adba;
          font-weight: 600;
        }

        .cat-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .cat-dot.blue {
          background: #1677ff;
        }

        .cat-dot.red {
          background: #ff5e78;
        }

        .cat-dot.orange {
          background: #ff9d43;
        }

        .cat-dot.purple {
          background: #8a5cff;
        }

        .phone-bottom-indicator {
          position: absolute;
          bottom: 6px;
          left: 50%;
          width: 43px;
          height: 3px;
          border-radius: 999px;
          background: #1a2532;
          transform: translateX(-50%);
          opacity: 0.8;
        }

        .phone-floating-tag {
          position: absolute;
          z-index: 3;
          right: -12px;
          bottom: 56px;
          padding: 9px 13px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.96);
          color: #4e5d6f;
          font-size: 6px;
          box-shadow: 0 15px 35px rgba(22, 68, 110, 0.16);
          animation: tagFloat 4s ease-in-out infinite;
        }

        .phone-floating-tag span {
          color: #1677ff;
          font-weight: 800;
        }

        @keyframes tagFloat {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        .how-phone {
          display: flex;
          justify-content: center;
        }

        /* =================================================
           TESTIMONIALS
           ================================================= */

        .testimonials-section {
          position: relative;
          z-index: 1;
          width: min(1160px, calc(100% - 32px));
          margin: 18px auto 0;
          padding: 47px 34px 39px;
          border-radius: 28px;
          border: 1px solid rgba(35, 105, 198, 0.42);

          background:
            radial-gradient(
              circle at 80% 0%,
              rgba(19, 94, 255, 0.13),
              transparent 32%
            ),
            linear-gradient(
              140deg,
              #061429,
              #030910 70%,
              #051329
            );
        }

        .testimonials-section h2 {
          margin: 16px 0 11px;
          font-size: clamp(35px, 4.3vw, 54px);
          line-height: 0.98;
          letter-spacing: -0.05em;
        }

        .testimonials-section h2 span {
          color: #1677ff;
        }

        .section-description {
          max-width: 600px;
          color: rgba(255, 255, 255, 0.42);
          font-size: 11px;
          line-height: 1.6;
        }

        .reviews-wrapper {
          width: calc(100% + 68px);
          margin-left: -34px;
          overflow: hidden;
          margin-top: 28px;
          padding: 5px 34px 14px;
        }

        .reviews-track {
          display: flex;
          gap: 12px;
          width: max-content;
          animation: reviewsAuto 38s linear infinite;
        }

        .reviews-track:hover {
          animation-play-state: paused;
        }

        @keyframes reviewsAuto {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-45%);
          }
        }

        .review-card {
          width: 335px;
          min-height: 175px;
          padding: 18px;
          border: 1px solid rgba(255, 255, 255, 0.075);
          background:
            linear-gradient(
              145deg,
              rgba(11, 29, 52, 0.84),
              rgba(3, 10, 18, 0.94)
            );
          border-radius: 15px;
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.16);
          transition:
            transform 0.3s ease,
            border-color 0.3s ease;
        }

        .review-card:hover {
          transform: translateY(-5px);
          border-color: rgba(22, 119, 255, 0.35);
        }

        .review-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .review-person {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .review-avatar {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background:
            linear-gradient(
              145deg,
              #146ff1,
              #071c3d
            );
          border: 1px solid rgba(72, 150, 255, 0.4);
          color: #fff;
          font-size: 8px;
          font-weight: 800;
        }

        .review-person strong {
          display: block;
          font-size: 9px;
        }

        .stars {
          margin-top: 2px;
          color: #1677ff;
          font-size: 8px;
          letter-spacing: 1px;
        }

        .like-button {
          display: flex;
          align-items: center;
          gap: 4px;
          border: 0;
          background: transparent;
          color: rgba(255, 255, 255, 0.32);
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .like-button:hover,
        .like-button.liked {
          color: #ff5475;
        }

        .like-button span {
          font-size: 7px;
        }

        .review-card p {
          margin: 18px 0 0;
          color: rgba(255, 255, 255, 0.52);
          font-size: 9px;
          line-height: 1.65;
        }

        .reviews-scroll-hint {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
          margin-top: 2px;
          color: rgba(255, 255, 255, 0.25);
          font-size: 8px;
        }

        .reviews-scroll-hint span {
          width: 22px;
          height: 1px;
          background: rgba(255, 255, 255, 0.25);
        }

        /* =================================================
           SPENDING
           ================================================= */

        .spending-section {
          min-height: 535px;
          padding: 45px 34px 35px;
        }

        .centered {
          justify-content: center;
        }

        .center-title {
          position: relative;
          z-index: 2;
          margin: 15px auto 10px;
          text-align: center;
          font-size: clamp(38px, 4.2vw, 56px);
          line-height: 0.98;
          letter-spacing: -0.055em;
        }

        .center-title span {
          color: #1677ff;
        }

        .center-description {
          position: relative;
          z-index: 2;
          max-width: 650px;
          margin: 0 auto;
          text-align: center;
          font-size: 10px;
          line-height: 1.65;
          color: #68788b;
        }

        .spending-visual {
          position: relative;
          z-index: 2;
          min-height: 340px;
          display: grid;
          grid-template-columns: 1fr 230px 1fr;
          align-items: center;
          gap: 20px;
          margin-top: 8px;
        }

        .spending-left,
        .spending-right {
          display: flex;
          flex-direction: column;
          gap: 62px;
        }

        .spending-left {
          align-items: flex-end;
        }

        .spending-right {
          align-items: flex-start;
        }

        .info-pill {
          width: 190px;
          min-height: 57px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          border-radius: 13px;

          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(68, 126, 191, 0.18);

          box-shadow:
            0 15px 35px rgba(30, 74, 120, 0.07),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);

          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .info-pill:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(30, 74, 120, 0.12);
        }

        .info-icon {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          color: #1677ff;
          background: #e8f1ff;
          border-radius: 9px;
          font-size: 10px;
          font-weight: 800;
        }

        .info-pill strong,
        .info-pill span {
          display: block;
        }

        .info-pill strong {
          font-size: 8px;
          color: #16283c;
        }

        .info-pill span {
          margin-top: 3px;
          font-size: 6px;
          color: #8a98a8;
        }

        .center-phone {
          display: flex;
          justify-content: center;
        }

        /* =================================================
           ABOUT
           ================================================= */

        .about-section {
          position: relative;
          z-index: 1;
          width: min(1160px, calc(100% - 32px));
          min-height: 350px;
          margin: 18px auto 0;

          display: grid;
          grid-template-columns: 1.05fr 0.95fr;

          border-radius: 28px;
          overflow: hidden;

          border: 1px solid rgba(255, 255, 255, 0.09);

          background:
            radial-gradient(
              circle at 20% 50%,
              rgba(0, 105, 255, 0.1),
              transparent 33%
            ),
            #05090e;
        }

        .about-image {
          min-height: 350px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background:
            radial-gradient(
              circle,
              rgba(15, 104, 255, 0.15),
              transparent 55%
            );
        }

        .about-image::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              transparent 70%,
              #05090e 100%
            );
          pointer-events: none;
        }

        .about-dashboard {
          width: 82%;
          transform: scale(0.86);
          opacity: 0.9;
        }

        .about-copy {
          padding: 48px 42px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .about-copy h2 {
          margin: 16px 0 14px;
          font-size: clamp(33px, 3.5vw, 47px);
          line-height: 0.98;
          letter-spacing: -0.05em;
        }

        .about-copy h2 span {
          color: #1677ff;
        }

        .about-copy > p {
          margin: 0;
          color: rgba(255, 255, 255, 0.43);
          font-size: 10px;
          line-height: 1.7;
        }

        .about-copy ul {
          padding: 0;
          margin: 18px 0 22px;
          list-style: none;
        }

        .about-copy li {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 8px 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 8px;
        }

        .about-copy li > span {
          width: 17px;
          height: 17px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(22, 119, 255, 0.12);
          color: #1677ff;
        }

        .about-copy .primary-button {
          width: fit-content;
        }

        /* =================================================
           AIRPLANE
           ================================================= */

        .airplane-section {
          position: relative;
          z-index: 1;
          width: min(1160px, calc(100% - 32px));
          min-height: 250px;
          margin: 18px auto 0;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(73, 157, 255, 0.45);
          isolation: isolate;
        }

        .airplane-background {
          position: absolute;
          inset: -3%;
          z-index: -3;
          overflow: hidden;
        }

        .airplane-background img {
          width: 106%;
          height: 106%;
          object-fit: cover;
          object-position: center;
          animation: airplaneTravel 16s ease-in-out infinite
            alternate;
        }

        @keyframes airplaneTravel {
          0% {
            transform: translate3d(-1.5%, 0, 0) scale(1.03);
          }

          50% {
            transform: translate3d(1%, -0.6%, 0) scale(1.055);
          }

          100% {
            transform: translate3d(2.2%, 0.4%, 0) scale(1.03);
          }
        }

        .airplane-overlay {
          position: absolute;
          inset: 0;
          z-index: -2;
          background:
            linear-gradient(
              90deg,
              rgba(2, 46, 131, 0.88) 0%,
              rgba(5, 73, 178, 0.58) 38%,
              rgba(0, 55, 150, 0.12) 73%,
              rgba(0, 35, 100, 0.12) 100%
            );
        }

        .airplane-cloud-layer {
          position: absolute;
          inset: -20%;
          z-index: -1;
          opacity: 0.22;
          background:
            radial-gradient(
              ellipse at 15% 75%,
              rgba(255, 255, 255, 0.7),
              transparent 25%
            ),
            radial-gradient(
              ellipse at 60% 90%,
              rgba(255, 255, 255, 0.6),
              transparent 30%
            );
          filter: blur(16px);
          animation: cloudsMove 22s linear infinite alternate;
        }

        @keyframes cloudsMove {
          from {
            transform: translateX(-4%);
          }

          to {
            transform: translateX(5%);
          }
        }

        .airplane-content {
          position: relative;
          z-index: 3;
          width: 50%;
          padding: 37px 34px;
        }

        .section-eyebrow.white {
          color: rgba(255, 255, 255, 0.76);
        }

        .section-eyebrow.white span {
          background: #fff;
          box-shadow: 0 0 15px #fff;
        }

        .airplane-content h2 {
          margin: 14px 0 8px;
          font-size: clamp(34px, 4vw, 52px);
          line-height: 0.92;
          letter-spacing: -0.05em;
        }

        .airplane-content h2 span {
          color: #a8d1ff;
        }

        .airplane-content p {
          max-width: 390px;
          margin: 0 0 17px;
          color: rgba(255, 255, 255, 0.74);
          font-size: 9px;
          line-height: 1.6;
        }

        .white-button {
          min-height: 37px;
          padding: 0 16px;
          background: #fff;
          color: #116ce9;
          font-size: 9px;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
        }

        /* =================================================
           FEATURES
           ================================================= */

        .features-section {
          position: relative;
          z-index: 1;
          width: min(1160px, calc(100% - 32px));
          min-height: 245px;
          margin: 18px auto 0;
          padding: 38px 34px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;

          border: 1px solid rgba(255, 255, 255, 0.085);
          border-radius: 28px;
          background:
            radial-gradient(
              circle at 80% 40%,
              rgba(14, 93, 255, 0.1),
              transparent 30%
            ),
            #04080d;
        }

        .features-copy {
          max-width: 530px;
        }

        .features-copy h2 {
          margin: 14px 0 10px;
          font-size: clamp(35px, 4vw, 51px);
          line-height: 0.94;
          letter-spacing: -0.055em;
        }

        .features-copy p {
          margin: 0 0 18px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 9px;
          line-height: 1.65;
        }

        .feature-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
        }

        .feature-card {
          width: 94px;
          height: 105px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;

          border-radius: 13px;
          border: 1px solid rgba(31, 108, 213, 0.22);
          background:
            linear-gradient(
              145deg,
              rgba(8, 22, 40, 0.92),
              rgba(3, 10, 17, 0.95)
            );

          transition:
            transform 0.3s ease,
            border-color 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(22, 119, 255, 0.5);
        }

        .feature-icon {
          width: 27px;
          height: 27px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          color: #1677ff;
          background: rgba(22, 119, 255, 0.09);
          font-size: 12px;
          margin-bottom: 8px;
        }

        .feature-card strong {
          font-size: 8px;
        }

        .feature-card span {
          margin-top: 3px;
          color: rgba(255, 255, 255, 0.32);
          font-size: 6px;
        }

        /* =================================================
           CTA
           ================================================= */

        .cta-section {
          position: relative;
          z-index: 1;
          width: min(1160px, calc(100% - 32px));
          margin: 18px auto 0;
          padding: 80px 25px;
          text-align: center;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(22, 119, 255, 0.26);
          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(22, 119, 255, 0.15),
              transparent 35%
            ),
            #04080d;
        }

        .cta-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: rgba(22, 119, 255, 0.11);
          filter: blur(90px);
          animation: ctaPulse 5s ease-in-out infinite;
        }

        @keyframes ctaPulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(0.85);
          }

          50% {
            transform: translate(-50%, -50%) scale(1.15);
          }
        }

        .cta-section > *:not(.cta-glow) {
          position: relative;
          z-index: 2;
        }

        .cta-section h2 {
          margin: 15px 0 13px;
          font-size: clamp(42px, 5vw, 68px);
          line-height: 0.92;
          letter-spacing: -0.06em;
        }

        .cta-section h2 span {
          color: #1677ff;
        }

        .cta-section p {
          max-width: 620px;
          margin: 0 auto 24px;
          color: rgba(255, 255, 255, 0.42);
          font-size: 11px;
          line-height: 1.65;
        }

        .primary-button.large {
          min-height: 47px;
          padding: 0 23px;
          font-size: 11px;
        }

        /* =================================================
           PREÇO
        ================================================= */

        .price-section {
          position: relative;
          z-index: 1;
          width: min(1160px, calc(100% - 32px));
          min-height: 430px;
          margin: 18px auto 0;
          padding: 58px 58px 62px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(330px, 420px);
          align-items: center;
          gap: 70px;
          overflow: hidden;
          border-radius: 28px;
          border: 1px solid rgba(34, 119, 255, 0.28);
          background:
            radial-gradient(circle at 18% 50%, rgba(22,119,255,.12), transparent 36%),
            radial-gradient(circle at 82% 30%, rgba(22,119,255,.12), transparent 32%),
            linear-gradient(135deg, #07101d 0%, #03070c 62%, #061329 100%);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.035),
            0 35px 100px rgba(0,0,0,.30);
        }

        .price-section::before {
          content: "";
          position: absolute;
          width: 520px;
          height: 360px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: rgba(22,119,255,.08);
          filter: blur(90px);
          pointer-events: none;
          animation: priceSectionGlow 7s ease-in-out infinite;
        }

        @keyframes priceSectionGlow {
          0%, 100% { transform: translate(-50%, -50%) scale(.92); opacity: .55; }
          50% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
        }

        .price-heading {
          position: relative;
          z-index: 2;
          width: 100%;
          margin: 0;
          text-align: left;
        }

        .price-heading .section-eyebrow {
          justify-content: flex-start;
          margin-bottom: 16px;
        }

        .price-heading h2 {
          margin: 0;
          color: #fff;
          font-size: clamp(34px, 4.5vw, 52px);
          line-height: .98;
          letter-spacing: -.06em;
        }

        .price-heading p {
          max-width: 500px;
          margin: 14px auto 0;
          color: rgba(255,255,255,.46);
          font-size: 12px;
          line-height: 1.6;
        }

        .price-card {
          position: relative;
          z-index: 2;
          overflow: hidden;
          width: 100%;
          min-height: 360px;
          padding: 27px 25px 23px;
          border: 1px solid rgba(22,119,255,.34);
          border-radius: 22px;
          background:
            radial-gradient(circle at 50% 0%, rgba(22,119,255,.17), transparent 43%),
            linear-gradient(145deg, #101c2c 0%, #080f19 48%, #050a11 100%);
          box-shadow:
            0 28px 80px rgba(0,0,0,.38),
            0 0 70px rgba(22,119,255,.10),
            inset 0 1px rgba(255,255,255,.055);
          transition: transform .45s cubic-bezier(.2,.8,.2,1), border-color .45s ease, box-shadow .45s ease;
        }

        .price-card::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          background: linear-gradient(145deg, rgba(255,255,255,.045), transparent 28%, transparent 70%, rgba(22,119,255,.07));
        }

        .price-card:hover {
          transform: translateY(-8px);
          border-color: rgba(22,119,255,.62);
          box-shadow:
            0 38px 100px rgba(0,0,0,.46),
            0 0 90px rgba(22,119,255,.16),
            inset 0 1px rgba(255,255,255,.07);
        }

        .price-top-glow {
          position: absolute;
          width: 180px;
          height: 120px;
          top: -70px;
          right: -25px;
          border-radius: 50%;
          background: rgba(22,119,255,.26);
          filter: blur(38px);
          pointer-events: none;
          animation: priceGlow 5s ease-in-out infinite;
        }

        @keyframes priceGlow {
          0%, 100% { transform: translate(0,0) scale(1); opacity: .55; }
          50% { transform: translate(-20px,15px) scale(1.12); opacity: 1; }
        }

        .price-label {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          min-height: 23px;
          padding: 0 9px;
          border: 1px solid rgba(22,119,255,.36);
          border-radius: 999px;
          color: #65a5ff;
          background: rgba(22,119,255,.10);
          font-size: 8px;
          font-weight: 750;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .price-card h3 {
          position: relative;
          z-index: 2;
          margin: 15px 0 7px;
          color: #fff;
          font-size: 27px;
          font-weight: 650;
          line-height: 1;
          letter-spacing: -.05em;
        }

        .price-row {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: baseline;
          gap: 7px;
          flex-wrap: wrap;
        }

        .price-value {
          color: #fff;
          font-size: 47px;
          font-weight: 760;
          line-height: .96;
          letter-spacing: -.065em;
          text-shadow: 0 0 38px rgba(22,119,255,.28);
        }

        .price-period {
          color: rgba(255,255,255,.43);
          font-size: 9px;
        }

        .price-description {
          position: relative;
          z-index: 2;
          margin: 13px 0 0;
          color: rgba(255,255,255,.48);
          font-size: 9px;
          line-height: 1.55;
        }

        .price-divider {
          position: relative;
          z-index: 2;
          height: 1px;
          margin: 19px 0 16px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.13), transparent);
        }

        .price-benefits {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .price-benefits li {
          display: flex;
          align-items: center;
          gap: 9px;
          color: rgba(255,255,255,.67);
          font-size: 9px;
          line-height: 1.35;
        }

        .price-benefits li > span {
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 21px;
          width: 21px;
          height: 21px;
          border: 1px solid rgba(22,119,255,.30);
          border-radius: 6px;
          color: #1677ff;
          background: rgba(22,119,255,.09);
        }

        .price-button {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          min-height: 42px;
          margin-top: 19px;
          padding: 0 16px;
          border: 1px solid rgba(91,157,255,.46);
          border-radius: 999px;
          color: #fff;
          background: linear-gradient(135deg, #1677ff, #075edc);
          box-shadow: 0 12px 28px rgba(22,119,255,.22);
          font-size: 9px;
          font-weight: 700;
          text-decoration: none;
          transition: transform .3s ease, box-shadow .3s ease, filter .3s ease;
        }

        .price-button:hover {
          transform: translateY(-2px);
          filter: brightness(1.08);
          box-shadow: 0 16px 35px rgba(22,119,255,.32);
        }

        .price-recommended {
          position: relative;
          z-index: 2;
          margin-top: 11px;
          text-align: center;
          color: rgba(105,168,255,.82);
          font-size: 7px;
          font-weight: 750;
          letter-spacing: .12em;
        }

        /* =================================================
           GARANTIA
        ================================================= */

        .guarantee-section {
          padding: 16px 0;
        }

        .guarantee-section > div {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          min-height: 125px;
          padding: 28px 30px;
          border: 1px solid rgba(22,119,255,.18);
          border-radius: 26px;
          background:
            radial-gradient(
              circle at 50% 0%,
              rgba(22,119,255,.08),
              transparent 60%
            ),
            #050a11;
          box-shadow:
            inset 0 1px rgba(255,255,255,.025),
            0 20px 70px rgba(0,0,0,.16);
        }

        .guarantee-icon {
          flex: 0 0 auto;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(22,119,255,.28);
          border-radius: 50%;
          color: #1677ff;
          background: rgba(22,119,255,.1);
          font-size: 20px;
          font-weight: 700;
          box-shadow: 0 0 30px rgba(22,119,255,.1);
          animation: guaranteePulse 4s ease-in-out infinite;
        }

        @keyframes guaranteePulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 30px rgba(22,119,255,.1);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 42px rgba(22,119,255,.18);
          }
        }

        .guarantee-section h2 {
          margin: 0;
          color: white;
          font-size: clamp(22px, 3.2vw, 34px);
          font-weight: 600;
          line-height: 1;
          letter-spacing: -.045em;
        }

        /* =================================================
           FAQ
           ================================================= */

        .faq-section {
          position: relative;
          z-index: 1;
          width: min(900px, calc(100% - 32px));
          margin: 18px auto 0;
          padding: 65px 0 75px;
        }

        .faq-section h2 {
          margin: 14px 0 28px;
          font-size: clamp(38px, 4vw, 53px);
          line-height: 0.94;
          letter-spacing: -0.05em;
        }

        .faq-section h2 span {
          color: #1677ff;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .faq-list details {
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(255, 255, 255, 0.018);
          border-radius: 13px;
          overflow: hidden;
          transition:
            border-color 0.3s ease,
            background 0.3s ease;
        }

        .faq-list details:hover {
          border-color: rgba(22, 119, 255, 0.25);
        }

        .faq-list details[open] {
          background: rgba(22, 119, 255, 0.035);
          border-color: rgba(22, 119, 255, 0.2);
        }

        .faq-list summary {
          min-height: 62px;
          padding: 0 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          list-style: none;
          font-size: 11px;
          font-weight: 650;
        }

        .faq-list summary::-webkit-details-marker {
          display: none;
        }

        .faq-list summary span {
          width: 24px;
          height: 24px;
          display: grid;
          place-items: center;
          color: #1677ff;
          font-size: 17px;
          font-weight: 300;
          transition: transform 0.3s ease;
        }

        .faq-list details[open] summary span {
          transform: rotate(45deg);
        }

        .faq-list details p {
          margin: 0;
          padding: 0 18px 19px;
          color: rgba(255, 255, 255, 0.4);
          font-size: 9px;
          line-height: 1.7;
        }

        /* =================================================
           FOOTER
           ================================================= */

        .footer {
          position: relative;
          z-index: 1;
          width: min(1160px, calc(100% - 32px));
          margin: 0 auto;
          padding: 45px 0 25px;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
        }

        .footer-main {
          display: flex;
          justify-content: space-between;
          gap: 40px;
        }

        .footer-brand img {
          width: 100px;
          max-height: 35px;
          object-fit: contain;
        }

        .footer-brand p {
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.3);
          font-size: 8px;
        }

        .footer-links {
          display: flex;
          gap: 70px;
        }

        .footer-links > div {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .footer-links strong {
          color: rgba(255, 255, 255, 0.78);
          font-size: 8px;
          margin-bottom: 3px;
        }

        .footer-links a {
          color: rgba(255, 255, 255, 0.3);
          font-size: 7px;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: #fff;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 45px;
          padding-top: 17px;
          border-top: 1px solid rgba(255, 255, 255, 0.055);
          color: rgba(255, 255, 255, 0.2);
          font-size: 6px;
        }

        /* =================================================
           RESPONSIVE — TABLET
           ================================================= */

        @media (max-width: 900px) {
          .hero {
            grid-template-columns: 1fr;
            padding: 45px 28px 35px;
          }

          .hero-content {
            max-width: 700px;
          }

          .hero-dashboard {
            margin-top: 10px;
          }

          .dashboard-shell {
            max-width: 650px;
            margin: auto;
          }

          .how-layout {
            grid-template-columns: 1fr 0.55fr;
          }

          .steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .spending-visual {
            grid-template-columns: 1fr 190px 1fr;
          }

          .phone {
            width: 145px;
            height: 292px;
          }

          .phone-wrap {
            transform: scale(0.92);
          }

          .about-section {
            grid-template-columns: 1fr;
          }

          .about-image {
            min-height: 290px;
          }

          .about-copy {
            padding: 35px;
          }

          .features-section {
            flex-direction: column;
            align-items: flex-start;
          }

          .feature-cards {
            width: 100%;
          }

          .feature-card {
            width: 100%;
          }
        }

        /* =================================================
           RESPONSIVE — MOBILE
           ================================================= */

        @media (max-width: 650px) {
          .price-section {
            width: calc(100% - 20px);
            min-height: auto;
            margin-top: 10px;
            padding: 45px 20px 48px;
            grid-template-columns: 1fr;
            gap: 26px;
            border-radius: 22px;
          }

          .price-heading {
            width: 100%;
            margin-bottom: 0;
            text-align: left;
          }

          .price-heading h2 {
            font-size: 35px;
          }

          .price-heading p {
            font-size: 10px;
          }

          .price-card {
            width: 100%;
            min-height: 0;
            padding: 25px 21px 21px;
            border-radius: 20px;
          }

          .price-card h3 {
            font-size: 25px;
          }

          .price-value {
            font-size: 44px;
          }

          .price-benefits li {
            font-size: 9px;
          }

          .guarantee-section > div {
            min-height: 110px;
            padding: 24px 18px;
            border-radius: 22px;
          }

          .guarantee-icon {
            width: 42px;
            height: 42px;
            font-size: 17px;
          }

          .guarantee-section h2 {
            font-size: 24px;
          }


          .navbar {
            width: calc(100% - 20px);
            top: 8px;
            margin-top: 8px;
            height: 55px;
            padding-left: 14px;
          }

          .nav-logo img {
            width: 70px;
          }

          .nav-links {
            position: absolute;
            left: 0;
            right: 0;
            top: calc(100% + 8px);

            display: none;
            flex-direction: column;
            align-items: stretch;
            gap: 0;

            padding: 7px;

            border-radius: 17px;
            background: rgba(4, 9, 15, 0.95);
            border: 1px solid rgba(73, 141, 226, 0.2);
            backdrop-filter: blur(20px);
          }

          .nav-links.open {
            display: flex;
          }

          .nav-links a {
            padding: 14px;
            font-size: 11px;
            border-radius: 10px;
          }

          .nav-links a:hover {
            background: rgba(22, 119, 255, 0.08);
          }

          .nav-button {
            display: none;
          }

          .mobile-menu {
            display: block;
          }

          .hero,
          .stats-section,
          .light-section,
          .testimonials-section,
          .about-section,
          .airplane-section,
          .features-section,
          .cta-section {
            width: calc(100% - 20px);
          }

          .hero {
            margin-top: 8px;
            min-height: auto;
            padding: 39px 20px 25px;
            border-radius: 22px;
          }

          .hero h1 {
            font-size: 47px;
            line-height: 0.94;
          }

          .hero-description {
            font-size: 12px;
            max-width: 100%;
          }

          .hero-buttons {
            width: 100%;
          }

          .primary-button,
          .secondary-button {
            flex: 1;
            padding: 0 12px;
            font-size: 10px;
          }

          .hero-benefits {
            gap: 8px;
          }

          .hero-benefits span {
            font-size: 7px;
          }

          .hero-dashboard {
            overflow: visible;
          }

          .dashboard-shell {
            min-height: 235px;
            border-radius: 17px;
            transform: scale(1.02);
            transform-origin: center;
          }

          .dashboard-body {
            min-height: 192px;
          }

          .dashboard-sidebar {
            width: 67px;
          }

          .dashboard-sidebar div {
            font-size: 5px;
            padding: 7px 5px;
          }

          .dashboard-main {
            padding: 10px;
          }

          .dashboard-cards {
            gap: 4px;
          }

          .dashboard-cards > div {
            padding: 7px;
          }

          .dashboard-cards strong {
            font-size: 7px;
          }

          .dashboard-chart-card,
          .dashboard-goal-card {
            padding: 7px;
          }

          .bars {
            height: 76px;
            gap: 5px;
          }

          .goal-status {
            margin-top: 9px;
          }

          .stats-section {
            grid-template-columns: repeat(2, 1fr);
            padding: 10px;
            gap: 0;
            border-radius: 18px;
          }

          .stats-card {
            padding: 13px 8px;
            border-right: 0;
          }

          .stats-card:nth-child(-n + 2) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.055);
          }

          .stats-card strong {
            font-size: 19px;
          }

          .stats-card span {
            font-size: 7px;
            line-height: 1.3;
          }

          /* light sections */

          .light-section {
            border-radius: 22px;
          }

          .how-section {
            padding: 31px 19px;
          }

          .how-layout {
            display: flex;
            flex-direction: column;
          }

          .how-copy h2 {
            font-size: 38px;
            line-height: 0.98;
          }

          .how-copy > p {
            font-size: 10px;
            line-height: 1.65;
          }

          .steps-grid {
            gap: 6px;
          }

          .step-card {
            min-height: 77px;
            padding: 11px;
          }

          .step-card strong {
            font-size: 9px;
          }

          .step-card span {
            font-size: 6px;
          }

          .how-phone {
            margin-top: -3px;
          }

          .phone-wrap {
            transform: scale(0.92);
          }

          /* testimonials */

          .testimonials-section {
            padding: 31px 19px 25px;
            border-radius: 22px;
          }

          .testimonials-section h2 {
            font-size: 37px;
          }

          .section-description {
            font-size: 9px;
          }

          .reviews-wrapper {
            width: calc(100% + 38px);
            margin-left: -19px;
            padding-left: 19px;
            padding-right: 19px;
          }

          .reviews-track {
            animation-duration: 48s;
          }

          .review-card {
            width: 290px;
            min-height: 170px;
          }

          /* spending */

          .spending-section {
            padding: 31px 15px 25px;
          }

          .center-title {
            font-size: 38px;
          }

          .center-description {
            font-size: 9px;
            max-width: 330px;
          }

          .spending-visual {
            display: grid;
            grid-template-columns: 1fr 145px 1fr;
            gap: 2px;
            min-height: 310px;
          }

          .spending-left,
          .spending-right {
            gap: 50px;
          }

          .spending-left {
            align-items: flex-start;
          }

          .spending-right {
            align-items: flex-end;
          }

          .info-pill {
            width: 118px;
            min-height: 50px;
            padding: 7px;
            gap: 6px;
            border-radius: 10px;
          }

          .info-icon {
            width: 23px;
            height: 23px;
            font-size: 8px;
          }

          .info-pill strong {
            font-size: 6px;
          }

          .info-pill span {
            font-size: 5px;
          }

          .center-phone {
            transform: scale(0.77);
            transform-origin: center;
          }

          /* about */

          .about-section {
            border-radius: 22px;
          }

          .about-image {
            min-height: 240px;
          }

          .about-dashboard {
            width: 105%;
            transform: scale(0.73);
          }

          .about-copy {
            padding: 30px 20px 35px;
          }

          .about-copy h2 {
            font-size: 36px;
          }

          .about-copy > p {
            font-size: 9px;
          }

          /* airplane */

          .airplane-section {
            min-height: 320px;
            border-radius: 22px;
          }

          .airplane-background img {
            width: 145%;
            height: 110%;
            object-position: 66% center;
          }

          .airplane-overlay {
            background:
              linear-gradient(
                90deg,
                rgba(3, 50, 139, 0.94),
                rgba(4, 65, 155, 0.7) 52%,
                rgba(0, 40, 120, 0.18)
              );
          }

          .airplane-content {
            width: 80%;
            padding: 36px 20px;
          }

          .airplane-content h2 {
            font-size: 40px;
          }

          .airplane-content p {
            font-size: 8px;
          }

          /* features */

          .features-section {
            padding: 31px 20px;
            border-radius: 22px;
          }

          .features-copy h2 {
            font-size: 37px;
          }

          .feature-cards {
            gap: 5px;
          }

          .feature-card {
            height: 90px;
          }

          /* CTA */

          .cta-section {
            padding: 65px 18px;
            border-radius: 22px;
          }

          .cta-section h2 {
            font-size: 44px;
          }

          .cta-section p {
            font-size: 9px;
          }

          /* FAQ */

          .faq-section {
            width: calc(100% - 40px);
            padding: 50px 0 60px;
          }

          .faq-section h2 {
            font-size: 40px;
          }

          .faq-list summary {
            min-height: 57px;
            font-size: 10px;
          }

          .faq-list details p {
            font-size: 8px;
          }

          /* footer */

          .footer {
            width: calc(100% - 40px);
          }

          .footer-main {
            flex-direction: column;
          }

          .footer-links {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
          }

          .footer-links > div {
            gap: 8px;
          }

          .footer-bottom {
            flex-direction: column;
            gap: 7px;
          }
        }

        /* =================================================
           SMALL MOBILE
           ================================================= */

        @media (max-width: 390px) {
          .hero h1 {
            font-size: 42px;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .primary-button,
          .secondary-button {
            width: 100%;
          }

          .dashboard-shell {
            transform: scale(0.96);
          }

          .center-phone {
            transform: scale(0.7);
          }

          .spending-visual {
            grid-template-columns: 1fr 125px 1fr;
          }

          .info-pill {
            width: 105px;
          }

          .airplane-content {
            width: 88%;
          }
        }

        /* =================================================
           REDUCED MOTION
           ================================================= */

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
"use client";

/**
 * CLOOE — Landing page de vendas (tema escuro + azul royal)
 * Estrutura espelha o layout de referência (hero com mockups,
 * lista + painel de destaque, "por que escolher", linha do tempo,
 * galeria de telas, conquistas, FAQ numerado, footer).
 *
 * ZERO dependências externas — só React + Next.js puro.
 * Imagem esperada em /public: /mascote.png
 */

import { useEffect, useRef, useState } from "react";

const CHECKOUT_URL = "https://pay.cakto.com.br/325sapc_1001528";
const BLUE = "#2563FF";
const BLUE_2 = "#4E7CFF";

// ---------------------------------------------------------------
// ANIMAÇÃO (sem libs externas)
// ---------------------------------------------------------------
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setShown(true); obs.unobserve(e.target); } }),
      { threshold: 0.15, rootMargin: "-40px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"} ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function AnimatedBar({ percent }: { percent: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setW(percent); obs.unobserve(e.target); } }),
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [percent]);
  return <div ref={ref} className="h-full rounded-full transition-[width] duration-[1400ms] ease-out" style={{ width: `${w}%`, background: `linear-gradient(90deg, ${BLUE}, ${BLUE_2})` }} />;
}

// ---------------------------------------------------------------
// CONTEÚDO
// ---------------------------------------------------------------
const NAV_LINKS = [
  { label: "Recursos", href: "#recursos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Planos", href: "#planos" },
];

const TAGS = ["Transações", "Metas", "Consultor IA", "Relatórios", "Clooe Check", "Categorias", "Economia", "Planejamento", "Dashboard", "Conquistas"];

const SIDE_FEATURES = [
  { title: "Transações", desc: "Veja tudo que entra e sai, categorizado sozinho.", highlight: true },
  { title: "Metas", desc: "Defina objetivos e acompanhe o progresso real." },
  { title: "Consultor IA", desc: "Pergunte e receba respostas no seu momento financeiro." },
  { title: "Clooe Check", desc: "Tarefas e lembretes pra manter tudo em dia." },
];

const FEATURES = [
  { icon: "💰", title: "Visão completa", desc: "Receitas, despesas e saldo em tempo real, sempre visíveis." },
  { icon: "🏷️", title: "Categorização automática", desc: "A Clooe identifica e organiza seus gastos sozinha." },
  { icon: "🎯", title: "Metas e objetivos", desc: "Crie metas, acompanhe o progresso e chegue lá." },
  { icon: "✨", title: "Consultor com IA", desc: "Pergunte e receba recomendações no seu momento financeiro." },
  { icon: "📊", title: "Relatórios inteligentes", desc: "Dados financeiros viram informação fácil de entender." },
  { icon: "✅", title: "Clooe Check", desc: "Tarefas, listas e lembretes pra manter tudo em dia." },
];

const FAQ_ITEMS = [
  { q: "A Clooe substitui uma planilha?", a: "Sim. O app organiza o plano, facilita registros e mantém sua evolução financeira visível — sem fórmula, sem planilha manual." },
  { q: "Consigo cuidar de gastos e metas no mesmo lugar?", a: "Sim. Transações, categorias, metas e o Consultor IA ficam todos dentro da mesma plataforma." },
  { q: "A plataforma funciona pra quem está começando do zero?", a: "Sim. Você não precisa entender de finanças — a Clooe te guia desde o primeiro registro." },
  { q: "Como a Clooe mostra minha evolução?", a: "Com gráficos, categorias organizadas e o progresso das suas metas sempre visível no dashboard." },
  { q: "Meus dados ficam protegidos?", a: "Você é quem registra as informações — a Clooe organiza e analisa, mas nunca movimenta dinheiro nem acessa sua conta bancária." },
  { q: "Onde posso começar a usar?", a: "Direto por aqui — o acesso chega no e-mail usado no pagamento, assim que a compra é confirmada." },
];

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#05070C] text-white font-sans selection:bg-[#2563FF] selection:text-white">
      {/* NAVBAR */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#05070C]/90 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"}`}>
        <nav className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 md:px-10">
          <span className="text-lg font-extrabold tracking-tight" style={{ color: BLUE_2 }}>clooe</span>
          <div className="hidden items-center gap-7 text-[13.5px] font-semibold text-[#9AA3B2] md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="transition-colors hover:text-white">{l.label}</a>
            ))}
          </div>
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13.5px] font-bold text-white transition-transform hover:-translate-y-0.5"
            style={{ background: BLUE, boxShadow: `0 8px 22px -6px ${BLUE}80` }}>
            Entrar →
          </a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pt-10 md:pt-16">
          <div className="mx-auto max-w-[1240px] px-6 md:px-10">
            <Reveal>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className="-ml-2 h-7 w-7 overflow-hidden rounded-full border-2 border-[#05070C] first:ml-0" style={{ background: `linear-gradient(135deg, ${BLUE}, ${BLUE_2})` }}>
                      <img src="/mascote.png" alt="" className="h-full w-full object-cover object-top opacity-85" />
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-[#9AA3B2]">Junte-se a quem já começou</span>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1.1fr]">
              <div>
                <Reveal delay={0.06}>
                  <h1 className="text-[40px] font-extrabold leading-[1.08] tracking-tight md:text-[54px]">
                    Organize seu dinheiro<br />
                    Entenda seus gastos<br />
                    <span style={{ color: BLUE_2 }}>Economize de verdade</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.14}>
                  <p className="mt-6 max-w-[420px] text-[15.5px] text-[#9AA3B2]">
                    Gastos, metas, consultor com IA e clareza real sobre o seu dinheiro em um só lugar, todos os dias.
                  </p>
                </Reveal>
                <Reveal delay={0.22}>
                  <div className="mt-8 flex flex-wrap gap-3.5">
                    <a href="#recursos" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white/25">
                      ▶ Ver a plataforma
                    </a>
                    <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                      style={{ background: BLUE, boxShadow: `0 10px 26px -6px ${BLUE}99` }}>
                      ✦ Começar agora
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.2}>
                <HeroCollage />
              </Reveal>
            </div>
          </div>

          {/* TAG STRIP */}
          <div className="mt-16 overflow-hidden border-y border-white/[0.06] py-5">
            <div className="flex w-max animate-[marquee_26s_linear_infinite] gap-2.5">
              {[...TAGS, ...TAGS].map((t, i) => (
                <span key={i} className="whitespace-nowrap rounded-full border border-white/[0.08] px-4 py-2 text-[12.5px] font-semibold text-[#9AA3B2]">{t}</span>
              ))}
            </div>
            <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
          </div>
        </section>

        {/* LISTA + PAINEL DE DESTAQUE */}
        <section id="como-funciona" className="mx-auto max-w-[1240px] px-6 py-24 md:px-10">
          <Reveal className="mb-12 max-w-[560px]">
            <h2 className="text-3xl font-extrabold leading-tight md:text-[38px]">Do registro à clareza. Sem perder o histórico.</h2>
            <p className="mt-3 text-[#9AA3B2]">Registre o que entra e sai, entenda o que mudou e saiba qual é o próximo passo.</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
            <Reveal className="flex flex-col gap-1.5">
              {SIDE_FEATURES.map((f) => (
                <div key={f.title} className={`rounded-xl border-l-2 p-4 ${f.highlight ? "bg-white/[0.04]" : "border-transparent"}`} style={{ borderColor: f.highlight ? BLUE_2 : "transparent" }}>
                  <h4 className="mb-1 text-sm font-bold">{f.title}</h4>
                  <p className="text-xs text-[#8B93A3]">{f.desc}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0A0D16] p-8 md:p-12">
                <div
                  className="pointer-events-none absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full opacity-40"
                  style={{ background: `radial-gradient(circle, ${BLUE}55, transparent 70%)`, filter: "blur(40px)" }}
                />
                <span className="relative mb-5 inline-block rounded-full px-3 py-1 text-[11px] font-bold" style={{ background: `${BLUE}22`, color: BLUE_2 }}>Transações</span>
                <h3 className="relative mb-3 max-w-[420px] text-2xl font-extrabold leading-tight md:text-[32px]">
                  Sua próxima decisão financeira não precisa ser um chute.
                </h3>
                <p className="relative mb-8 max-w-[400px] text-sm text-[#9AA3B2]">
                  A Clooe abre com seu histórico de gastos. Registre cada entrada e compare sua evolução sem depender de planilha ou memória.
                </p>
                <div className="relative flex justify-center md:justify-end">
                  <MiniDashboard />
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* POR QUE ESCOLHER */}
        <section className="mx-auto max-w-[1240px] px-6 py-10 md:px-10">
          <div className="rounded-[28px] border border-white/[0.06] bg-[#0A0D16] p-8 md:p-14">
            <Reveal className="mb-10">
              <h2 className="text-3xl font-extrabold md:text-[38px]">Por que escolher a <span style={{ color: BLUE_2 }}>clooe</span>?</h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.2fr]">
              <Reveal>
                <div className="relative flex h-[160px] w-[160px] items-center justify-center">
                  <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, ${BLUE}30, transparent 70%)`, filter: "blur(20px)" }} />
                  <div className="relative text-center">
                    <div className="text-xs text-[#8B93A3]">Pensado pra</div>
                    <div className="text-sm font-bold text-white">organizar sua<br />vida financeira</div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col gap-3.5">
                {[
                  { icon: "🧩", title: "Tudo em um", desc: "sem precisar abrir três apps diferentes pra entender o que sobrou" },
                  { icon: "✨", title: "Consultor sempre por perto", desc: "a IA analisa seus gastos e responde na hora" },
                  { icon: "🎯", title: "Metas que viram conquista", desc: "progresso real, visível a cada aporte" },
                ].map((c) => (
                  <div key={c.title} className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-5 py-4">
                    <div>
                      <div className="text-sm font-bold text-white">{c.title}</div>
                      <div className="text-xs text-[#8B93A3]">{c.desc}</div>
                    </div>
                    <span className="text-lg">{c.icon}</span>
                  </div>
                ))}
              </Reveal>
            </div>

            {/* LINHA DO TEMPO */}
            <Reveal delay={0.15} className="mt-12">
              <div className="flex items-center justify-between text-[11px] font-semibold text-[#8B93A3]">
                <span>Da rotina à evolução</span>
                <span>✦ Progresso registrado</span>
              </div>
              <div className="relative my-4 h-[2px] w-full rounded-full bg-white/[0.08]">
                <div className="absolute inset-y-0 left-0 w-full rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${BLUE_2})` }} />
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span>Hoje <span className="font-normal text-[#8B93A3]">comece</span></span>
                <span>Histórico <span className="font-normal text-[#8B93A3]">acompanhe sua evolução</span></span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* GALERIA DE TELAS (sem fotos reais de pessoas) */}
        <section className="mx-auto max-w-[1240px] px-6 py-24 md:px-10">
          <Reveal className="mb-10 max-w-[480px]">
            <h2 className="text-3xl font-extrabold leading-tight md:text-[36px]">A plataforma por dentro.</h2>
            <p className="mt-3 text-[#9AA3B2]">Dashboard, metas e consultor — tudo pensado pra ficar claro de bater o olho.</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { t: "Dashboard", c: "💰" },
              { t: "Metas", c: "🎯" },
              { t: "Consultor IA", c: "✨" },
              { t: "Relatórios", c: "📊" },
            ].map((g, i) => (
              <Reveal key={g.t} delay={i * 0.06}>
                <div className="flex aspect-[3/4] flex-col items-center justify-center gap-3 rounded-2xl border border-white/[0.06] bg-[#0A0D16] p-5">
                  <span className="text-3xl">{g.c}</span>
                  <span className="text-xs font-semibold text-[#9AA3B2]">{g.t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* RECURSOS (GRID) */}
        <section id="recursos" className="mx-auto max-w-[1240px] px-6 py-24 md:px-10">
          <Reveal className="mx-auto mb-14 max-w-[600px] text-center">
            <h2 className="text-3xl font-extrabold leading-tight md:text-[40px]">
              Tudo que você precisa pra ter <span style={{ color: BLUE_2 }}>controle</span> do seu dinheiro
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06}>
                <div className="h-full rounded-[20px] border border-white/[0.06] bg-[#0A0D16] p-6 transition-all hover:-translate-y-1 hover:border-white/20">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-lg" style={{ background: `${BLUE}1A` }}>{f.icon}</div>
                  <h3 className="mb-1.5 text-[15px] font-bold">{f.title}</h3>
                  <p className="text-[13px] text-[#8B93A3]">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CONQUISTAS (adaptação da seção PRO) */}
        <section className="mx-auto max-w-[1240px] px-6 py-10 md:px-10">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.06] p-8 md:p-14" style={{ background: `linear-gradient(135deg, ${BLUE}14, #0A0D16)` }}>
            <span className="mb-4 inline-block text-xs font-extrabold tracking-wide" style={{ color: BLUE_2 }}>PLANO MASTER</span>
            <h2 className="mb-3 max-w-[460px] text-3xl font-extrabold leading-tight md:text-[36px]">Constância vira conquista.</h2>
            <p className="mb-7 max-w-[440px] text-sm text-[#9AA3B2]">
              A cada marco batido, a Clooe gera um certificado da sua evolução — uma forma de ver, de verdade, o quanto você já economizou.
            </p>
            <div className="mb-8 flex flex-wrap gap-5 text-xs font-semibold text-[#9AA3B2]">
              <span>🏆 Certificados de conquista</span>
              <span>🎯 Metas ilimitadas</span>
              <span>✨ Consultor sempre disponível</span>
            </div>
            <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
              style={{ background: BLUE, boxShadow: `0 10px 26px -6px ${BLUE}99` }}>
              Quero fazer parte
            </a>
          </div>
        </section>

        {/* PREÇO */}
        <section id="planos" className="mx-auto max-w-[1240px] px-6 py-24 md:px-10">
          <Reveal className="mx-auto mb-14 max-w-[600px] text-center">
            <h2 className="text-3xl font-extrabold leading-tight md:text-[40px]">Comece a cuidar melhor do seu dinheiro</h2>
          </Reveal>
          <Reveal>
            <div className="mx-auto max-w-[400px] rounded-[24px] border p-9" style={{ borderColor: `${BLUE}40`, background: "#0A0D16" }}>
              <div className="mb-2 text-sm font-bold" style={{ color: BLUE_2 }}>Plano Master</div>
              <div className="mb-1 text-[42px] font-extrabold leading-none">R$ 197 <span className="text-sm font-medium text-[#8B93A3]">único</span></div>
              <div className="mb-6 mt-3 text-[13px] text-[#9AA3B2]">Acesso completo à plataforma Clooe.</div>
              <ul className="mb-7">
                {["Organização financeira", "Dashboard completo", "Metas financeiras", "Clooe Check", "Consultor com IA", "Relatórios"].map((f, i) => (
                  <li key={f} className={`flex items-center gap-2.5 py-2.5 text-sm text-[#D6DBEA] ${i !== 0 ? "border-t border-white/[0.06]" : ""}`}>
                    <span className="font-extrabold" style={{ color: BLUE_2 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer"
                className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                style={{ background: BLUE, boxShadow: `0 10px 26px -6px ${BLUE}99` }}>
                Começar agora
              </a>
              <div className="text-center text-xs text-[#687284]">30 dias de garantia · Sem mensalidade</div>
            </div>
          </Reveal>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-[780px] px-6 py-24 md:px-10">
          <Reveal className="mb-10">
            <h2 className="text-3xl font-extrabold md:text-[36px]">O que você precisa saber<br />antes de começar.</h2>
            <p className="mt-3 text-[#9AA3B2]">Respostas diretas sobre como a Clooe organiza sua vida financeira.</p>
          </Reveal>
          <Reveal>
            <div>
              {FAQ_ITEMS.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={item.q} className={`border-t border-white/[0.07] ${i === FAQ_ITEMS.length - 1 ? "border-b" : ""}`}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 py-6 text-left">
                      <span className="flex items-baseline gap-3">
                        <span className="text-xs font-bold" style={{ color: BLUE_2 }}>{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-base font-bold">{item.q}</span>
                      </span>
                      <span className={`flex-shrink-0 text-lg transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} style={{ color: BLUE_2 }}>⌄</span>
                    </button>
                    <div className="overflow-hidden transition-[max-height] duration-400 ease-in-out" style={{ maxHeight: isOpen ? "200px" : "0px" }}>
                      <p className="max-w-[620px] pb-6 pl-9 text-[14px] text-[#9AA3B2]">{item.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06] px-6 py-16 md:px-10">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-10 flex flex-col items-start justify-between gap-10 md:flex-row">
            <div>
              <span className="mb-3 block text-lg font-extrabold" style={{ color: BLUE_2 }}>clooe</span>
              <p className="max-w-[280px] text-[13px] text-[#687284]">Clareza pra organizar o dinheiro. Constância pra ver a evolução.</p>
            </div>
            <div className="grid grid-cols-2 gap-10 text-sm">
              <div>
                <h5 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#687284]">Explorar</h5>
                <a href="#recursos" className="mb-2.5 block text-[#9AA3B2] hover:text-white">Recursos</a>
                <a href="#planos" className="mb-2.5 block text-[#9AA3B2] hover:text-white">Planos</a>
                <a href="#faq" className="mb-2.5 block text-[#9AA3B2] hover:text-white">FAQ</a>
              </div>
              <div>
                <h5 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#687284]">Informações</h5>
                <a href="/termos" className="mb-2.5 block text-[#9AA3B2] hover:text-white">Termos</a>
                <a href="https://www.instagram.com/clooeoficial/" target="_blank" rel="noopener noreferrer" className="mb-2.5 block text-[#9AA3B2] hover:text-white">Instagram</a>
                <a href="https://www.tiktok.com/@ceoclooe?lang=pt-BR" target="_blank" rel="noopener noreferrer" className="mb-2.5 block text-[#9AA3B2] hover:text-white">TikTok</a>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-white/[0.06] pt-6 text-xs text-[#687284]">
            <span>© 2026 Clooe. Todos os direitos reservados.</span>
            <span>Feito com 💙 no Brasil</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------
// SUBCOMPONENTES
// ---------------------------------------------------------------

function MiniDashboard() {
  return (
    <div className="w-full max-w-[320px] rounded-2xl border border-white/[0.08] bg-[#05070C] p-4">
      <div className="mb-3 flex items-center justify-between text-[11px] font-bold" style={{ color: BLUE_2 }}>clooe</div>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {[{ l: "SALDO", v: "R$4.385" }, { l: "REC.", v: "R$7.850" }, { l: "DESP.", v: "R$3.465" }].map((s) => (
          <div key={s.l} className="rounded-lg bg-white/[0.03] px-2 py-1.5">
            <div className="text-[6.5px] text-[#687284]">{s.l}</div>
            <div className="text-[10px] font-extrabold">{s.v}</div>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 260 60" className="w-full">
        <path d="M0,46 L30,38 L60,44 L90,24 L120,32 L150,14 L180,26 L210,10 L240,18 L260,12" fill="none" stroke={BLUE_2} strokeWidth="2" />
      </svg>
    </div>
  );
}

/** Colagem de mockups no hero: dashboard + celular + card de meta, sobrepostos. */
function HeroCollage() {
  return (
    <div className="relative mx-auto h-[380px] max-w-[520px] md:h-[440px]">
      <div
        className="pointer-events-none absolute right-0 top-0 h-[360px] w-[360px] rounded-full opacity-40"
        style={{ background: `radial-gradient(circle, ${BLUE}55, transparent 70%)`, filter: "blur(50px)" }}
      />
      {/* celular central */}
      <div className="absolute left-1/2 top-0 w-[190px] -translate-x-1/2 overflow-hidden rounded-[28px] border border-white/10 bg-[#05070C] p-2.5 shadow-[0_40px_90px_-20px_rgba(0,0,0,0.8)]">
        <div className="rounded-[20px] bg-[#0A0D16] p-3.5">
          <div className="mb-2 text-[11px] font-extrabold" style={{ color: BLUE_2 }}>clooe</div>
          <div className="mb-0.5 text-[7px] text-[#687284]">SALDO ATUAL</div>
          <div className="mb-3 text-base font-extrabold">R$ 4.385,00</div>
          <svg viewBox="0 0 160 36" className="mb-3 w-full">
            <path d="M0,26 L20,22 L40,27 L60,15 L80,19 L100,9 L120,16 L140,5 L160,11" fill="none" stroke={BLUE_2} strokeWidth="1.8" />
          </svg>
          <div className="space-y-1">
            <div className="flex justify-between text-[7.5px]"><span className="text-[#8B93A3]">Supermercado</span><span className="text-[#FF6B6B]">-R$145,40</span></div>
            <div className="flex justify-between text-[7.5px]"><span className="text-[#8B93A3]">Salário</span><span className="text-[#3DDC97]">+R$7.850,00</span></div>
          </div>
        </div>
      </div>

      {/* card de meta flutuando */}
      <div className="absolute bottom-10 left-0 w-[160px] rounded-2xl border border-white/10 bg-[#0A0D16] p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
        <div className="mb-2 flex items-center justify-between text-[11px] font-bold">
          <span>🚗 Carro</span><span style={{ color: BLUE_2 }}>31%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full" style={{ width: "31%", background: `linear-gradient(90deg, ${BLUE}, ${BLUE_2})` }} />
        </div>
      </div>

      {/* card de IA flutuando */}
      <div className="absolute bottom-0 right-0 w-[180px] rounded-2xl border border-white/10 bg-[#0A0D16] p-4 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
        <div className="mb-1.5 text-[10px] font-bold" style={{ color: BLUE_2 }}>✨ Consultor IA</div>
        <p className="text-[10.5px] leading-snug text-[#D6DBEA]">
          "Se reduzir 2 pedidos de delivery, sobra mais pra sua meta."
        </p>
      </div>
    </div>
  );
}
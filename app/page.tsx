"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import Script from "next/script";
import { Plus_Jakarta_Sans } from "next/font/google";

const META_PIXEL_ID = "866729919594397";
const CHECKOUT_URL = "https://pay.cakto.com.br/325sapc_1001528";
const TERMS_URL = "/termos";
const GUARANTEE_URL = "/garantia";
const PRIVACY_URL: string | null = null;
const INSTAGRAM_URL = "https://www.instagram.com/clooeoficial/";
const TIKTOK_URL = "https://www.tiktok.com/@useclooe";
const DASHBOARD_SCREENSHOT_SRC: string | null = null;
const COMPANY_LEGAL_INFO: string | null = null;

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const ROYAL = "#2563EB";
const NAVY = "#0B1B4D";
const BLUE_BG =
  "radial-gradient(90% 70% at 85% 0%, rgba(255,255,255,0.16), transparent 60%), #2563EB";

const NAV_LINKS = [
  { label: "Benefícios", href: "#beneficios" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Plano", href: "#plano" },
  { label: "FAQ", href: "#faq" },
];

const PAIN_POINTS = [
  "Você não sabe exatamente quanto gastou.",
  "É difícil acompanhar o saldo ao longo do mês.",
  "Fica complicado decidir quanto pode gastar.",
];

const SOLUTION_BENEFITS = [
  "Registre suas entradas e gastos.",
  "Acompanhe seu saldo.",
  "Visualize suas movimentações de forma organizada.",
];

type IconName =
  | "plusCircle"
  | "wallet"
  | "lightbulb"
  | "layers"
  | "eye"
  | "phone"
  | "spark"
  | "shield"
  | "check"
  | "send"
  | "chevron"
  | "menu"
  | "close"
  | "arrow"
  | "clock"
  | "bell"
  | "home"
  | "target";

const STEPS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "plusCircle",
    title: "Registre suas movimentações",
    text: "Adicione suas entradas e seus gastos para manter suas informações financeiras organizadas.",
  },
  {
    icon: "wallet",
    title: "Acompanhe seu saldo",
    text: "Visualize o que entrou, o que saiu e quanto está disponível.",
  },
  {
    icon: "lightbulb",
    title: "Tome decisões melhores",
    text: "Use suas informações para planejar melhor os gastos do dia a dia.",
  },
];

const BENEFITS: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "layers",
    title: "Mais organização",
    text: "Tenha suas movimentações reunidas em um só lugar.",
  },
  {
    icon: "eye",
    title: "Mais clareza",
    text: "Entenda melhor suas entradas, seus gastos e seu saldo.",
  },
  {
    icon: "phone",
    title: "Mais praticidade",
    text: "Consulte suas informações financeiras pelo celular.",
  },
  {
    icon: "spark",
    title: "Mais apoio nas decisões",
    text: "Conte com o Consultor IA para ajudar a analisar sua situação financeira.",
  },
];

const PLAN_FEATURES = [
  "Dashboard com visão geral das suas finanças",
  "Registro de entradas e gastos",
  "Acompanhamento de saldo e movimentações",
  "Metas financeiras",
  "Consultor IA",
  "Acesso pelo navegador, no computador e no celular",
];

const GUARANTEE_POINTS: { icon: IconName; text: string }[] = [
  { icon: "shield", text: "Mais tranquilidade para conhecer a plataforma." },
  { icon: "clock", text: "Tempo para avaliar a experiência." },
  { icon: "check", text: "Uma decisão de compra com mais segurança." },
];

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "Como funciona a CLOOE?",
    a: "A CLOOE é uma plataforma online de organização financeira pessoal. Você registra suas entradas e gastos, acompanha seu saldo e visualiza suas movimentações em um só lugar.",
  },
  {
    q: "Posso acessar pelo celular?",
    a: "Sim. A CLOOE é acessada pelo navegador e tem interface responsiva, então funciona no computador e no celular, sem precisar instalar nada.",
  },
  {
    q: "Como recebo meu acesso após a compra?",
    a: "O acesso é enviado para o e-mail informado no momento do pagamento. Se não encontrar a mensagem, confira também a caixa de spam.",
  },
  {
    q: "Quais funcionalidades estão incluídas?",
    a: "O plano inclui o dashboard, o registro de entradas e gastos, o acompanhamento de saldo e movimentações, as metas financeiras e o Consultor IA.",
  },
  {
    q: "Como funciona o Consultor Financeiro com IA?",
    a: "Ele ajuda você a analisar a sua situação financeira com base nas informações que você registra na plataforma. As respostas têm caráter informativo e educacional e não substituem a orientação de um profissional.",
  },
  {
    q: "Como funciona a garantia de 30 dias?",
    a: (
      <>
        A CLOOE oferece uma garantia comercial de 30 dias, contados a partir
        da confirmação da compra. Consulte as condições completas na página{" "}
        <a
          href={GUARANTEE_URL}
          className="font-semibold underline underline-offset-2"
          style={{ color: ROYAL }}
        >
          Condições de Garantia
        </a>
        . Os direitos do consumidor previstos em lei continuam valendo.
      </>
    ),
  },
  {
    q: "Como posso entrar em contato com o suporte?",
    a: (
      <>
        Pelos canais oficiais de atendimento da CLOOE. Você também pode falar
        com a gente pelo Instagram{" "}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold underline underline-offset-2"
          style={{ color: ROYAL }}
        >
          @clooeoficial
        </a>
        .
      </>
    ),
  },
];

const PAGE_CSS = `
html{scroll-behavior:smooth}
.cl-root :focus-visible{outline:3px solid #2563EB;outline-offset:3px}
.cl-on-blue :focus-visible{outline-color:#fff}
.cl-reveal{opacity:0;transform:translate3d(0,28px,0);transition:opacity .85s cubic-bezier(.2,.7,.2,1),transform .85s cubic-bezier(.2,.7,.2,1)}
.cl-reveal.is-in{opacity:1;transform:none}
.cl-hero-in{animation:clHeroIn .9s cubic-bezier(.2,.7,.2,1) both}
.cl-msg-in{animation:clMsg .55s cubic-bezier(.2,.7,.2,1) both}
.cl-dot{animation:clDot 1.2s ease-in-out infinite}
.cl-seal-wrap{perspective:900px}
.cl-seal{transition:transform .5s;transform-style:preserve-3d}
.cl-seal-wrap:hover .cl-seal{transform:rotateY(12deg) rotateX(-6deg)}
@keyframes clHeroIn{from{opacity:0;transform:translate3d(0,22px,0)}to{opacity:1;transform:none}}
@keyframes clMsg{from{opacity:0;transform:translate3d(0,14px,0) scale(.98)}to{opacity:1;transform:none}}
@keyframes clDot{0%,80%,100%{transform:translateY(0);opacity:.45}40%{transform:translateY(-4px);opacity:1}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.cl-reveal{opacity:1;transform:none;transition:none}.cl-hero-in,.cl-msg-in,.cl-dot{animation:none}.cl-seal{transition:none}.cl-seal-wrap:hover .cl-seal{transform:none}}
`;

const NOSCRIPT_CSS =
  ".cl-reveal{opacity:1!important;transform:none!important}.cl-hero-in{animation:none!important}";

const ICONS: Record<IconName, ReactNode> = {
  plusCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v8M8 12h8" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="3" />
      <path d="M3 10h18M16 14.5h2" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3zM19 16l.7 1.8 1.8.7-1.8.7L19 21l-.7-1.8-1.8-.7 1.8-.7L19 16z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.2 8.3-8 9-4.8-.7-8-4.5-8-9V6l8-3zM9 12l2 2 4-4" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  send: (
    <>
      <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-8.5L2 8.5 21 3z" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 1 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9zM10 20a2 2 0 0 0 4 0" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-7 9 7M5 10v10h14V10" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
};

function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`cl-reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

function Section({
  id,
  titleId,
  tone,
  index,
  children,
}: {
  id: string;
  titleId: string;
  tone: "white" | "blue";
  index: number;
  children: ReactNode;
}) {
  const blue = tone === "blue";

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`relative -mt-10 scroll-mt-24 rounded-t-[2.25rem] pb-28 pt-20 md:-mt-14 md:rounded-t-[3.5rem] md:pb-40 md:pt-28 ${
        blue ? "cl-on-blue" : ""
      }`}
      style={{
        zIndex: index + 1,
        background: blue ? BLUE_BG : "#fff",
        color: blue ? "#fff" : NAVY,
        boxShadow: "0 -1.5rem 3rem -1.5rem rgba(11,27,77,0.28)",
      }}
    >
      {children}
    </section>
  );
}

const H2_CLASS =
  "text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.9rem] [text-wrap:balance]";

function Eyebrow({
  children,
  blue = false,
}: {
  children: ReactNode;
  blue?: boolean;
}) {
  return (
    <p
      className={`mb-4 text-xs font-bold uppercase tracking-[0.2em] ${
        blue ? "text-white/[0.7]" : ""
      }`}
      style={blue ? undefined : { color: ROYAL }}
    >
      {children}
    </p>
  );
}

function CtaButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "light";
  className?: string;
}) {
  const styles =
    variant === "primary"
      ? "text-white shadow-[0_14px_34px_-12px_rgba(37,99,235,0.75)] hover:shadow-[0_18px_40px_-12px_rgba(37,99,235,0.85)]"
      : "bg-white shadow-[0_14px_34px_-14px_rgba(11,27,77,0.6)]";

  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full px-7 text-base font-bold transition duration-200 hover:-translate-y-0.5 active:scale-[0.98] motion-reduce:transition-none ${styles} ${className}`}
      style={variant === "primary" ? { background: ROYAL } : { color: ROYAL }}
    >
      {children}
      <Icon
        name="arrow"
        className="h-5 w-5 transition-transform group-hover:translate-x-1"
      />
      <span className="sr-only"> (abre em nova aba)</span>
    </a>
  );
}

function Logo({
  light = false,
  className = "",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`text-[1.35rem] font-extrabold tracking-[0.08em] ${className}`}
      style={{ color: light ? "#fff" : ROYAL }}
    >
      CLOOE
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="relative mx-auto max-w-5xl">
        <nav
          aria-label="Principal"
          className="flex items-center justify-between rounded-full border bg-white/[0.88] py-2 pl-5 pr-2 shadow-[0_10px_34px_rgba(11,27,77,0.14)] backdrop-blur-xl"
          style={{ borderColor: "rgba(11,27,77,0.1)" }}
        >
          <a href="#inicio" aria-label="CLOOE — ir para o início">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-[#EAF1FF] hover:text-[#0B1B4D]"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden min-h-[2.75rem] items-center rounded-full px-5 text-sm font-bold text-white transition hover:-translate-y-0.5 md:inline-flex"
              style={{ background: ROYAL }}
            >
              Quero minha CLOOE
            </a>

            <button
              ref={btnRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid h-11 w-11 place-items-center rounded-full text-[#0B1B4D] hover:bg-[#EAF1FF] md:hidden"
            >
              <Icon name={open ? "close" : "menu"} />
            </button>
          </div>
        </nav>

        {open && (
          <div
            id="menu-mobile"
            className="absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-3xl border bg-white p-3 shadow-xl md:hidden"
          >
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3.5 font-semibold text-[#0B1B4D] hover:bg-[#EAF1FF]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex min-h-[3rem] items-center justify-center rounded-full font-bold text-white"
              style={{ background: ROYAL }}
            >
              Quero minha CLOOE
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function PhoneFrame({
  label,
  children,
  className = "",
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative mx-auto w-[21em] text-[14px] sm:text-[15px] md:text-[17px] lg:text-[19px] ${className}`}
    >
      <div
        className="relative aspect-[9/19.4] w-full rounded-[3.1em]"
        style={{
          background:
            "linear-gradient(145deg,#2A3350 0%,#0B1226 42%,#1B2440 100%)",
          boxShadow:
            "0 2.6em 5em -1.4em rgba(11,27,77,0.55),0 0.6em 1.6em rgba(11,27,77,0.25),inset 0 0 0 0.08em rgba(255,255,255,0.18)",
        }}
      >
        <span className="absolute -left-[0.2em] top-[7em] h-[2.4em] w-[0.24em] rounded-l bg-[#1B2440]" />
        <span className="absolute -left-[0.2em] top-[10.6em] h-[3.6em] w-[0.24em] rounded-l bg-[#1B2440]" />
        <span className="absolute -right-[0.2em] top-[9em] h-[5em] w-[0.24em] rounded-r bg-[#1B2440]" />

        <div className="absolute inset-[0.5em] overflow-hidden rounded-[2.65em] bg-[#F4F7FF]">
          {children}
          <span className="absolute left-1/2 top-[0.75em] z-20 h-[1.7em] w-[6.2em] -translate-x-1/2 rounded-full bg-[#0B1226]" />
          <span
            className="pointer-events-none absolute inset-0 z-30"
            style={{
              background:
                "linear-gradient(115deg,rgba(255,255,255,0.32),transparent 32%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StatusBar({ time = "9:41" }: { time?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[0.74em] font-semibold text-white">{time}</span>
      <span className="flex items-center gap-[0.4em]">
        <span className="flex items-end gap-[0.1em]">
          {[0.35, 0.5, 0.65, 0.8].map((h) => (
            <span
              key={h}
              className="w-[0.17em] rounded-[0.05em] bg-white"
              style={{ height: `${h}em` }}
            />
          ))}
        </span>
        <span className="relative h-[0.62em] w-[1.15em] rounded-[0.2em] border border-white/70">
          <span className="absolute inset-[0.08em] rounded-[0.1em] bg-white" />
        </span>
      </span>
    </div>
  );
}

function TxRow({
  letter,
  name,
  meta,
  value,
  negative = false,
}: {
  letter: string;
  name: string;
  meta: string;
  value: string;
  negative?: boolean;
}) {
  return (
    <div className="flex items-center gap-[0.8em]">
      <span className="grid h-[2.1em] w-[2.1em] shrink-0 place-items-center rounded-[0.7em] bg-[#E6EEFF]">
        <span className="text-[0.8em] font-bold text-[#2563EB]">{letter}</span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.82em] font-semibold text-[#0B1B4D]">
          {name}
        </span>
        <span className="block text-[0.64em] text-slate-500">{meta}</span>
      </span>
      <span
        className={`whitespace-nowrap text-[0.76em] font-bold ${
          negative ? "text-[#DC2626]" : "text-[#2563EB]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function TabBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-10 border-t border-[#0B1B4D]/[0.08] bg-white/[0.95] px-[1.2em] pb-[1.5em] pt-[0.8em]">
      <div className="flex items-center justify-between">
        {(["home", "wallet", "target", "spark"] as IconName[]).map((n, i) => (
          <span
            key={n}
            className={i === 0 ? "text-[#2563EB]" : "text-slate-400"}
          >
            <Icon name={n} className="h-[1.35em] w-[1.35em]" />
          </span>
        ))}
      </div>
      <span className="absolute bottom-[0.45em] left-1/2 h-[0.28em] w-[6.5em] -translate-x-1/2 rounded-full bg-[#0B1B4D]/[0.22]" />
    </div>
  );
}

function HeroPhone() {
  return (
    <PhoneFrame label="Ilustração financeira com saldo negativo de R$ 81,49 e movimentações fictícias.">
      <div className="relative flex h-full flex-col bg-[#F4F7FF]">
        <div
          className="px-[1.35em] pb-[3.2em] pt-[0.9em]"
          style={{
            background: "linear-gradient(160deg,#3B74FF 0%,#1E4FD8 100%)",
          }}
        >
          <StatusBar />
          <p className="mt-[2.1em] text-[0.74em] text-white/80">
            Olá, bom dia
          </p>
          <p className="mt-[0.15em] text-[0.74em] text-white/80">Saldo atual</p>
          <p className="mt-[0.1em] whitespace-nowrap text-[2em] font-extrabold leading-[1.1] text-white">
            −R$ 81,49
          </p>
          <p className="mt-[0.5em] inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[0.65em] font-semibold text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-red-300" />
            Saldo negativo
          </p>
        </div>

        <div className="relative z-10 -mt-[2.3em] grid grid-cols-2 gap-[0.55em] px-[0.85em]">
          <div className="rounded-[1em] bg-white p-[0.75em] shadow-[0_0.5em_1.2em_-0.5em_rgba(11,27,77,0.25)]">
            <p className="text-[0.58em] font-semibold uppercase tracking-wide text-slate-500">
              Entradas
            </p>
            <p className="mt-[0.25em] whitespace-nowrap text-[0.83em] font-extrabold text-[#2563EB]">
              +R$ 2.000,00
            </p>
          </div>
          <div className="rounded-[1em] bg-white p-[0.75em] shadow-[0_0.5em_1.2em_-0.5em_rgba(11,27,77,0.25)]">
            <p className="text-[0.58em] font-semibold uppercase tracking-wide text-slate-500">
              Gastos
            </p>
            <p className="mt-[0.25em] whitespace-nowrap text-[0.83em] font-extrabold text-[#DC2626]">
              −R$ 2.081,49
            </p>
          </div>
        </div>

        <div className="px-[1.05em] pt-[1em]">
          <p className="text-[0.82em] font-bold text-[#0B1B4D]">
            Movimentações
          </p>
          <div className="mt-[0.75em] space-y-[0.85em]">
            <TxRow letter="S" name="Salário" meta="Entrada · Hoje" value="+R$ 2.000,00" />
            <TxRow letter="U" name="Uber" meta="Transporte · Hoje" value="−R$ 45,00" negative />
            <TxRow letter="A" name="App de Streaming" meta="Assinatura · Hoje" value="−R$ 36,90" negative />
            <TxRow letter="M" name="Mercado" meta="Alimentação · Hoje" value="−R$ 1.999,59" negative />
          </div>
        </div>

        <div className="mx-[1.05em] mt-[1em] rounded-[0.9em] border border-red-100 bg-red-50 px-[0.8em] py-[0.65em]">
          <p className="text-[0.7em] font-extrabold text-red-700">
            Atenção ao seu saldo
          </p>
          <p className="mt-1 text-[0.6em] leading-relaxed text-red-600">
            Seus gastos ultrapassaram o valor que entrou.
          </p>
        </div>

        <TabBar />
      </div>
    </PhoneFrame>
  );
}

function DashboardPhone() {
  return (
    <PhoneFrame
      label={
        DASHBOARD_SCREENSHOT_SRC
          ? "Captura de tela da dashboard da CLOOE."
          : "Interface ilustrativa da dashboard da CLOOE com valores fictícios."
      }
    >
      {DASHBOARD_SCREENSHOT_SRC ? (
        <img
          src={DASHBOARD_SCREENSHOT_SRC}
          alt="Dashboard CLOOE"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="relative flex h-full flex-col bg-[#F4F7FF]">
          <div
            className="px-[1.4em] pb-[1em] pt-[0.9em]"
            style={{ background: ROYAL }}
          >
            <StatusBar />
            <div className="mt-[1.9em] flex items-center justify-between">
              <span className="text-[1.05em] font-extrabold tracking-[0.08em] text-white">
                CLOOE
              </span>
              <span className="grid h-[1.9em] w-[1.9em] place-items-center rounded-full bg-white/20 text-white">
                <Icon name="bell" className="h-[1em] w-[1em]" />
              </span>
            </div>
          </div>

          <div className="px-[1.1em] pt-[1em]">
            <p className="text-[1.15em] font-extrabold text-[#0B1B4D]">
              Dashboard
            </p>
            <p className="text-[0.68em] text-slate-500">
              Tudo que entra e sai, em um só lugar.
            </p>

            <div className="mt-[0.9em] grid grid-cols-2 gap-[0.7em]">
              <div className="rounded-[1em] bg-white p-[0.85em] shadow-md">
                <p className="text-[0.6em] font-semibold uppercase text-slate-500">
                  Entradas
                </p>
                <p className="mt-[0.2em] text-[0.85em] font-extrabold text-[#2563EB]">
                  R$ 5.200,00
                </p>
              </div>
              <div className="rounded-[1em] bg-white p-[0.85em] shadow-md">
                <p className="text-[0.6em] font-semibold uppercase text-slate-500">
                  Gastos
                </p>
                <p className="mt-[0.2em] text-[0.85em] font-extrabold text-[#DC2626]">
                  −R$ 2.352,40
                </p>
              </div>
            </div>

            <div className="mt-[0.9em] rounded-[1.1em] bg-white p-[1em] shadow-md">
              <div className="flex items-center justify-between">
                <p className="text-[0.78em] font-bold text-[#0B1B4D]">
                  Gastos por semana
                </p>
                <p className="text-[0.6em] text-slate-500">
                  Saldo R$ 2.847,60
                </p>
              </div>

              <div className="mt-[0.8em] flex h-[5.2em] items-end justify-between gap-[0.5em]">
                {[38, 62, 30, 78, 52, 24, 44].map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t-[0.35em]"
                    style={{
                      height: `${h}%`,
                      background: i === 3 ? ROYAL : "#BFD2FF",
                    }}
                  />
                ))}
              </div>

              <div className="mt-[0.4em] flex justify-between">
                {["S", "T", "Q", "Q", "S", "S", "D"].map((d, i) => (
                  <span
                    key={i}
                    className="flex-1 text-center text-[0.58em] text-slate-400"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-[1em] text-[0.82em] font-bold text-[#0B1B4D]">
              Últimas transações
            </p>
            <div className="mt-[0.7em] space-y-[0.75em]">
              <TxRow letter="S" name="Salário" meta="05 Out" value="+R$ 5.200,00" />
              <TxRow letter="M" name="Mercado" meta="12 Out · Alimentação" value="−R$ 187,30" negative />
            </div>
          </div>

          <TabBar />
        </div>
      )}
    </PhoneFrame>
  );
}

function ConsultantAvatar({ size = "h-9 w-9" }: { size?: string }) {
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full text-white ${size}`}
      style={{ background: ROYAL }}
    >
      <Icon name="spark" className="h-[55%] w-[55%]" />
    </span>
  );
}

function AiChat() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const started = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setStep(3);
        return;
      }

      timers.current.push(
        setTimeout(() => setStep(1), 300),
        setTimeout(() => setStep(2), 1400),
        setTimeout(() => setStep(3), 3000)
      );
    };

    if (typeof IntersectionObserver === "undefined") {
      run();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={ref}
        role="group"
        aria-label="Exemplo ilustrativo de conversa com o Consultor IA"
        className="mx-auto w-full max-w-[34rem] overflow-hidden rounded-[2rem] border bg-white shadow-[0_40px_90px_-35px_rgba(11,27,77,0.45)]"
        style={{ borderColor: "rgba(11,27,77,0.1)" }}
      >
        <div className="flex items-center gap-3 border-b px-5 py-4">
          <ConsultantAvatar size="h-10 w-10" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold" style={{ color: NAVY }}>
              Consultor IA
            </p>
            <p className="text-xs text-slate-500">CLOOE</p>
          </div>
          <span className="rounded-full bg-[#EAF1FF] px-3 py-1 text-[11px] font-bold text-blue-700">
            Exemplo ilustrativo
          </span>
        </div>

        <div className="min-h-[21rem] space-y-5 bg-[#F4F7FF] px-5 py-6">
          {step >= 1 && (
            <div className="cl-msg-in flex flex-col items-end">
              <span className="mb-1.5 pr-1 text-[11px] font-semibold text-slate-500">
                Você
              </span>
              <p
                className="max-w-[88%] rounded-[1.4rem] rounded-br-md px-5 py-3.5 text-lg font-bold text-white shadow-lg ring-4 ring-[#2563EB]/[0.18] sm:text-xl"
                style={{ background: ROYAL }}
              >
                Quanto posso gastar hoje?
              </p>
            </div>
          )}

          {step === 2 && (
            <div
              className="cl-msg-in flex items-end gap-2.5"
              aria-hidden="true"
            >
              <ConsultantAvatar size="h-8 w-8" />
              <div className="flex items-center gap-1.5 rounded-[1.2rem] border bg-white px-4 py-3.5">
                {[0, 0.18, 0.36].map((d) => (
                  <span
                    key={d}
                    className="cl-dot h-2 w-2 rounded-full bg-slate-400"
                    style={{ animationDelay: `${d}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          {step >= 3 && (
            <div className="cl-msg-in flex items-end gap-2.5">
              <ConsultantAvatar size="h-8 w-8" />
              <div className="max-w-[88%]">
                <p
                  className="rounded-[1.2rem] rounded-bl-md border bg-white px-5 py-4 text-[0.95rem] leading-relaxed shadow-md"
                  style={{
                    borderColor: "rgba(11,27,77,0.08)",
                    color: NAVY,
                  }}
                >
                  Vamos considerar seu saldo disponível, os gastos já
                  registrados e os compromissos previstos. Assim, você pode
                  avaliar melhor quanto gastar hoje.
                </p>
                <p className="mt-2 pl-1 text-[11px] font-semibold text-slate-500">
                  Resposta ilustrativa
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="border-t bg-white p-4">
          <div
            aria-hidden="true"
            className="flex items-center justify-between rounded-full border bg-[#F4F7FF] py-2 pl-5 pr-2 text-sm text-slate-400"
          >
            Pergunte ao Consultor IA…
            <span
              className="grid h-9 w-9 place-items-center rounded-full text-white"
              style={{ background: ROYAL }}
            >
              <Icon name="send" className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>

      <p className="mx-auto mt-5 max-w-[34rem] text-center text-xs leading-relaxed text-slate-500">
        Exemplo ilustrativo. O Consultor IA trabalha com as informações que
        você registra na plataforma e tem caráter informativo e educacional.
      </p>
    </div>
  );
}

function GuaranteeSeal() {
  const medalPoints = useMemo(() => {
    const pts: string[] = [];

    for (let i = 0; i < 96; i++) {
      const a = (i / 96) * Math.PI * 2 - Math.PI / 2;
      const r = i % 2 === 0 ? 118 : 110;
      pts.push(
        `${(130 + r * Math.cos(a)).toFixed(2)},${(
          130 +
          r * Math.sin(a)
        ).toFixed(2)}`
      );
    }

    return pts.join(" ");
  }, []);

  return (
    <div className="cl-seal-wrap relative mx-auto w-full max-w-[19rem]">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[135%] w-[135%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle,rgba(255,255,255,0.26),transparent 62%)",
        }}
      />

      <div className="cl-seal relative">
        <svg
          viewBox="0 0 260 260"
          role="img"
          aria-label="Selo de garantia de 30 dias"
          className="relative h-auto w-full"
        >
          <defs>
            <linearGradient id="sealSilver" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#fff" />
              <stop offset=".35" stopColor="#C9D5F0" />
              <stop offset=".65" stopColor="#8FA3CF" />
              <stop offset="1" stopColor="#EAF0FF" />
            </linearGradient>
            <radialGradient id="sealBlue" cx=".35" cy=".3" r=".9">
              <stop offset="0" stopColor="#6C9BFF" />
              <stop offset=".45" stopColor="#2563EB" />
              <stop offset="1" stopColor="#12328F" />
            </radialGradient>
            <radialGradient id="sealInner" cx=".4" cy=".3" r=".9">
              <stop offset="0" stopColor="#3F76F5" />
              <stop offset="1" stopColor="#173FB5" />
            </radialGradient>
            <linearGradient id="sealShine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity=".55" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </linearGradient>
            <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="150%">
              <feDropShadow
                dx="0"
                dy="14"
                stdDeviation="12"
                floodColor="#071A55"
                floodOpacity=".55"
              />
            </filter>
            <clipPath id="sealClip">
              <circle cx="130" cy="130" r="108" />
            </clipPath>
            <path
              id="sealArc"
              d="M46,130 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0"
            />
          </defs>

          <g filter="url(#sealShadow)">
            <polygon points={medalPoints} fill="url(#sealSilver)" />
            <circle
              cx="130"
              cy="130"
              r="104"
              fill="none"
              stroke="#fff"
              strokeOpacity=".8"
              strokeWidth="1.5"
            />
            <circle
              cx="130"
              cy="130"
              r="100"
              fill="url(#sealBlue)"
              stroke="#E9F0FF"
              strokeWidth="2"
            />
          </g>

          <circle
            cx="130"
            cy="130"
            r="93"
            fill="none"
            stroke="#fff"
            strokeOpacity=".35"
          />

          <text
            fill="#EAF1FF"
            fontSize="13"
            fontWeight="800"
            letterSpacing="2"
          >
            <textPath href="#sealArc" textLength="520" lengthAdjust="spacing">
              GARANTIA 30 DIAS • GARANTIA 30 DIAS •
            </textPath>
          </text>

          <circle
            cx="130"
            cy="130"
            r="62"
            fill="url(#sealInner)"
            stroke="url(#sealSilver)"
            strokeWidth="4"
          />
          <circle
            cx="130"
            cy="130"
            r="57"
            fill="none"
            stroke="#000"
            strokeOpacity=".22"
            strokeWidth="1.5"
          />
          <text
            x="130"
            y="146"
            textAnchor="middle"
            fill="#fff"
            fontSize="64"
            fontWeight="800"
          >
            30
          </text>
          <text
            x="130"
            y="168"
            textAnchor="middle"
            fill="#DCE7FF"
            fontSize="15"
            fontWeight="800"
            letterSpacing="5"
          >
            DIAS
          </text>

          <g clipPath="url(#sealClip)">
            <ellipse
              cx="102"
              cy="76"
              rx="70"
              ry="34"
              fill="url(#sealShine)"
              transform="rotate(-28 102 76)"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const n = FAQS.length;
    let target = -1;

    if (e.key === "ArrowDown") target = (i + 1) % n;
    else if (e.key === "ArrowUp") target = (i - 1 + n) % n;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = n - 1;

    if (target >= 0) {
      e.preventDefault();
      buttons.current[target]?.focus();
    }
  }

  return (
    <div
      className="mx-auto w-full max-w-3xl divide-y"
      style={{ borderColor: "rgba(11,27,77,0.12)" }}
    >
      {FAQS.map((item, i) => {
        const isOpen = open === i;

        return (
          <div key={item.q} style={{ borderColor: "rgba(11,27,77,0.12)" }}>
            <h3>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={`faq-btn-${i}`}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-bold hover:text-[#2563EB]"
                style={{ color: isOpen ? ROYAL : NAVY }}
              >
                <span>{item.q}</span>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  style={{
                    background: isOpen ? ROYAL : "#EAF1FF",
                    color: isOpen ? "#fff" : ROYAL,
                  }}
                >
                  <Icon name="chevron" className="h-5 w-5" />
                </span>
              </button>
            </h3>

            <div
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-btn-${i}`}
              aria-hidden={!isOpen}
              className="grid"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                visibility: isOpen ? "visible" : "hidden",
                transition: isOpen
                  ? "grid-template-rows .35s ease,visibility 0s"
                  : "grid-template-rows .35s ease,visibility 0s linear .35s",
              }}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-12 text-base leading-relaxed text-slate-600">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Page() {
  useEffect(() => {
    const handleCheckoutClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) return;

      const link = target.closest("a");

      if (
        link?.href?.startsWith("https://pay.cakto.com.br/") &&
        typeof window !== "undefined"
      ) {
        const pixelWindow = window as typeof window & {
          fbq?: (...args: (string | number)[]) => void;
        };

        pixelWindow.fbq?.("track", "InitiateCheckout");
      }
    };

    document.addEventListener("click", handleCheckoutClick);

    return () => {
      document.removeEventListener("click", handleCheckoutClick);
    };
  }, []);

  return (
    <div
      className={`cl-root ${jakarta.className} overflow-x-hidden bg-white antialiased`}
      style={{ color: NAVY }}
    >
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}
          (window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>

      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_CSS }} />
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>

      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-full bg-white px-5 py-3 text-sm font-bold shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        style={{ color: ROYAL }}
      >
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <section
          id="inicio"
          aria-labelledby="hero-title"
          className="relative overflow-hidden pb-24 pt-28 sm:pt-32 md:pb-32"
          style={{ zIndex: 1, background: "#fff" }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[75%]"
            style={{
              background:
                "radial-gradient(55% 55% at 50% 58%,rgba(37,99,235,0.14),transparent 72%)",
            }}
          />

          <Container className="relative">
            <div className="mx-auto max-w-4xl text-center">
              <h1
                id="hero-title"
                className="cl-hero-in text-[2.3rem] font-extrabold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl lg:text-[4.1rem] [text-wrap:balance]"
                style={{ color: NAVY }}
              >
                Seu dinheiro entra.{" "}
                <span style={{ color: ROYAL }}>
                  Mas você sabe quanto realmente sobra?
                </span>
              </h1>

              <p
                className="cl-hero-in mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl"
                style={{ animationDelay: ".12s" }}
              >
                Organize suas entradas e gastos, acompanhe seu saldo e tome
                decisões melhores com a CLOOE.
              </p>

              <div
                className="cl-hero-in mt-9"
                style={{ animationDelay: ".24s" }}
              >
                <CtaButton>Quero organizar meu dinheiro</CtaButton>
                <p className="mt-4 text-sm text-slate-500">
                  Pagamento único. Acesso pelo navegador, no computador ou no
                  celular.
                </p>
              </div>
            </div>

            <div
              className="cl-hero-in relative mx-auto mt-12 w-full max-w-[1100px] sm:mt-16"
              style={{ animationDelay: ".38s" }}
            >
              <HeroPhone />
              <p className="mt-8 text-center text-xs text-slate-500">
                Interface ilustrativa. Valores fictícios.
              </p>
            </div>
          </Container>
        </section>

        <Section id="a-dor" titleId="dor-title" tone="blue" index={1}>
          <Container>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <Reveal>
                  <Eyebrow blue>No dia a dia</Eyebrow>
                  <h2 id="dor-title" className={H2_CLASS}>
                    Você se esforça para ganhar dinheiro. Ele merece ser bem
                    cuidado.
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-6 max-w-md text-lg leading-relaxed text-white/90">
                    Entre contas, compras e despesas do dia a dia, é fácil
                    perder a noção de quanto entrou, quanto saiu e quanto ainda
                    está disponível.
                  </p>
                </Reveal>
              </div>

              <ul className="divide-y divide-white/20 border-y border-white/20 lg:col-span-7 lg:self-center">
                {PAIN_POINTS.map((text, i) => (
                  <li key={text}>
                    <Reveal
                      delay={i * 130}
                      className="flex items-baseline gap-5 py-7 md:py-9"
                    >
                      <span className="w-8 shrink-0 text-sm font-semibold text-white/55">
                        0{i + 1}
                      </span>
                      <p className="text-2xl font-semibold leading-snug md:text-[2rem]">
                        {text}
                      </p>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        <Section
          id="funcionalidades"
          titleId="solucao-title"
          tone="white"
          index={2}
        >
          <Container>
            <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
              <div>
                <Reveal>
                  <Eyebrow>A solução</Eyebrow>
                  <h2 id="solucao-title" className={H2_CLASS}>
                    Chega de depender da memória para controlar seu dinheiro.
                  </h2>
                </Reveal>

                <Reveal delay={120}>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
                    Com a CLOOE, você reúne suas informações financeiras em um
                    só lugar e acompanha sua situação com mais clareza.
                  </p>
                </Reveal>

                <ul className="mt-9 space-y-4">
                  {SOLUTION_BENEFITS.map((text, i) => (
                    <li key={text}>
                      <Reveal
                        delay={200 + i * 110}
                        className="flex items-center gap-4"
                      >
                        <span
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-white"
                          style={{ background: ROYAL }}
                        >
                          <Icon name="check" className="h-5 w-5" />
                        </span>
                        <span className="text-lg font-semibold">{text}</span>
                      </Reveal>
                    </li>
                  ))}
                </ul>
              </div>

              <Reveal delay={150} className="relative">
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-1/2 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle,rgba(37,99,235,0.2),transparent 68%)",
                  }}
                />
                <div className="relative lg:[transform:perspective(1600px)_rotateY(-7deg)_rotateX(2deg)]">
                  <DashboardPhone />
                </div>
                {!DASHBOARD_SCREENSHOT_SRC && (
                  <p className="relative mt-7 text-center text-xs text-slate-500">
                    Interface e valores ilustrativos.
                  </p>
                )}
              </Reveal>
            </div>
          </Container>
        </Section>

        <Section
          id="como-funciona"
          titleId="como-title"
          tone="blue"
          index={3}
        >
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow blue>Como funciona</Eyebrow>
              <h2 id="como-title" className={H2_CLASS}>
                Organizar seu dinheiro pode ser mais simples do que parece.
              </h2>
            </Reveal>

            <ul className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
              {STEPS.map((s, i) => (
                <li key={s.title} className="h-full">
                  <Reveal delay={i * 130} className="h-full">
                    <article className="relative h-full rounded-[1.75rem] border border-white/25 bg-white/[0.12] p-7 backdrop-blur-sm transition hover:-translate-y-1.5 md:p-8">
                      <span className="absolute right-6 top-6 text-sm font-bold text-white/45">
                        0{i + 1}
                      </span>
                      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/30 bg-white/[0.16]">
                        <Icon name={s.icon} className="h-7 w-7" />
                      </span>
                      <h3 className="mt-6 text-xl font-bold leading-snug">
                        {s.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-white/90">
                        {s.text}
                      </p>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        <Section
          id="consultor-ia"
          titleId="ia-title"
          tone="white"
          index={4}
        >
          <Container>
            <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div>
                <Reveal>
                  <Eyebrow>Consultor IA</Eyebrow>
                  <h2 id="ia-title" className={H2_CLASS}>
                    Você não precisa apenas registrar números. Precisa saber o
                    que fazer com eles.
                  </h2>
                </Reveal>
                <Reveal delay={120}>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
                    O Consultor IA ajuda você a analisar sua situação financeira
                    e encontrar caminhos para organizar melhor seu dinheiro.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={160}>
                <AiChat />
              </Reveal>
            </div>
          </Container>
        </Section>

        <Section
          id="beneficios"
          titleId="beneficios-title"
          tone="blue"
          index={5}
        >
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <Reveal className="lg:sticky lg:top-32">
                  <Eyebrow blue>Benefícios</Eyebrow>
                  <h2 id="beneficios-title" className={H2_CLASS}>
                    Mais clareza para decidir o que fazer com seu dinheiro.
                  </h2>
                </Reveal>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                {BENEFITS.map((b, i) => (
                  <li key={b.title} className="h-full">
                    <Reveal delay={i * 110} className="h-full">
                      <article className="flex h-full gap-5 rounded-[1.5rem] border border-white/25 bg-white/[0.12] p-6 backdrop-blur-sm transition hover:bg-white/[0.18]">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[#2563EB]">
                          <Icon name={b.icon} className="h-6 w-6" />
                        </span>
                        <div>
                          <h3 className="text-lg font-bold">{b.title}</h3>
                          <p className="mt-2 text-base leading-relaxed text-white/90">
                            {b.text}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        <Section id="plano" titleId="plano-title" tone="white" index={6}>
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow>Plano</Eyebrow>
              <h2 id="plano-title" className={H2_CLASS}>
                Dê o próximo passo para organizar sua vida financeira.
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                Tenha suas informações financeiras organizadas e conte com
                ferramentas que ajudam você a cuidar melhor do seu dinheiro.
              </p>
            </Reveal>

            <Reveal delay={150} className="relative mx-auto mt-14 max-w-md">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[90%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle,rgba(37,99,235,0.14),transparent 65%)",
                }}
              />

              <article
                className="relative overflow-hidden rounded-[2rem] border-2 bg-white p-8 shadow-[0_40px_90px_-40px_rgba(37,99,235,0.55)] sm:p-10"
                style={{ borderColor: "rgba(37,99,235,0.22)" }}
              >
                <span className="inline-flex rounded-full bg-[#EAF1FF] px-3.5 py-1.5 text-xs font-bold text-blue-700">
                  Acesso completo
                </span>
                <h3 className="mt-5 text-2xl font-extrabold">Plano Master</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Acesso completo à plataforma CLOOE.
                </p>

                <p className="mt-7 flex items-end gap-3">
                  <span className="text-[3.4rem] font-extrabold leading-none tracking-tight">
                    R$ 197
                  </span>
                  <span className="pb-2 text-sm font-semibold text-slate-500">
                    pagamento único
                  </span>
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Sem mensalidade e sem assinatura.
                </p>

                <ul
                  className="mt-8 space-y-3.5 border-t pt-8"
                  style={{ borderColor: "rgba(11,27,77,0.1)" }}
                >
                  {PLAN_FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-base">
                      <span
                        className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-white"
                        style={{ background: ROYAL }}
                      >
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <CtaButton className="mt-9 w-full">
                  Quero minha CLOOE
                </CtaButton>

                <p className="mt-5 text-center text-sm leading-relaxed text-slate-500">
                  O acesso é enviado para o e-mail usado no pagamento.
                  <br />
                  Garantia de 30 dias —{" "}
                  <a
                    href={GUARANTEE_URL}
                    className="font-semibold underline underline-offset-2"
                    style={{ color: ROYAL }}
                  >
                    veja as condições
                  </a>
                  .
                </p>
              </article>
            </Reveal>
          </Container>
        </Section>

        <Section
          id="garantia"
          titleId="garantia-title"
          tone="blue"
          index={7}
        >
          <Container>
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
              <Reveal>
                <GuaranteeSeal />
              </Reveal>

              <div>
                <Reveal delay={100}>
                  <Eyebrow blue>Garantia</Eyebrow>
                  <h2 id="garantia-title" className={H2_CLASS}>
                    Teste sem risco. Você tem 30 dias para decidir.
                  </h2>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
                    Queremos que você tenha tempo para conhecer a CLOOE e
                    avaliar se ela faz sentido para sua rotina. Consulte as
                    condições da garantia de 30 dias e compre com mais
                    tranquilidade.
                  </p>
                </Reveal>

                <ul className="mt-9 divide-y divide-white/20 border-y border-white/20">
                  {GUARANTEE_POINTS.map((p, i) => (
                    <li key={p.text}>
                      <Reveal
                        delay={200 + i * 120}
                        className="flex items-center gap-4 py-5"
                      >
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 bg-white/[0.14]">
                          <Icon name={p.icon} className="h-5 w-5" />
                        </span>
                        <span className="text-lg font-semibold">{p.text}</span>
                      </Reveal>
                    </li>
                  ))}
                </ul>

                <Reveal delay={560}>
                  <a
                    href={GUARANTEE_URL}
                    className="mt-7 inline-flex items-center gap-2 text-base font-bold underline underline-offset-4"
                  >
                    Ver condições da garantia
                    <Icon name="arrow" className="h-5 w-5" />
                  </a>
                </Reveal>
              </div>
            </div>
          </Container>
        </Section>

        <Section id="faq" titleId="faq-title" tone="white" index={8}>
          <Container>
            <Reveal className="mx-auto max-w-3xl text-center">
              <Eyebrow>Perguntas frequentes</Eyebrow>
              <h2 id="faq-title" className={H2_CLASS}>
                Ficou com alguma dúvida?
              </h2>
            </Reveal>

            <Reveal delay={120} className="mt-12">
              <Faq />
            </Reveal>

            <Reveal
              delay={100}
              className="mx-auto mt-24 max-w-3xl text-center"
            >
              <p
                className="text-[1.9rem] font-extrabold leading-[1.15] tracking-tight sm:text-4xl"
                style={{ color: NAVY }}
              >
                Seu dinheiro merece mais atenção.{" "}
                <span style={{ color: ROYAL }}>Comece com a CLOOE.</span>
              </p>
              <div className="mt-8">
                <CtaButton>Quero organizar meu dinheiro</CtaButton>
              </div>
            </Reveal>
          </Container>
        </Section>
      </main>

      <footer
        className="relative -mt-10 rounded-t-[2.25rem] pb-10 pt-16 text-white md:-mt-14 md:rounded-t-[3.5rem] md:pt-20"
        style={{ zIndex: 20, background: "#08132F" }}
      >
        <Container>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Logo light />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                Organize seu dinheiro, economize mais e tome decisões melhores
                com a Clooe.
              </p>
            </div>

            <nav aria-label="Rodapé — navegação" className="md:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                Navegação
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-white/85 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Rodapé — legal" className="md:col-span-2">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                Legal
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={TERMS_URL}
                    className="text-white/85 hover:text-white"
                  >
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a
                    href={GUARANTEE_URL}
                    className="text-white/85 hover:text-white"
                  >
                    Condições de Garantia
                  </a>
                </li>
                {PRIVACY_URL && (
                  <li>
                    <a
                      href={PRIVACY_URL}
                      className="text-white/85 hover:text-white"
                    >
                      Política de Privacidade
                    </a>
                  </li>
                )}
              </ul>
            </nav>

            <nav aria-label="Rodapé — contato" className="md:col-span-3">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/50">
                Contato
              </p>
              <ul className="mt-4 space-y-3 text-sm">
                <li>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/85 hover:text-white"
                  >
                    Instagram @clooeoficial
                  </a>
                </li>
                <li>
                  <a
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/85 hover:text-white"
                  >
                    TikTok @useclooe
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} CLOOE. Todos os direitos reservados.
            </p>
            {COMPANY_LEGAL_INFO && <p>{COMPANY_LEGAL_INFO}</p>}
          </div>
        </Container>
      </footer>
    </div>
  );
}

"use client";

import Link from "next/link";

const guaranteeSections = [
  {
    title: "1. Nossa garantia",
    text: "A CLOOE oferece uma garantia comercial de 30 dias para a compra indicada na oferta. Dentro desse período, você pode entrar em contato para solicitar uma análise caso encontre dificuldades relevantes para utilizar a plataforma ou perceba que ela não atende à finalidade de organização financeira apresentada na oferta."
  },
  {
    title: "2. O que pode ser analisado",
    text: "Podem ser analisados problemas técnicos relevantes, impossibilidade de acessar funcionalidades incluídas na oferta, falhas persistentes que impeçam o uso normal da plataforma e outras situações relacionadas à entrega do produto adquirido."
  },
  {
    title: "3. Como solicitar",
    text: "Entre em contato pelo canal oficial de suporte divulgado na página de venda ou na própria plataforma. Informe o e-mail utilizado na compra, a data aproximada do pagamento e uma descrição clara do problema. Se possível, inclua capturas de tela que ajudem a compreender a situação."
  },
  {
    title: "4. Análise da solicitação",
    text: "A equipe poderá solicitar informações adicionais razoáveis para localizar a compra e compreender o problema. Não envie senhas, códigos de autenticação ou o número completo do seu cartão. A solicitação será analisada de acordo com a oferta, esta política e a legislação aplicável."
  },
  {
    title: "5. Reembolso e prazo",
    text: "Quando o reembolso for aprovado ou for devido nos termos da legislação, o processamento será encaminhado pelo meio de pagamento utilizado ou pelo procedimento informado pelo suporte. O prazo para o valor aparecer na conta pode depender do meio de pagamento e da instituição responsável."
  },
  {
    title: "6. O que acontece depois do reembolso",
    text: "Quando a compra é reembolsada, o acesso pago vinculado a ela poderá ser encerrado. Para voltar a utilizar as funcionalidades pagas, poderá ser necessária uma nova compra. Isso não impede o exercício de direitos previstos na legislação."
  },
  {
    title: "7. Seus direitos como consumidor",
    text: "Esta garantia comercial complementa os direitos assegurados por lei e não os substitui. Nas compras realizadas pela internet, o Código de Defesa do Consumidor pode assegurar o direito de arrependimento nas condições e nos prazos previstos no artigo 49. A aplicação das regras depende das circunstâncias da compra e da legislação vigente."
  }
];

export default function GarantiaPage() {
  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <header className="relative z-10 border-b border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            CLOOE<span className="text-blue-400">.</span>
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-blue-400/50 hover:text-white"
          >
            Voltar ao início
          </Link>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-4xl px-5 py-16 md:py-24">
        <div className="mb-8 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
          Sua tranquilidade importa
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Condições de <span className="text-blue-400">Garantia</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
          Queremos que você tenha clareza para avaliar sua experiência com a
          CLOOE. Aqui você encontra as condições da garantia e como solicitar
          atendimento.
        </p>

        <div className="mt-10 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/15 to-indigo-500/[0.04] p-7 md:p-10">
          <p className="text-sm font-medium text-blue-300">
            GARANTIA COMERCIAL
          </p>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-6xl font-bold tracking-tight">30</span>
            <span className="text-xl text-slate-300">dias</span>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Consulte as condições da oferta e entre em contato com o suporte
            dentro do período de garantia. Seus direitos previstos em lei
            continuam preservados.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {guaranteeSections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:border-blue-400/25 md:p-8"
            >
              <h2 className="text-lg font-semibold md:text-xl">
                {section.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-400 md:text-base">
                {section.text}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-6">
          <h2 className="text-lg font-semibold">Precisa de ajuda?</h2>

          <p className="mt-3 text-sm leading-7 text-slate-400">
            Utilize o canal oficial de suporte informado na página de venda ou
            na plataforma CLOOE. Informe os dados necessários para localizar a
            compra, sem compartilhar senhas ou dados completos do cartão.
          </p>
        </div>

        <footer className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-white">
            Início
          </Link>
          <Link href="/termos" className="hover:text-white">
            Termos de Uso
          </Link>
          <span>© {new Date().getFullYear()} CLOOE</span>
        </footer>
      </section>
    </main>
  );
}

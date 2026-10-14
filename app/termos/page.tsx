
"use client";

import Link from "next/link";

const sections = [
  {
    title: "1. Sobre a CLOOE",
    text: "A CLOOE é uma plataforma de organização financeira pessoal que ajuda o usuário a registrar entradas e gastos, acompanhar o saldo e visualizar suas informações financeiras com mais clareza. Ao comprar ou utilizar a plataforma, você concorda com estes Termos de Uso."
  },
  {
    title: "2. Cadastro e responsabilidade do usuário",
    text: "O usuário é responsável por fornecer informações verdadeiras, manter a segurança de sua conta e utilizar a plataforma adequadamente. Os registros financeiros devem ser conferidos pelo próprio usuário, pois a qualidade das informações depende dos dados inseridos."
  },
  {
    title: "3. Pagamento e acesso",
    text: "O acesso às funcionalidades pagas é liberado conforme as condições apresentadas na página de venda e após a confirmação do pagamento. O preço, a modalidade de pagamento e as condições específicas são aqueles informados no momento da compra."
  },
  {
    title: "4. Garantia e reembolso",
    text: "A compra conta com a garantia comercial de 30 dias divulgada na oferta, sem prejuízo dos direitos previstos na legislação aplicável. Para consultar as condições e saber como solicitar uma análise, acesse a página Condições de Garantia."
  },
  {
    title: "5. Cancelamento e encerramento do acesso",
    text: "Quando uma compra é reembolsada e o acesso pago está vinculado a ela, o acesso às funcionalidades correspondentes poderá ser encerrado. Para voltar a utilizar o acesso pago, poderá ser necessária uma nova compra. Essa condição não elimina direitos obrigatórios previstos em lei."
  },
  {
    title: "6. Finalidade da plataforma",
    text: "A CLOOE é uma ferramenta de apoio à organização financeira. Ela não garante economia, aumento de renda, rentabilidade ou resultados financeiros específicos. As informações e sugestões disponibilizadas não substituem uma avaliação profissional individual quando ela for necessária."
  },
  {
    title: "7. Disponibilidade e funcionamento",
    text: "Buscamos manter a plataforma disponível e funcionando corretamente, mas podem ocorrer manutenções, atualizações ou interrupções técnicas. Caso encontre um problema, entre em contato pelo canal oficial de suporte divulgado na página de venda ou na plataforma."
  },
  {
    title: "8. Uso adequado",
    text: "Não é permitido utilizar a CLOOE para fins ilícitos, tentar acessar contas de terceiros, comprometer a segurança do sistema ou interferir no funcionamento da plataforma."
  },
  {
    title: "9. Privacidade e dados",
    text: "Os dados pessoais devem ser tratados conforme a legislação aplicável de proteção de dados. A CLOOE deve disponibilizar uma Política de Privacidade própria, explicando quais dados são coletados, para quais finalidades são utilizados e como o usuário pode exercer seus direitos."
  },
  {
    title: "10. Propriedade intelectual",
    text: "A marca CLOOE, seu design, seus textos, elementos visuais e demais conteúdos protegidos não podem ser copiados, distribuídos ou explorados comercialmente sem autorização, salvo nas hipóteses permitidas pela legislação."
  },
  {
    title: "11. Alterações destes termos",
    text: "Estes termos podem ser atualizados para refletir mudanças na plataforma, na oferta ou nas exigências legais. As versões atualizadas deverão ser disponibilizadas nesta página, respeitando os direitos dos consumidores."
  },
  {
    title: "12. Legislação e contato",
    text: "Estes termos são interpretados de acordo com a legislação brasileira, respeitados os direitos do consumidor. Para dúvidas ou solicitações, utilize o canal oficial de atendimento divulgado pela CLOOE."
  }
];

export default function TermosPage() {
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
          Informações legais
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          Termos de <span className="text-blue-400">Uso</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
          Estas condições explicam as regras de utilização da CLOOE, o acesso
          à plataforma e as responsabilidades de cada parte.
        </p>

        <div className="mt-12 space-y-4">
          {sections.map((section) => (
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

              {section.title === "4. Garantia e reembolso" && (
                <Link
                  href="/garantia"
                  className="mt-4 inline-flex text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                >
                  Ler Condições de Garantia →
                </Link>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-blue-400/20 bg-blue-500/[0.07] p-6">
          <p className="text-sm leading-7 text-slate-300">
            Ao utilizar a CLOOE, você declara que leu estes termos. Nenhuma
            disposição desta página pretende retirar direitos garantidos pela
            legislação brasileira.
          </p>
        </div>

        <footer className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-500">
          <Link href="/" className="hover:text-white">
            Início
          </Link>
          <Link href="/garantia" className="hover:text-white">
            Condições de Garantia
          </Link>
          <span>© {new Date().getFullYear()} CLOOE</span>
        </footer>
      </section>
    </main>
  );
}

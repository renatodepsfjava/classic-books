'use client'

import Link from 'next/link'
import { useState } from 'react'
import { PDFUploader } from '@/components/features/orcamento/PDFUploader'
import { BudgetSummary } from '@/components/features/orcamento/BudgetSummary'

/* ── Divisor dourado ── */
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a84c]" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]" />
    </div>
  )
}

/* ── Header ── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#c9a84c]/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-cormorant text-2xl font-semibold tracking-[0.15em] text-[#e8d5a3] group-hover:text-[#c9a84c] transition-colors">
            CLASSIC
          </span>
          <span className="font-cormorant text-xs tracking-[0.5em] text-[#c9a84c] font-light">
            BOOKS
          </span>
        </Link>

        {/* Nav Desktop */}
        <nav className="hidden lg:flex items-center gap-10">
          {[
            { label: 'A Arte', href: '/#arte' },
            { label: 'Materiais', href: '/#materiais' },
            { label: 'Processo', href: '/#processo' },
            { label: 'Depoimentos', href: '/#depoimentos' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-jost text-xs tracking-[0.2em] uppercase text-[#e8d5a3]/60 hover:text-[#c9a84c] transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Indicador de página ativa */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a84c]" />
          <span className="font-jost text-xs tracking-[0.2em] uppercase text-[#c9a84c]">
            Orçamento
          </span>
        </div>

        {/* Botão menu mobile */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-px bg-[#c9a84c] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-[#c9a84c] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-[#c9a84c] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="lg:hidden border-t border-[#c9a84c]/20 px-6 py-8 flex flex-col gap-6">
          {[
            { label: 'A Arte', href: '/#arte' },
            { label: 'Materiais', href: '/#materiais' },
            { label: 'Processo', href: '/#processo' },
            { label: 'Depoimentos', href: '/#depoimentos' },
            { label: '← Voltar ao início', href: '/' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-jost text-sm tracking-[0.2em] uppercase text-[#e8d5a3]/60 hover:text-[#c9a84c] transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

/* ── Footer simplificado ── */
function FooterSimple() {
  return (
    <footer className="bg-[#050505] border-t border-[#c9a84c]/15 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex flex-col leading-none group">
          <span className="font-cormorant text-lg font-semibold tracking-[0.15em] text-[#e8d5a3]/60 group-hover:text-[#c9a84c] transition-colors">
            CLASSIC<span className="text-[#c9a84c]"> BOOKS</span>
          </span>
        </Link>
        <p className="font-cormorant text-[#c9a84c]/60 text-sm italic tracking-wide">
          Feito à mão, com alma.
        </p>
        <p className="font-jost text-[#e8d5a3]/20 text-xs tracking-wide">
          © {new Date().getFullYear()} Classic Books
        </p>
      </div>
    </footer>
  )
}

/* ── Tela de sucesso ── */
function SuccessScreen() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-lg">
        {/* Ornamento */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px w-16 bg-[#c9a84c]/30" />
          <div className="w-14 h-14 border border-[#c9a84c]/40 flex items-center justify-center">
            <span className="text-[#c9a84c] text-2xl">✦</span>
          </div>
          <div className="h-px w-16 bg-[#c9a84c]/30" />
        </div>

        <h2 className="font-cormorant text-4xl lg:text-5xl font-light text-[#f5f0e8] mb-4">
          Orçamento aprovado
        </h2>
        <GoldDivider />

        <p className="font-jost text-[#e8d5a3]/50 text-sm tracking-wide leading-loose mt-8 mb-10">
          Nossa equipe recebeu sua solicitação e entrará em contato
          em até <span className="text-[#c9a84c]">24 horas úteis</span> para
          confirmar os detalhes e iniciar a produção do seu exemplar.
        </p>

        {/* Próximos passos */}
        <div className="border border-[#c9a84c]/20 p-8 mb-10 text-left space-y-5">
          <p className="font-jost text-xs tracking-[0.25em] uppercase text-[#c9a84c] mb-2">
            O que acontece agora
          </p>
          {[
            'Você receberá um e-mail de confirmação em instantes',
            'Nossa equipe entrará em contato pelo WhatsApp para alinhar os detalhes',
            'Enviaremos amostras físicas dos materiais escolhidos se necessário',
            'Após aprovação final, a produção artesanal tem início imediato',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="font-cormorant text-xl text-[#c9a84c]/50 mt-0.5 shrink-0">
                {String(i + 1).padStart(2, '0')}.
              </span>
              <span className="font-jost text-xs text-[#e8d5a3]/45 tracking-wide leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="
              font-jost text-xs tracking-[0.25em] uppercase
              border border-[#c9a84c]/40 hover:border-[#c9a84c]
              text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0a0a0a]
              px-10 py-4 transition-all duration-300 text-center
            "
          >
            Voltar ao início
          </Link>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-jost text-xs tracking-[0.25em] uppercase
              bg-[#25D366]/20 hover:bg-[#25D366]/30
              border border-[#25D366]/30 hover:border-[#25D366]/60
              text-[#25D366] px-10 py-4 transition-all duration-300 text-center
            "
          >
            Falar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   PÁGINA PRINCIPAL
───────────────────────────────────────────────────── */
export default function OrcamentoPage() {
  const [pageCount, setPageCount] = useState<number | null>(null)
  const [approved, setApproved] = useState(false)

  const handleApproved = () => setApproved(true)

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col">
      <Header />

      {approved ? (
        <SuccessScreen />
      ) : (
        <>
          {/* ── Hero da página ── */}
          <section className="relative border-b border-[#c9a84c]/15 overflow-hidden">
            {/* Fundo sutil */}
            <div
              className="absolute inset-0 opacity-100"
              style={{
                background: `radial-gradient(ellipse 70% 100% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%), #0a0a0a`,
              }}
            />
            {/* Linhas laterais */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a84c]/15 to-transparent hidden lg:block" />
            <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a84c]/15 to-transparent hidden lg:block" />

            <div className="relative max-w-3xl mx-auto px-6 py-20 text-center">
              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <Link href="/" className="font-jost text-xs tracking-[0.2em] uppercase text-[#e8d5a3]/30 hover:text-[#c9a84c] transition-colors">
                  Início
                </Link>
                <span className="text-[#c9a84c]/30 text-xs">✦</span>
                <span className="font-jost text-xs tracking-[0.2em] uppercase text-[#c9a84c]/80">
                  Orçamento
                </span>
              </div>

              <h1 className="font-cormorant text-5xl lg:text-6xl font-light text-[#f5f0e8] leading-tight mb-6">
                Solicite seu
                <span className="italic text-[#c9a84c]"> orçamento</span>
              </h1>
              <GoldDivider />
              <p className="font-jost text-[#e8d5a3]/60 text-sm tracking-wide leading-loose max-w-xl mx-auto mt-6">
                Envie o manuscrito em PDF, escolha os acabamentos e receba
                uma estimativa imediata. Nossa equipe confirma os detalhes em até 24h.
              </p>
            </div>
          </section>

          {/* ── Área principal ── */}
          <section className="flex-1 py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-start">

                {/* Coluna esquerda: Upload + instruções */}
                <div className="space-y-8">

                  {/* Upload PDF */}
                  <PDFUploader
                    onPageCountExtracted={setPageCount}
                    onLoadingStart={() => setPageCount(null)}
                  />

                  {/* Instruções */}
                  <div className="border border-[#c9a84c]/10 p-8 bg-[#0d0d0d]">
                    <p className="font-jost text-xs tracking-[0.25em] uppercase text-[#c9a84c] mb-6">
                      Como funciona
                    </p>
                    <div className="space-y-5">
                      {[
                        {
                          num: '01',
                          title: 'Envie o PDF',
                          desc: 'Arraste ou selecione seu manuscrito. O sistema conta as páginas automaticamente.',
                        },
                        {
                          num: '02',
                          title: 'Escolha os acabamentos',
                          desc: 'Selecione as opções que deseja e veja o preço atualizar em tempo real.',
                        },
                        {
                          num: '03',
                          title: 'Aprove e aguarde',
                          desc: 'Aprovado o orçamento, nossa equipe entra em contato em até 24h úteis.',
                        },
                      ].map((step) => (
                        <div key={step.num} className="flex items-start gap-4">
                          <span className="font-cormorant text-2xl text-[#c9a84c]/30 font-light shrink-0 mt-0.5">
                            {step.num}.
                          </span>
                          <div>
                            <p className="font-jost text-xs text-[#e8d5a3]/80 tracking-wide mb-1">
                              {step.title}
                            </p>
                            <p className="font-jost text-xs text-[#e8d5a3]/55 tracking-wide leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Garantia */}
                  <div className="flex items-start gap-4 px-6 py-5 border border-[#c9a84c]/10">
                    <span className="text-[#c9a84c]/50 text-lg shrink-0 mt-0.5">✦</span>
                    <p className="font-jost text-xs text-[#e8d5a3]/80 tracking-wide leading-relaxed">
                      O orçamento é uma estimativa. O valor final é confirmado pela
                      nossa equipe após análise do projeto e dos materiais selecionados.
                    </p>
                  </div>
                </div>

                {/* Coluna direita: Resumo do orçamento */}
                <div className="lg:sticky lg:top-28">
                  {pageCount !== null ? (
                    <BudgetSummary
                      pageCount={pageCount}
                      onApproved={handleApproved}
                    />
                  ) : (
                    /* Placeholder antes do upload */
                    <div className="border border-[#c9a84c]/10 bg-[#0d0d0d]">
                      <div className="px-8 py-6 border-b border-[#c9a84c]/10">
                        <p className="font-jost text-xs tracking-[0.3em] uppercase text-[#c9a84c]/60 mb-1">
                          Estimativa
                        </p>
                        <h3 className="font-cormorant text-2xl font-light text-[#f5f0e8]/50">
                          Resumo do Orçamento
                        </h3>
                      </div>
                      <div className="p-8 flex flex-col items-center justify-center py-20 text-center gap-6">
                        <div className="w-16 h-16 border border-[#c9a84c]/10 flex items-center justify-center">
                          <span className="font-cormorant text-2xl text-[#c9a84c]/20">✦</span>
                        </div>
                        <div>
                          <p className="font-cormorant text-xl font-light text-[#e8d5a3]/20 italic mb-2">
                            Aguardando manuscrito
                          </p>
                          <p className="font-jost text-xs text-[#e8d5a3]/15 tracking-wide leading-relaxed max-w-xs">
                            Faça o upload do seu PDF ao lado para
                            calcular o orçamento em tempo real.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </section>
        </>
      )}

      <FooterSimple />
    </main>
  )
}

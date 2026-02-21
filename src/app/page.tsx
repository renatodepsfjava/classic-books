'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────────────────
   PALETA DE CORES — Luxo artesanal
   Preto profundo  : #0a0a0a
   Ouro principal  : #c9a84c
   Ouro claro      : #e8d5a3
   Ouro escuro     : #8a6d2f
   Off-white       : #f5f0e8
   Cinza nobre     : #2a2a2a
───────────────────────────────────────────────────── */

/* ── Hook: contador animado ── */
function useAnimatedCounter(target: number, duration = 2400, trigger = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!trigger) return
    let start: number | null = null
    const tick = (ts: number) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, trigger])
  return count
}

/* ── Hook: elemento visível na viewport ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ── Divisor decorativo dourado ── */
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#c9a84c]" />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#c9a84c]" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#c9a84c]" />
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   HEADER — Navegação fixa com blur
───────────────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'A Arte', href: '#arte' },
    { label: 'Materiais', href: '#materiais' },
    { label: 'Processo', href: '#processo' },
    { label: 'Depoimentos', href: '#depoimentos' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#c9a84c]/20 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

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
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-jost text-xs tracking-[0.2em] uppercase text-[#e8d5a3]/70 hover:text-[#c9a84c] transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            href="/orcamento"
            className="
              font-jost text-xs tracking-[0.2em] uppercase
              border border-[#c9a84c] text-[#c9a84c]
              hover:bg-[#c9a84c] hover:text-[#0a0a0a]
              px-7 py-2.5 transition-all duration-300
            "
          >
            Solicitar Orçamento
          </Link>
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
        <div className="lg:hidden bg-[#0a0a0a]/98 border-t border-[#c9a84c]/20 px-6 py-8 flex flex-col gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-jost text-sm tracking-[0.2em] uppercase text-[#e8d5a3]/70 hover:text-[#c9a84c] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/orcamento"
            className="border border-[#c9a84c] text-[#c9a84c] text-center py-3 text-xs tracking-[0.2em] uppercase font-jost mt-2"
          >
            Solicitar Orçamento
          </Link>
        </div>
      )}
    </header>
  )
}

/* ─────────────────────────────────────────────────────
   FOOTER — Elegante e completo
───────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#c9a84c]/20">

      {/* CTA Final */}
      <div className="border-b border-[#c9a84c]/20 py-20 px-6 text-center">
        <p className="font-cormorant text-[#c9a84c] text-sm tracking-[0.4em] uppercase mb-4">
          Pronto para começar?
        </p>
        <h2 className="font-cormorant text-4xl lg:text-5xl font-light text-[#f5f0e8] mb-4 italic">
          Sua história merece existir
          <br />em forma de livro.
        </h2>
        <GoldDivider />
        <p className="font-jost text-[#e8d5a3]/50 text-sm tracking-wide mt-6 mb-10 max-w-md mx-auto">
          Cada exemplar é único. Cada detalhe, intencional.
          Vamos criar juntos a obra que você sempre imaginou.
        </p>
        <Link
          href="/orcamento"
          className="
            inline-block font-jost text-xs tracking-[0.25em] uppercase
            bg-[#c9a84c] hover:bg-[#e8d5a3] text-[#0a0a0a]
            px-12 py-4 transition-all duration-300 hover:scale-[1.03]
            shadow-[0_0_40px_rgba(201,168,76,0.2)]
            hover:shadow-[0_0_60px_rgba(201,168,76,0.4)]
          "
        >
          Iniciar meu projeto
        </Link>
      </div>

      {/* Links e informações */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Marca */}
        <div className="lg:col-span-1">
          <div className="font-cormorant text-2xl font-semibold tracking-[0.15em] text-[#e8d5a3] mb-1">
            CLASSIC
          </div>
          <div className="font-cormorant text-xs tracking-[0.5em] text-[#c9a84c] font-light mb-5">
            BOOKS
          </div>
          <p className="font-jost text-[#e8d5a3]/40 text-xs leading-relaxed tracking-wide">
            Arte e precisão em cada página. Livros manufaturados à mão com materiais de alto padrão.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h4 className="font-jost text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-6">
            Navegação
          </h4>
          <ul className="space-y-3">
            {[
              { label: 'A Arte', href: '#arte' },
              { label: 'Materiais', href: '#materiais' },
              { label: 'Processo', href: '#processo' },
              { label: 'Depoimentos', href: '#depoimentos' },
              { label: 'Solicitar Orçamento', href: '/orcamento' },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-jost text-xs text-[#e8d5a3]/40 hover:text-[#c9a84c] tracking-wide transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Especializações */}
        <div>
          <h4 className="font-jost text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-6">
            Especializações
          </h4>
          <ul className="space-y-3">
            {[
              'Encadernação Artesanal',
              'Capa em Couro Natural',
              'Papel Algodão',
              'Papel Offset Premium',
              'Lombada Costurada',
              'Customização Total',
            ].map((item) => (
              <li key={item} className="font-jost text-xs text-[#e8d5a3]/40 tracking-wide">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="font-jost text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-6">
            Contato
          </h4>
          <ul className="space-y-4">
            <li className="font-jost text-xs text-[#e8d5a3]/40 tracking-wide leading-relaxed">
              📧 contato@classicbooks.com.br
            </li>
            <li className="font-jost text-xs text-[#e8d5a3]/40 tracking-wide">
              📱 (00) 00000-0000
            </li>
            <li className="font-jost text-xs text-[#e8d5a3]/40 tracking-wide leading-relaxed">
              🕐 Seg–Sex: 9h às 18h
            </li>
            <li className="pt-2">
              <a
                href="https://wa.me/5500000000000"
                className="
                  inline-flex items-center gap-2
                  border border-[#c9a84c]/40 hover:border-[#c9a84c]
                  text-[#c9a84c] hover:bg-[#c9a84c]/10
                  text-xs tracking-[0.15em] uppercase font-jost
                  px-5 py-2.5 transition-all duration-300
                "
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="border-t border-[#c9a84c]/10 py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-jost text-[#e8d5a3]/25 text-xs tracking-wide">
            © {new Date().getFullYear()} Classic Books. Todos os direitos reservados.
          </p>
          <p className="font-cormorant text-[#c9a84c]/40 text-sm italic tracking-wide">
            Feito à mão, com alma.
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────
   HOME — Página principal
───────────────────────────────────────────────────── */
export default function Home() {

  const { ref: statsRef, visible: statsVisible } = useInView()
  const obras = useAnimatedCounter(320, 2400, statsVisible)
  const clientes = useAnimatedCounter(180, 2000, statsVisible)
  const anos = useAnimatedCounter(12, 1600, statsVisible)

  return (
    <main className="bg-[#0a0a0a] min-h-screen overflow-x-hidden">
      <Header />

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 70%),
              radial-gradient(ellipse 60% 80% at 80% 100%, rgba(201,168,76,0.05) 0%, transparent 60%),
              #0a0a0a
            `,
          }}
        />
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a84c]/20 to-transparent hidden lg:block" />
        <div className="absolute right-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#c9a84c]/20 to-transparent hidden lg:block" />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-32 pb-24">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-12 bg-[#c9a84c]/60" />
            <span className="font-jost text-[#c9a84c] text-xs tracking-[0.4em] uppercase">
              Manufatura Artesanal
            </span>
            <div className="h-px w-12 bg-[#c9a84c]/60" />
          </div>

          <h1 className="font-cormorant font-light text-[#f5f0e8] leading-[1.1] mb-8">
            <span className="block text-5xl sm:text-6xl lg:text-8xl">
              Livros que são
            </span>
            <span className="block text-5xl sm:text-6xl lg:text-8xl italic text-[#c9a84c] mt-2">
              obras de arte.
            </span>
          </h1>

          <GoldDivider />

          <p className="font-jost text-[#e8d5a3]/60 text-sm sm:text-base tracking-wide leading-loose max-w-2xl mx-auto mt-8 mb-12">
            Cada livro da Classic Books é manufaturado à mão, do início ao fim.
            Escolha os materiais, personalize a capa e o papel —
            e receba uma obra única que atravessa gerações.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/orcamento"
              className="
                font-jost text-xs tracking-[0.25em] uppercase
                bg-[#c9a84c] hover:bg-[#e8d5a3] text-[#0a0a0a]
                px-12 py-4 transition-all duration-300
                hover:scale-[1.03] hover:shadow-[0_0_50px_rgba(201,168,76,0.35)]
              "
            >
              Criar meu livro
            </Link>
            <a
              href="#processo"
              className="
                font-jost text-xs tracking-[0.25em] uppercase
                border border-[#c9a84c]/40 hover:border-[#c9a84c]
                text-[#e8d5a3]/60 hover:text-[#c9a84c]
                px-12 py-4 transition-all duration-300
              "
            >
              Ver o processo
            </a>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-center gap-10 text-center">
            {[
              { val: '100%', label: 'Manufatura manual' },
              { val: 'Único', label: 'Cada exemplar é irrepetível' },
              { val: 'Nobre', label: 'Materiais selecionados' },
            ].map((item) => (
              <div key={item.val} className="group">
                <div className="font-cormorant text-3xl font-light text-[#c9a84c] group-hover:scale-110 transition-transform duration-300">
                  {item.val}
                </div>
                <div className="font-jost text-[#e8d5a3]/40 text-xs tracking-[0.15em] mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-jost text-[#c9a84c]/50 text-xs tracking-[0.3em] uppercase">Explorar</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a84c]/50 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CONTADORES — Prova Social
      ══════════════════════════════════════════ */}
      <section ref={statsRef} className="border-y border-[#c9a84c]/15 bg-[#0d0d0d]">
        <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-3 gap-6 text-center">
          {[
            { value: obras, suffix: '+', label: 'Obras produzidas' },
            { value: clientes, suffix: '+', label: 'Clientes em todo o Brasil' },
            { value: anos, suffix: ' anos', label: 'De arte artesanal' },
          ].map((s, i) => (
            <div key={i} className="group">
              <div className="font-cormorant text-4xl lg:text-5xl font-light text-[#c9a84c] group-hover:scale-110 transition-transform duration-500">
                {s.value.toLocaleString('pt-BR')}{s.suffix}
              </div>
              <div className="font-jost text-[#e8d5a3]/40 text-xs tracking-[0.15em] mt-3 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          A ARTE — Autoridade + Identidade
      ══════════════════════════════════════════ */}
      <section id="arte" className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-jost text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-6">
            Nossa filosofia
          </p>
          <h2 className="font-cormorant text-4xl lg:text-6xl font-light text-[#f5f0e8] leading-snug mb-6">
            Cada livro carrega
            <span className="italic text-[#c9a84c]"> a alma </span>
            de quem o criou.
          </h2>
          <GoldDivider />
          <p className="font-jost text-[#e8d5a3]/55 text-sm leading-loose tracking-wide mt-8 mb-6 max-w-2xl mx-auto">
            Na Classic Books, recusamos a produção em série. Cada obra passa pelas mãos
            de nossos artesãos do início ao fim — da escolha do papel à costura da lombada.
            O resultado é um objeto que transcende o conceito de livro e se torna herança.
          </p>
          <p className="font-jost text-[#e8d5a3]/55 text-sm leading-loose tracking-wide mb-12 max-w-2xl mx-auto">
            Nossos materiais são selecionados em fornecedores especializados no Brasil e na Europa.
            Couro natural, papéis de algodão, fios de seda e cola artesanal compõem cada
            exemplar que sai do nosso ateliê.
          </p>
          <a
            href="#processo"
            className="
              inline-flex items-center gap-3
              font-jost text-xs tracking-[0.25em] uppercase
              text-[#c9a84c] border-b border-[#c9a84c]/40
              hover:border-[#c9a84c] pb-1 transition-all duration-300
            "
          >
            Conhecer o processo
            <span className="text-base">→</span>
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          VÍDEO DEMONSTRATIVO
      ══════════════════════════════════════════ */}
      <section className="py-32 px-6 bg-[#0d0d0d]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-jost text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">
              Veja em detalhes
            </p>
            <h2 className="font-cormorant text-4xl lg:text-5xl font-light text-[#f5f0e8]">
              A arte que nasce
              <span className="italic text-[#c9a84c]"> das nossas mãos.</span>
            </h2>
            <GoldDivider />
            <p className="font-jost text-[#e8d5a3]/50 text-sm tracking-wide leading-loose max-w-xl mx-auto mt-6">
              Cada costura, cada dobra, cada escolha de material — assista ao processo
              que transforma papel e couro em uma obra que dura gerações.
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-3 border border-[#c9a84c]/15 group-hover:border-[#c9a84c]/30 transition-all duration-700" />
            {[
              'top-0 left-0 border-t border-l',
              'top-0 right-0 border-t border-r',
              'bottom-0 left-0 border-b border-l',
              'bottom-0 right-0 border-b border-r',
            ].map((cls) => (
              <div key={cls} className={`absolute w-8 h-8 border-[#c9a84c]/70 ${cls} z-10`} />
            ))}
            <div className="relative w-full aspect-video overflow-hidden bg-[#0a0a0a]">
              <iframe
                src="https://www.youtube.com/embed/kW8fCN6qKP0?rel=0&modestbranding=1&color=white"
                title="Classic Books — Processo de Fabricação Artesanal"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="h-px w-12 bg-[#c9a84c]/30" />
            <p className="font-cormorant text-[#e8d5a3]/40 text-sm italic tracking-wide text-center">
              Fabricação inteiramente manual — do corte à encadernação final
            </p>
            <div className="h-px w-12 bg-[#c9a84c]/30" />
          </div>

          <div className="text-center mt-12">
            <Link
              href="/orcamento"
              className="
                inline-block font-jost text-xs tracking-[0.25em] uppercase
                border border-[#c9a84c]/50 hover:border-[#c9a84c]
                text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0a0a0a]
                px-12 py-4 transition-all duration-300
              "
            >
              Quero o meu livro
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          MATERIAIS — Ancoragem de Valor
      ══════════════════════════════════════════ */}
      <section id="materiais" className="py-32 px-6 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-jost text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">
              Personalização
            </p>
            <h2 className="font-cormorant text-4xl lg:text-5xl font-light text-[#f5f0e8]">
              Você escolhe cada detalhe
            </h2>
            <GoldDivider />
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="group border border-[#c9a84c]/15 hover:border-[#c9a84c]/50 p-10 transition-all duration-500 bg-[#0a0a0a] hover:bg-[#0f0f0f]">
              <div className="font-cormorant text-4xl text-[#c9a84c]/30 mb-6 group-hover:text-[#c9a84c]/60 transition-colors">01</div>
              <h3 className="font-cormorant text-2xl text-[#f5f0e8] mb-4 group-hover:text-[#c9a84c] transition-colors">
                Capa & Material
              </h3>
              <p className="font-jost text-[#e8d5a3]/45 text-sm leading-loose tracking-wide mb-8">
                Escolha entre couro natural em diversas cores, linho belga,
                tecido texturizado ou papel kraft premium. A capa é a primeira
                impressão — e ela vai durar décadas.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Couro Natural', 'Linho Belga', 'Tecido', 'Kraft Premium', 'Personalizado'].map((tag) => (
                  <span key={tag} className="font-jost text-xs text-[#c9a84c]/60 border border-[#c9a84c]/20 px-3 py-1 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="group border border-[#c9a84c]/15 hover:border-[#c9a84c]/50 p-10 transition-all duration-500 bg-[#0a0a0a] hover:bg-[#0f0f0f]">
              <div className="font-cormorant text-4xl text-[#c9a84c]/30 mb-6 group-hover:text-[#c9a84c]/60 transition-colors">02</div>
              <h3 className="font-cormorant text-2xl text-[#f5f0e8] mb-4 group-hover:text-[#c9a84c] transition-colors">
                Papel Interno
              </h3>
              <p className="font-jost text-[#e8d5a3]/45 text-sm leading-loose tracking-wide mb-8">
                75g Marfim (incluso), ou upgrade para 90g Bold Premium.
                Cada tipo entrega uma experiência sensorial diferente ao tocar e ler.
              </p>
              <div className="flex flex-wrap gap-2">
                {['75g Marfim', '90g Bold Premium', 'Algodão 100%', 'Pólen Soft', 'Reciclado'].map((tag) => (
                  <span key={tag} className="font-jost text-xs text-[#c9a84c]/60 border border-[#c9a84c]/20 px-3 py-1 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="group border border-[#c9a84c]/15 hover:border-[#c9a84c]/50 p-10 transition-all duration-500 bg-[#0a0a0a] hover:bg-[#0f0f0f]">
              <div className="font-cormorant text-4xl text-[#c9a84c]/30 mb-6 group-hover:text-[#c9a84c]/60 transition-colors">03</div>
              <h3 className="font-cormorant text-2xl text-[#f5f0e8] mb-4 group-hover:text-[#c9a84c] transition-colors">
                Acabamentos Especiais
              </h3>
              <p className="font-jost text-[#e8d5a3]/45 text-sm leading-loose tracking-wide mb-8">
                Hot stamping dourado ou prata na capa e lombada, bordas pintadas à mão,
                fita de cetim e cantoneiras de metal inclusos em todos os pedidos.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Hot Stamp Dourado', 'Hot Stamp Prata', 'Fita de Cetim', 'Cantoneiras', 'Bordas Pintadas'].map((tag) => (
                  <span key={tag} className="font-jost text-xs text-[#c9a84c]/60 border border-[#c9a84c]/20 px-3 py-1 tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="
              relative border border-[#c9a84c]/40 p-10
              flex flex-col justify-between
              hover:border-[#c9a84c] transition-all duration-500
              bg-[#0a0a0a]
            ">
              <div>
                <div className="font-cormorant text-4xl text-[#c9a84c]/40 mb-6">✦</div>
                <h3 className="font-cormorant text-2xl text-[#f5f0e8] mb-4">
                  Cada livro é único
                </h3>
                <p className="font-jost text-[#e8d5a3]/45 text-sm leading-loose tracking-wide mb-4">
                  As combinações são infinitas. Nossa equipe te guia em cada escolha
                  para que o resultado final seja exatamente o que você imaginou.
                </p>
                <div className="space-y-2 mb-8">
                  {[
                    '⏳ Prazo: 30 a 45 dias úteis',
                    '📦 Frete grátis no pagamento à vista',
                    '🔩 Cantoneiras, fita e hot stamping inclusos',
                  ].map((item) => (
                    <p key={item} className="font-jost text-xs text-[#c9a84c]/70 tracking-wide">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <Link
                href="/orcamento"
                className="
                  inline-block font-jost text-xs tracking-[0.25em] uppercase
                  bg-[#c9a84c] hover:bg-[#e8d5a3] text-[#0a0a0a]
                  px-8 py-3.5 transition-all duration-300 text-center
                "
              >
                Montar meu livro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PROCESSO — Compromisso + Consistência
      ══════════════════════════════════════════ */}
      <section id="processo" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-jost text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">
              Do orçamento à entrega
            </p>
            <h2 className="font-cormorant text-4xl lg:text-5xl font-light text-[#f5f0e8]">
              Um processo simples,
              <span className="italic text-[#c9a84c]"> um resultado extraordinário.</span>
            </h2>
            <GoldDivider />
          </div>

          <div className="relative">
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#c9a84c]/40 via-[#c9a84c]/20 to-transparent" />
            <div className="space-y-16">
              {[
                {
                  num: '01', title: 'Faça seu orçamento', align: 'left',
                  desc: 'Preencha o formulário com as especificações do livro. Nossa equipe analisa e retorna com o valor e prazo em até 24 horas úteis.',
                },
                {
                  num: '02', title: 'Aprovação e pagamento', align: 'right',
                  desc: 'À vista com frete grátis, ou parcelado (60% entrada + 40% no despacho). Parcelamento no cartão disponível com taxas por conta do cliente.',
                },
                {
                  num: '03', title: 'Manufatura artesanal', align: 'left',
                  desc: 'Nossos artesãos trabalham cada etapa manualmente. Você recebe fotos do processo — porque acompanhar a criação faz parte da experiência.',
                },
                {
                  num: '04', title: 'Entrega em 30 a 45 dias', align: 'right',
                  desc: 'Sua obra é embalada individualmente em caixa de presente e enviada com seguro para qualquer lugar do Brasil.',
                },
              ].map((step, i) => (
                <div key={i} className={`relative flex items-start gap-8 ${step.align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
                  <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#c9a84c] shadow-[0_0_16px_rgba(201,168,76,0.6)]" />
                  <div className={`pl-20 lg:pl-0 lg:w-1/2 ${step.align === 'right' ? 'lg:pr-20 lg:text-right' : 'lg:pl-20'}`}>
                    <div className="font-cormorant text-5xl text-[#c9a84c]/20 mb-3 font-light">{step.num}</div>
                    <h3 className="font-cormorant text-2xl text-[#f5f0e8] mb-3">{step.title}</h3>
                    <p className="font-jost text-[#e8d5a3]/50 text-sm leading-loose tracking-wide">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-20">
            <Link
              href="/orcamento"
              className="
                inline-block font-jost text-xs tracking-[0.25em] uppercase
                border border-[#c9a84c] text-[#c9a84c]
                hover:bg-[#c9a84c] hover:text-[#0a0a0a]
                px-14 py-4 transition-all duration-300
              "
            >
              Iniciar orçamento agora
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DEPOIMENTOS — Prova Social
      ══════════════════════════════════════════ */}
      <section id="depoimentos" className="py-32 px-6 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="font-jost text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">
              Experiências reais
            </p>
            <h2 className="font-cormorant text-4xl lg:text-5xl font-light text-[#f5f0e8]">
              O que nossas obras
              <span className="italic text-[#c9a84c]"> dizem por nós.</span>
            </h2>
            <GoldDivider />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Beatriz Nogueira', city: 'São Paulo, SP',
                project: 'Livro de memórias de família',
                text: 'Encomendei um livro com as cartas da minha avó para presentear minha mãe. O resultado me fez chorar. É um objeto para ser guardado para sempre.',
              },
              {
                name: 'Dr. Henrique Lara', city: 'Rio de Janeiro, RJ',
                project: 'Coletânea de artigos acadêmicos',
                text: 'Impressionante a atenção ao detalhe. Escolhi couro bordô com hot stamp e ficou exatamente como imaginei. O processo de acompanhar cada etapa foi único.',
              },
              {
                name: 'Fernanda Assis', city: 'Belo Horizonte, MG',
                project: 'Álbum artesanal de casamento',
                text: 'Já usamos o livro para apresentar nosso portfólio a clientes. Todas as pessoas perguntam onde fizemos. Virou nosso cartão de visitas mais impactante.',
              },
            ].map((dep, i) => (
              <div key={i} className="group border border-[#c9a84c]/15 hover:border-[#c9a84c]/40 p-8 transition-all duration-500 bg-[#0a0a0a]">
                <div className="font-cormorant text-3xl text-[#c9a84c]/30 mb-6 group-hover:text-[#c9a84c]/60 transition-colors">
                  &ldquo;
                </div>
                <p className="font-cormorant text-[#e8d5a3]/70 text-lg italic leading-relaxed mb-8">
                  {dep.text}
                </p>
                <div className="border-t border-[#c9a84c]/15 pt-6">
                  <div className="font-jost text-[#e8d5a3] text-sm font-medium">{dep.name}</div>
                  <div className="font-jost text-[#c9a84c]/60 text-xs tracking-wide mt-1">{dep.city}</div>
                  <div className="font-jost text-[#e8d5a3]/30 text-xs tracking-wide mt-0.5">{dep.project}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
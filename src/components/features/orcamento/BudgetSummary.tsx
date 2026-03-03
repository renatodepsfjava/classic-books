'use client'

import { z } from 'zod'
import { useMemo, useState } from 'react'
import { GoldDivider } from '@/components/ui/GoldDivider'

/* ─────────────────────────────────────────────────────
   SCHEMA DE VALIDAÇÃO
───────────────────────────────────────────────────── */
const budgetSchema = z.object({
  tamanho: z.enum(['A5', 'A4']),
  papel: z.enum(['standard', 'premium']),
  estampa: z.enum(['dourado', 'prata']),
  pagamento: z.enum(['avista', 'parcelado']),
  impressaoColorida: z.boolean(),
  revisaoTextual: z.boolean(),
})

type BudgetFormData = z.infer<typeof budgetSchema>

interface BudgetSummaryProps {
  pageCount: number
  onApproved?: (total: number, options: BudgetFormData) => void
}

/* ── Checkbox customizado ── */
function CustomCheckbox({
  label,
  sublabel,
  checked,
  onChange,
  valueRight,
}: {
  label: string
  sublabel: string
  checked: boolean
  onChange: () => void
  valueRight?: string
}) {
  return (
    <div
      onClick={onChange}
      className={`
        flex items-center justify-between p-4 border cursor-pointer
        transition-all duration-300 group
        ${checked
          ? 'border-gold bg-gold/5'
          : 'border-gold/20 hover:border-gold/50'
        }
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`
          w-5 h-5 border flex items-center justify-center shrink-0 transition-all duration-200
          ${checked ? 'border-gold bg-gold/15' : 'border-gold/30'}
        `}>
          {checked && <span className="text-gold text-xs font-bold leading-none">✕</span>}
        </div>
        <div>
          <p className="font-jost text-sm text-gold-light group-hover:text-white tracking-wide transition-colors">
            {label}
          </p>
          <p className="font-jost text-xs text-gold-light/60 tracking-wide mt-0.5">{sublabel}</p>
        </div>
      </div>
      {checked && valueRight && (
        <span className="font-cormorant text-lg text-gold font-light shrink-0 ml-4">
          {valueRight}
        </span>
      )}
    </div>
  )
}

/* ── Seletor de opção (radio visual) ── */
function OptionSelector({
  label,
  options,
  value,
  onChange,
  cols = 2,
}: {
  label: string
  options: { value: string; label: string; sublabel?: string; badge?: string }[]
  value: string
  onChange: (val: string) => void
  cols?: number
}) {
  return (
    <div className="space-y-3">
      <p className="font-jost text-xs tracking-[0.25em] uppercase text-gold">{label}</p>
      <div className={`grid gap-2 grid-cols-${cols}`}>
        {options.map((opt) => (
          <div
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`
              relative p-4 border cursor-pointer transition-all duration-300 group
              ${value === opt.value
                ? 'border-gold bg-gold/8'
                : 'border-gold/20 hover:border-gold/50'
              }
            `}
          >
            {opt.badge && (
              <span className="absolute top-2 right-2 font-jost text-[10px] tracking-wider uppercase bg-gold text-ink px-2 py-0.5">
                {opt.badge}
              </span>
            )}
            <div className="flex items-center gap-3">
              <div className={`
                w-4 h-4 border rounded-full flex items-center justify-center shrink-0 transition-all
                ${value === opt.value ? 'border-gold' : 'border-gold/30'}
              `}>
                {value === opt.value && (
                  <div className="w-2 h-2 rounded-full bg-gold" />
                )}
              </div>
              <div>
                <p className={`font-jost text-sm tracking-wide transition-colors ${value === opt.value ? 'text-gold' : 'text-gold-light/80 group-hover:text-gold-light'}`}>
                  {opt.label}
                </p>
                {opt.sublabel && (
                  <p className="font-jost text-xs text-gold-light/40 tracking-wide mt-0.5">{opt.sublabel}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────────────────── */
export function BudgetSummary({ pageCount, onApproved }: BudgetSummaryProps) {
  // Opções controladas manualmente para melhor UX
  const [tamanho, setTamanho] = useState<'A5' | 'A4'>('A5')
  const [papel, setPapel] = useState<'standard' | 'premium'>('standard')
  const [estampa, setEstampa] = useState<'dourado' | 'prata'>('dourado')
  const [pagamento, setPagamento] = useState<'avista' | 'parcelado'>('avista')
  const [impressaoColorida, setImpressaoColorida] = useState(false)
  const [revisaoTextual, setRevisaoTextual] = useState(false)

  /* ── Regras de negócio do preço ── */
  const breakdown = useMemo(() => {
    // Preço base por faixa de páginas
    const getBase = (pages: number) => {
      if (pages <= 150) return 160.00
      if (pages <= 300) return 190.00
      if (pages <= 400) return 200.00
      return 210.00
    }

    const ADICIONAL_A4        = 50.00    // A4 tem valor diferenciado
    const ADICIONAL_PAPEL_90G = 30.00    // Papel 90g marfim Bold Premium
    const ADICIONAL_COLORIDO  = pageCount * 0.20  // Impressão colorida por página
    const ADICIONAL_REVISAO   = pageCount * 2.00  // Revisão textual por página

    const base      = getBase(pageCount)
    const a4        = tamanho === 'A4' ? ADICIONAL_A4 : 0
    const papelExtra = papel === 'premium' ? ADICIONAL_PAPEL_90G : 0
    const colorida  = impressaoColorida ? ADICIONAL_COLORIDO : 0
    const revisao   = revisaoTextual ? ADICIONAL_REVISAO : 0

    const subtotal  = base + a4 + papelExtra + colorida + revisao

    // Regras de pagamento
    const freteGratis   = pagamento === 'avista'
    const entrada60     = pagamento === 'parcelado' ? subtotal * 0.60 : null
    const restante40    = pagamento === 'parcelado' ? subtotal * 0.40 : null

    return { base, a4, papelExtra, colorida, revisao, subtotal, freteGratis, entrada60, restante40 }
  }, [tamanho, papel, impressaoColorida, revisaoTextual, pagamento, pageCount])

  const onSubmit = () => {
    const data: BudgetFormData = {
      tamanho, papel, estampa, pagamento, impressaoColorida, revisaoTextual
    }
    if (onApproved) {
      onApproved(breakdown.subtotal, data)
    }
  }

  return (
    <div className="w-full border border-gold/20 bg-ink-soft">

      {/* Cabeçalho */}
      <div className="px-8 py-6 border-b border-gold/15">
        <p className="font-jost text-xs tracking-[0.3em] uppercase text-gold mb-1">
          Estimativa
        </p>
        <h3 className="font-cormorant text-2xl font-light text-[#f5f0e8]">
          Resumo do Orçamento
        </h3>
        <p className="font-jost text-xs text-gold-light/50 tracking-wide mt-1">
          {pageCount} página{pageCount !== 1 ? 's' : ''} detectada{pageCount !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="p-8 space-y-8">

        {/* ── TAMANHO ── */}
        <OptionSelector
          label="Tamanho do livro"
          value={tamanho}
          onChange={(v) => setTamanho(v as 'A5' | 'A4')}
          options={[
            { value: 'A5', label: 'Formato A5', sublabel: '21cm × 14,8cm', badge: 'Popular' },
            { value: 'A4', label: 'Formato A4', sublabel: 'Valor diferenciado' },
          ]}
        />

        {/* ── PAPEL ── */}
        <OptionSelector
          label="Tipo de papel interno"
          value={papel}
          onChange={(v) => setPapel(v as 'standard' | 'premium')}
          options={[
            { value: 'standard', label: 'Papel Standard', sublabel: '75g Marfim — incluso' },
            { value: 'premium', label: '90g Bold Premium', sublabel: 'Marfim · + R$ 30,00' },
          ]}
        />

        {/* ── COR DE ESTAMPA ── */}
        <OptionSelector
          label="Cor de estampa (título, autor e motivos)"
          value={estampa}
          onChange={(v) => setEstampa(v as 'dourado' | 'prata')}
          options={[
            { value: 'dourado', label: '✨ Dourado', sublabel: 'Hot stamping dourado' },
            { value: 'prata', label: '◆ Prata', sublabel: 'Hot stamping prata' },
          ]}
        />

        {/* ── OPÇÕES ADICIONAIS ── */}
        <div className="space-y-3">
          <p className="font-jost text-xs tracking-[0.25em] uppercase text-gold">
            Opções adicionais
          </p>
          <CustomCheckbox
            label="Impressão Colorida"
            sublabel={`+ R$ 0,20 por página (${pageCount} págs.)`}
            checked={impressaoColorida}
            onChange={() => setImpressaoColorida(!impressaoColorida)}
            valueRight={`+ R$ ${(pageCount * 0.20).toFixed(2)}`}
          />
          <CustomCheckbox
            label="Revisão Textual"
            sublabel={`+ R$ 2,00 por página (${pageCount} págs.)`}
            checked={revisaoTextual}
            onChange={() => setRevisaoTextual(!revisaoTextual)}
            valueRight={`+ R$ ${(pageCount * 2.00).toFixed(2)}`}
          />
        </div>

        {/* ── PAGAMENTO ── */}
        <div className="space-y-3">
          <p className="font-jost text-xs tracking-[0.25em] uppercase text-gold">
            Forma de pagamento
          </p>
          <div className="grid grid-cols-1 gap-2">
            {[
              {
                value: 'avista',
                label: 'À vista',
                sublabel: 'Frete grátis · PIX, transferência ou dinheiro',
              },
              {
                value: 'parcelado',
                label: 'Parcelado',
                sublabel: '60% de entrada + 40% no despacho · Frete cobrado à parte',
              },
            ].map((opt) => (
              <div
                key={opt.value}
                onClick={() => setPagamento(opt.value as 'avista' | 'parcelado')}
                className={`
                  p-4 border cursor-pointer transition-all duration-300 group
                  ${pagamento === opt.value
                    ? 'border-gold bg-gold/5'
                    : 'border-gold/20 hover:border-gold/50'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className={`
                    mt-0.5 w-4 h-4 border rounded-full flex items-center justify-center shrink-0 transition-all
                    ${pagamento === opt.value ? 'border-gold' : 'border-gold/30'}
                  `}>
                    {pagamento === opt.value && (
                      <div className="w-2 h-2 rounded-full bg-gold" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-jost text-sm tracking-wide transition-colors ${pagamento === opt.value ? 'text-gold' : 'text-gold-light/80'}`}>
                      {opt.label}
                    </p>
                    <p className="font-jost text-xs text-gold-light/50 tracking-wide mt-0.5 leading-relaxed">
                      {opt.sublabel}
                    </p>
                    {/* Detalhe do parcelado */}
                    {opt.value === 'parcelado' && pagamento === 'parcelado' && breakdown.entrada60 && (
                      <div className="mt-2 flex gap-4">
                        <span className="font-jost text-xs text-gold/80">
                          Entrada: R$ {breakdown.entrada60.toFixed(2)}
                        </span>
                        <span className="font-jost text-xs text-gold-light/50">
                          No despacho: R$ {breakdown.restante40?.toFixed(2)}
                        </span>
                      </div>
                    )}
                    {/* Info cartão */}
                    {opt.value === 'avista' && pagamento === 'avista' && (
                      <p className="font-jost text-xs text-gold-light/35 tracking-wide mt-1">
                        Parcelamento no cartão disponível · taxas por conta do cliente
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── DETALHAMENTO DO PREÇO ── */}
        <div className="space-y-3 py-2">
          <GoldDivider compact />
          <div className="space-y-2">
            {[
              { label: 'Livro artesanal (base)', value: breakdown.base },
              ...(breakdown.a4 > 0 ? [{ label: 'Formato A4', value: breakdown.a4 }] : []),
              ...(breakdown.papelExtra > 0 ? [{ label: 'Papel 90g Bold Premium', value: breakdown.papelExtra }] : []),
              ...(breakdown.colorida > 0 ? [{ label: 'Impressão colorida', value: breakdown.colorida }] : []),
              ...(breakdown.revisao > 0 ? [{ label: 'Revisão textual', value: breakdown.revisao }] : []),
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="font-jost text-xs text-gold-light/60 tracking-wide">{item.label}</span>
                <span className="font-jost text-xs text-gold-light/80 tracking-wide">
                  R$ {item.value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <GoldDivider compact />
        </div>

        {/* ── TOTAL ── */}
        <div className="border border-gold bg-gold px-6 py-5 flex items-center justify-between">
          <div>
            <p className="font-jost text-xs tracking-[0.2em] uppercase text-ink font-semibold mb-1">
              Valor total estimado
            </p>
            <p className="font-jost text-xs text-ink/70 font-medium tracking-wide">
              {breakdown.freteGratis ? '✓ Frete grátis incluso' : 'Frete cobrado à parte'}
            </p>
          </div>
          <p className="font-cormorant text-4xl font-bold text-ink">
            R$ {breakdown.subtotal.toFixed(2)}
          </p>
        </div>

        {/* ── DIFERENCIAIS INCLUSOS ── */}
        <div className="border border-gold/15 bg-ink p-6 space-y-4">
          <p className="font-jost text-xs tracking-[0.25em] uppercase text-gold">
            Incluso em todos os pedidos
          </p>
          <div className="space-y-3">
            {[
              { icon: '🔩', label: 'Cantoneiras de metal', desc: 'Aumenta a durabilidade da capa' },
              { icon: '🎀', label: 'Fita de cetim', desc: 'Para marcação de páginas' },
              { icon: '✨', label: 'Douração (hot stamping)', desc: 'Na capa e lombada' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <span className="text-base shrink-0">{item.icon}</span>
                <div>
                  <p className="font-jost text-xs text-gold-light/80 tracking-wide">{item.label}</p>
                  <p className="font-jost text-xs text-gold-light/40 tracking-wide mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTÃO ── */}
        <button
          type="button"
          onClick={onSubmit}
          className="
            w-full font-jost text-xs tracking-[0.25em] uppercase
            bg-gold hover:bg-gold-light text-ink
            py-5 transition-all duration-300
            hover:shadow-[0_0_40px_rgba(201,168,76,0.3)]
            hover:scale-[1.01] active:scale-[0.99]
          "
        >
          Aprovar orçamento
        </button>

        {/* ── PRAZO + NOTA ── */}
        <div className="space-y-3 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-gold/60 text-sm">⏳</span>
            <p className="font-jost text-xs text-gold-light/60 tracking-wide">
              Prazo de entrega: <span className="text-gold">30 a 45 dias úteis</span>
            </p>
          </div>
          <p className="font-jost text-xs text-gold-light/40 tracking-wide leading-relaxed">
            Nossa equipe confirma os detalhes em até 24h úteis após a solicitação.
          </p>
        </div>

      </div>
    </div>
  )
}
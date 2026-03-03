/* ── Divisor decorativo dourado ──
   variant padrão : gradiente com largura fixa (home, orçamento hero)
   compact        : linha sólida com opacidade, largura flex (BudgetSummary)
*/
export function GoldDivider({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex items-center gap-3 my-1">
        <div className="h-px flex-1 bg-gold/20" />
        <div className="w-1 h-1 rotate-45 bg-gold/50" />
        <div className="h-px flex-1 bg-gold/20" />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-4 my-2">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
      <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
    </div>
  )
}

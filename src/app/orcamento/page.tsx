"use client";

import { useState } from "react";
import { PDFUploader } from "@/components/features/orcamento/PDFUploader";
import { BudgetSummary } from "@/components/features/orcamento/BudgetSummary";

/**
 * Página de Orçamento de Livros
 * 
 * Paralelo Java: Este componente é como um Controller do Spring MVC que:
 * - Gerencia o estado da aplicação (pageCount)
 * - Orquestra a comunicação entre componentes filhos
 * - Define o layout da página
 * 
 * NOTA: Marcado como "use client" porque gerencia estado (useState).
 * Em uma aplicação real, você poderia manter este como Server Component
 * e usar apenas Client Components para as partes interativas.
 */
export default function OrcamentoPage() {
  // Estado que armazena o número de páginas extraído do PDF
  // Paralelo Java: Similar a um atributo de sessão ou model attribute
  const [pageCount, setPageCount] = useState<number | null>(null);

  /**
   * Callback passado para o PDFUploader
   * 
   * Paralelo Java: Similar a passar um Consumer<Integer> ou listener
   * que será invocado quando o processamento do PDF terminar
   */
  const handlePageCountExtracted = (count: number) => {
    setPageCount(count);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto">
        {/* Cabeçalho da Página */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Orçamento de Livros
          </h1>
          <p className="text-gray-600 text-lg">
            Faça upload do seu manuscrito e calcule o custo de impressão
          </p>
        </header>

        {/* Componente de Upload */}
        <PDFUploader onPageCountExtracted={handlePageCountExtracted} />

        {/* Componente de Resumo - Só renderiza após extrair pageCount */}
        {/* Paralelo Java: Similar a renderização condicional com th:if no Thymeleaf */}
        {pageCount !== null && <BudgetSummary pageCount={pageCount} />}
      </div>
    </main>
  );
}

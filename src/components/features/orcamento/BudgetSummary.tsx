"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMemo } from "react";

// Schema de validação usando Zod
// Paralelo Java: Equivalente a anotações Bean Validation (@NotNull, @Min, etc.)
// Define as regras de validação do formulário
const budgetSchema = z.object({
  impressaoColorida: z.boolean(),
  capaDura: z.boolean(),
  revisaoTextual: z.boolean(),
});

// Type inference do TypeScript baseado no schema
// Paralelo Java: Similar a criar um DTO com os campos validados
type BudgetFormData = z.infer<typeof budgetSchema>;

// Interface das props do componente
interface BudgetSummaryProps {
  pageCount: number;
}

/**
 * Componente de Resumo e Cálculo de Orçamento
 * 
 * Paralelo Java: Este componente é como um formulário JSP/Thymeleaf com:
 * - Validação declarativa (Bean Validation)
 * - Binding de dados (th:field)
 * - Lógica de cálculo (método de serviço)
 */
export function BudgetSummary({ pageCount }: BudgetSummaryProps) {
  // Inicialização do React Hook Form com validação Zod
  // Paralelo Java: Similar a criar um @ModelAttribute no Spring MVC
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<BudgetFormData>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      impressaoColorida: false,
      capaDura: false,
      revisaoTextual: false,
    },
  });

  // Observa mudanças nos campos do formulário em tempo real
  // Paralelo Java: Similar a um PropertyChangeListener
  const formValues = watch();

  /**
   * Cálculo do orçamento total
   * 
   * Paralelo Java: Este useMemo é como um método @Cacheable do Spring.
   * Só recalcula quando pageCount ou formValues mudam.
   * 
   * Regras de Negócio:
   * - Base: R$ 0,50 por página
   * - Impressão Colorida: + R$ 0,20 por página
   * - Capa Dura: + R$ 35,00 (fixo)
   * - Revisão Textual: + R$ 2,00 por página
   */
  const orcamentoTotal = useMemo(() => {
    const PRECO_BASE_POR_PAGINA = 0.5;
    const PRECO_COLORIDA_POR_PAGINA = 0.2;
    const PRECO_CAPA_DURA_FIXO = 35.0;
    const PRECO_REVISAO_POR_PAGINA = 2.0;

    let total = pageCount * PRECO_BASE_POR_PAGINA;

    if (formValues.impressaoColorida) {
      total += pageCount * PRECO_COLORIDA_POR_PAGINA;
    }

    if (formValues.capaDura) {
      total += PRECO_CAPA_DURA_FIXO;
    }

    if (formValues.revisaoTextual) {
      total += pageCount * PRECO_REVISAO_POR_PAGINA;
    }

    return total;
  }, [pageCount, formValues]);

  /**
   * Handler de submit do formulário
   * 
   * Paralelo Java: Similar a um método @PostMapping que processa o formulário
   */
  const onSubmit = (data: BudgetFormData) => {
    // Aqui você pode enviar os dados para uma API ou processar localmente
    console.log("Orçamento aprovado:", {
      ...data,
      pageCount,
      orcamentoTotal,
    });
    alert(`Orçamento de R$ ${orcamentoTotal.toFixed(2)} aprovado com sucesso!`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Resumo do Orçamento
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Informação de Páginas */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-gray-600">Número de Páginas</p>
          <p className="text-3xl font-bold text-blue-600">{pageCount}</p>
        </div>

        {/* Opções Extras */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-700">
            Opções Adicionais
          </h3>

          {/* Checkbox: Impressão Colorida */}
          <label className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              {...register("impressaoColorida")}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex-1">
              <span className="font-medium text-gray-800">
                Impressão Colorida
              </span>
              <p className="text-sm text-gray-500">+ R$ 0,20 por página</p>
            </div>
          </label>

          {/* Checkbox: Capa Dura */}
          <label className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              {...register("capaDura")}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex-1">
              <span className="font-medium text-gray-800">Capa Dura</span>
              <p className="text-sm text-gray-500">+ R$ 35,00 (fixo)</p>
            </div>
          </label>

          {/* Checkbox: Revisão Textual */}
          <label className="flex items-center gap-3 p-3 border rounded hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              {...register("revisaoTextual")}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex-1">
              <span className="font-medium text-gray-800">Revisão Textual</span>
              <p className="text-sm text-gray-500">+ R$ 2,00 por página</p>
            </div>
          </label>
        </div>

        {/* Total do Orçamento */}
        <div className="p-6 bg-green-50 border-2 border-green-300 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Valor Total</p>
          <p className="text-4xl font-bold text-green-700">
            R$ {orcamentoTotal.toFixed(2)}
          </p>
        </div>

        {/* Botão de Submit */}
        <button
          type="submit"
          className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg
                     hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-colors duration-200"
        >
          Aprovar Orçamento
        </button>
      </form>
    </div>
  );
}

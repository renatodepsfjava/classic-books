"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

// Configuração global do worker do pdf.js para usar um CDN.
// Isso evita problemas de empacotamento com o Next.js.
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

// Interface que define o contrato de retorno do hook
interface UsePDFReturn {
  pageCount: number | null;
  isLoading: boolean;
  error: string | null;
  extractPageCount: (file: File) => Promise<void>;
}

/**
 * Hook customizado para extrair informações de arquivos PDF
 */
export function usePDF(): UsePDFReturn {
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const extractPageCount = async (file: File): Promise<void> => {
    setError(null);
    setIsLoading(true);
    setPageCount(null); // Reseta a contagem para limpar o estado da UI anterior

    try {
      if (!(file instanceof File)) {
        throw new Error("Arquivo inválido");
      }

      // Converte o arquivo para ArrayBuffer de forma mais moderna e limpa.
      // O método .arrayBuffer() está disponível no protótipo do Blob, do qual File herda.
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDocument = await loadingTask.promise;

      setPageCount(pdfDocument.numPages);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erro desconhecido ao processar PDF";
      setError(errorMessage);
      setPageCount(null);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    pageCount,
    isLoading,
    error,
    extractPageCount,
  };
}

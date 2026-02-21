"use client";

import { useCallback, useState, useEffect } from "react";
import { usePDF } from "@/hooks/usePDF";

// Interface que define as props do componente
// Paralelo Java: Similar a um DTO ou Record que define os parâmetros de entrada
interface PDFUploaderProps {
  onPageCountExtracted: (pageCount: number) => void;
}

/**
 * Componente de Upload de PDF com Drag & Drop
 * 
 * Paralelo Java: Este é um componente de View (camada de apresentação).
 * Pense nele como um formulário JSP que:
 * - Recebe callbacks via props (similar a passar listeners)
 * - Gerencia estado local de UI (isDragging)
 * - Delega lógica de negócio para o hook usePDF (Service)
 */
export function PDFUploader({ onPageCountExtracted }: PDFUploaderProps) {
  const { pageCount, isLoading, error, extractPageCount } = usePDF();
  const [isDragging, setIsDragging] = useState<boolean>(false);

  /**
   * Processa o arquivo selecionado
   * 
   * Paralelo Java: Método privado que valida e processa entrada,
   * similar a um método helper em um Controller
   */
  const handleFile = useCallback(
    async (file: File) => {
      // Validação de tipo MIME
      if (file.type !== "application/pdf") {
        alert("Por favor, selecione apenas arquivos PDF");
        return;
      }

      await extractPageCount(file);
    },
    [extractPageCount]
  );

  /**
   * Handler para evento de drop (soltar arquivo)
   * 
   * Paralelo Java: Similar a um método que processa um evento de submit
   */
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  /**
   * Handler para input file tradicional (fallback)
   */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  // Efeito colateral para notificar o componente pai quando pageCount é extraído.
  // Usar useEffect garante que a notificação ocorra apenas quando os valores
  // relevantes (pageCount, isLoading) mudam, evitando chamadas em renderizações indesejadas.
  useEffect(() => {
    if (pageCount !== null && !isLoading) {
      onPageCountExtracted(pageCount);
    }
  }, [pageCount, isLoading, onPageCountExtracted]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Upload do Manuscrito
      </h2>

      {/* Dropzone - Área de Drag & Drop */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        className={`
          border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
          transition-colors duration-200
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50"}
          hover:border-blue-400 hover:bg-blue-50
        `}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={handleInputChange}
          className="hidden"
          id="pdf-upload"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer">
          <div className="flex flex-col items-center gap-3">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-lg font-medium text-gray-700">
              Arraste e solte seu PDF aqui
            </p>
            <p className="text-sm text-gray-500">ou clique para selecionar</p>
          </div>
        </label>
      </div>

      {/* Estados de Loading, Erro e Sucesso */}
      <div className="mt-4">
        {isLoading && (
          <div className="flex items-center gap-2 text-blue-600">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span>Processando PDF...</span>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700">
            <strong>Erro:</strong> {error}
          </div>
        )}

        {pageCount !== null && !isLoading && (
          <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700">
            <strong>Sucesso!</strong> Documento com {pageCount} página(s) detectado.
          </div>
        )}
      </div>
    </div>
  );
}

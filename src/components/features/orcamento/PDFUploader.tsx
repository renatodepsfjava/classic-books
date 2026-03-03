'use client'

import { useCallback, useState, useEffect } from 'react'
import { usePDF } from '@/hooks/usePDF'

interface PDFUploaderProps {
  onPageCountExtracted: (pageCount: number) => void
  onLoadingStart?: () => void
}

export function PDFUploader({ onPageCountExtracted, onLoadingStart }: PDFUploaderProps) {
  const { pageCount, isLoading, error, extractPageCount } = usePDF()
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleFile = useCallback(
    async (file: File) => {
      if (file.type !== 'application/pdf') {
        alert('Por favor, selecione apenas arquivos PDF')
        return
      }
      setFileName(file.name)
      onLoadingStart?.()
      await extractPageCount(file)
    },
    [extractPageCount, onLoadingStart]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const files = e.dataTransfer.files
      if (files.length > 0) handleFile(files[0])
    },
    [handleFile]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) handleFile(files[0])
    },
    [handleFile]
  )

  useEffect(() => {
    if (pageCount !== null && !isLoading) {
      onPageCountExtracted(pageCount)
    }
  }, [pageCount, isLoading, onPageCountExtracted])

  return (
    <div className="w-full space-y-4">

      {/* Label */}
      <label className="block font-jost text-xs tracking-[0.25em] uppercase text-[#c9a84c]">
        Manuscrito em PDF <span className="text-[#c9a84c]/50">*</span>
      </label>

      {/* ⚠️ Aviso sobre imperfeições — exibido ANTES do upload */}
      <div className="flex items-start gap-3 px-5 py-4" style={{ background: '#1a1400', border: '1px solid #92600a' }}>
        <span className="text-yellow-500 text-base shrink-0 mt-0.5">⚠️</span>
        <div>
          <p className="font-jost text-xs font-semibold tracking-wide mb-1" style={{ color: '#f59e0b' }}>
            ATENÇÃO
          </p>
          <p className="font-jost text-xs tracking-wide leading-relaxed" style={{ color: '#d97706' }}>
            Não nos responsabilizamos por PDFs com imperfeições como páginas faltantes,
            ordem invertida ou manchas. Verifique seu arquivo antes de prosseguir.
          </p>
        </div>
      </div>

      {/* Zona de upload */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        className={`
          relative border transition-all duration-300
          ${isDragging
            ? 'border-[#c9a84c] bg-[#c9a84c]/5'
            : 'border-[#c9a84c]/20 hover:border-[#c9a84c]/40 bg-[#111]'
          }
        `}
      >
        <input
          type="file"
          accept="application/pdf"
          onChange={handleInputChange}
          className="hidden"
          id="pdf-upload"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer flex items-center gap-5 px-6 py-5">

          {/* Ícone */}
          <div className={`
            shrink-0 w-10 h-10 border flex items-center justify-center transition-all duration-300
            ${isDragging ? 'border-[#c9a84c]' : 'border-[#c9a84c]/25'}
          `}>
            {isLoading ? (
              <div className="w-4 h-4 border border-[#c9a84c]/40 border-t-[#c9a84c] rounded-full animate-spin" />
            ) : pageCount !== null ? (
              <span className="text-[#c9a84c] text-sm">✦</span>
            ) : (
              <svg className={`w-4 h-4 transition-colors ${isDragging ? 'text-[#c9a84c]' : 'text-[#c9a84c]/40'}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
          </div>

          {/* Texto */}
          <div className="flex-1 min-w-0">
            {fileName ? (
              <>
                <p className="font-cormorant text-base text-[#c9a84c] italic truncate">{fileName}</p>
                <p className="font-jost text-xs text-[#e8d5a3]/40 tracking-wide mt-0.5">Clique para substituir</p>
              </>
            ) : (
              <>
                <p className="font-jost text-sm text-[#e8d5a3]/60 tracking-wide">
                  Arraste o PDF ou clique para selecionar
                </p>
                <p className="font-jost text-xs text-[#e8d5a3]/30 tracking-wide mt-0.5">
                  Somente arquivos .pdf
                </p>
              </>
            )}
          </div>

          {/* Badge de páginas */}
          {pageCount !== null && !isLoading && (
            <div className="shrink-0 border border-[#c9a84c]/40 px-3 py-1.5 text-center">
              <p className="font-cormorant text-xl text-[#c9a84c] font-light leading-none">{pageCount}</p>
              <p className="font-jost text-[10px] text-[#c9a84c]/50 tracking-wider uppercase mt-0.5">
                {pageCount === 1 ? 'pág.' : 'págs.'}
              </p>
            </div>
          )}
        </label>
      </div>

      {/* Erro */}
      {error && (
        <div className="flex items-center gap-3 px-4 py-3 border border-red-500/20 bg-red-500/5">
          <span className="text-red-400/70 text-xs shrink-0">✕</span>
          <span className="font-jost text-xs text-red-400/70 tracking-wide leading-relaxed">{error}</span>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center gap-3 px-4 py-2.5 border border-[#c9a84c]/15 bg-[#c9a84c]/5">
          <div className="w-3 h-3 border border-[#c9a84c]/40 border-t-[#c9a84c] rounded-full animate-spin shrink-0" />
          <span className="font-jost text-xs tracking-[0.15em] uppercase text-[#c9a84c]/60">
            Analisando manuscrito...
          </span>
        </div>
      )}
    </div>
  )
}
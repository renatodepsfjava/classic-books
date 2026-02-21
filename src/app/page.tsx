import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Classic Books</h1>
        <p className="text-xl text-gray-600 mb-8">Sistema de Orçamento de Livros</p>
        <Link 
          href="/orcamento"
          className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Criar Orçamento
        </Link>
      </div>
    </main>
  )
}

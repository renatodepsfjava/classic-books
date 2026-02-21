# Classic Books - Sistema de Orçamento

## 📋 Pré-requisitos

Você precisa ter o Node.js instalado no seu computador.

### Instalar Node.js no Windows:

1. Acesse: https://nodejs.org/
2. Baixe a versão LTS (recomendada)
3. Execute o instalador e siga as instruções
4. Reinicie o terminal/CMD após a instalação

Para verificar se instalou corretamente, abra um novo terminal e digite:
```bash
node --version
npm --version
```

## 🚀 Como Rodar o Projeto

### 1. Instalar Dependências

Abra o terminal na pasta `classic-books` e execute:

```bash
npm install
```

Este comando irá baixar todas as bibliotecas necessárias (React, Next.js, Tailwind, etc.)

### 2. Iniciar o Servidor de Desenvolvimento

Após a instalação, execute:

```bash
npm run dev
```

### 3. Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:3000
```

Para acessar diretamente a página de orçamento:
```
http://localhost:3000/orcamento
```

## 📁 Estrutura do Projeto

```
classic-books/
├── src/
│   ├── app/                    # Páginas da aplicação (App Router)
│   │   ├── layout.tsx          # Layout raiz
│   │   ├── page.tsx            # Página inicial
│   │   ├── globals.css         # Estilos globais
│   │   └── orcamento/
│   │       └── page.tsx        # Página de orçamento
│   ├── components/
│   │   └── features/
│   │       └── orcamento/
│   │           ├── PDFUploader.tsx      # Upload de PDF
│   │           └── BudgetSummary.tsx    # Cálculo de orçamento
│   └── hooks/
│       └── usePDF.ts           # Hook para processar PDF
├── package.json                # Dependências do projeto
├── tsconfig.json              # Configuração TypeScript
├── tailwind.config.js         # Configuração Tailwind CSS
└── next.config.js             # Configuração Next.js
```

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de dados
- **pdfjs-dist** - Processamento de PDF no navegador
- **Zustand** - Gerenciamento de estado global

## 📝 Funcionalidades

- ✅ Upload de PDF com drag & drop
- ✅ Leitura automática do número de páginas
- ✅ Cálculo de orçamento em tempo real
- ✅ Opções extras (impressão colorida, capa dura, revisão)
- ✅ Validação de formulário
- ✅ Interface responsiva e acessível

## 🐛 Solução de Problemas

### Erro: "npm não é reconhecido"
- Instale o Node.js conforme instruções acima
- Reinicie o terminal após a instalação

### Erro ao instalar dependências
- Tente executar: `npm cache clean --force`
- Execute novamente: `npm install`

### Porta 3000 já está em uso
- Execute: `npm run dev -- -p 3001`
- Acesse: http://localhost:3001

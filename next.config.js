/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Informa ao Webpack para tratar 'canvas' como um módulo externo.
    // Isso resolve o erro "Module not found: Can't resolve 'canvas'"
    // que ocorre porque pdfjs-dist tenta importar 'canvas' no ambiente do servidor.
    config.externals.push("canvas");
    return config;
  },
};

module.exports = nextConfig;

# Tabela Fipe Teste

Este projeto é uma aplicação Next.js para consulta de preços de veículos utilizando a tabela Fipe. A aplicação permite selecionar a marca, modelo e ano do veículo e retorna o preço conforme a tabela Fipe.

## Tecnologias Utilizadas

- [Next.js 14.2](https://nextjs.org/)
- [React 18](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/)
- [SWR](https://swr.vercel.app/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão recomendada 16.x ou superior)
- Yarn (recomendado) ou npm

### Passos para Rodar

   ```bash
   Clone o repositório:
   git clone https://github.com/seu-usuario/tabela-fipe-teste.git

   Navegue até o diretório do projeto: 
   cd tabela-fipe-teste

   Instale as dependências: 
   yarn install

   Inicie o servidor de desenvolvimento: 
   yarn dev

   Abra seu navegador e acesse: 
   http://localhost:3000
   ```


## Estrutura do Projeto

- `public/`: Arquivos públicos, como favicon.
- `src/`: Código fonte da aplicação.
  - `app/`: Componentes e páginas do Next.js.
    - `api/`: Endpoints da API.
  - `components/`: Componentes reutilizáveis da aplicação.
  - `context/`: Context API para gerenciar estados globais.
  - `theme/`: Configurações de tema do Material-UI.
  - `types/`: Definições de tipos TypeScript.
  - `utils/`: Utilitários diversos.
- `.eslintrc.json`: Configurações do ESLint.
- `next.config.mjs`: Configurações do Next.js.
- `tsconfig.json`: Configurações do TypeScript.
- `package.json`: Dependências e scripts do projeto.

## Endpoints da API

- `GET /api/brands`: Retorna a lista de marcas.
- `GET /api/models?brand={brand}`: Retorna a lista de modelos para uma marca específica.
- `GET /api/years?brand={brand}&model={model}`: Retorna a lista de anos para um modelo específico.




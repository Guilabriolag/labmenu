# labmenu-core — Código Fonte LabMenu

> ⚠️ REPOSITÓRIO PRIVADO — Não compartilhar. Contém estrutura de build, lógica e configs.

## Estrutura

```
labmenu-core/
├── src/
│   ├── vitorelli/          → Pizzaria Vitorelli
│   │   ├── index.html
│   │   ├── style.css
│   │   └── app.js
│   ├── moraesgrill/        → Rotisseria Moraes Grill
│   │   ├── index.html
│   │   ├── style.css
│   │   └── app.js
│   ├── mctonny/            → McTonny Lanches
│   │   ├── index.html
│   │   ├── style.css
│   │   └── app.js
│   ├── admin/              → Painel Administrativo
│   │   ├── index.html
│   │   ├── estoque.html
│   │   └── mimogame.html
│   ├── mimogame/           → Jogo de engajamento
│   │   ├── game.html
│   │   └── engine.js
│   └── workers/            → Cloudflare Workers (API)
│       ├── api-cardapio.js
│       ├── api-estoque.js
│       └── api-cupons.js
├── .env.example            → Variáveis necessárias (sem valores reais)
├── wrangler.toml           → Config Cloudflare Workers
├── build.sh                → Minifica e publica no repo público
└── README.md               → Este arquivo

```

## Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha:

```bash
cp .env.example .env
```

**NUNCA** commite o arquivo `.env`.

## Deploy

```bash
# Publicar Workers
npx wrangler deploy

# Build e publicar frontend
bash build.sh
```

## Segurança

- Secrets ficam em Cloudflare Worker Secrets (não no código)
- Admin protegido por Cloudflare Access
- Nenhuma chave de API no frontend

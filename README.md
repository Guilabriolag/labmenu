# LabMenu — beta0.1
Sistema de cardápio digital multi-loja

## Lojas
| Pasta | Loja | Tipo |
|---|---|---|
| /vitorelli | Pizzaria Vitorelli | Pizza, meia-meia |
| /mctonny | McTonny | Lanchonete |
| /moraesgrill | Moraes Grill | Rotisseria/Kg |

## Deploy
- Frontend público → GitHub Pages (repo público: labmenu)
- Backend/API → Cloudflare Workers + KV
- Domínio → labriolag.shop

## Segurança
- NUNCA commitar números de WhatsApp, API keys ou tokens no repo público
- Dados sensíveis ficam em Cloudflare Worker Secrets

## Pendente
- [ ] Painel Admin
- [ ] Cloudflare Workers + KV (cardápio dinâmico)
- [ ] MimoGame (brindes)
- [ ] Estoque em tempo real — Moraes Grill

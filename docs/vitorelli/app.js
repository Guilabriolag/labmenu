/* ============================================
   VITORELLI v2 — App Logic
   LabMenu beta0.1
   ============================================

   CONFIGURAÇÃO:
   - Em produção, os dados vêm da API Cloudflare Worker
   - Em desenvolvimento, usa os dados locais abaixo
   - Troque API_URL pelo endpoint real quando o Worker estiver deployado
   ============================================ */

const CONFIG = {
    // Quando o Worker estiver no ar, troque pela URL real:
    // API_URL: 'https://api.labriolag.shop/cardapio/vitorelli',
    API_URL: null, // null = usa dados locais (modo dev)
    WHATSAPP: '5511993407322',
    LOJA: 'VITORELLI'
};

/* ============================================
   DADOS LOCAIS (fallback / desenvolvimento)
   ============================================ */
const DADOS_LOCAIS = {
    sabores: [
        { n:"Mussarela Especial",  d:"Molho, Mussarela, Tomate Seco, Parmesão e Pimenta Calabresa", g:43, b:33 },
        { n:"Mussarela",           d:"Molho, Mussarela, Tomate, Azeitona e Orégano", g:39, b:29 },
        { n:"Mussapy",             d:"Molho, Mussarela, Tomate, Catupiry, orégano e azeitona", g:45, b:35 },
        { n:"Calabresa 1",         d:"Molho, Calabresa, Cebola, Azeitona e Orégano", g:39, b:29 },
        { n:"Calabresa 2",         d:"Molho, Mussarela, calabresa, Cebola, Azeitona e Orégano", g:44, b:34 },
        { n:"Calabresa 3",         d:"Molho, Calabresa, Pimentão, parmesão, Azeitona e Orégano", g:43, b:33 },
        { n:"Calapy",              d:"Molho, Catupiry, Calabresa, Cebola, Azeitona e Orégano", g:44, b:34 },
        { n:"Cabrovo pepe",        d:"Molho, Calabresa, Ovo, Cebola, Parmesão, Pimenta Calabresa, Azeitona e Orégano", g:45, b:35 },
        { n:"Baiana",              d:"Molho, Mussarela, calabresa desfiada, cebola, ovo, pimenta calabresa, azeitona e Orégano", g:47, b:37 },
        { n:"Quatro Queijos",      d:"Molho, Mussarela, Parmesão, Provolone e Gorgonzola", g:48, b:38 },
        { n:"Cinco Queijos",       d:"Molho, Mussarela, Parmesão, Provolone, Gorgonzola e Catupiry", g:50, b:40 },
        { n:"Abobrinha 1",         d:"Molho, Mussarela, Abobrinha, Alho Frito e Orégano", g:41, b:31 },
        { n:"Abobrinha 2",         d:"Molho, Mussarela, Abobrinha, Pimenta Calabresa e Orégano", g:41, b:31 },
        { n:"Alho",                d:"Molho, Mussarela e Alho frito", g:45, b:35 },
        { n:"Aliche",              d:"Molho, Mussarela, Aliche e Tomate", g:49, b:39 },
        { n:"Americana",           d:"Molho, Mussarela, Lombinho, Pimentão, Champignon e Tomate cereja", g:50, b:40 },
        { n:"Atum 1",              d:"Molho, Atum e Cebola", g:46, b:36 },
        { n:"Atum 2",              d:"Molho, Mussarela, Atum e Cebola", g:48, b:38 },
        { n:"Bacon",               d:"Molho, Mussarela e Bacon", g:45, b:35 },
        { n:"Frango Catupiry",     d:"Molho, Frango e Catupiry", g:47, b:37 },
        { n:"Gênova",              d:"Molho, Mussarela, Provolone, Presunto e Molho Pesto", g:48, b:38 },
        { n:"Lombinho",            d:"Molho, Mussarela, Lombinho e Provolone", g:47, b:37 },
        { n:"Peperonni 1",         d:"Molho, Mussarela, Peperonni e azeitona", g:50, b:40 },
        { n:"Peperonni 2",         d:"Molho, Mussarela, Peperonni, Catupiry, azeitona", g:55, b:45, novo:true },
        { n:"Romana",              d:"Molho, Mussarela, Aliche e Tomate", g:50, b:40 },
        { n:"Rústica",             d:"Molho, Mussarela, Parmesão, sobre molho, orégano e azeitona", g:43, b:33 },
        { n:"Brócolis",            d:"Molho, Brócolis, Mussarela, Bacon, azeitona e orégano", g:48, b:38 },
        { n:"Brócolis 2",          d:"Molho, Brócolis, Mussarela, alho, Bacon, azeitona e orégano", g:49, b:39 },
        { n:"Libanese",            d:"Molho, Mussarela, Zatar (tempero árabe), Tomate e azeitona", g:41, b:31, novo:true },
        { n:"Banana",              d:"Banana, Açúcar, Doce de leite e Canela", g:41, b:31 },
        { n:"Anita e Garibaldi",   d:"Parmesão, Mussarela e Goiabada", g:45, b:35 },
        { n:"Ovomaltine",          d:"Ovomaltine, ovomaltine Rocks", g:55, b:45, novo:true },
        { n:"Marguerita",          d:"Molho, Mussarela, Parmesão, Tomate, Manjericão, Azeitona e Orégano", g:41, b:31 },
        { n:"Marguerita Pesto",    d:"Molho, Mussarela, Parmesão, Tomate, Molho Pesto, Azeitona e Orégano", g:42, b:31, novo:true },
        { n:"Marguedôro",          d:"Molho, Mussarela, Parmesão, Tomate, manjericão, Azeitona, alho e Orégano", g:42, b:32, novo:true },
        { n:"Palmitôsa",           d:"Molho, Mussarela, Palmito, Catupiry, Azeitona e Orégano", g:50, b:40 },
        { n:"Portuguesa",          d:"Molho, Mussarela, presunto, ovo, ervilha, tomate, cebola e azeitona", g:50, b:40 },
        { n:"Rúcula",              d:"Molho, Mussarela, Rúcula e Tomate Seco", g:47, b:37 },
        { n:"Toscana",             d:"Molho, Mussarela, Linguiça calabresa moída e Tomate", g:45, b:35 }
    ],
    bebidas: [
        { n:"Coca-Cola 2L",      d:"Refrigerante", p:18 },
        { n:"Coca-Cola Zero 2L", d:"Refrigerante", p:18 },
        { n:"Guaraná Kuat 2L",   d:"Refrigerante", p:12 },
        { n:"HEINEKEN (Lata)",   d:"Cerveja",       p:10 }
    ],
    marcas: [
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgjXm_49v2kv9GDu0Qh9LbdIy5IKpscrD1upAKjjlI8rfcwTOEnbh5OIdv6FaAsYivw-3fmezw3CTE0HmzxMJWPXfEXaMsMhRqsoI_zMWOPy9RSnIli3rvQcuIVqqI_v4L6PH8CCl2H-Udnje7SewB8Wo3KMAR4puwIjJT2eZey6CczVn1cYpAFG8Gwarx6/s560/20251222_094017.jpg',
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi2wdXHPA7jMVKb_MnxxmOQu7BbVMPj7aNm8Z2rpF5gGJyrd3YR7NkDCBmuRIdqi1ImcUJe1_0f2tN9rWlGKTnJQMF8masXwLjEurW-xgRI0s-ouu0taKsbFWlZZkMZKouXiNw3ntFzqT3Jeyw7bBdbowXMsFSnfo3f3BiOJnmWYfdf4OaMb6NFpSGlFQQf/s400/images%20(9).jpeg',
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjtI0dLj6zjKU7BkLTF5lz1UWlStQoVJVzPeBcTvPqX-CxxpohKttLvU9PB5usiqFCIIPmOclIHF246rhXDSRjQEof3SAfPNf2pk0HxIETPsthieLUO2jUz0rN2oxPgwunl7iHb1vSoZacjF1tvniP6HL3bc-uEtsjQUx6nIP5coBtFcuGF-Gw4zYSdKqaO/s600/coca-cola-logo-png_seeklogo-32891.png',
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiEscmMSTWuW11qtlLcZ76mO0IWEqPEF_upeM5isQ37_VEvmrwvJGPnAkE61nkZTEGbsaLgc2lKV91mbSXQ6TOC-71H0Z2xcBkAl7aaP7E_zBVY9PwdIe8i5dobmIgNvq3HThFt2eHHY6wjEjkpi1ld0dw5ckaB9gRVARlRW4TW_i9LN36JYiwg9jGVJKrg/s348/png-clipart-requeijao-catupiry-cream-cheese-food-cheese-food-text-thumbnail.png'
    ]
};

/* ============================================
   ESTADO DA APLICAÇÃO
   ============================================ */
let state = {
    catAtual:  'pizza',
    modoMeia:  false,
    meiaLista: [],
    itens:     [],       // [{label, nome, preco}]
    tipoEntrega: null,
    totalProdutos: 0,
    taxaEntrega:   0
};

/* ============================================
   INICIALIZAÇÃO
   ============================================ */
document.addEventListener('DOMContentLoaded', async () => {
    verificarStatus();
    iniciarBrands();
    await carregarDados();
    selecionar('pizza');
});

async function carregarDados() {
    if (!CONFIG.API_URL) return; // usa dados locais
    try {
        const res = await fetch(CONFIG.API_URL);
        if (res.ok) {
            const dados = await res.json();
            Object.assign(DADOS_LOCAIS, dados);
        }
    } catch(e) {
        console.warn('API indisponível, usando dados locais.');
    }
}

/* ============================================
   HORÁRIO
   ============================================ */
function verificarStatus() {
    const badge = document.getElementById('status-badge');
    if (!badge) return;
    const aberto = estaAberto();
    badge.textContent = aberto ? '● ABERTO' : '● FECHADO';
    badge.className = 'status-badge ' + (aberto ? 'aberto' : 'fechado');
    // Atualiza a cada minuto
    setTimeout(verificarStatus, 60000);
}

function estaAberto() {
    const agora  = new Date();
    const dia    = agora.getDay(); // 1 = segunda
    if (dia === 1) return false;
    const total  = agora.getHours() * 60 + agora.getMinutes();
    return total >= (18 * 60) && total <= (23 * 60 + 30);
}

/* ============================================
   BRAND STRIP — duplica para loop contínuo
   ============================================ */
function iniciarBrands() {
    const track = document.getElementById('brand-track');
    if (!track) return;
    const imgs = [...DADOS_LOCAIS.marcas, ...DADOS_LOCAIS.marcas]; // duplica para animação
    track.innerHTML = imgs.map(src =>
        `<img src="${src}" alt="Marca parceira" loading="lazy">`
    ).join('');
}

/* ============================================
   NAVEGAÇÃO
   ============================================ */
function selecionar(cat) {
    state.catAtual = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    const btn = document.getElementById('btn-' + cat);
    if (btn) btn.classList.add('active');

    const subNav = document.getElementById('sub-nav');
    if (subNav) {
        subNav.style.display = (cat === 'bebidas' || cat === 'calzone') ? 'none' : 'flex';
    }
    mostrar('inteira');
}

function mostrar(tipo) {
    state.modoMeia = (tipo === 'meia');

    document.getElementById('btn-inteira').classList.toggle('active', tipo === 'inteira');
    document.getElementById('btn-meia').classList.toggle('active',    tipo === 'meia');

    renderizarCardapio();
}

/* ============================================
   RENDERIZAÇÃO
   ============================================ */
function renderizarCardapio() {
    const grid = document.getElementById('cardapio-grid');
    if (!grid) return;

    // Loading skeleton
    grid.innerHTML = Array(6).fill('<div class="loading-card"></div>').join('');

    requestAnimationFrame(() => {
        const lista = (state.catAtual === 'bebidas') ? DADOS_LOCAIS.bebidas : DADOS_LOCAIS.sabores;

        grid.innerHTML = lista.map(item => {
            let preco;
            if (state.catAtual === 'bebidas') {
                preco = item.p;
            } else if (state.catAtual === 'pizza') {
                preco = item.g;
            } else {
                preco = item.b; // broto / calzone
            }

            const tagNovo = item.novo
                ? `<span class="tag-novo">NOVIDADE</span>` : '';

            return `
            <div class="item-card">
                ${tagNovo}
                <h3>${item.n}</h3>
                <p class="desc">${item.d}</p>
                <div class="price-row">
                    <span class="item-preco">R$ ${preco.toFixed(2)}</span>
                    <button class="btn-add" onclick="adicionar('${escapar(item.n)}', ${preco})">
                        ADICIONAR
                    </button>
                </div>
            </div>`;
        }).join('');
    });
}

function escapar(str) {
    return str.replace(/'/g, "\\'");
}

/* ============================================
   CARRINHO
   ============================================ */
function adicionar(nome, preco) {
    if (state.modoMeia) {
        state.meiaLista.push({ nome, preco });

        if (state.meiaLista.length === 1) {
            alerta('METADE 1 ✓', `"${nome}" selecionada!\nAgora escolha a segunda metade.`);
            return;
        }

        if (state.meiaLista.length === 2) {
            const [m1, m2] = state.meiaLista;
            const precoFinal = Math.max(m1.preco, m2.preco);
            const label = state.catAtual === 'pizza' ? 'Pizza ½+½' : 'Broto ½+½';

            adicionarAoCarrinho(label, `${m1.nome} / ${m2.nome}`, precoFinal);
            state.meiaLista = [];
            alerta('ADICIONADO! 🍕', `${m1.nome}\n+\n${m2.nome}\nfoi ao carrinho!`);
        }
    } else {
        const labels = { pizza:'Pizza', broto:'Broto', calzone:'Calzone', bebidas:'Bebida' };
        adicionarAoCarrinho(labels[state.catAtual] || 'Item', nome, preco);
        alerta('ADICIONADO! ✓', `${nome} está no carrinho.`);

        // Sugestão de bebida
        const temBebida = state.itens.some(i => i.label === 'Bebida');
        if (state.catAtual !== 'bebidas' && !temBebida) {
            setTimeout(() => {
                if (confirm('Que tal uma bebida gelada para acompanhar? 🥤')) {
                    selecionar('bebidas');
                    fecharCarrinho();
                }
            }, 1200);
        }
    }
}

function adicionarAoCarrinho(label, nome, preco) {
    state.itens.push({ label, nome, preco });
    state.totalProdutos += preco;
    atualizarUI();
}

function atualizarUI() {
    // Textarea
    const area = document.getElementById('pedido');
    if (area) {
        area.value = state.itens
            .map(i => `${i.label}: ${i.nome} — R$ ${i.preco.toFixed(2)}`)
            .join('\n');
    }
    // Contador
    const count = document.getElementById('cart-count');
    if (count) count.textContent = state.itens.length;

    calcularTotal();
}

function calcularTotal() {
    const bairroEl = document.getElementById('bairro');
    state.taxaEntrega = bairroEl ? parseFloat(bairroEl.value) || 0 : 0;

    const total = state.totalProdutos + state.taxaEntrega;

    const el = (id) => document.getElementById(id);
    if (el('total-produtos')) el('total-produtos').textContent = `R$ ${state.totalProdutos.toFixed(2)}`;
    if (el('total-taxa'))     el('total-taxa').textContent     = `R$ ${state.taxaEntrega.toFixed(2)}`;
    if (el('total-geral'))    el('total-geral').textContent    = `R$ ${total.toFixed(2)}`;

    const linhaTaxa = el('linha-taxa');
    if (linhaTaxa) linhaTaxa.style.display = state.taxaEntrega > 0 ? 'flex' : 'none';

    const taxaInfo = el('taxa-info');
    if (taxaInfo && state.taxaEntrega > 0) {
        taxaInfo.textContent = `🛵 Taxa de entrega: R$ ${state.taxaEntrega.toFixed(2)}`;
        taxaInfo.style.display = 'block';
    } else if (taxaInfo) {
        taxaInfo.style.display = 'none';
    }
}

function limparPedido() {
    if (state.itens.length === 0) return;
    if (!confirm('Remover todos os itens do carrinho?')) return;
    state.itens = [];
    state.totalProdutos = 0;
    state.taxaEntrega   = 0;
    state.meiaLista     = [];
    atualizarUI();
    // Resetar detalhes
    document.getElementById('pedido-detalhes').style.display = 'none';
    document.querySelectorAll('.btn-entrega').forEach(b => b.classList.remove('active'));
}

/* ============================================
   CARRINHO — TOGGLE
   ============================================ */
function toggleCarrinho() {
    const carrinho = document.getElementById('carrinho');
    const overlay  = document.getElementById('overlay');
    carrinho.classList.toggle('open');
    overlay.classList.toggle('active');
}

function fecharCarrinho() {
    document.getElementById('carrinho').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}

/* ============================================
   ENTREGA
   ============================================ */
function mostrarDados(tipo) {
    state.tipoEntrega = tipo;
    document.getElementById('pedido-detalhes').style.display = 'block';
    document.getElementById('entrega-campos').style.display  = tipo === 'delivery' ? 'block' : 'none';

    document.getElementById('btn-retirar').classList.toggle('active',  tipo === 'retirar');
    document.getElementById('btn-delivery').classList.toggle('active', tipo === 'delivery');

    if (tipo === 'retirar') {
        state.taxaEntrega = 0;
        const bairro = document.getElementById('bairro');
        if (bairro) bairro.value = '0';
        calcularTotal();
    }
}

function mostrarTroco() {
    const pag   = document.getElementById('pagamento').value;
    const troco = document.getElementById('troco-area');
    if (troco) troco.style.display = pag === 'Dinheiro' ? 'block' : 'none';
}

/* ============================================
   ENVIAR PEDIDO
   ============================================ */
function enviarPedido() {
    if (!estaAberto()) {
        alerta('FECHADO 🕐', 'Nosso horário é das 18h às 23h30. Você pode montar o pedido agora e enviar quando abrirmos!');
    }

    if (state.itens.length === 0) {
        return alerta('CARRINHO VAZIO', 'Adicione itens antes de finalizar.');
    }

    const pag = document.getElementById('pagamento').value;
    if (!pag) return alerta('PAGAMENTO', 'Selecione a forma de pagamento.');

    if (!state.tipoEntrega) {
        return alerta('ENTREGA', 'Escolha Retirada ou Delivery.');
    }

    // Monta mensagem
    const itensTxt = state.itens
        .map(i => `• ${i.label}: ${i.nome} — R$ ${i.preco.toFixed(2)}`)
        .join('\n');

    let localTxt = '';
    if (state.tipoEntrega === 'delivery') {
        const end    = document.getElementById('endereco').value;
        const bairro = document.getElementById('bairro');
        const bairroTxt = bairro.options[bairro.selectedIndex]?.text || '';
        if (!end) return alerta('ENDEREÇO', 'Informe o endereço de entrega.');
        if (!bairro.value || bairro.value === '0') return alerta('BAIRRO', 'Selecione o bairro.');
        localTxt = `🛵 *Delivery:* ${end}\n📍 *Bairro:* ${bairroTxt}`;
    } else {
        localTxt = '🏪 *Retirada no Balcão*';
    }

    let trocoTxt = '';
    const trocoArea = document.getElementById('troco-area');
    if (trocoArea && trocoArea.style.display !== 'none') {
        const vt = document.getElementById('valor-troco').value;
        if (vt) trocoTxt = `\n💵 *Troco para:* R$ ${vt}`;
    }

    const total = state.totalProdutos + state.taxaEntrega;
    const taxaTxt = state.taxaEntrega > 0
        ? `\n🛵 *Taxa entrega:* R$ ${state.taxaEntrega.toFixed(2)}` : '';

    const msg = [
        `*🍕 NOVO PEDIDO — ${CONFIG.LOJA}*`,
        '',
        '*ITENS:*',
        itensTxt,
        '',
        localTxt,
        `💳 *Pagamento:* ${pag}${trocoTxt}`,
        taxaTxt,
        `💰 *TOTAL: R$ ${total.toFixed(2)}*`
    ].filter(l => l !== undefined).join('\n');

    window.open(`https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}`);
}

/* ============================================
   ALERTA CUSTOMIZADO
   ============================================ */
function alerta(titulo, msg) {
    document.getElementById('alert-titulo').textContent = titulo;
    document.getElementById('alert-msg').textContent    = msg;
    document.getElementById('alert-overlay').classList.add('show');
}

function fecharAlerta() {
    document.getElementById('alert-overlay').classList.remove('show');
}

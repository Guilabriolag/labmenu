const WHATSAPP = '5511943198316';
const cardapio = {
    lanches:[
        {n:"1 — DOG SIMPLES",p:16,d:"Salsicha, queijo, milho, batata palha, ketchup, maionese e pão de banha."},
        {n:"2 — DOG EGG",p:21,d:"Salsicha, ovo, queijo, milho, batata palha, ketchup, maionese e pão de banha."},
        {n:"3 — DOG CALABRESA",p:21,d:"Salsicha, calabresa, queijo, milho, batata palha, ketchup, maionese e pão de banha."},
        {n:"4 — DOG CATUPIRY",p:21,d:"Salsicha, catupiry, queijo, milho, batata palha e pão de banha."},
        {n:"5 — DOG BACON",p:21,d:"Salsicha, bacon, queijo, milho, batata palha, ketchup, maionese e pão de banha."},
        {n:"6 — DOG SALAME",p:21,d:"Salsicha, salame, queijo, milho, batata palha, ketchup, maionese e pão de banha."},
        {n:"7 — DOG CHEDDAR",p:21,d:"Salsicha, cheddar, queijo, milho, batata palha e pão de banha."},
        {n:"8 — DOG SALADA",p:21,d:"Salsicha, alface, tomate, queijo, milho, batata palha, ketchup, maionese e pão de banha."},
        {n:"9 — DOG FRANGO",p:21,d:"Salsicha, frango, queijo, milho, batata palha, maionese e pão de banha."},
        {n:"10 — MISTO QUENTE",p:14,d:"Queijo, presunto, maionese e pão francês."},
        {n:"11 — BAURU",p:14,d:"Queijo, presunto, tomate, orégano, maionese e pão francês."},
        {n:"12 — AMERICANO",p:23,d:"Hambúrguer, queijo, presunto, alface, tomate, ovo, maionese e ketchup."},
        {n:"13 — CALABRESA VINAGRETE",p:24,d:"Calabresa, vinagrete, queijo e pão francês."},
        {n:"14 — CHURRASCO VINAGRETE",p:32,d:"Contrafilé, vinagrete, queijo, maionese e pão francês."},
        {n:"15 — X-MAIONESE",p:20,d:"Hambúrguer, queijo, maionese e pão de hambúrguer."},
        {n:"16 — X-BURGUER",p:20,d:"Hambúrguer, queijo, presunto, maionese e ketchup."},
        {n:"17 — X-EGG",p:21,d:"Hambúrguer, ovo, queijo, presunto, maionese e ketchup."},
        {n:"18 — X-CALABRESA",p:24,d:"Hambúrguer, calabresa, queijo, maionese e ketchup."},
        {n:"19 — X-BACON",p:24,d:"Hambúrguer, bacon, queijo, maionese e ketchup."},
        {n:"20 — X-SALADA",p:20,d:"Hambúrguer, queijo, alface, tomate, maionese e ketchup."},
        {n:"21 — X-TUDO",p:28,d:"Hambúrguer, calabresa, bacon, salame, queijo, presunto, ovo e salada."}
    ],
    mclanches:[
        {n:"22 — MC FRANGO",p:24,d:"Frango desfiado, catupiry, alface, queijo, maionese e pão de hambúrguer."},
        {n:"23 — MC CHEDDAR",p:27,d:"Hambúrguer, ovo, alface, tomate, cheddar + refrigerante."},
        {n:"24 — MC CATUPIRY",p:23,d:"Hambúrguer, presunto, queijo, alface, catupiry e pão de hambúrguer."},
        {n:"25 — MC DOGÃO",p:23,d:"Hambúrguer, salsicha, salame, presunto, queijo, maionese e ketchup."},
        {n:"26 — MC TONNY FELIZ",p:35,d:"Hambúrguer, queijo, alface, salame, milho, surpresa + refri lata."},
        {n:"27 — MC MILHO",p:20,d:"Hambúrguer, queijo, milho, maionese, ketchup e pão de hambúrguer."},
        {n:"28 — SUPER MC TONNY",p:25,d:"2 hambúrgueres, alface, queijo, salame, bacon, maionese e ketchup."},
        {n:"29 — MC SALAME",p:25,d:"Hambúrguer, salame, queijo, ovo, alface, tomate, maionese e ketchup."},
        {n:"30 — MC TITAN",p:90,d:"Gigante: 3 carnes, bacon, calabresa, salame, 3 ovos, fritas + Kuat 2L."},
        {n:"34 — X-TUDO NO PRATO",p:35,d:"Hambúrguer, calabresa, bacon, ovo, queijo, salame, salada e fritas."},
        {n:"35 — AMERICANO NO PRATO",p:32,d:"Hambúrguer, ovo, queijo, presunto, alface, tomate e fritas."},
        {n:"36 — SUPER MC NO PRATO",p:35,d:"2 hambúrgueres, bacon, salame, queijo, alface, tomate e fritas."}
    ],
    beirutes:[
        {n:"31 — Beirute Hambúrguer",p:40,d:"Hambúrguer, calabresa, bacon, ovo, salame, salada e queijo."},
        {n:"32 — Beirute Contrafilé",p:48,d:"Contrafilé, calabresa, bacon, ovo, alface, tomate e queijo."},
        {n:"33 — Beirute Frango",p:38,d:"Frango desfiado, queijo, presunto, alface, tomate e maionese."}
    ],
    combos:[
        {n:"37 — MC BURGUER DUPLO",p:40,d:"2 carnes, cheddar, bacon, salada + fritas + refri lata."},
        {n:"38 — MC BURGUER TRIPLO",p:42,d:"3 carnes, cheddar, bacon, salada + fritas + refri lata."},
        {n:"39 — MC SALADA COMBO",p:40,d:"Carne, cheddar, bacon, ovo, cebola, salada + fritas + refri lata."},
        {n:"40 — CHICKEN TONNY",p:45,d:"Frango empanado, mussarela, bacon, ovo, alface + fritas + refri lata."},
        {n:"41 — CHICKEN DUPLO",p:51,d:"2 frangos empanados, bacon, ovo, alface + fritas + refri lata."},
        {n:"43 — VEGETARIANO",p:28,d:"Alface, tomate, cebola, molho especial, queijo + fritas + refri lata."}
    ],
    porcoes:[
        {n:"44 — MC PORÇÃO",p:65,d:"Batata frita, calabresa, bacon e cheddar + Kuat 2L."},
        {n:"45 — BATATA CHEDDAR",p:35,d:"Porção generosa de batata com cheddar."},
        {n:"46 — CALABRESA ACEBOLADA",p:40,d:"Calabresa fatiada com cebola."},
        {n:"47 — CONTRAFILÉ ACEBOLADO",p:50,d:"Contrafilé em tiras com cebola."}
    ],
    bebidas:[
        {n:"Coca-Cola Lata",p:6,d:"Lata 350ml — Gelada"},
        {n:"Coca-Cola 2L",p:13,d:"Ideal para a família"},
        {n:"Guaraná Kuat 2L",p:10,d:"Gelado"},
        {n:"Fanta Laranja Lata",p:6,d:"Lata 350ml"},
        {n:"Água Sem Gás",p:4,d:"Garrafa 500ml"},
        {n:"Suco de Laranja",p:8,d:"Copo 400ml — Natural"}
    ]
};
let catAtual='lanches',itens=[],entrega='retirar';
function selecionar(cat){catAtual=cat;document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));document.getElementById('btn-'+cat)?.classList.add('active');renderizar();}
function renderizar(){const c=document.getElementById('sabores');c.innerHTML='';(cardapio[catAtual]||[]).forEach((s,i)=>{const d=document.createElement('div');d.className='item-card';d.style.animationDelay=i*0.04+'s';d.innerHTML=`<h3>${s.n}</h3><p>${s.d}</p><div class="price-row"><span class="price-val">R$ ${s.p.toFixed(2).replace('.',',')}</span><button class="btn-add" onclick="adicionar('${s.n.replace(/'/g,"\\'")}',${s.p})">ADICIONAR</button></div>`;c.appendChild(d);});}
function adicionar(n,p){itens.push({label:n,preco:p});atualizarCarrinho();showAlert('ADICIONADO!',n+' está no seu carrinho!');}
function atualizarCarrinho(){document.getElementById('cart-count').textContent=itens.length;const t=document.getElementById('pedido');if(t)t.value=itens.map(i=>'• '+i.label+' — R$ '+i.preco.toFixed(2).replace('.',',')).join('\n');calcularTotal();}
function calcularTotal(){const box=document.getElementById('totalBox'),val=document.getElementById('totalValor');if(!box||!val)return;const sub=itens.reduce((s,i)=>s+i.preco,0);const frete=entrega==='delivery'?(parseFloat(document.getElementById('bairro')?.value)||0):0;box.style.display=itens.length>0?'flex':'none';val.textContent='R$ '+(sub+frete).toFixed(2).replace('.',',');}
function limparPedido(){if(!confirm('Remover todos os itens?'))return;itens=[];atualizarCarrinho();}
function toggleCarrinho(){document.getElementById('carrinho')?.classList.toggle('open');document.getElementById('cartOverlay')?.classList.toggle('active');}
function mostrarDados(tipo){entrega=tipo;document.getElementById('entregaCampos').style.display=tipo==='delivery'?'block':'none';document.getElementById('btn-retirar')?.classList.toggle('active',tipo==='retirar');document.getElementById('btn-delivery')?.classList.toggle('active',tipo==='delivery');calcularTotal();}
function mostrarTroco(){document.getElementById('valorTroco').style.display=document.getElementById('pagamento')?.value==='Dinheiro'?'block':'none';}
function enviarPedido(){if(itens.length===0){showAlert('CARRINHO VAZIO','Adicione itens antes de finalizar.');return;}const pag=document.getElementById('pagamento')?.value;if(!pag){showAlert('PAGAMENTO','Selecione a forma de pagamento.');return;}const sub=itens.reduce((s,i)=>s+i.preco,0);const frete=entrega==='delivery'?(parseFloat(document.getElementById('bairro')?.value)||0):0;const total=(sub+frete).toFixed(2).replace('.',',');const obs=document.getElementById('obs')?.value;const itensTxt=itens.map(i=>'  • '+i.label+' — R$ '+i.preco.toFixed(2).replace('.',',')).join('\n');let local=entrega==='delivery'?'🏠 *Delivery:* '+document.getElementById('endereco')?.value+' — '+(document.getElementById('bairro')?.options[document.getElementById('bairro').selectedIndex]?.text||''):'🏪 *Retirada no local*';let troco=document.getElementById('valorTroco')?.style.display!=='none'?'\n💵 *Troco para:* R$ '+document.getElementById('valorTroco')?.value:'';const msg='*🍔 NOVO PEDIDO — McTONNY*\n\n'+itensTxt+(obs?'\n\n📝 *Obs:* '+obs:'')+'\n\n'+local+'\n💳 *Pagamento:* '+pag+troco+'\n\n💰 *TOTAL: R$ '+total+'*';window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(msg));}
function showAlert(t,m){document.getElementById('alert-title').textContent=t;document.getElementById('alert-msg').textContent=m;document.getElementById('alert-overlay').classList.add('show');}
function hideAlert(){document.getElementById('alert-overlay').classList.remove('show');}
document.addEventListener('DOMContentLoaded',()=>selecionar('lanches'));

const WHATSAPP = '5511900000000'; // ⚠️ SUBSTITUIR pelo número do Moraes Grill

// Cardápio com estoque (qtd = null = ilimitado)
const cardapio = {
    carnes:[
        {n:"Costela Assada",    d:"Costela bovina assada no bafo",        p:8990, kg:true, qtd:15},
        {n:"Fraldinha Grelhada",d:"Fraldinha no alho e ervas",            p:9490, kg:true, qtd:12},
        {n:"Picanha Assada",    d:"Picanha temperada no sal grosso",      p:12990,kg:true, qtd:8},
        {n:"Assado de Tira",    d:"Assado bovino marinado",               p:7990, kg:true, qtd:20},
        {n:"Linguiça Toscana",  d:"Linguiça artesanal grelhada",          p:5990, kg:true, qtd:null}
    ],
    aves:[
        {n:"Frango Assado Inteiro",d:"Frango temperado assado inteiro",   p:2990, kg:false,qtd:10},
        {n:"Frango Assado (Meio)", d:"Metade do frango assado",           p:1590, kg:false,qtd:null},
        {n:"Coxa e Sobrecoxa",     d:"Porção de coxa e sobrecoxa",        p:4990, kg:true, qtd:null},
        {n:"Frango ao Molho Pardo",d:"Frango desfiado no molho especial", p:5990, kg:true, qtd:8}
    ],
    acomp:[
        {n:"Arroz Branco",     d:"Arroz soltinho cozido na hora",         p:1990, kg:true, qtd:null},
        {n:"Feijão Tropeiro",  d:"Feijão com bacon, couve e farinha",     p:2990, kg:true, qtd:null},
        {n:"Macarrão ao Sugo", d:"Macarrão com molho de tomate caseiro",  p:1990, kg:true, qtd:null},
        {n:"Purê de Batata",   d:"Purê cremoso feito na hora",            p:2490, kg:true, qtd:null},
        {n:"Farofa Especial",  d:"Farofa com bacon e ervas",              p:2490, kg:true, qtd:null}
    ],
    saladas:[
        {n:"Salada Verde",     d:"Alface, rúcula, agrião e tomate",       p:1990, kg:true, qtd:null},
        {n:"Salada de Maionese",d:"Batata, cenoura, ervilha e maionese",  p:2490, kg:true, qtd:null},
        {n:"Vinagrete",        d:"Tomate, cebola, pimentão e cheiro verde",p:1490,kg:true, qtd:null}
    ],
    porcoes:[
        {n:"Porção Costela 500g",d:"500g de costela bovina assada",       p:4990, kg:false,qtd:10},
        {n:"Porção Frango 400g", d:"400g de frango assado",               p:2490, kg:false,qtd:null},
        {n:"Combo Família",      d:"1kg carnes + acomp + salada",         p:8990, kg:false,qtd:5}
    ],
    bebidas:[
        {n:"Coca-Cola 2L",     d:"Gelada",                                p:1800, kg:false,qtd:null},
        {n:"Coca-Cola Lata",   d:"350ml gelada",                          p:600,  kg:false,qtd:null},
        {n:"Água Mineral",     d:"500ml",                                 p:400,  kg:false,qtd:null},
        {n:"Suco de Laranja",  d:"Natural 400ml",                         p:800,  kg:false,qtd:null}
    ]
};

function fmtPreco(centavos){return'R$ '+(centavos/100).toFixed(2).replace('.',',');}

let catAtual='carnes',itens=[],entrega='retirar';

function selecionar(cat){catAtual=cat;document.querySelectorAll('.cat-btn').forEach(b=>b.classList.remove('active'));document.getElementById('btn-'+cat)?.classList.add('active');renderizar();}

function renderizar(){
    const c=document.getElementById('sabores');c.innerHTML='';
    (cardapio[catAtual]||[]).forEach((s,i)=>{
        const esgotado=s.qtd===0;
        const pouco=s.qtd!==null&&s.qtd>0&&s.qtd<=5;
        const pct=s.qtd===null?100:Math.min(100,(s.qtd/20)*100);
        const barColor=pct>50?'#25d366':pct>20?'#FFBC0D':'#e8291c';
        const tagKg=s.kg?'<span class="tag-kg">R$/KG</span>':'';
        const tagEsg=esgotado?'<span class="tag-esgotado">ESGOTADO</span>':'';
        const estoqueHtml=s.qtd!==null&&!esgotado?`
            <div class="estoque-bar"><div class="estoque-fill" style="width:${pct}%;background:${barColor}"></div></div>
            <p class="estoque-info">${pouco?'⚠️ Últimas '+s.qtd+' unidades!':s.qtd+' disponíveis'}</p>`:'';
        const d=document.createElement('div');
        d.className='item-card'+(esgotado?' esgotado':'');
        d.style.animationDelay=i*0.04+'s';
        d.innerHTML=`${tagKg}${tagEsg}<h3>${s.n}</h3><p>${s.d}</p>${estoqueHtml}
            <div class="price-row">
                <span class="price-val">${fmtPreco(s.p)}${s.kg?' /kg':''}</span>
                ${!esgotado?`<button class="btn-add" onclick="adicionar('${s.n.replace(/'/g,"\\'")}',${s.p},${!!s.kg})">PEDIR</button>`:''}
            </div>`;
        c.appendChild(d);
    });
}

function adicionar(n,p,kg){
    if(kg){
        const qtdStr=prompt(`Quantos gramas de ${n}? (ex: 500)`);
        if(!qtdStr)return;
        const g=parseInt(qtdStr);
        if(!g||g<=0){alert('Quantidade inválida');return;}
        const total=Math.round((p/1000)*g);
        itens.push({label:`${n} (${g}g)`,preco:total});
    } else {
        itens.push({label:n,preco:p});
    }
    atualizarCarrinho();
    showAlert('ADICIONADO!',n+' está no seu carrinho!');
}

function atualizarCarrinho(){
    document.getElementById('cart-count').textContent=itens.length;
    const t=document.getElementById('pedido');
    if(t)t.value=itens.map(i=>'• '+i.label+' — '+fmtPreco(i.preco)).join('\n');
    calcularTotal();
}

function calcularTotal(){
    const box=document.getElementById('totalBox'),val=document.getElementById('totalValor');
    if(!box||!val)return;
    const sub=itens.reduce((s,i)=>s+i.preco,0);
    const frete=entrega==='delivery'?(parseFloat(document.getElementById('bairro')?.value)||0)*100:0;
    box.style.display=itens.length>0?'flex':'none';
    val.textContent=fmtPreco(sub+frete);
}

function limparPedido(){if(!confirm('Remover todos os itens?'))return;itens=[];atualizarCarrinho();}
function toggleCarrinho(){document.getElementById('carrinho')?.classList.toggle('open');document.getElementById('cartOverlay')?.classList.toggle('active');}
function mostrarDados(tipo){entrega=tipo;document.getElementById('entregaCampos').style.display=tipo==='delivery'?'block':'none';document.getElementById('btn-retirar')?.classList.toggle('active',tipo==='retirar');document.getElementById('btn-delivery')?.classList.toggle('active',tipo==='delivery');calcularTotal();}
function mostrarTroco(){document.getElementById('valorTroco').style.display=document.getElementById('pagamento')?.value==='Dinheiro'?'block':'none';}

function enviarPedido(){
    if(itens.length===0){showAlert('CARRINHO VAZIO','Adicione itens antes de finalizar.');return;}
    const pag=document.getElementById('pagamento')?.value;
    if(!pag){showAlert('PAGAMENTO','Selecione a forma de pagamento.');return;}
    const sub=itens.reduce((s,i)=>s+i.preco,0);
    const frete=entrega==='delivery'?(parseFloat(document.getElementById('bairro')?.value)||0)*100:0;
    const total=fmtPreco(sub+frete);
    const obs=document.getElementById('obs')?.value;
    const itensTxt=itens.map(i=>'  • '+i.label+' — '+fmtPreco(i.preco)).join('\n');
    const local=entrega==='delivery'?'🏠 *Delivery:* '+document.getElementById('endereco')?.value:'🏪 *Retirada no Balcão*';
    const msg='*🔥 NOVO PEDIDO — MORAES GRILL*\n\n'+itensTxt+(obs?'\n\n📝 *Obs:* '+obs:'')+'\n\n'+local+'\n💳 *Pagamento:* '+pag+'\n\n💰 *TOTAL: '+total+'*';
    window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent(msg));
}

function showAlert(t,m){document.getElementById('alert-title').textContent=t;document.getElementById('alert-msg').textContent=m;document.getElementById('alert-overlay').classList.add('show');}
function hideAlert(){document.getElementById('alert-overlay').classList.remove('show');}

document.addEventListener('DOMContentLoaded',()=>selecionar('carnes'));

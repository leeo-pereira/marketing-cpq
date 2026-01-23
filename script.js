console.log("CPQ OrçaFascio - Script Carregado");

// ============================================
// ESTADO GLOBAL
// ============================================
let campanha = {
    nome_campanha: '',
    vigencia_inicio: '',
    vigencia_fim: '',
    observacoes_gerais: '',
    publicos: []
};

// ============================================
// SISTEMA DE ABAS
// ============================================
function mostrarAba(event, nomeAba) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    
    document.getElementById(nomeAba).classList.add('active');
    if (event) event.currentTarget.classList.add('active');
    
    if (nomeAba === 'publicos') renderizarPublicos();
    if (nomeAba === 'ofertas') renderizarOfertas();
    if (nomeAba === 'visualizar') renderizarTabelaFinal();
}

// ============================================
// GESTÃO DE CAMPANHA & PÚBLICOS
// ============================================
function salvarCampanha(event) {
    event.preventDefault();
    campanha.nome_campanha = document.getElementById('nome_campanha').value;
    campanha.vigencia_inicio = document.getElementById('vigencia_inicio').value;
    campanha.vigencia_fim = document.getElementById('vigencia_fim').value;
    campanha.observacoes_gerais = document.getElementById('observacoes_gerais').value;
    
    salvarNoLocalStorage();
    mostrarInfoCampanha();
    alert('✅ Campanha salva!');
}

function mostrarInfoCampanha() {
    const info = document.getElementById('campanha-info');
    if (campanha.nome_campanha) {
        info.innerHTML = `
            <div class="alert success">
                <strong>Campanha Ativa:</strong> ${campanha.nome_campanha}<br>
                <strong>Vigência:</strong> ${formatarData(campanha.vigencia_inicio)} até ${formatarData(campanha.vigencia_fim)}
            </div>
        `;
    }
}

function adicionarPublico(event) {
    event.preventDefault();
    if (!campanha.nome_campanha) return alert('⚠️ Configure a campanha primeiro!');
    
    const novoPublico = {
        id_publico: Date.now().toString(),
        nome_publico: document.getElementById('nome_publico').value,
        descricao: document.getElementById('descricao_publico').value,
        ofertas: []
    };
    
    campanha.publicos.push(novoPublico);
    salvarNoLocalStorage();
    document.getElementById('form-publico').reset();
    renderizarPublicos();
}

function renderizarPublicos() {
    const lista = document.getElementById('lista-publicos');
    if (campanha.publicos.length === 0) {
        lista.innerHTML = '<div class="alert info">Nenhum público cadastrado.</div>';
        return;
    }
    lista.innerHTML = campanha.publicos.map(p => `
        <div class="list-item">
            <div class="list-item-content">
                <strong>${p.nome_publico}</strong><br>
                <small>${p.descricao || ''}</small>
                <span class="badge">${p.ofertas.length} oferta(s)</span>
            </div>
            <button class="danger" onclick="removerPublico('${p.id_publico}')">Remover</button>
        </div>
    `).join('');
}

// ============================================
// GESTÃO DE OFERTAS E ITENS
// ============================================
function renderizarOfertas() {
    const conteudo = document.getElementById('conteudo-ofertas');
    if (campanha.publicos.length === 0) {
        conteudo.innerHTML = '<div class="alert info">Crie públicos primeiro!</div>';
        return;
    }
    
    conteudo.innerHTML = campanha.publicos.map(publico => `
        <div class="publico-card">
            <div class="publico-header">
                <div class="publico-title">👥 ${publico.nome_publico}</div>
                <button class="success small" onclick="mostrarFormOferta('${publico.id_publico}')">+ Nova Oferta</button>
            </div>
            <div id="form-oferta-${publico.id_publico}" style="display: none; background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 15px;">
                <form onsubmit="adicionarOferta(event, '${publico.id_publico}')">
                    <div class="form-group">
                        <label>Nome da Oferta</label>
                        <input type="text" id="nome_oferta_${publico.id_publico}" required>
                    </div>
                    <div class="form-group">
                        <label>Base Aplicável</label>
                        <input type="text" id="base_aplicavel_${publico.id_publico}">
                    </div>
                    <button type="submit" class="success">Criar</button>
                    <button type="button" class="secondary" onclick="cancelarFormOferta('${publico.id_publico}')">Sair</button>
                </form>
            </div>
            <div id="lista-ofertas-${publico.id_publico}">
                ${renderizarOfertasDoPublico(publico)}
            </div>
        </div>
    `).join('');
}

function renderizarOfertasDoPublico(publico) {
    return publico.ofertas.map(oferta => `
        <div class="oferta-item">
            <div class="oferta-header">
                <strong>🎁 ${oferta.nome_oferta}</strong>
                <div>
                    <button class="success small" onclick="mostrarFormItem('${publico.id_publico}', '${oferta.id_oferta}')">+ Item</button>
                    <button class="danger small" onclick="removerOferta('${publico.id_publico}', '${oferta.id_oferta}')">×</button>
                </div>
            </div>
            
            <div id="form-item-${oferta.id_oferta}" style="display: none; background: #f9f9f9; padding: 15px; border: 1px solid #ddd; margin: 10px 0;">
                <form onsubmit="adicionarItem(event, '${publico.id_publico}', '${oferta.id_oferta}')">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Produto (Vazio = Brinde)</label>
                            <select id="produto_${oferta.id_oferta}" onchange="toggleTipoBrinde('${oferta.id_oferta}')">
                                <option value="">-- Brinde Genérico --</option>
                                ${produtos.map(p => `<option value="${p.id_produto}">${p.nome_produto}</option>`).join('')}
                            </select>
                        </div>

                        <div class="form-group" id="grp_tipo_brinde_${oferta.id_oferta}">
                            <label>Tipo de Brinde</label>
                            <select id="tipo_brinde_generico_${oferta.id_oferta}">
                                <option value="Módulo">Módulo</option>
                                <option value="Plugin">Plugin</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Ação</label>
                            <select id="tipo_acao_${oferta.id_oferta}">
                                <option value="desconto_percentual">% OFF</option>
                                <option value="gratis">Grátis/Brinde</option>
                                <option value="desconto_valor">R$ OFF</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Valor</label>
                            <input type="number" id="valor_desconto_${oferta.id_oferta}" step="0.01">
                        </div>
                        <div class="form-group">
                            <label>Vincular Combo</label>
                            <input type="text" id="combo_grp_${oferta.id_oferta}" placeholder="Ex: Combo Medição">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Condição / Exceção</label>
                        <input type="text" id="condicao_${oferta.id_oferta}" placeholder="Ex: Exceto módulo BIM">
                    </div>
                    <button type="submit" class="success">Adicionar</button>
                    <button type="button" class="secondary" onclick="cancelarFormItem('${oferta.id_oferta}')">Cancelar</button>
                </form>
            </div>
            <div class="itens-da-oferta">${renderizarItensOferta(oferta)}</div>
        </div>
    `).join('');
}

function renderizarItensOferta(oferta) {
    if (oferta.itens.length === 0) return '<small>Nenhum item.</small>';
    return oferta.itens.map((item, idx) => {
        const p = produtos.find(prod => prod.id_produto === item.id_produto);
        return `
            <div class="item-oferta" style="border-left: 3px solid #3498db; margin-bottom:5px; padding:5px;">
                <strong>${p ? p.nome_produto : 'Módulo de Brinde'}</strong> 
                <span> → ${item.tipo_acao === 'gratis' ? 'GRÁTIS' : item.valor + (item.tipo_acao === 'desconto_percentual' ? '%' : 'R$')}</span>
                <button class="danger small" onclick="removerItem('${oferta.id_oferta}', ${idx})">×</button>
            </div>
        `;
    }).join('');
}

function adicionarItem(event, id_publico, id_oferta) {
    event.preventDefault();
    const publico = campanha.publicos.find(p => p.id_publico === id_publico);
    const oferta = publico.ofertas.find(o => o.id_oferta === id_oferta);
    
    oferta.itens.push({
        id_produto: document.getElementById(`produto_${id_oferta}`).value,
        tipo_acao: document.getElementById(`tipo_acao_${id_oferta}`).value,
        valor: parseFloat(document.getElementById(`valor_desconto_${id_oferta}`).value) || 0,
        condicao: document.getElementById(`condicao_${id_oferta}`).value,
        combo: document.getElementById(`combo_grp_${id_oferta}`).value
    });
    
    salvarNoLocalStorage();
    renderizarOfertas();
}

// ============================================
// VISUALIZAÇÃO FINAL (A TABELA)
// ============================================
function renderizarTabelaFinal() {
    const tabela = document.getElementById('tabela-final');
    const filtro = document.getElementById('filtro-tipo')?.value || 'todos';
    let linhas = [];

    campanha.publicos.forEach(pub => {
        pub.ofertas.forEach(ofert => {
            ofert.itens.forEach(item => {
                const prod = produtos.find(p => p.id_produto === item.id_produto);
                if (filtro === 'todos' || (prod && prod.tipo === filtro)) {
                    
                    const nome = prod ? prod.nome_produto : "Módulo de Brinde";
                    const condHtml = item.condicao ? `<div style="color:#e67e22; font-size:11px;">⚠️ ${item.condicao}</div>` : "";
                    
                    let desc = item.tipo_acao === 'gratis' ? '<span class="badge-brinde">GRÁTIS</span>' : 
                               (item.tipo_acao === 'desconto_percentual' ? `${item.valor}%` : `R$ ${item.valor}`);

                    linhas.push({
                        publico: pub.nome_publico,
                        oferta: ofert.nome_oferta,
                        combo: item.combo,
                        prodHtml: `<strong>${nome}</strong>${condHtml}`,
                        tipo: prod ? prod.tipo : 'Módulo',
                        preco: prod ? `R$ ${prod.preco_nominal}` : '-',
                        descHtml: desc
                    });
                }
            });
        });
    });

    if (linhas.length === 0) {
        tabela.innerHTML = '<div class="alert info">Sem dados.</div>';
        return;
    }

    let ultimaOferta = "";
    tabela.innerHTML = `
        <table class="tabela-cpq">
            <thead>
                <tr><th>Público</th><th>Oferta</th><th>Produto / Exceção</th><th>Tipo</th><th>Preço</th><th>Desconto</th></tr>
            </thead>
            <tbody>
                ${linhas.map(l => {
                    const divisor = (ultimaOferta !== l.oferta && ultimaOferta !== "") ? 'divisor-oferta' : '';
                    ultimaOferta = l.oferta;
                    return `
                        <tr class="${divisor} ${l.combo ? 'linha-combo' : ''}">
                            <td>${l.publico}</td>
                            <td><strong>${l.oferta}</strong>${l.combo ? `<br><span class="badge-combo">${l.combo}</span>` : ''}</td>
                            <td>${l.prodHtml}</td>
                            <td>${l.tipo}</td>
                            <td>${l.preco}</td>
                            <td style="color:#27ae60; font-weight:bold;">${l.descHtml}</td>
                        </tr>
                    `;
                }).join('')}
            </tbody>
        </table>
    `;
}

// ============================================
// AUXILIARES
// ============================================
function formatarData(d) {
    if (!d) return '';
    const [a, m, dia] = d.split('-');
    return `${dia}/${m}/${a}`;
}

function salvarNoLocalStorage() { localStorage.setItem('cpq_campanha', JSON.stringify(campanha)); }

function removerPublico(id) {
    if (confirm('Remover público?')) {
        campanha.publicos = campanha.publicos.filter(p => p.id_publico !== id);
        salvarNoLocalStorage(); renderizarPublicos();
    }
}

function mostrarFormOferta(id) { document.getElementById(`form-oferta-${id}`).style.display = 'block'; }
function cancelarFormOferta(id) { document.getElementById(`form-oferta-${id}`).style.display = 'none'; }
function mostrarFormItem(pub, id) { document.getElementById(`form-item-${id}`).style.display = 'block'; }
function cancelarFormItem(id) { document.getElementById(`form-item-${id}`).style.display = 'none'; }

function adicionarOferta(event, id_pub) {
    event.preventDefault();
    const pub = campanha.publicos.find(p => p.id_publico === id_pub);
    pub.ofertas.push({
        id_oferta: Date.now().toString(),
        nome_oferta: document.getElementById(`nome_oferta_${id_pub}`).value,
        base_aplicavel: document.getElementById(`base_aplicavel_${id_pub}`).value,
        itens: []
    });
    salvarNoLocalStorage(); renderizarOfertas();
}

function removerItem(id_oferta, index) {
    campanha.publicos.forEach(p => {
        const o = p.ofertas.find(o => o.id_oferta === id_oferta);
        if (o) o.itens.splice(index, 1);
    });
    salvarNoLocalStorage(); renderizarOfertas();
}

function resetarSistema() {
    if (confirm("Apagar TUDO?")) { localStorage.removeItem('cpq_campanha'); location.reload(); }
}

window.onload = () => {
    const salvo = localStorage.getItem('cpq_campanha');
    if (salvo) {
        campanha = JSON.parse(salvo);
        mostrarInfoCampanha();
    }
};
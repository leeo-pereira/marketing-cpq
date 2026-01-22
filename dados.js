// PRODUTOS

const produtos = [
    { 
      "id_produto": "orcamento", 
      "nome_produto": "Orçamento de Obras", 
      "tipo": "modulo", 
      "preco_nominal": 1099, 
      "tags": ["core", "licitacao"] 
    }, 
    { 
      "id_produto": "bases", 
      "nome_produto": "Bases de Composições", 
      "tipo": "modulo", 
      "preco_nominal": 1099, 
      "tags": ["core", "licitacao"] 
    }, 
{ 
      "id_produto": "gestao", 
      "nome_produto": "Gestão de Base Própria", 
      "tipo": "modulo", 
      "preco_nominal": 599, 
      "tags": ["core", "licitacao"] 
    }, 
{ 
      "id_produto": "cde", 
      "nome_produto": "OF CDE", 
      "tipo": "modulo", 
      "preco_nominal": 1999, 
      "tags": ["core", "licitacao"] 
    }, 
{ 
      "id_produto": "planejamento", 
      "nome_produto": "Planejamento", 
      "tipo": "modulo", 
      "preco_nominal": 1099, 
      "tags": ["core", "licitacao"] 
    }, 
{ 
      "id_produto": "medicao", 
      "nome_produto": "OF Medição", 
      "tipo": "modulo", 
      "preco_nominal": 1099, 
      "tags": ["core", "licitacao"] 
    }, 
{ 
      "id_produto": "compras", 
      "nome_produto": "Compras", 
      "tipo": "modulo", 
      "preco_nominal": 1099, 
      "tags": ["core", "licitacao"] 
    }, 
{ 
      "id_produto": "diario", 
      "nome_produto": "Diário de Obras", 
      "tipo": "modulo", 
      "preco_nominal": 1099, 
      "tags": ["core", "licitacao"] 
    }, 
{ 
      "id_produto": "orcabim", 
      "nome_produto": "OrçaBIM para Revit", 
      "tipo": "plugin", 
      "preco_nominal": 1199, 
      "tags": ["bim", "revit", "licitacao"] 
    }, 
{ 
      "id_produto": "civil3d", 
      "nome_produto": "OrçaBIM para Civil 3D", 
      "tipo": "plugin", 
      "preco_nominal": 1099, 
      "tags": ["bim", "civil_3d"] 
    }, 
{ 
      "id_produto": "eletrico", 
      "nome_produto": "OF Elétrico", 
      "tipo": "plugin", 
      "preco_nominal": 1199, 
      "tags": ["bim", "revit"] 
    }, 
{ 
      "id_produto": "hidraulico", 
      "nome_produto": "OF Hidráulico", 
      "tipo": "plugin", 
      "preco_nominal": 1199, 
      "tags": ["bim", "revit"] 
    }, 
{ 
      "id_produto": "estrutural", 
      "nome_produto": "OF Estrutural", 
      "tipo": "plugin", 
      "preco_nominal": 1199, 
      "tags": ["bim", "revit"] 
    }, 
{ 
      "id_produto": "ofbi", 
      "nome_produto": "OF BI", 
      "tipo": "plugin", 
      "preco_nominal": 3999, 
      "tags": ["bim", "power_bi"] 
    } 
]

// MODELO DE CAMPANHA

const campanha = [
  { 
  "id_campanha": "", 
  "nome_campanha": "", 
  "vigencia_inicio": "", 
  "vigencia_fim": "", 
  "observacoes_gerais": null, 
  "ofertas": [] 
} 
]

// MODELO DE OFERTA (COMBO)

const oferta = [
  { 
  "id_oferta": null, 
  "nome_oferta": null, 
  "publico": null, 
  "base": null, 
  "observacoes": null, 
  "itens": [] 
}  
]

// MODELO DE ITEM EM OFERTA

const item_oferta = [
  { 
  "id_item_oferta ": null, 
  "id_oferta": null, 
  "id_produto": null, 
  "tipo_acao": null, 
  "valor": null, 
  "condicao": null 
} 
]

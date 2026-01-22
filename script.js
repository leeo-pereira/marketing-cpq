const display = document.getElementById('teste-dados');

// Limpamos a div antes de começar
display.innerHTML = "<h2>Lista de Produtos Carregada:</h2>";

// Percorremos a lista de produtos
produtos.forEach(item => {
    // O += serve para ADICIONAR e não substituir o que já estava lá
    display.innerHTML += "<p>ID: " + item.id_produto + " | Nome: " + item.nome_produto + "</p>";
});
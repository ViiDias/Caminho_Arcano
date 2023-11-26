document.addEventListener('DOMContentLoaded', function() {
  let nomeDoDeck = 'Meu Deck'; // Inicialize o nome do deck com um valor padrão

  const btnConfirmar = document.getElementById('btnConfirmar');
  btnConfirmar.style.display = 'none';

  const meuDeck = {
    Filosofia: [],
    Memória: [],
    Soberania: []
  };


  function atualizarContagem() {
    const divCartasFilo = document.getElementById('cartasFilo');
    const divCartasMemo = document.getElementById('cartasMemo');
    const divCartasSobe = document.getElementById('cartasSobe');

    if (divCartasFilo) {
      divCartasFilo.textContent = `Cartas de Filosofia: ${meuDeck.Filosofia.length}/12`;
    }
    if (divCartasMemo) {
      divCartasMemo.textContent = `Cartas de Memoria: ${meuDeck.Memória.length}/6`;
    }
    if (divCartasSobe) {
      divCartasSobe.textContent = `Cartas de Soberania: ${meuDeck.Soberania.length}/2`;
    }

    const totalCartas = meuDeck.Filosofia.length + meuDeck.Memória.length + meuDeck.Soberania.length;
    const divCartasTotais = document.getElementById('cartasTotais');
    divCartasTotais.textContent = `Total de Cartas: ${totalCartas}/20`;

    if (totalCartas >= 20) {
      btnConfirmar.style.display = 'block';
    } else {
      btnConfirmar.style.display = 'none';
    }
  }

  atualizarContagem();

// Função para adicionar o evento de clique a uma carta
function adicionarEventoClique(cartas) {
  cartas.forEach(card => {
    card.addEventListener('click', () => {
      const cardId = card.id;
      const cardCategoria = card.getAttribute('categoria');

      // Limpa o conteúdo existente no modal antes de adicionar a nova carta
      const modalCardContent = document.querySelector('.modalCardContent');
      modalCardContent.innerHTML = '';

      // Carrega apenas a carta com ID "1" na classe "filosofia"
      loadCards(cardCategoria, 'modalCardContent', cardId);

      // Exibir o modal
      const modalBackground = document.getElementById('modalBackground');
      modalBackground.style.display = 'block';  // Corrigido o nome da variável
    });
  });
}

  // Função para fechar o modal
  function fecharModalCards() {
    const modal = document.getElementById('modalBackground');
    
    modal.style.display = 'none';
  }

  // Função para salvar a carta (você pode implementar a lógica desejada)
  function salvarCarta() {
    // Lógica para salvar a carta
    // Obtenha o tipo da carta do modal
    const modalCardContent = document.querySelector('.modalCardContent');
    const modalCard = modalCardContent.querySelector('.card');

    const cardId = modalCard.id;
    const cardName = modalCard.getAttribute('name');
    const categoria = modalCard.getAttribute('categoria');

    if (categoria) {
      const categoriaDeck = meuDeck[categoria];
      const numCartasComId = categoriaDeck.filter(carta => carta.id === cardId).length;

      if (categoriaDeck.length >= getMaximoCartas(categoria)) {
        alert(`Você atingiu o limite máximo de cartas de ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}.`);
        return;
      }

      if ((categoria === 'Filosofia' || categoria === 'Memória') && numCartasComId >= 2) {
        alert(`Você atingiu o limite de 2 cartas com o mesmo ID em ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}.`);
        return;
      } else if (categoria === 'Soberania' && numCartasComId >= 1) {
        alert(`Você já possui uma carta com o mesmo ID em Soberania.`);
        return;
      }

      categoriaDeck.push({ id: cardId, nome: cardName, categoria: categoria });
      atualizarContagem();

    }

  }

  // Comece verificando as cartas quando o DOM estiver pronto
  verificarCartas();

  function getMaximoCartas(categoria) {
    if (categoria === 'Filosofia') {
      return 12;
    } else if (categoria === 'Memória') {
      return 6;
    } else if (categoria === 'Soberania') {
      return 2;
    }
  }

  // Adiciona evento de clique ao botão btnConfirmar
  btnConfirmar.addEventListener('click', function () {
    // Construa uma mensagem com os dados do objeto meuDeck
    let mensagem = nomeDoDeck + ':\n';

    for (const categoria in meuDeck) {
      mensagem += `${categoria.charAt(0).toUpperCase() + categoria.slice(1)}:\n`;
      meuDeck[categoria].forEach(carta => {
        mensagem += `- ID: ${carta.id}, Nome: ${carta.nome}\n`;
      });
    }

    // Salva os dados no localStorage (pode ser ajustado conforme necessário)
    localStorage.setItem('deckData', JSON.stringify(meuDeck));

    // Navega para a nova página
    window.location.href = '/Caminho_Arcano/deck.html';
  });

  // Adiciona evento de clique ao botão de fechar no modal
  const closeModalButton = document.getElementById('closeModalCards');
  closeModalButton.addEventListener('click', fecharModalCards);

  // Adiciona evento de clique ao botão de salvar no modal
  const saveCardButton = document.getElementById('addCard');
  saveCardButton.addEventListener('click', salvarCarta);

  // Função para verificar as cartas e adicionar eventos de clique quando prontas
  function verificarCartas() {
    const cards = document.querySelectorAll('.cards');
    if (cards.length > 0) {
      adicionarEventoClique(cards);
    } else {
      setTimeout(verificarCartas, 500); // Verifique novamente após um curto atraso
    }
  }

  // Função para abrir o modal Deck Name
  function abrirModal() {
    document.getElementById('myModal').style.display = 'block';
  }

  // Função para fechar o modal Deck Name
  function fecharModal() {
    document.getElementById('myModal').style.display = 'none';
  }

  // Função para salvar o nome do deck
  function salvarNomeDoDeck() {
    const novoNomeDoDeck = deckNameInput.value;
    if (novoNomeDoDeck) {
      nomeDoDeck = novoNomeDoDeck;
      const headerDeck = document.querySelector('.header-deck h2');
      headerDeck.textContent = novoNomeDoDeck;
    }
    fecharModal();
  }

  // Adiciona eventos aos elementos
  document.querySelector('.deck-item').addEventListener('click', abrirModal);
  document.getElementById('closeModal').addEventListener('click', fecharModal);
  document.getElementById('saveDeckName').addEventListener('click', salvarNomeDoDeck);

});

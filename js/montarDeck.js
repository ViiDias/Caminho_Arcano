document.addEventListener('DOMContentLoaded', function() {
  let nomeDoDeck = 'Meu Deck'; // Inicialize o nome do deck com um valor padrão

  const btnConfirmar = document.getElementById('btnConfirmar');
  btnConfirmar.style.display = 'none';

  const meuDeck = {
    filosofia: [],
    memoria: [],
    soberania: []
  };


  function atualizarContagem() {
    const divCartasFilo = document.getElementById('cartasFilo');
    const divCartasMemo = document.getElementById('cartasMemo');
    const divCartasSobe = document.getElementById('cartasSobe');

    if (divCartasFilo) {
      divCartasFilo.textContent = `Cartas de Filosofia: ${meuDeck.filosofia.length}/12`;
    }
    if (divCartasMemo) {
      divCartasMemo.textContent = `Cartas de Memoria: ${meuDeck.memoria.length}/6`;
    }
    if (divCartasSobe) {
      divCartasSobe.textContent = `Cartas de Soberania: ${meuDeck.soberania.length}/2`;
    }

    const totalCartas = meuDeck.filosofia.length + meuDeck.memoria.length + meuDeck.soberania.length;
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
        const cardName = card.getAttribute('name');  // Use getAttribute para acessar propriedades personalizadas

        console.log(cardName);
        let categoria = null;

        if (card.parentElement.classList.contains('filosofia')) {
          categoria = 'filosofia';
        } else if (card.parentElement.classList.contains('memoria')) {
          categoria = 'memoria';
        } else if (card.parentElement.classList.contains('soberania')) {
          categoria = 'soberania';
        }

        if (categoria) {
          if (meuDeck[categoria].length >= getMaximoCartas(categoria)) {
            alert(`Você atingiu o limite máximo de cartas de ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}.`);
            return;
          }

          const numCartasComId = meuDeck[categoria].filter(id => id === cardId).length;
          if (categoria === 'filosofia' || categoria === 'memoria') {
            if (numCartasComId >= 2) {
              alert(`Você atingiu o limite de 2 cartas com o mesmo ID em ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}.`);
              return;
            }
          } else if (categoria === 'soberania') {
            if (numCartasComId >= 1) {
              alert(`Você já possui uma carta com o mesmo ID em Soberania.`);
              return;
            }
          }

          meuDeck[categoria].push({ id: cardId, nome: cardName });
          atualizarContagem();
        }
      });
    });
  }

  // Função para verificar as cartas e adicionar eventos de clique quando prontas
  function verificarCartas() {
    const cards = document.querySelectorAll('.card');
    if (cards.length > 0) {
      adicionarEventoClique(cards);
    } else {
      setTimeout(verificarCartas, 500); // Verifique novamente após um curto atraso
    }
  }

  // Comece verificando as cartas quando o DOM estiver pronto
  verificarCartas();

  function getMaximoCartas(categoria) {
    if (categoria === 'filosofia') {
      return 12;
    } else if (categoria === 'memoria') {
      return 6;
    } else if (categoria === 'soberania') {
      return 2;
    }
  }

  btnConfirmar.addEventListener('click', function() {
    // Construa uma mensagem com os dados do objeto meuDeck
    let mensagem = nomeDoDeck+':\n';

    for (const categoria in meuDeck) {
      mensagem += `${categoria.charAt(0).toUpperCase() + categoria.slice(1)}:\n`;
      meuDeck[categoria].forEach(carta => {
        mensagem += `- ${carta}\n`;
      });
    }

    alert(mensagem);
  });

  // Evento para abrir o modal quando "Meu Deck" é clicado
  const deckSection = document.querySelector('.deck-item');
  const modal = document.getElementById('myModal');
  const closeModal = document.getElementById('closeModal');
  const deckNameInput = document.getElementById('deckNameInput');
  const saveDeckNameButton = document.getElementById('saveDeckName');

  deckSection.addEventListener('click', function() {
    modal.style.display = 'block';
  });

  closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Quando o usuário clica em "Salvar" no modal
  saveDeckNameButton.addEventListener('click', function() {
    // Obtenha o valor do input do modal
    const novoNomeDoDeck = deckNameInput.value;
    if (novoNomeDoDeck) {
      // Atualize o nome do deck e o conteúdo do <h2>
      nomeDoDeck = novoNomeDoDeck;
      const headerDeck = document.querySelector('.header-deck h2');
      headerDeck.textContent = novoNomeDoDeck;
    }
  });

});

document.addEventListener('DOMContentLoaded', function() {
  const meuDeck = {
    filosofia: [],
    memoria: [],
    soberania: []
  };

  const btnConfirmar = document.getElementById('btnConfirmar');
  btnConfirmar.style.display = 'none';

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
    divCartasTotais.textContent = `Total de Cartas: ${totalCartas}`;

    if (totalCartas >= 20) {
      btnConfirmar.style.display = 'block';
    } else {
      btnConfirmar.style.display = 'none';
    }
  }

  atualizarContagem();

  function adicionarEventosClique() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const cardId = card.id;
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

          // Adicione temporariamente a classe "pulse" para aplicar a animação
          card.classList.add('pulse');

          // Remova a classe "pulse" após a animação (ajuste a duração da animação no CSS)
          setTimeout(() => {
            card.classList.remove('pulse');
          }, 1000);

          meuDeck[categoria].push(cardId);
          atualizarContagem();
        }
      });
    });
  }

  if (document.querySelectorAll('.card').length > 0) {
    adicionarEventosClique();
  } else {
    const observer = new MutationObserver(function(mutationsList) {
      if (document.querySelectorAll('.card').length > 0) {
        observer.disconnect();
        adicionarEventosClique();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

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
    let mensagem = 'Meu Deck:\n';

    for (const categoria in meuDeck) {
      mensagem += `${categoria.charAt(0).toUpperCase() + categoria.slice(1)}:\n`;
      meuDeck[categoria].forEach(carta => {
        mensagem += `- ${carta}\n`;
      });
    }

    alert(mensagem);
  });
});

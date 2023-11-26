document.addEventListener('DOMContentLoaded', function () {
    // Carrega os dados do localStorage
    const deckData = JSON.parse(localStorage.getItem('deckData'));
  
    // Verifica se há dados e se a função loadCards está disponível
    if (deckData && typeof loadCards === 'function') {
      // Limpa o conteúdo existente antes de exibir as cartas
      clearContainers(['filosofia', 'memoria', 'soberania']);
  
      // Lógica para exibir as cartas na nova página
      // Aqui, você pode chamar a função loadCards com os dados do deck
      loadAllCards(deckData.Filosofia, 'filosofia');
      loadAllCards(deckData.Memória, 'memoria');
      loadAllCards(deckData.Soberania, 'soberania');
    }
  });
  
  function loadAllCards(cardsArray, containerClass) {
    const container = document.querySelector(`.${containerClass}`);
  
    cardsArray.forEach(card => {
      // Substitua 'containerFilosofia' pelo ID ou classe apropriada
      loadCards(card.categoria, containerClass, card.id);
    });
  }
  
  // Função para limpar o conteúdo dos contêineres antes de exibir novas cartas
  function clearContainers(containerClasses) {
    containerClasses.forEach(containerClass => {
      const container = document.querySelector(`.${containerClass}`);
      container.innerHTML = '';
    });
  }
  

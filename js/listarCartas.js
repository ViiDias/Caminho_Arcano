async function listCards(Categoria, containerClass) {
    const response = await fetch(`./data/cartas.yaml`);
    const text = await response.text();
    const cardsData = jsyaml.load(text);
  
    const container = document.querySelector(`.${containerClass}`);
  
    cardsData.forEach((cardData) => {

          // Verifica se o tipo da carta corresponde ao tipo desejado
          if (cardData.Categoria !== Categoria) {
            return;
        }

        const cardHTML = document.createElement('div');
        cardHTML.classList.add('cards');
        cardHTML.setAttribute('id', cardData.ID);
        cardHTML.setAttribute('Categoria', cardData.Categoria);

        // Construa o caminho da imagem com base no ID da carta
        const imagePath = `./img/cards/card_${cardData.ID}.jpeg`;
        cardHTML.style.backgroundImage = `url(${imagePath})`;

        // Construa o caminho da imagem com base no ID da carta
        const caminhoImage = caminhoToImage[cardData.Caminho];
      
        cardHTML.innerHTML = `
        <div class="header">
            <div>
                <h3>${cardData.Nome}</h3>
                <h4>${cardData.Tipo}</h4>
            </div>
            <img class="logo" src="${caminhoImage}" alt"${cardData.Caminho}">
        </div>
        `;
  
      container.appendChild(cardHTML);
    });
  }
  
    // Chame a função para carregar as cartas de Filosofia
    listCards('Filosofia', 'filosofia-cards');

    // Chame a função para carregar as cartas de Memória
    listCards('Memória', 'memoria-cards');

    // Chame a função para carregar as cartas de Memória
    listCards('Soberania', 'soberania-cards');
  

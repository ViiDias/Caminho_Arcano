// Mapeamento dos nomes dos caminhos para imagens
const caminhoToImage = {
    "A Inexistência": "../img/caminhos/nihility.png",
    "A Preservação": "../img/caminhos/preservation.png",
    "A Caça": "../img/caminhos/hunt.png",
    "A Erudição": "../img/caminhos/erudition.png",
    "A Destruição": "../img/caminhos/destruction.png",
    "A Abundância": "../img/caminhos/abundance.png",
    "A Harmonia": "../img/caminhos/harmony.png"
};

async function loadCards(tipo, containerClass, dataFile) {
    const response = await fetch(`../data/${dataFile}`);
    const text = await response.text();
    const cardsData = jsyaml.load(text);
  
    const container = document.querySelector(`.${containerClass}`);
  
    cardsData.forEach((cardData) => {
        const cardHTML = document.createElement('div');
        cardHTML.classList.add('card');
  
        // Construa o caminho da imagem com base no ID da carta
        const imagePath = `../img/cards/card_${cardData.ID}.jpeg`;
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
    loadCards('Filosofia', 'filosofia', 'cartasFilo.yaml');

    // Chame a função para carregar as cartas de Memória
    loadCards('Memória', 'memoria', 'cartasMemo.yaml');

    // Chame a função para carregar as cartas de Memória
    loadCards('Soberania', 'soberania', 'cartasSoberania.yaml');
  
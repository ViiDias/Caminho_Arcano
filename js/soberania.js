// Função para carregar e exibir as cartas de Filosofia
async function loadFilosofiaCards() {
    const response = await fetch('../data/cartasSoberania.yaml'); // Substitua pelo caminho correto do seu arquivo YAML
    const text = await response.text();
    const cardsData = jsyaml.load(text);
    
    const filosofiaContainer = document.querySelector('.soberania');
    
    cardsData.forEach((cardData) => {
        const cardHTML = document.createElement('div');
        cardHTML.classList.add('card'); // Adiciona a classe .carta
    
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
            <div class="description">
                <h4>Habilidade:</h4>
                <p>${cardData.Habilidade}</p>
                <h4>Soberania:</h4>
                <p>${cardData.Soberania}</p>
            </div> `;
    
        filosofiaContainer.appendChild(cardHTML);
    });
    }
    // Chame a função para carregar as cartas de Filosofia
    loadFilosofiaCards();
    
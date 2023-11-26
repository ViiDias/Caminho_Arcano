// Mapeamento dos nomes dos caminhos para imagens
const caminhoToImage = {
    "A Inexistência": "./img/caminhos/nihility.png",
    "A Preservação": "./img/caminhos/preservation.png",
    "A Caça": "./img/caminhos/hunt.png",
    "A Erudição": "./img/caminhos/erudition.png",
    "A Destruição": "./img/caminhos/destruction.png",
    "A Abundância": "./img/caminhos/abundance.png",
    "A Harmonia": "./img/caminhos/harmony.png"
};

async function loadCards(Categoria, containerClass, cartaId) {
    const response = await fetch(`./data/cartas.yaml`);
    const text = await response.text();
    const cardsData = jsyaml.load(text);

    const container = document.querySelector(`.${containerClass}`);

    cardsData.forEach((cardData) => {
        if (cartaId && cardData.ID !== cartaId) {
            return;
        }

        // Verifica se o tipo da carta corresponde ao tipo desejado
        if (cardData.Categoria !== Categoria) {
            return;
        }

        const cardHTML = document.createElement('div');
        cardHTML.classList.add('card');
        cardHTML.setAttribute('id', cardData.ID);
        cardHTML.setAttribute('name', cardData.Nome);
        cardHTML.setAttribute('Categoria', cardData.Categoria);

        const imagePath = `./img/cards/card_${cardData.ID}.jpeg`;
        cardHTML.style.backgroundImage = `url(${imagePath})`;

        const caminhoImage = caminhoToImage[cardData.Caminho];

        // Verifica se o tipo da carta é "Soberania"
        if (Categoria === 'Soberania') {
            cardHTML.innerHTML = `
                <div class="header">
                    <div>
                        <h3>${cardData.Nome}</h3>
                        <h4>${cardData.Tipo}</h4>
                    </div>
                    <img class="logo" src="${caminhoImage}" alt="${cardData.Caminho}">
                </div>
                <div class="description">
                    <h4>Habilidade:</h4>
                    <p>${cardData.Habilidade}</p>
                    <h4>Soberania:</h4>
                    <p>${cardData.Soberania}</p>
                </div>
            `;
        } else {
            // Estrutura padrão para outros tipos de cartas
            cardHTML.innerHTML = `
                <div class="header">
                    <div>
                        <h3>${cardData.Nome}</h3>
                        <h4>${cardData.Tipo}</h4>
                    </div>
                    <img class="logo" src="${caminhoImage}" alt="${cardData.Caminho}">
                </div>
                <div class="description">
                    <h4>Habilidade:</h4>
                    <p>${cardData.Habilidade}</p>
                </div>
            `;
        }

        container.appendChild(cardHTML);
    });
}

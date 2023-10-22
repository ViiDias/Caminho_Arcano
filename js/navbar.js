// Adicione a classe "active" ao link da página atual
const currentPage = window.location.pathname;

function navigateTo(page) {
    window.location.href = page;
}

const navItems = document.querySelectorAll('.nav-item');
navItems.forEach((item) => {
    const text = item.innerText;
    if (text === 'Página Inicial' && currentPage === './index.html') {
        item.classList.add('active');
    } else if (text === 'Cartas' && currentPage === './cards.html') {
        item.classList.add('active');
    } else if (text === 'Monte Seu Deck' && currentPage === './deck.html') {
        item.classList.add('active');
    }
});

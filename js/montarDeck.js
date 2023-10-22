  // Defina os valores iniciais
  document.getElementById('cartasTotais').textContent = '0/20';
  document.getElementById('cartasFilo').textContent = '0/12';
  document.getElementById('cartasMemo').textContent = '0/6';
  document.getElementById('cartasSobe').textContent = '0/2';

  // Selecione todas as cartas
  const cards = document.querySelectorAll('.card');

  // Adicione um ouvinte de evento de clique a cada carta
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const h3Element = document.querySelector('#cartasTotais');
      const value = parseInt(h3Element.textContent);
      h3Element.textContent = `${value + 1}/20`;

      if (card.parentElement.classList.contains('filosofia')) {
        const h2Filo = document.querySelector('#cartasFilo');
        const valueFilo = parseInt(h2Filo.textContent);
        h2Filo.textContent = `${valueFilo + 1}/12`;
      }

      if (card.parentElement.classList.contains('memoria')) {
        const h2Memo = document.querySelector('#cartasMemo');
        const valueMemo = parseInt(h2Memo.textContent);
        h2Memo.textContent = `${valueMemo + 1}/6`;
      }
      
      if (card.parentElement.classList.contains('soberania')) {
        const h2Sobe = document.querySelector('#cartasSobe');
        const valueSobe = parseInt(h2Sobe.textContent);
        h2Sobe.textContent = `${valueSobe + 1}/2`;
      }
    });
  });

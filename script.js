const ranking = [];
const rankingList = document.getElementById('ranking');
const playerForm = document.getElementById('player-form');
const playerNameInput = document.getElementById('player-name');
const playerPointsInput = document.getElementById('player-points');

const editForm = document.getElementById('edit-form');
const editNameInput = document.getElementById('edit-name');
const editPointsInput = document.getElementById('edit-points');
const editButton = document.getElementById('edit-button');

// Adicionar ou atualizar jogador no ranking
playerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = playerNameInput.value.trim();
  const points = parseInt(playerPointsInput.value);

  if (!name || isNaN(points)) {
    alert('Preencha o nome e os pontos corretamente!');
    return;
  }

  addOrUpdatePlayer(name, points);
  updateRanking();

  playerNameInput.value = '';
  playerPointsInput.value = '';
});

// Alterar os pontos de um jogador existente
editButton.addEventListener('click', () => {
  const name = editNameInput.value.trim();
  const newPoints = parseInt(editPointsInput.value);

  if (!name || isNaN(newPoints)) {
    alert('Preencha o nome e os novos pontos corretamente!');
    return;
  }

  const player = ranking.find(p => p.name === name);

  if (player) {
    player.points = newPoints;
    updateRanking();
    alert(`Pontos de ${name} alterados para ${newPoints}`);
  } else {
    alert(`Jogador "${name}" não encontrado no ranking!`);
  }

  editNameInput.value = '';
  editPointsInput.value = '';
});

// Função para adicionar ou atualizar jogador
function addOrUpdatePlayer(name, points) {
  const player = ranking.find(p => p.name === name);

  if (player) {
    player.points += points;
  } else {
    ranking.push({ name, points });
  }
}

// Função para atualizar o ranking
function updateRanking() {
  ranking.sort((a, b) => b.points - a.points);
  rankingList.innerHTML = '';

  ranking.forEach((player, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}º - ${player.name}: ${player.points} pontos`;

    // Aplicar classes CSS para os três primeiros colocados
    if (index === 0) {
      li.classList.add('first-place');
    } else if (index === 1) {
      li.classList.add('second-place');
    } else if (index === 2) {
      li.classList.add('third-place');
    }

    rankingList.appendChild(li);
  });
}

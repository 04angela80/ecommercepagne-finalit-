
function showModeles(type) {
  // Récupère les src des <img> dans les <li>
  const images = Array.from(document.querySelectorAll(`#${type}-images li img`)).map(img => img.getAttribute('src'));

  // Mettre en surbrillance la carte sélectionnée
  document.querySelectorAll('.pagne-card').forEach(c => c.classList.remove('active'));
  const index = type === 'wax' ? 0 : type === 'super' ? 1 : 2;
  document.querySelectorAll('.pagne-card')[index].classList.add('active');

  // Générer les modèles avec images, prix et étoiles
  const container = document.getElementById('modeles-pagne');
  container.innerHTML = `
    <div class="liste-modeles">
      ${images.map((img, i)=>`
        <div class="modele-card">
          <img src="${img}" alt="modèle ${i+1}">
          <div style="display:flex;justify-content:center;align-items:center;gap:0.5rem;">
            <span class="prix"></span>
            <span class="stars" title="Favoris">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
          </div>
        </div>
      `).join('')}
    </div>`;
}
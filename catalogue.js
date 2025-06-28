let panier = JSON.parse(localStorage.getItem('panier')) || [];

function showModeles(type) {
  const items = Array.from(document.querySelectorAll(`#${type}-images li`));
  document.querySelectorAll('.pagne-card').forEach(c => c.classList.remove('active'));
  const index = type === 'wax' ? 0 : type === 'super' ? 1 : 2;
  document.querySelectorAll('.pagne-card')[index].classList.add('active');
  const container = document.getElementById('modeles-pagne');
  container.innerHTML = `
    <div class="liste-modeles">
      ${items.map((li, i) => {
        const img = li.querySelector('img');
        const prix = li.getAttribute('data-prix') || '';
        const nom = img.getAttribute('alt') || `modèle ${i+1}`;
        return `
          <div class="modele-card">
            <img src="${img.getAttribute('src')}" alt="${nom}">
            <div style="display:flex;justify-content:center;align-items:center;gap:0.5rem;">
              <span class="prix">${prix ? prix + ' $' : ''}</span>
              <span class="stars" title="Favoris">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
            </div>
            <button class="btn-panier" onclick="ajouterAuPanier('${nom}', '${img.getAttribute('src')}', '${prix}')">Ajouter au panier</button>
          </div>
        `;
      }).join('')}
    </div>`;
}

function ajouterAuPanier(nom, image, prix) {
  panier.push({ nom, image, prix });
  localStorage.setItem('panier', JSON.stringify(panier));
  majCompteurPanier();
}

function majCompteurPanier() {
  document.getElementById('compteur-panier').textContent = panier.length;
}
document.addEventListener('DOMContentLoaded', function () {
  majCompteurPanier();
  document.getElementById('panier-flottant').onclick = function () {
    window.location.href = "panier.html";
  };
});
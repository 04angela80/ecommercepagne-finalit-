let panier = JSON.parse(localStorage.getItem('panier')) || [];

function afficherPanier() {
  const conteneur = document.getElementById('contenu-panier');
  if (!panier.length) {
    conteneur.innerHTML = `<div class="panier-vide"><i class="fa fa-shopping-cart"></i> Votre panier est vide.</div>`;
    return;
  }

  let totalGeneral = 0;
  conteneur.innerHTML = panier.map((item, idx) => {
    const quantite = item.quantite || 1;
    const total = (parseFloat(item.prix) * quantite) || 0;
    totalGeneral += total;
    return `
      <div class="panier-item">
        <img src="${item.image}" alt="${item.nom}" class="panier-img">
        <span class="panier-nom">${item.nom}</span>
        <span class="panier-prix">${item.prix} $</span>
        <span class="panier-quantite">x${quantite}</span>
        <span class="panier-total">Total : ${total.toFixed(2)} $</span>
        <button class="btn-supprimer" onclick="supprimerItem(${idx})">
          <i class="fa fa-trash"></i> Supprimer
        </button>
      </div>
    `;
  }).join('') +
    `<button class="btn-payer" onclick="payer()">Payer ${totalGeneral.toFixed(2)} $</button>`;
}

function supprimerItem(index) {
  panier.splice(index, 1);
  localStorage.setItem('panier', JSON.stringify(panier));
  afficherPanier();
}

function payer() {
  const paiement = prompt(`Entrez votre numero de paiement`);
  if (paiement) {
    const conteneur = document.getElementById('contenu-panier');
    conteneur.innerHTML = `<div class="paiement-message">Paiement en cours...</div>`;
    setTimeout(() => {
      conteneur.innerHTML = `<div class="paiement-message succes">Paiement réussi ! Merci pour votre commande.</div>`;
      panier = [];
      localStorage.removeItem('panier');
    }, 3000); // 3 secondes d'attente
  }
}

afficherPanier();


document.addEventListener("DOMContentLoaded", function () {
    // Générer et définir automatiquement les valeurs pour externalId et dateSaisie au chargement de la page
    document.getElementById("externalId").value = generateExternalId();
    document.getElementById("dateSaisie").value = new Date().toISOString(); // ISO 8601 format
});

document.getElementById("leadForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche l'envoi classique du formulaire

    // Récupérer les données du formulaire
    const data = {
        externalId: document.getElementById("externalId").value,
        dateSaisie: document.getElementById("dateSaisie").value,
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        civilite: document.getElementById("civilite").value,
        adresse: document.getElementById("adresse").value,
        cp: document.getElementById("cp").value,
        ville: document.getElementById("ville").value,
        telephone: document.getElementById("telephone").value,
        email: document.getElementById("email").value,
    };

    // Validation des données
    if (!validateForm(data)) {
        alert("Veuillez remplir tous les champs correctement.");
        return;
    }

    // Générer l'URL à envoyer à la fonction proxy
    const url = generateURL(data);

    // Envoyer les données via une requête HTTP GET à la fonction proxy
    sendLead(url);
});

// Fonction de validation des données
function validateForm(data) {
    const phonePattern = /^\d{10}$/;  // Format pour le téléphone : 10 chiffres
    const cpPattern = /^\d{5}$/;      // Format pour le code postal : 5 chiffres
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Format basique pour l'email

    if (!data.nom || !data.prenom || !data.adresse || !data.cp || !data.ville || !data.telephone || !data.email) {
        return false;  // Vérifie que tous les champs obligatoires sont remplis
    }

    // Validation des formats
    if (!phonePattern.test(data.telephone)) {
        alert("Veuillez entrer un numéro de téléphone valide (10 chiffres).");
        return false;
    }

    if (!cpPattern.test(data.cp)) {
        alert("Veuillez entrer un code postal valide (5 chiffres).");
        return false;
    }

    if (!emailPattern.test(data.email)) {
        alert("Veuillez entrer une adresse email valide.");
        return false;
    }

    return true;  // Si tout est correct
}

// Générer l'URL avec les paramètres encodés dans la requête
function generateURL(data) {
    const baseURL = "https://devlink-gamedia.netlify.app/.netlify/functions/api-proxy"; // Remplacez par l'URL de votre fonction proxy
    const params = new URLSearchParams({
        GA_part: "EGNSDGGC",
        GA_ws: "WBJQUCEP",
        ExternalId: data.externalId,
        DateFormulaire: data.dateSaisie, // ISO 8601 format pour la date
        nom: data.nom,
        prenom: data.prenom,
        civilite: data.civilite,
        adresse: data.adresse,
        cp: data.cp,
        ville: data.ville,
        telephone: data.telephone,
        email: data.email,
    });
    return `${baseURL}?${params.toString()}`;
}

// Fonction pour générer un ExternalId unique (basé sur un timestamp + un nombre aléatoire)
function generateExternalId() {
    const timestamp = Date.now().toString();
    const randomNum = Math.floor(Math.random() * 10000).toString(); // Ajoute un nombre aléatoire à 4 chiffres
    return timestamp + randomNum; // Combine timestamp et numéro aléatoire pour garantir l'unicité
}

// Envoyer les données à la fonction proxy via une requête GET
function sendLead(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'envoi des données : " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("result").innerHTML = `
                <p>Données envoyées avec succès !</p>
                <p>URL générée : <a href="${url}" target="_blank">${url}</a></p>
            `;
            alert("Données envoyées avec succès !");
            resetForm(); // Réinitialiser le formulaire après un envoi réussi
        })
        .catch((error) => {
            document.getElementById("result").innerHTML = `
                <p>Erreur : ${error.message}</p>
            `;
            alert("Erreur lors de l'envoi : " + error.message);
        });
}

// Réinitialiser le formulaire après l'envoi
function resetForm() {
    document.getElementById("leadForm").reset();
    // Régénérer automatiquement l'externalId et la dateSaisie pour un nouveau lead
    document.getElementById("externalId").value = generateExternalId();
    document.getElementById("dateSaisie").value = new Date().toISOString();
}

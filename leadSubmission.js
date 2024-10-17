function displayError(message) {
    const errorMessagesDiv = document.getElementById("errorMessages");
    errorMessagesDiv.textContent = message;
    errorMessagesDiv.style.display = "block"; // Afficher le message d'erreur
}

document.getElementById("leadForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const errorMessagesDiv = document.getElementById("errorMessages");
    errorMessagesDiv.style.display = "none"; // Réinitialiser les messages d'erreur

    const leadData = {
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
    if (!["Monsieur", "Madame"].includes(leadData.civilite)) {
        displayError("Civilité doit être 'Monsieur' ou 'Madame'.");
        return;
    }

    if (!/^[0-9]{5}$/.test(leadData.cp)) {
        displayError("Code postal doit être un nombre à 5 chiffres.");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(leadData.email)) {
        displayError("Adresse email est invalide.");
        return;
    }

    if (!/^0[1-9][0-9]{8}$/.test(leadData.telephone)) {
        displayError("Numéro de téléphone doit commencer par 0 et avoir 10 chiffres.");
        return;
    }

    if (!leadData.ville) {
        displayError("Ville est requise.");
        return;
    }

    const externalId = Math.floor(Math.random() * 100000000); // Génération d'un ExternalId unique
    const dateFormulaire = new Date().toISOString();

    // Création de l'URL pour la fonction serverless
    const url = `http://ws.ga-media.fr/services?GA_part=EGNSDGGC&GA_ws=WBJQUCEP&ExternalId=${externalId}&DateFormulaire=${dateFormulaire}&nom=${encodeURIComponent(leadData.nom)}&prenom=${encodeURIComponent(leadData.prenom)}&civilite=${encodeURIComponent(leadData.civilite)}&adresse=${encodeURIComponent(leadData.adresse)}&cp=${encodeURIComponent(leadData.cp)}&ville=${encodeURIComponent(leadData.ville)}&telephone=${encodeURIComponent(leadData.telephone)}&email=${encodeURIComponent(leadData.email)}`;

    // Envoi de l'URL à la fonction serverless pour l'enregistrement
    fetch(`/api/saveLead`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            url: url,
            leadData: leadData
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erreur réseau : " + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert("Lead envoyé avec succès !");
        // Sauvegarder le lead pour affichage ultérieur
        saveLead(externalId, dateFormulaire, leadData);
    })
    .catch(error => {
        displayError("Erreur d'envoi du lead : " + error.message);
        console.error("Erreur d'envoi du lead :", error);
    });
});

function saveLead(externalId, date, leadData) {
    let leads = JSON.parse(localStorage.getItem("leads")) || [];
    leads.push({
        externalId,
        date,
        nom: leadData.nom,
        prenom: leadData.prenom,
        email: leadData.email,
    });
    localStorage.setItem("leads", JSON.stringify(leads));
}

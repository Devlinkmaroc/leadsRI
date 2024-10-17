document.getElementById("leadForm").addEventListener("submit", function (e) {
    e.preventDefault();

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
        alert("Civilité doit être 'Monsieur' ou 'Madame'.");
        return;
    }

    if (!/^[0-9]{5}$/.test(leadData.cp)) {
        alert("Code postal doit être un nombre à 5 chiffres.");
        return;
    }

    if (!/\S+@\S+\.\S+/.test(leadData.email)) {
        alert("Adresse email est invalide.");
        return;
    }

    if (!/^0[1-9][0-9]{8}$/.test(leadData.telephone)) {
        alert("Numéro de téléphone doit commencer par 0 et avoir 10 chiffres.");
        return;
    }

    if (!leadData.ville) {
        alert("Ville est requise.");
        return;
    }

    const externalId = Math.floor(Math.random() * 100000000); // Génération d'un ExternalId unique
    const dateFormulaire = new Date().toISOString();

    // Création de l'URL pour la fonction serverless
    const url = `/api/proxy?ExternalId=${externalId}&DateFormulaire=${dateFormulaire}&nom=${encodeURIComponent(leadData.nom)}&prenom=${encodeURIComponent(leadData.prenom)}&civilite=${encodeURIComponent(leadData.civilite)}&adresse=${encodeURIComponent(leadData.adresse)}&cp=${encodeURIComponent(leadData.cp)}&ville=${encodeURIComponent(leadData.ville)}&telephone=${encodeURIComponent(leadData.telephone)}&email=${encodeURIComponent(leadData.email)}`;

    // Envoi de l'URL via un web service (fetch)
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erreur réseau : " + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            alert("Lead envoyé avec succès !");
            // Sauvegarder le lead pour affichage ultérieur
            saveLead(externalId, dateFormulaire, leadData);
        })
        .catch(error => {
            alert("Erreur d'envoi du lead : " + error.message);
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

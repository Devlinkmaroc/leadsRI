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

    const externalId = Math.floor(Math.random() * 100000000); // Génération d'un ExternalId unique
    const dateFormulaire = new Date().toISOString();

    const url = `http://ws.ga-media.fr/services?GA_part=EGNSDGGC&GA_ws=WBJQUCEP&ExternalId=${externalId}&DateFormulaire=${dateFormulaire}&nom=${leadData.nom}&prenom=${leadData.prenom}&civilite=${leadData.civilite}&adresse=${leadData.adresse}&cp=${leadData.cp}&ville=${leadData.ville}&telephone=${leadData.telephone}&email=${leadData.email}`;

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

document.addEventListener("DOMContentLoaded", function () {
    const leads = JSON.parse(localStorage.getItem("leads")) || [];
    const leadsTableBody = document.getElementById("leadsTableBody");

    // Vérification si le tableau est vide
    if (leads.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 5; // Adaptez en fonction du nombre de colonnes
        cell.textContent = "Aucun lead disponible.";
        row.appendChild(cell);
        leadsTableBody.appendChild(row);
        return; // Sortir de la fonction si aucun lead
    }

    leads.forEach(lead => {
        const row = document.createElement("tr");

        const externalIdCell = document.createElement("td");
        externalIdCell.textContent = lead.externalId;
        row.appendChild(externalIdCell);

        const dateCell = document.createElement("td");
        // Formatage de la date pour plus de clarté
        const formattedDate = new Date(lead.date).toLocaleDateString();
        dateCell.textContent = formattedDate;
        row.appendChild(dateCell);

        const nomCell = document.createElement("td");
        nomCell.textContent = lead.nom;
        row.appendChild(nomCell);

        const prenomCell = document.createElement("td");
        prenomCell.textContent = lead.prenom;
        row.appendChild(prenomCell);

        const emailCell = document.createElement("td");
        emailCell.textContent = lead.email;
        row.appendChild(emailCell);

        leadsTableBody.appendChild(row);
    });
});

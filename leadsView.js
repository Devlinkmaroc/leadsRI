document.addEventListener("DOMContentLoaded", function () {
    const leads = JSON.parse(localStorage.getItem("leads")) || [];
    const leadsTableBody = document.getElementById("leadsTableBody");

    leads.forEach(lead => {
        const row = document.createElement("tr");

        const externalIdCell = document.createElement("td");
        externalIdCell.textContent = lead.externalId;
        row.appendChild(externalIdCell);

        const dateCell = document.createElement("td");
        dateCell.textContent = lead.date;
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

document.addEventListener("DOMContentLoaded", function () {
    const leads = JSON.parse(localStorage.getItem("leads")) || [];
    const leadsList = document.getElementById("leadsList");

    leads.forEach(lead => {
        const li = document.createElement("li");
        li.textContent = `${lead.nom} ${lead.prenom} - ${lead.email}`;
        leadsList.appendChild(li);
    });
});

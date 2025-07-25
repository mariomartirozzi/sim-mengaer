let sims = JSON.parse(localStorage.getItem("sims")) || [];

function saveSIMs() {
    localStorage.setItem("sims", JSON.stringify(sims));
}

function renderSIMs() {
    const list = document.getElementById("sim-list");
    list.innerHTML = "";
    sims.forEach((sim, index) => {
        const div = document.createElement("div");
        div.className = "sim-card";
        div.innerHTML = `
            <strong>${sim.carrier}</strong> - ${sim.number}<br>
            Credito: €${sim.credit.toFixed(2)}<br>
            <button onclick="recharge(${index})">Ricarica +5€</button>
            <button onclick="deleteSIM(${index})">Elimina</button>
        `;
        list.appendChild(div);
    });
}

function recharge(index) {
    sims[index].credit += 5;
    saveSIMs();
    renderSIMs();
}

function deleteSIM(index) {
    sims.splice(index, 1);
    saveSIMs();
    renderSIMs();
}

document.getElementById("sim-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const carrier = document.getElementById("carrier").value;
    const number = document.getElementById("number").value;
    const credit = parseFloat(document.getElementById("credit").value);

    sims.push({ carrier, number, credit });
    saveSIMs();
    renderSIMs();
    this.reset();
});

renderSIMs();

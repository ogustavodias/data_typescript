function toCurrency(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
export function populateStatistics(statistics) {
    const container = document.querySelector("#statistics");
    if (!container)
        return;
    container.innerHTML += `
    <div>
      <p>Total: <span>${toCurrency(statistics.total)}</span></p>
    </div>
    <div>
    ${Object.keys(statistics.countByType)
        .map((item) => {
        return `<p>${item}: <span>${statistics.countByType[item]}</span></p>`;
    })
        .reduce((acc, active) => acc + active, "")}
    </div>
    <div>
      ${Object.keys(statistics.countByStatus)
        .map((item) => {
        return `<p>${item}: <span>${statistics.countByStatus[item]}</span></p>`;
    })
        .reduce((acc, active) => acc + active, "")}
      <p>Dias com mais vendas: <span>${statistics.betterDay.name}</span></p>
    </div>`;
}
//# sourceMappingURL=statistics.js.map
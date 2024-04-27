import Statistics from "./models/Statistics.js";

function toCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function populateStatistics(statistics: Statistics): void {
  const container = document.querySelector<HTMLElement>("#statistics");
  if (!container) return;

  // else
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

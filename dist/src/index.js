import Week from "../models/Week.js";
import Statistics from "../models/Statistics.js";
const keys = [
    "status",
    "id",
    "date",
    "name",
    "payment_type",
    "email",
    "value",
    "new_client",
];
const statistics = new Statistics();
function isOrder(obj) {
    const check = obj && typeof obj === "object" && keys.every((key) => key in obj);
    if (check) {
        return true;
    }
    return false;
}
function normalizeData(data) {
    const normalized_orders = data.map((order) => {
        return Object.entries(order).reduce((prev, active, i) => ({ ...prev, [keys[i]]: active[1] }), {});
    });
    return normalized_orders;
}
function createRow(order) {
    const tbody = document.querySelector("tbody");
    if (tbody) {
        const row = document.createElement("tr");
        row.innerHTML = `
      <td>${order.name}</td>
      <td>${order.email}</td>
      <td>R$ ${order.value}</td>
      <td>${order.payment_type}</td>
      <td>${order.status}</td>
    `;
        tbody.appendChild(row);
    }
}
function populateTable(orders) {
    orders.forEach((order) => {
        if (isOrder(order)) {
            createRow(order);
        }
    });
}
function calcPayments(payment) {
    switch (payment) {
        case "Cartão de Crédito":
            statistics.count_card++;
            break;
        case "Boleto":
            statistics.count_bol++;
            break;
    }
}
function calcStatus(status) {
    switch (status) {
        case "Paga":
            statistics.count_payed++;
            break;
        case "Recusada pela operadora de cartão":
            statistics.count_declined++;
            break;
        case "Aguardando pagamento":
            statistics.count_waiting++;
            break;
        case "Estornada":
            statistics.count_reversed++;
            break;
    }
}
function calcBestDay(week) {
    week.getDays().forEach((day) => {
        if (day.count > statistics.best_day.count) {
            statistics.best_day = day;
            return day;
        }
    }, {});
}
function getStatistics(orders) {
    const week = new Week();
    orders.forEach((order) => {
        if (isOrder(order)) {
            const value = Number(order.value.replace(",", "."));
            if (!isNaN(value))
                statistics.total_value += value;
            calcPayments(order.payment_type);
            calcStatus(order.status);
            const dateSliced = order.date.split("/");
            const [day, month] = dateSliced;
            const year = dateSliced[2].split(" ")[0];
            const formatedDate = new Date(Number(year), Number(month), Number(day));
            const indexOfDay = formatedDate.getDay();
            week.getDays()[indexOfDay].count++;
        }
    });
    calcBestDay(week);
    return statistics;
}
function toCurrency(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function populateStatistics(obj) {
    Object.keys(statistics).forEach((id) => {
        const element = document.getElementById(`${id}`);
        if (element) {
            if (id === "total_value")
                element.innerText = toCurrency(obj["total_value"]);
            else if (id === "best_day")
                element.innerText = obj["best_day"].name;
            else
                element.innerText = obj[`${id}`];
        }
    });
}
async function getData() {
    const response = await fetch("https://api.origamid.dev/json/transacoes.json");
    const json = await response.json();
    const normalized_orders = normalizeData(json);
    const statistics = getStatistics(normalized_orders);
    populateTable(normalized_orders);
    populateStatistics(statistics);
}
getData();
//# sourceMappingURL=index.js.map
import Week from "./models/Week.js";
import Statistics from "./models/Statistics.js";
const statistics = new Statistics();
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
        return;
    }, {});
}
function toCurrency(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
export function populateStatistics(obj) {
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
export default function getStatistics(orders) {
    const week = new Week();
    orders.forEach((order) => {
        if (order.nValue)
            statistics.total_value += order.nValue;
        calcPayments(order.payment_type);
        calcStatus(order.status);
        const indexOfDay = order.date.getDay();
        week.getDays()[indexOfDay].count++;
        console.log(order.date);
        console.log(week);
    });
    calcBestDay(week);
    return statistics;
}
//# sourceMappingURL=statistics.js.map
function normalizeDate(date) {
    const [date_aux, time] = date.split(" ");
    const [hour, minute] = time.split(":").map(Number);
    const [day, month, year] = date_aux.split("/").map(Number);
    return new Date(year, month - 1, day, hour, minute);
}
function normalizeValue(value) {
    const nValue = Number(value.replaceAll(".", "").replaceAll(",", "."));
    return isNaN(nValue) ? null : nValue;
}
export default function normalizeOrder(order) {
    const nDate = normalizeDate(order.Data);
    const nValue = normalizeValue(order["Valor (R$)"]);
    const nOrder = {
        status: order.Status,
        id: order.ID,
        date: nDate,
        name: order.Nome,
        payment_type: order["Forma de Pagamento"],
        email: order.Email,
        value: order["Valor (R$)"],
        nValue,
        new_client: Boolean(order["Cliente Novo"]),
    };
    return nOrder;
}
//# sourceMappingURL=normalize.js.map
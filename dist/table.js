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
function isOrder(obj) {
    const check = obj && typeof obj === "object" && keys.every((key) => key in obj);
    if (check) {
        return true;
    }
    return false;
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
export function populateTable(orders) {
    orders.forEach((order) => {
        if (isOrder(order)) {
            createRow(order);
        }
    });
}
//# sourceMappingURL=table.js.map
import fetchData from "./fetch.js";
import normalizeOrder from "./normalize.js";
import { populateStatistics } from "./statistics.js";
import { populateTable } from "./table.js";
import { Statistics } from "./models/Statistics.js";
async function getData() {
    const url = "https://api.origamid.dev/json/transacoes.json";
    const orders = await fetchData(url);
    if (!orders)
        return;
    const normalizedOrders = orders.map(normalizeOrder);
    const statistics = new Statistics(normalizedOrders);
    populateTable(normalizedOrders);
    populateStatistics(statistics);
}
getData();
//# sourceMappingURL=index.js.map
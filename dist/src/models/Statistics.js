class Statistics {
    total_value;
    count_card;
    count_bol;
    count_payed;
    count_declined;
    count_waiting;
    count_reversed;
    best_day;
    constructor() {
        this.total_value = 0;
        this.count_card = 0;
        this.count_bol = 0;
        this.count_payed = 0;
        this.count_declined = 0;
        this.count_waiting = 0;
        this.count_reversed = 0;
        this.best_day = { name: "segunda-feira", count: 0 };
    }
}
export default Statistics;
//# sourceMappingURL=Statistics.js.map
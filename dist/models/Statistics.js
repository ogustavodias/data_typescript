import Week from "./Week.js";
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
export class Estatisticas {
    orders;
    total;
    countByType;
    countByStatus;
    week;
    betterDay;
    constructor(orders) {
        this.orders = orders;
        this.total = this.setTotal();
        this.countByType = this.setCountByType();
        this.countByStatus = this.setCountByStatus();
        this.week = this.setWeek();
        this.betterDay = this.setBetterDay();
    }
    setTotal() {
        return this.orders.reduce((acc, { nValue }) => (nValue ? acc + nValue : acc + 0), 0);
    }
    countBy(property) {
        const listOfProp = this.orders.map((order) => order[property]);
        return listOfProp.reduce((acc, key) => {
            if (acc[key] !== undefined)
                return { ...acc, [key]: acc[key] + 1 };
            else
                return { ...acc, [key]: 1 };
        }, {});
    }
    setCountByType() {
        return this.countBy("payment_type");
    }
    setCountByStatus() {
        return this.countBy("status");
    }
    setWeek() {
        const week = new Week();
        this.orders.forEach(({ date }) => {
            const indexOfDay = date.getDay();
            week.setDay(indexOfDay);
        });
        return week;
    }
    setBetterDay() {
        return this.week.getDays().reduce((previous, next) => {
            if (next.count >= previous.count)
                return next;
            else
                return previous;
        }, { name: "segunda-feira", count: 0 });
    }
}
export default Statistics;
//# sourceMappingURL=Statistics.js.map
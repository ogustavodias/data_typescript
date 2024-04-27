import Week from "./Week.js";
export class Statistics {
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
import Rule from "../Rule";

export default class RuleSum extends Rule {
    constructor() {
        super("Parolanızdaki sayıların toplamı şu kadar olmalıdır ");
        this.target = Math.ceil(Math.random() * 6) * 5;
        this.renderItem = () => <span>{this.target}.</span>;
    }

    check = (txt) => {

        const numbers = txt.match(/-?\d+(\.\d+)?/g);
        const sum = numbers ? numbers.map(Number).reduce((acc, v) => acc + v, 0) : 0;

        console.log("sum:", sum);
        this.sum = sum; 
        return sum === this.target;
    }

    renderSummary = () => {
        return <div>Toplam: {this.sum}</div>;
    }
}

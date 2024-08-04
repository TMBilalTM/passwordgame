export default class Rule{
    constructor(msg, check){
        this.msg = msg;
        this.correct = false;
        this.unlocked = false;

        if(check!==undefined){
            this.check = check;
        }
    }

    setRuleNumber(num){
        this.num = num;
    }
}
import Rule from "../Rule";

const morse = {
    a: ".-", b: "-...", c: "-.-.", d: "-..", e: ".", f: "..-.", g: "--.", h: "....",
    i: "..", j: ".---", k: "-.-", l: ".-..", m: "--", n: "-.", o: "---", p: ".--.", 
    q: "--.-", r: ".-.", s: "...", t: "-", u: "..-", v: "...-", w: ".--", x: "-..-", y: "-.--", z: "--.." 
}

export default class RuleMorse extends Rule{
    constructor(){
        super("Şifrenizde ilk 3 İngilizce alfabenin Mors kodu bulunmalıdır. (. ve - kullanın)");
    }

    check(txt){
        let letters = txt.match(/[A-Za-z]/g)?.slice(0, 3);
        
        if (letters?.length === 3) {
            let code = `${morse[letters[0].toLowerCase()]} ${morse[letters[1].toLowerCase()]} ${morse[letters[2].toLowerCase()]}`;
            let exp = code.replace(/\./g, "\\.").replace(/-/g, "\\-");

            console.log("morse:", exp);
            let r = new RegExp(exp);
            

            return r.test(txt);
        }
        return false;
    }
}

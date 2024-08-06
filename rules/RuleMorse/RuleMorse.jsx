import Rule from "../Rule";

export default class RuleMorse extends Rule {
    constructor() {
        super("Şifrenizde 12. ve 14. elementlerin birleşimi olmalıdır ifadesi bulunmalıdır.");
    }

    check(txt) {
        // Şifreyi küçük harfe çevir
        const lowerTxt = txt.toLowerCase();

        // İlgili ifadeleri kontrol et
        return (
            lowerTxt.includes("mgsi") ||
            lowerTxt.includes("magnezyumsilisyum") ||
            txt.includes("MgSi") ||
            txt.includes("MAGNEZYUMSILISYUM")
        );
    }
}

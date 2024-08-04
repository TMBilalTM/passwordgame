import Rule from "./Rule";
import RuleWordle from "./RuleWordle/RuleWordle";
import RuleSlidingPuzzle from "./RuleSlidingPuzzle/RuleSlidingPuzzle";
import RuleMorse from "./RuleMorse/RuleMorse";
import RuleRiddle from "./RuleRiddle/RuleRiddle";
import RuleLocation from "./RuleLocation/RuleLocation";
import RuleTimeEmoji from "./RuleTimeEmoji/RuleTimeEmoji";
import RuleQR from "./RuleQR/RuleQR";
import RuleSum from "./RuleSum/RuleSum";
import RuleEarthquake from "./RuleEarthquake/RuleEarthquake";


var rules = [
    new Rule( 
        "Şifreniz en az 6 karakterden oluşmalıdır.",
        (t) => t?.length >= 6
    ),
    new Rule( 
        "Şifreniz hem büyük hem de küçük harf içermelidir.",
        (t) => (/[A-Z]/.test(t) && /[a-z]/.test(t))
    ),
    new Rule( 
        "Şifreniz özel bir karakter içermelidir.",
        (t) => /\W/.test(t)
    ),
    new Rule( 
        "Şifreniz bir negatif sayı içermelidir.",
        (t) => /-\d/.test(t)
    ),
    new Rule( 
        "Şifreniz tüm Türkçe ünlüleri içermelidir.",
        (t) => /a/i.test(t) && /e/i.test(t) && /ı/i.test(t) && /i/i.test(t) && /o/i.test(t) && /ö/i.test(t) && /u/i.test(t) && /ü/i.test(t)
    ),

    new Rule(
        "Şifreniz 2 basamaklı bir asal sayı içermelidir.",
        (t) => /(?:11)|(?:13)|(?:17)|(?:19)|(?:23)|(?:29)|(?:31)|(?:37)|(?:41)|(?:43)|(?:47)|(?:53)|(?:59)|(?:61)|(?:67)|(?:71)|(?:73)|(?:79)|(?:83)|(?:89)|(?:97)/.test(t)
    ),
    new RuleSum(),
    new Rule(
        "Şifreniz \"enerji santrali\" adını içermelidir. \u{1F9A0}", //&#x1F9A0;
        (t) => /(?:enerji santrali)|(?:enerjisantrali)/i.test(t)
    ),
    new Rule( 
        "Şifreniz bir kıtanın adını içermelidir.",
        (t) => /asya|avrupa|afrika|avustralya|okyanusya|kuzey amerika|güney amerika|antarktika/i.test(t)
    ),
    new Rule( 
        "Şifreniz pi'nin ilk 5 ondalık basamağını içermelidir.",
        (t) => /(?:3\.14159)/.test(t)
    ),    
    
    new RuleTimeEmoji(),
    new RuleWordle(),
    new RuleEarthquake(),
    new RuleQR(),
    new RuleMorse(),
    new RuleLocation(),
    new RuleRiddle(),
    new Rule(
        "Şifrenizde ünlüler kadar ünsüzler bulunmalıdır.",
        (t) => (t.match(/[aeıiuüoö]/ig) || []).length === (t.match(/[bcdfghjklmnpqrstvwxys]/ig) || []).length
    ),
    new RuleSlidingPuzzle(),
    new Rule(
        "Şifreniz, şifrenizin uzunluğunu içermelidir.",
        (t) => {
            let l = t.length;
            let r = new RegExp(`${l}`);
            return r.test(t);
        }
    )
];

function sort_rules(a, b){
    if(a.correct == b.correct){
        return b.num - a.num;
    }
    else if(!a.correct && b.correct){
        return -1;
    }
    else{
        return 1;
    }
}

export default rules;
export {sort_rules};
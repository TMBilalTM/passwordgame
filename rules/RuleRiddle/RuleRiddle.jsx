import { useRef } from 'react';
import Rule from "../Rule";
import styles from "./RuleRiddle.module.css";
import ReloadButton from '../../components/ReloadButton';


const riddles = [
    ["Diğerlerinden daha kısayım, mutlu olduğunda en iyi gibi kaldırırsın.", "başparmak"],
    ["Üzgün olduğunda çok üzgün görünürüm, mutlu olduğunda ise mutlu görünmekten hoşlanırım.", "ayna"],
    ["Uzun dururum ve çok ihtişamlı olabilirim. Sırrım gizli değil, hemen elinin altında.", "piyano"],
    ["Her renk olabilir ya da hiç renk olmayabilirim, bazen boştur, bazen doludur.", "cam"],
    ["Başından ayağına kadar kullanırsın, ne kadar çok çalışırsam o kadar küçülürüm.", "sabun"],
    ["İnsanların yüzlerinde bulunurum, bir şey giyerim, gözlüğün doğru görüşü sağlarım ve bir çift olarak gelirim.", "gözlük"],
    ["Sıcaklıkta beni yanlış görürsün. Sana umut getiririm ama çabuk kaybolurum.", "miraj"],
    ["Bana bakarsan kör olabilirsin. Ama parlamazsam göremezsin.", "güneş"],
    ["Bazen yuvarlak olabilirim ama pek sık değil. Her gece buradayım, bu yüzden kolayca unutulurum.", "ay"],
    ["Bir madenin içinden alınırım, ahşap bir kutuya kapatılırım, asla serbest bırakılmam, ama neredeyse herkes tarafından kullanılırım. Neyim ben?", "kurşun kalem"],
    ["Ağzım yok ama konuşurum, kulaklarım yok ama duyarım. Vücudum yok ama rüzgarla canlanırım. Neyim ben?", "yankı"],
    ["Canlı değilim ama büyüyebilirim; akciğerlerim yok ama havaya ihtiyacım var; ağzım yok ama su beni öldürür. Neyim ben?", "ateş"],
    ["Her zaman açım, sürekli beslenmeliyim. Dokunduğum parmak kısa sürede kızarır. Neyim ben?", "ateş"],
    ["Anahtarlarım var ama kilit açmam. Alanım var ama oda yok. İçine girebilirsin ama dışarı çıkamazsın. Neyim ben?", "klavye"],
    ["Gençken uzun, yaşlıyken kısa olurum. Neyim ben?", "mum"],
    ["Ne kadar çok alırsan, o kadar çok geride bırakırım. Neyim ben?", "ayak sesleri"],
    ["Şehirlerim var ama evlerim yok. Ormanlarım var ama ağaçlarım yok. Sularım var ama balıklarım yok. Neyim ben?", "harita"],
    ["Üç harfli bir kelimeyim, iki harf ekle ve daha az olurum. Neyim ben?", "az"],
    ["Bir tüy kadar hafifim, ama en güçlü kişi bile beni bir dakikadan uzun süre tutamaz. Neyim ben?", "nefes"],
    ["Dünyayı köşemden ayrılmadan dolaşabilirim. Neyim ben?", "pul"],
    ["Kanatsız uçabilirim. Gözsüz ağlayabilirim. Nereye gidersem, karanlık beni takip eder. Neyim ben?", "bulut"],
    ["Kırılabilir, yapılabilir, anlatılabilir ve oynanabilir. Neyim ben?", "şaka"],
    ["Dolu deliklerle ama yine de suyu tutarım. Neyim ben?", "sünger"],
    ["Başım, kuyruğum var ama vücudum yok. Neyim ben?", "madeni para"],
    ["Bugün, dününden önce geldiği yer neresi?", "sözlük"],
    ["Bir tek sayı olduğum için, bir harf çıkardığında çift olurum. Hangi sayıyım?", "yedi"],
    ["İki kişi şirket, üç kişi kalabalık, dört ve beş nedir?", "dokuz"],
    ["İnsanlar beni yapar, biriktirir, değiştirir, artırır. Neyim ben?", "para"]
]


export default class RuleRiddle extends Rule{
    constructor(){
        super("Parolanız aşağıdaki bilmecenin çözümünü içermelidir:");

        this.riddleNum = Math.floor(Math.random()*riddles.length);
        console.log("Bilmece:", riddles[this.riddleNum][1]);
        this.renderItem = ({regenerateRule, correct}) => <Riddle riddleNum={this.riddleNum} regenerate={()=>regenerateRule(this.num)} correct={correct}/>
        
    }

    regenerate(){
        this.riddleNum = Math.floor(Math.random()*riddles.length);
        console.log("Bulmaca:", riddles[this.riddleNum][1]);
    }

    check = (txt) => {
        let ans = riddles[this.riddleNum][1];
        let r = RegExp(`(?:${ans})`, "i");
        return r.test(txt);
    }
}

function Riddle({riddleNum, regenerate, correct}){
    const riddle = riddles[riddleNum][0];
    const reloadsLeft = useRef(3);

    return (
        <div className={styles.riddle_wrapper}>
            <div className={styles.riddle}>
                {riddle}
            </div>
            <ReloadButton 
                onClick={()=>{
                    if(reloadsLeft.current>0){
                        regenerate()
                        reloadsLeft.current--; 
                    }
                }} 
                hidden={correct} 
                reloadsLeft={reloadsLeft.current}
            />
        </div>
    )
}
import { useEffect, useRef } from "react";
import Rule from "../Rule";

export default class RuleEarthquake extends Rule{
    constructor(){
        super("Olamaz! Deprem oluyor! Şifrenizi güvenli bir yere götürün! Bu sandalyeyi şifrenize ekleyin ve şifrenizin geri kalanını altına koyun.");
        this.renderItem = ({pswd, setPswd, shakePasswordBox, correct}) => {
            return (
                <Earthquake 
                    pswd={pswd}
                    setPswd={setPswd}
                    shakePasswordBox={shakePasswordBox}
                    correct={correct}
                />
            )
        }
    }

    check(txt){
        return /^[\u{1FA91}]+\n/u.test(txt);
    }

}


function Earthquake({pswd, setPswd, shakePasswordBox, correct}){
    const solvedOnce = useRef(false);
    const timerRef = useRef(null);
    const replaceCount = useRef(0);

    
    useEffect(()=>{
        timerRef.current = setTimeout(shuffleCharacters, 1000);

        shakePasswordBox(true);
        solvedOnce.current = false;

        return () => clearTimeout(timerRef.current);
    }, []);

    useEffect(()=>{
        if(!solvedOnce.current){
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(
                shuffleCharacters, 
                replaceCount.current<8?1000:3000
            );
        }
    }, [pswd]);


    useEffect(()=>{
        if(!solvedOnce.current && correct){
            solvedOnce.current = true;
            clearTimeout(timerRef.current);
            shakePasswordBox(false);
        }
    }, [correct]);

    
    
    function shuffleCharacters(){
        let matches = [...pswd.matchAll(/[!-~]/g)];
        if(matches.length > 0){
            let indices = matches.map(m => m.index);
            let i = Math.floor(Math.random()*indices.length);
            i = indices[i];

            const arr = ["\u{1FAA8}", "\u{1FAA8}", "\u{1F342}", "\u{1F343}"];
            const x = arr[Math.floor(Math.random()*arr.length)];

            setPswd(pswd.substr(0,i) + x + pswd.substr(i+1)); 
            replaceCount.current += 1;
        }
    }

    
    return (
        <div style={{fontWeight: "bold", fontSize: "50px", textAlign:"center"}}>
            {"\u{1FA91}"}
        </div>
    )

}
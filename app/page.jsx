'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import styles from './page.module.css'
import PasswordBox from "../components/PasswordBox";
import RuleBox from "../components/RuleBox";
import ruleList, {sort_rules} from "../rules/rules";




export default function Home(){
    const [pswd, setPswd] = useState("");
    const [ruleState, setRuleState] = useState([]);
    const max_unlocked_rules = useRef(0);
    const pswdBoxRef = useRef(null);
    const [aaParent, aaEnableAnimations] = useAutoAnimate();
    const [allSolved, setAllSolved] = useState(false);


    useEffect(() => {

        for (let i = 0; i < ruleList.length; i++) {
            ruleList[i].num = i + 1;
        }
        max_unlocked_rules.current = 0;

        setRuleState(ruleList);

    }, []);



    function setPswdAndCheckRules(txt){
        setPswd(txt);
        checkRules(txt);
    }

        function checkRules(txt) {
        if(ruleState.length===0) return;

        let rules = [...ruleState];

        if(!rules[0].unlocked && txt.length > 0){
            rules[0].unlocked = true;
            max_unlocked_rules.current++;
        }
        
        let solved_count = 0;
        for(let i=0;i<rules.length;i++){

            if(i===max_unlocked_rules.current){
                if(solved_count===max_unlocked_rules.current){
                    rules[i].unlocked = true;
                    max_unlocked_rules.current++;
                }
                else{
                    break;
                }
            }

            rules[i].correct = rules[i].check(txt);
            if(rules[i].correct){
                solved_count++;
            }
        }

        setRuleState(rules);
        if(solved_count===rules.length){
            setAllSolved(true);
        }
        else{
            setAllSolved(false);
        }
    }

    function shakePasswordBox(boolean){
        if(boolean){
            pswdBoxRef.current.classList.add("shake");
        }
        else{
            pswdBoxRef.current.classList.remove("shake");
        }
    }

    function regenerateRule(num){
        console.log("regenerate", num);
        num--;
        let rules = [...ruleState];
        if("regenerate" in rules[num]){
            rules[num].regenerate();
            setRuleState(rules);
        }

    }

    return (
        <>
        <div className={styles.container}>
            
            <div className={styles.title}>
                <Image
                    src="/sifreolusturucu.png"
                    width={55}
                    height={55}
                    alt=""
                />
                <div className={styles.title_text}>                
                    ŞifreniOluştur
                </div>
            </div>
            
                        
            <PasswordBox pswd={pswd} setPswd={setPswdAndCheckRules} ref={pswdBoxRef}/>
            <div>Seviye: {max_unlocked_rules.current}</div>
            <div ref={aaParent}>
                {allSolved && <RuleBox 
                    heading={"Kazandın!"}
                    msg={"Başaryla güvenli bir şifre oluşturdun. \u{1F389}\u{1F389}"}
                    correct={true}
                />}        
                {ruleState.filter(r => r.unlocked).sort(sort_rules).map(r => {
                    return(
                        <RuleBox
                            key={r.num} 
                            heading={`Kural ${r.num}`} 
                            msg={r.msg} 
                            correct={r.correct} 
                            renderItem={r.renderItem}
                            propsToChild={{pswd, setPswd: setPswdAndCheckRules, shakePasswordBox, regenerateRule, correct: r.correct}}
                        />
                    )
                })}                
            </div>

        </div>
        <footer className={styles.footer}>
        Göz atın <a href="https://github.com/TMBilalTM" target="_blank">GitHub</a><br/>
            BilalTM&nbsp;

        </footer>
        </>
      )
}
'use client'

import React, { useEffect, useState } from 'react';

import styles from "./page.module.css";

import {SlidingPuzzle} from "../../rules/RuleSlidingPuzzle/RuleSlidingPuzzle";
import {getRandomWord} from "../../rules/RuleSlidingPuzzle/utils";

function PuzzlePage() {
    const [word, setWord] = useState(null);
    const [showSolution, setShowSolution] = useState(false);

    useEffect(()=>{
        setWord(getRandomWord());
    }, []);

    return ( 
    <div className={styles.container}>
        <h1>Kaydırmalı Bulmaca!</h1>
        {word===null ? null : (
            <>
            <SlidingPuzzle word={word}/>
            <div className={styles.buttons}>
                <button onClick={()=>{setWord(getRandomWord()); setShowSolution(false);}}>
                    Yeni Bulmaca
                </button>
                <button onClick={()=>setShowSolution(true)}>Vazgeç!</button>
            </div>                
            <div hidden={!showSolution}>Solution: {word}</div> 
            </>
        )}
    </div>
    );
}

export default PuzzlePage;
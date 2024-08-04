import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Rule from "../Rule";
import "./RuleSlidingPuzzle.css";

import {getRandomWord, getPuzzle, BLANK_CELL_NUM} from "./utils";



export default class RuleSlidingPuzzle extends Rule{
    constructor(){
        super("Şifreniz bu kayan bulmacanın çözümünü içermelidir.");
        this.word = getRandomWord();
        console.log("Puzzle word:", this.word);
        this.renderItem = () => <SlidingPuzzle word={this.word}/>;
    }

    check(txt){
        let r = new RegExp(`${this.word}`, "i");
        return r.test(txt); 
    }
}


function SlidingPuzzle({word}){
    const canvasRef = useRef(null);
    const smallCanvasRef = useRef(null);
    const cropedImages = useRef([]);

    const [puzzleGrid, setPuzzleGrid] = useState(null);

    function createWordImage(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', {willReadFrequently: true});

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "#4e4e4e";
        ctx.fillText(word.toUpperCase(), 5, canvas.height-20, canvas.width-10);
    }

    function getCroppedImages(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', {willReadFrequently: true});
        const smallCanvas = smallCanvasRef.current;
        const ctx_small = smallCanvas.getContext('2d', {willReadFrequently: true});

        let cropped_imgs = Array(9).fill(null);

        for(let i=0;i<cropped_imgs.length;i++){
            let x = i%3 * 60;
            let y = Math.floor(i/3) * 60;
            let imgData = ctx.getImageData(x, y, 60, 60);
            ctx_small.putImageData(imgData, 0, 0);
            
            let data = smallCanvas.toDataURL();
            cropped_imgs[i] = data;
        }

        return cropped_imgs;       
    }   
    

    useEffect(()=>{

        createWordImage();
        cropedImages.current = getCroppedImages();

        let puzzle = getPuzzle();
        setPuzzleGrid(puzzle);

    }, [word]);


    function onClick(i, j){


        let puzzleGridCopy = puzzleGrid.map((item) => item.slice());

        let neighbour_indices = [[i-1, j], [i, j+1], [i+1, j], [i, j-1]];
        let update_made = false;

        for(let k=0;k<neighbour_indices.length;k++){
            let p = neighbour_indices[k][0];
            let q = neighbour_indices[k][1];

            if(p>=0 && p <=2 && q>=0 && q <=2 && puzzleGridCopy[p][q]===BLANK_CELL_NUM){

                puzzleGridCopy[p][q] = puzzleGridCopy[i][j];
                puzzleGridCopy[i][j] = BLANK_CELL_NUM;
                update_made = true;
                break;
            }
        }
        if(update_made){
            setPuzzleGrid(puzzleGridCopy);
        }
    }

    return (
        <div className='sliding_puzzle'>
            <canvas key={'c1'}
                ref={canvasRef}
                width="180" 
                height="180"
                hidden={true}
            />
            <canvas key={'c2'}
                ref={smallCanvasRef}
                width="60" 
                height="60"
                hidden={true}
            />
            
            {                
                puzzleGrid?.map((row, i) => {
                    return row.map((piece, j) => {
                        if(piece===BLANK_CELL_NUM){
                            return (
                                <div className='puzzle_piece_wrapper' key={`${i},${j}`}>
                                    {}
                                    <div 
                                        style={{width: 60, height: 60}}
                                        className='puzzle_piece blank_piece'
                                    />
                                </div> 
                            )
                        }
                        else{
                            return (
                                <div className='puzzle_piece_wrapper' key={`${i},${j}`}>
                                    <span className='puzzle_piece_num'>{piece+1}</span>
                                    <Image                                         
                                        className='puzzle_piece'                                        
                                        src={cropedImages.current[piece]} 
                                        width={60} 
                                        height={60} 
                                        alt={`${piece}`}
                                        onClick={() => onClick(i, j)}
                                    />
                                </div>                         
                            )
                        }
                    })
                })
                
            }
        </div>
    );
}

export {SlidingPuzzle, getRandomWord, getPuzzle}
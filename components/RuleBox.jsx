import React from 'react';
import "./RuleBox.css";

function RuleBox({heading, msg, correct, renderItem, propsToChild}) {

    return ( 
        <div className={`rulebox ${correct? "rule-correct": "rule-err" }`}>
            <div className={`rulebox-top ${correct? "rule-correct": "rule-err" }`}>
                {correct?"\u{2705}":"\u{274C}"} {heading}
            </div>
            <div className="rulebox-desc">
                {msg}
                {renderItem===undefined? null: renderItem(propsToChild)}
            </div>
        </div> 
    );
}

export default RuleBox;
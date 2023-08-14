import React, { useEffect } from "react";

import { useState } from "react";
import './Tree.css'


const Tree = ({ root }) => {
    const [expand, setExpand] = useState(false);
    const [hasChildren, setHasChildren] = useState(false)

    useEffect(() => {
        const hasC = root.children && root.children.length > 0;
        setHasChildren(hasC)
        console.log(root.value.name)
    }, []);

    return (

        <div className="tree">
            
            <ul className="tree-ul" style={{borderLeft:!expand?"None":"1px solid red" }}>
                <div className="tree-title-container">
                    <span onClick={() => setExpand(!expand)} style={{ cursor: "pointer" }} > {root.value.name} </span>
                </div>

                <li className = "tree-li" style={{ display: expand ? "block" : "none", paddingLeft: 24, }}>
                    {hasChildren ?
                        root.children.map((node, i) => (
                            <Tree key={i} root={node} />
                        )) : null
                    }
                </li>
            </ul>

        </div>


    );
};

export default Tree


/*

  <span key={root.ip} onClick={() => { setExpand(!expand) }}>
                {root.value.cihazAdi}
            </span>

            <div className="items" style={{display:expand?"block":"none", paddingLeft:50,cursor:"pointer"}}>
                {hasChildren ?
                    root.children.map((node,i) => (
                        <Tree key={i} root={node} />
                    )) : null

                }

            </div>

*/
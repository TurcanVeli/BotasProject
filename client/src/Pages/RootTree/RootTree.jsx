import React from "react";


import './RootTree.css'

import DeviceList from "../../Component/DeviceTree/DeviceTree";

const RootTree = () => {





    return (

        <div className="rootTree">

            <DeviceList/>
            <p>Burada tüm cihazların bağlı oldukları cihazlar Tree yapısında listelenmiştir. </p>
        </div>
    )
}


export default RootTree

import React, { useState } from 'react';
import Trmap from '../../Component/Trmap/Trmap';


import './HomePage.css'

const Homepage = () => {

    return(
        <div className='homepage-container'>
            <div className='homepage-title'>
                <h3>Adım 1</h3>
            </div>
            
        <Trmap/>

        <p>
            Enlem ve boylam bilgisine sahip cihazlar; "cihaz türü", "ip" bilgisi gösterecek şekilde haritada işaretlenmiştir.
        </p>
        
        </div>
    )
}

export default Homepage;
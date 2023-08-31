

import Trmap from '../../Component/Trmap/Trmap';
import DevicesStatusInfo from '../../Component/DevicesStatusInfo/DevicesStatusInfo'

import './HomePage.css'

const Homepage = () => {

    return (
        <div className='homepage-container'>
  

            <div className="map-wrapper">
                <Trmap />
            </div>

            <div className="info-wrapper">

                <DevicesStatusInfo />
            </div>


            <p>
                Enlem ve boylam bilgisine sahip cihazlar; "cihaz türü", "ip" bilgisi gösterecek şekilde haritada işaretlenmiştir.
            </p>

        </div>
    )
}

export default Homepage;
import React from 'react';
import { useNavigate } from 'react-router-dom'

function MintMain(){

    let navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `mint`; 
        navigate(path);
      }

    return(
        <div className='container'> 
            <div>
                
            </div>
            <div>
                <h1 className="display-5 col-md-12 imgText">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                </h1>
                <p className="lead col-md-12">
                WL & Public Sale available.</p>
                <button onClick={routeChange} type ="button" className="btn btn-primary col-md-2 m-3">
                    Mint now
                </button>
            </div>
        </div>
        

    )
}


export default MintMain;
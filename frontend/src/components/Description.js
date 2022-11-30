import React from 'react';
import { Button} from 'semantic-ui-react';
import Figure from 'react-bootstrap/Figure';
import '../css/description.css'

const Description =() =>{

    return(
        <div className='descriptionContent'>
       
        
        <img alt="round" src="./img/Circle5.png" className='round5'></img>
        <img alt="round" src="./img/Circle1.png" className='round1'></img>
                 
        
            <div className='row  description container d-flex justify-content-center'>
                
                <div className="col-12 col-xl-5 imgText align-self-center">
                    <h1 className=" display-5 border-bottom border-4 display-sm-7  "> ABOUT OUR PROJECT</h1>
                    <p className='descriptionText'>Puissant et rond à la fois, sur les fruits rouges et le cuir ce vin procure une onctuosité sensuelle avec une grande souplesse en bouche. Le mariage entre le terroir et le vinificateur “Louis Mitjaville” font de ce Château Martet “Réserve de la Famille”.</p> 
                    <div className='learnButtonDiv'>
                        <Button  size="big" className='learnButton' >Learn More</Button>
                    </div>
                </div>
                <div className=" col-12 col-xl-7 text-center">
                    <video width="600" height="100%"  autoPlay muted loop className='animation '>   
                        <source src="./img/Comp1.webm" type="video/webm" />
                    </video>
                    
                </div>
                <img alt="round" src="./img/Circle2.png" className='round2'></img>
            </div>
            
            
        </div>
    )

}

export default Description;
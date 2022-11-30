import React, { useState } from 'react';
import { Button} from 'semantic-ui-react';
import '../css/whitelistPage.css';
import Footer from './Footer';

const WhitelistPage = () => {
    const [address, setAddress] = useState(null);
    const [name, setName] = useState(null);

    const handleSubmit = (event) => {
        console.log("register");
        alert(`register ${name} with wallet address ${address}`)
      }
  return (
    <div> 
        <div className='row whitelistPage' >
            <div className=' whitelistPageContent col-6 '>
                <div className='display-4 whitelistPageTitle '>Register for our Whitelist</div>
                <p className='whitelistPagePar'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                    molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                    numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                    optio, eaque rerum! Provident similique accusantium nemo autem.
                </p>
                <div style={{textAlign: 'center'}} className={"ms-1 me-1"}>
            
                    <input type={"text"} className="form-control" id="setTime" placeholder='Name'onChange={(e) => setName(e.target.value)}/>
                    <input type={"text"} className="form-control" id="setTime" placeholder='Wallet Address'onChange={(e) => setAddress(e.target.value)}/>
                    <Button onClick={handleSubmit}  size="big" className='whitelistPageButton' >Submit</Button>
                    
                </div>
            </div>
            <div className=' col-6 whitelistImgDiv'>
                <img alt="whitelist wine example" src="img/WhitelistWine.png" className='whitelistImage' ></img>
            </div>  
        </div>
        <div className='footerWhitelist'>
                <Footer></Footer>
        </div>
    </div>  
  );
};

export default WhitelistPage;
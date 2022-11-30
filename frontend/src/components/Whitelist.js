import React from 'react';
import { Button} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom'
import '../css/whitelist.css';

const Whitelist = () => {
  let navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `WhitelistPage`; 
        navigate(path);
      }

  return (
    <div className=' whitelistContent'>
        <div className='display-4'>Register Today to</div>
        <div className='display-4'> Whitelist!</div>
        <p className='whitelistPar'>Register today to benefit from the best offers</p>
        <Button onClick={routeChange} size="big" className='whitelistButton'>REGISTER NOW</Button>
        

    </div>
  );
};

export default Whitelist;
import Minter from "./components/Minter.js";
import './css/minter.css';
//import Minter2 from "./components/Approve.js";

const MintPage = ({setNetworkError, networkError, autentification, setAutentification, setAccount, setAvailableAccount, setLoading, loading, availableAccount}) => {
 
  return (
   
    <section className="MintBiggerContainer">
      <div className="MintPage ">
        <Minter setNetworkError={setNetworkError} networkError={networkError}  setAccount={setAccount} setAvailableAccount={setAvailableAccount} setLoading={setLoading} loading={loading} availableAccount={availableAccount}/>
      </div>
    </section>
  );
};

export default MintPage;

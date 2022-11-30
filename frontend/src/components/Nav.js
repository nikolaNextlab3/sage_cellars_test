//navbar 
import React,{useState} from 'react'; // ES6 js
import { Button } from 'semantic-ui-react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useEffect } from 'react';

const Nav =( {setNetworkError, networkError,setLoading, setAvailableAccount,setAccount,availableAccount, setAutentification, autentification,account})=>{
    
    

    const connector = new WalletConnect({
        bridge: "https://bridge.walletconnect.org", // Required
        qrcodeModal: QRCodeModal,
      });


    // Subscribe to connection events
    connector.on("connect", (error, payload) => {
        setAvailableAccount(false);
        if (error) {
          throw error;
        }
        localStorage.setItem("account", connector.accounts);
        setAvailableAccount(true );
        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0];
        if ( chainId !== 56) {               
            setNetworkError({ networkError: true});
            toast.error(`Wrong Chain ID: ${chainId}, please switch to BSC network mainnet`, optionsToast);
        }
    });
      
    connector.on("session_update", (error, payload) => {
        if (error) {
            throw error;
        }
        localStorage.setItem("account", connector.accounts);
        toast.success("Successfull Connected!", optionsToast);
        setAvailableAccount(true )
        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];
    });
    
    connector.on("disconnect", (error, payload) => {
        if (error) {
            throw error;
        }
        window.localStorage.clear("account");
        setAvailableAccount(false )
        // Delete connector
    });

    const updateConnexion = (method) => {
        setAutentification(method);
        
        localStorage.setItem("method", method)
     }
    useEffect(() => {
        if(localStorage.getItem("account")){
            setAvailableAccount(true )
            
        }
        
    })

    const getAccounts = async (mode) => {
       
        if (mode ==="Metamask"){
            if(!connector.connected){
                let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if(accounts.length >0 ){
                    setAvailableAccount(false);
                    setAccount(accounts);
                    updateConnexion("Metamask");                    
                    localStorage.setItem("account", accounts);
                    setAvailableAccount(true);
                    toast.success("Successfull Connected!", optionsToast);
                    
                    return false
                }
                else{
                    toast.error("You need to connect with metamask", optionsToast);
                    setLoading({loading: false});
                    setAvailableAccount(false );
                }  
            }
            else{
                toast.error("You already connect with Wallet Connect", optionsToast);
            }  
        }
        else{
            if(localStorage.getItem("method")!=="Metamask" ){
                if(connector.connected){
                    setAvailableAccount(true )
                    setAccount( connector.accounts );
                    
                    toast.success("Successfull Connected!", optionsToast);
                }
                else if (!connector.connected) {
                    // create new session
                    setAccount( connector.accounts);
                    connector.createSession();
                    console.log(connector.accounts)
                    //setAvailableAccount(true )
                    updateConnexion("WalletConnect");
                    console.log(autentification);
                }
                else{
                    setAvailableAccount(false )
                }
            }
            else{
                toast.error("You already connect with Metamask", optionsToast);
            }  

        }  
    }
    const optionsToast = {
        autoClose: 8000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
    };

    

    return(
        <div className='container'>
                

            <nav className="navbar navbar-expand-xl fixed-top navBarCss ">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand ">
                        <img alt="logo" className="d-inline-block align-text-top logoTop"  src="../img/logo.png" />
                    </a>
                    <button className="navbar-toggler btnNavbar" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="bi bi-list btnNavbar"></i>
                    </button>
                    
                    <div className="collapse navbar-collapse text-center justify-content-end" id="navbarSupportedContent">
                    
                        <ul className="navbar-nav me-1 mb-4 mb-lg-0">
                            <li className="nav-item ">
                                <a className="nav-link" href="/#Collection">Collection</a>                                
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#Whitelist">Whitelist</a>                                
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/#About">About</a>                                
                            </li>
                            <li className="nav-item ">
                                <Button type="button" className="btn btnWarning buyButton "  size="big"  >BUY & EARN SAGE</Button>
                              
                            </li>
                            <li className="nav-item">                            
                                <div>
                                <div className='modalConnect'>
                                    {!localStorage.getItem("account") &&  
                                        <Button type="button" className="btn btn-primary ConnectButton" data-bs-toggle="modal" data-bs-target="#exampleModal" size="big"  >Connect Wallet</Button>
                                    }
                                    {localStorage.getItem("account") && 
                                        <Button type="button" className="btn btn-primary ConnectButton " data-bs-toggle="modal" data-bs-target="#exampleModal" size="big"  >{localStorage.getItem("account").substring(0, 15)}</Button>

                                    }
                                    <div className="modal fade modalConnect" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                        
                                             <img alt="logo" className="logoModal"  src="../img/logo.png" />
                                        
                                            {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                                        </div>
                                        <div className="modal-body">               
                                            <p className="modal-title" id="exampleModalLabel">CONNECT YOUR WALLET</p>
                                            <p className="modal-title2" id="exampleModalLabel">Connect to your favorite wallet!</p>
                                            <div>
                                                <Button onClick={() =>getAccounts("Metamask")} size="big" className='ConnectButton2'  > <img src="../img/metamask.png" alt='metamask logo' className='metamask'></img>Metamask</Button>
                                            </div>
                                            <div>
                                                <Button onClick={() =>getAccounts("WalletConnect")} size="big" className='ConnectButton2'  ><img src="../img/WalletConnect.png" alt='Wallet connect logo' className='metamask' ></img>WalletConnect</Button>
                                            </div>
                                            
                                        </div>
                                        
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </li>
                            
                        </ul>
                        
                            
                    </div>
                              
                </div>
            </nav>
        </div>
    );
}

export default Nav;
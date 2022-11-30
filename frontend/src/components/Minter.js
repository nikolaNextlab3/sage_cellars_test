import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { Button } from 'semantic-ui-react';
import { ethers } from 'ethers'
import abi from '../contract-abi.json';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import Description from './Description';
import Gallerie from './Gallerie';
import Whitelist from './Whitelist';
import Footer from './Footer';
import WineSlider from './Slider';
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3Modal from 'web3modal';
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

const contractAddressHardhat = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const contractAddressJuneoGold = "0x9f40adAB770aaAE54B6aeC33BF16bE7e5B9e4212";

const Minter = ({setNetworkError, networkError, setAccount, setAvailableAccount, setLoading, loading, availableAccount})  => {
    const netId = 56;       
    const [count, setCount] = useState(1);
    const [isMinting , setIsMinting] = useState(false);
    //Change for public sale 
    const [mintType, setMintType] = useState('regular');

    const optionsToast = {
        autoClose: 8000,
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
    };

        
    const mintParam = async (address, provider, chain) => {
        
        setIsMinting(true);
        try { 
            
            let overrides = {
                value: String(1000000000000000*count)
            }
            
            const signer = provider.getSigner();

            try{
                if (chain === "JUNE_GOLD"){ 

                    console.log(address);

                    const TGE721Contract =  new ethers.Contract(contractAddressJuneoGold, abi, signer);  
                    let TGE721ContractTransactionResponse = await TGE721Contract.safeMint(address);
                    let TGE721ContractTransactionRecipient = await TGE721ContractTransactionResponse.wait();

                    toast.success("Successfull Mint", optionsToast);
                    setIsMinting(false);                  
            
                }
                else if(chain ===  "Local"){
                    const TGE721Contract = new ethers.Contract(contractAddressHardhat, abi, signer);
                    let TGE721ContractTransactionResponse = await TGE721Contract.safeMint(address);
                    let TGE721ContractTransactionRecipient = await TGE721ContractTransactionResponse.wait();

                    toast.success("Successfull Mint", optionsToast);
                    setIsMinting(false);
                }
            }
            catch(err){
                console.log(err);
                if (err.data.message.includes("insufficient funds for gas * price + value")){
                    toast.error("Insufficient funds for gas * price + value", optionsToast);
                }
                else{                
                    toast.error("Error during mint", optionsToast);


                }
                setIsMinting(false);   
            }
            }  
        catch (err) {
            setIsMinting(false);   
            try{
                toast.error(err.message.split(",")[1].split(":")[2].split('"')[0], optionsToast);
                console.log(err.message);
            }
            catch{
                if (err.message == "Unexpected token T in JSON at position 0") {
                    toast.error("Too many requests. Please wait 15 minutes", optionsToast);
                }
                else{
                    toast.error(err.message, optionsToast);
                    console.log(err.message)
                }
                
            }
        }
    }
    
    const mint = async (chain) => {
        if(localStorage.getItem("method")==="Metamask"){
            if (typeof window.ethereum !== 'undefined') {    
                if(chain ==="JUNE_GOLD"){
                    const modal = new Web3Modal({
                        network: "https://api2.mcnpoc3.xyz:9650/ext/bc/GOLD/rpc",
                        cacheProvider: true,
                    });
                    const connection = await modal.connect();
                    const provider = new ethers.providers.Web3Provider(connection);
                    const { chainId } = await provider.getNetwork();

                    if(chainId === 330007){
                        mintParam(window.ethereum.selectedAddress, provider, chain);
                    }else{
                        toast.error("Wrong network. Please switch to the Juneo Gold Chain network!", optionsToast);
                    }
                }
                else if(chain === "LOCAL"){
                    const modal = new Web3Modal({
                        network: "http://127.0.0.1:8548/",
                        cacheProvider: true,
                    });
                    const connection = await modal.connect();
                    const provider = new ethers.providers.Web3Provider(connection);
                    const { chainId } = await provider.getNetwork();

                    if(chainId === 31337){
                        mintParam(window.ethereum.selectedAddress, provider, chain);
                    }else{
                        toast.error("Wrong network. Please switch to the Hardhat local network!", optionsToast);
                    }
                }
            }
        }
        else if(localStorage.getItem("method")==="WalletConnect"){
            console.log("WalletConnect")
            
                const providerTrust = new WalletConnectProvider({
                rpc: {
                    1: "https://bsc-dataseed.binance.org",
                },
                });
            
            await providerTrust.enable();
            const web3 = new Web3(providerTrust);
            let accountTrust = web3.currentProvider.accounts;
            
            var parsedData = JSON.parse(localStorage.getItem("walletconnect"));
                      
            if (accountTrust.length >0 ){
                if(parsedData.chainId != netId){
                    toast.error("Please change network", optionsToast)
                }
                else{
                    mintParam(accountTrust[0], providerTrust,mintType)
                    
                }
            }
            else{
                toast.error("You need to connect with Wallet Connect", optionsToast);
            }
        }
        else{
            toast.error("You need to connect with Connect Wallet Button", optionsToast);
        }             
    }

    useEffect(async () => { //quand on démare la 1 er fois
         if (typeof window.ethereum !== 'undefined') {             
             window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                  
                } else {
                    window.localStorage.clear("method");
                    window.localStorage.clear("account");
                    setAccount([]);                    
                }
            })
             window.ethereum.on('chainChanged', async function (chain) {
                 // Time to reload your interface with accounts[0]!
                 console.log("Network changed:", chain)
                 document.location.reload(); 
             })
         }
         
         else {
            //  toast.error("Web3 is not supported by your browser or Metamask is not installed", optionsToast);
             setLoading({ loading: false });
         }
      }, []);



    return (

        <div className='home'>
            
            
            <div className="content">
                <Description></Description>
                <div className='separator'></div>
                <div className='row carouselWithDescr' id='About'>
                    <h1 className='carousselTitle'> Specifications</h1>
                    <div className='col-xxl-2  '>
                    </div>
                    <div className='col-12 col-md-6 col-xxl-5  gallerie ' >
                        <Gallerie></Gallerie>
                       
                    </div>
                    <div className='col-12 col-md-6 col-xxl-5 information'>
                        <h1 className='titleDescription'>Grand cru vin</h1>
                        <div className='mb-3'>
                            <div className='border-bottom border-4 informationTitle'>
                                <img src="img/Digital.png" className='logoDescription'></img>
                                <a className='informationText'>
                                    Digital
                                </a>
                            </div>
                            <div className='ms-sm-3 informationList'>
                                <ol className="list-group list-group-numbered">
                                    <li className="itemList">You can take the bootle in metaverse</li>
                                    <li className="itemList">You can redeem the real bottle</li>
                                </ol>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <div className='border-bottom border-4 informationTitle'>
                                <img src="img/Physical.png" className='logoDescription'></img>
                                <a className='informationText'>
                                    Physical
                                </a>
                            </div>
                            <div className='ms-sm-3 informationList'>
                                <ol className="list-group list-group-numbered">
                                    <li className="itemList">The bottle is store in warehouse for 10 years</li>
                                    <li className="itemList">You can redeem physical bottle without fees</li>
                                </ol>
                            </div>
                        </div>
                        <div >
                            <div className='border-bottom border-4 informationTitle'>
                                <img src="img/Details.png" className='logoDescription'></img>
                                <a className='informationText'>
                                    Details
                                </a>
                            </div>
                            <div className='ms-sm-3 informationList itemList'>
                                <p>Experience</p>
                                <ol className="list-group list-group-numbered">
                                    <li className="itemList">Meeting around wine</li>
                                    <li className="itemList">Meeting with experts</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='separator2'></div>
                
                
                
                    
                    <div className='paragraphe mintingSection' id='Collection'>
                        <img alt="round" src="./img/Circle3.png" className='round3'></img>
                        <img alt="round" src="./img/Circle4.png" className='round4'></img>
                        <div className='row sliderContent'>
                            <div className='col-12 colSlide'>
                                <h1 className='titleSlide'>WHAT ARE WE OFFERING?</h1>
                                <WineSlider></WineSlider>
                                
                                <div className='boxButton buttonMint '>
                                        <h1 className='mintButtonTitle'>Mint now !</h1>
                                        <p>Be the first to mint</p>
                                        <a className='contractAddress' href="https://bscscan.com/address/0x02cc17c1fa3c9a95ec841c2d6c96fc9cd233b779" target="_blank">0x02cc17c1fa3c9a95ec841c2d6c96fc9cd233b779</a>
                                        <p>Sage Cellars- Fine wine collection of NFTS!</p>
                                        { !isMinting &&
                                            <div>
                                                <Button onClick={() => mint("JUNE_GOLD")} size="big"  className='btn btn-primary btn-lg MintButton'>JUNE GOLD</Button>
                                                <Button onClick={() => mint("LOCAL")} size="big"  className='btn btn-primary btn-lg MintButton'>HARD HAT</Button>
                                            </div>
                                        }
                                        { isMinting &&
                                            <Spinner animation="border d-flex justify-content-center" role="status" className='d-flex justify-content-center loader '>
                                                <span className="visually-hidden ">Loading...</span>
                                            </Spinner>
                                        }
                                </div>
                                
                                   
                                </div>
                            </div>
                                                
                    </div>
                
                
                <div id='Whitelist'>
                    <Whitelist ></Whitelist>
                   
                </div>
                
                    <Footer></Footer>
                
                    

                
            </div>
            
            
            <ToastContainer className="paragraphe" style={{ fontSize: "1.5rem" }} />

            
        </div>
    );

}

export default Minter

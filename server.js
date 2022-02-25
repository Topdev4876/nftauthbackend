const express = require('express');
const cors = require('cors')
const { ethers } = require("ethers");
const bodyParser = require('body-parser');

const contract = require('./MegaPrimatesToken.json')

const contractAddress = "0xc61BF058b7D69f2a7b898DA87aC12562f02027e0";
const abi = contract.abi;

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

// async function checknft(address){
//     // const provider = new ethers.provider.HttpProvider('https://rinkeby.infura.io');
//     let provider = ethers.getDefaultProvider();
//     // // let provider = new ethers.providers.AlchemyProvider("rinkeby","https://eth-rinkeby.alchemyapi.io/v2/O4BLMcSMxBtWxAbrr75GTv81pmZSX-kt");
//     // let signer = provider.getSigner();
//     let nftContract = new ethers.Contract(contractAddress, abi,provider);
//     let count = await nftContract.balanceOf(address);
//     console.log(count)
// }

app.post("/login",async (req,res)=>{
    const {signature,address,count} = req.body
    const hash = await ethers.utils.keccak256(address+count)
    const recoveredAddress = ethers.utils.verifyMessage(ethers.utils.arrayify(hash), signature)
    console.log(signature,address,count,recoveredAddress)
    if(recoveredAddress.toLowerCase()==address.toLowerCase()){
        console.log('tasdf')
         res.json(true)
    }else{
        res.json(false)
    }
  })

app.listen(port, () => console.log(`Listening on port ${port}`));
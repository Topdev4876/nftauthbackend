const {Shopify} =require('@shopify/shopify-api') ;
const express = require('express');
const cors = require('cors')
const { ethers } = require("ethers");
// const { DataType }=require('@shopify/shopify-api')
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

// const client = new Shopify.Clients.Rest('testtesttest111a.myshopify.com', "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");


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
    // const data = await client.post({
    //   path: 'customers',
    //   data: {"customer":{"first_name":"Steve","last_name":"Lastnameson","email":"steve.lastnameson@example.com","phone":"+15142546011","verified_email":true,"addresses":[{"address1":"123 Oak St","city":"Ottawa","province":"ON","phone":"555-1212","zip":"123 ABC","last_name":"Lastnameson","first_name":"Mother","country":"CA"}]}},
    //   type: DataType.JSON,
    // });
    // console.log(data , "data______________________")
  })

app.listen(port, () => console.log(`Listening on port ${port}`));
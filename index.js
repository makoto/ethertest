const { ethers } = require("ethers");
const url = `https://ropsten.infura.io/v3/${process.env.API_KEY}`
console.log({url})
const provider = new ethers.providers.JsonRpcProvider(url);
async function main(){
    const block = await provider.getBlock()
    console.log({block:block.number})
    let resolver1 = await provider.getResolver('1.offchainexample.eth')
    console.log({block:block.number, offchainresolver:resolver1.address})
    let resolver2 = await provider.getResolver('makoto.hatch.eth')
    console.log({block:block.number, makotohatchresolver:resolver2.address})
    let address1 = await provider.resolveName('1.offchainexample.eth')
    console.log({block:block.number, offchainaddress:address1})
    let address2 = await provider.resolveName('makoto.hatch.eth')
    console.log({block:block.number, makotohatchaddress:address2})
}

main()

/* output
~/.../tmp/ether $node index.js 
{ block: 14418757 }
{
  block: 14418757,
  offchainresolver: '0xC1735677a60884ABbCF72295E88d47764BeDa282'
}
{ block: 14418757, makotohatchresolver: null }
{
  block: 14418757,
  offchainaddress: '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5'
}
{ block: 14418757, makotohatchaddress: null }
*/

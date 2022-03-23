const { ethers } = require("ethers");
const { Resolver } = require('@ensdomains/ens-contracts') 
const { hash } = require('@ensdomains/eth-ens-namehash')

const url = `https://ropsten.infura.io/v3/${process.env.API_KEY}`
// console.log({url})
const provider = new ethers.providers.JsonRpcProvider(url);

function getResolverContract(address, provider){
  return new ethers.Contract(address, Resolver, provider)
}

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
    resolver1contract = getResolverContract(address1, provider) 
    let addr11 = await resolver1contract['addr(bytes32)'](hash('1.offchainexample.eth'), {ccipReadEnabled:true})
    console.log({addr11})
}

main()

/* output

node index.js 
{
  url: 'https://ropsten.infura.io/v3/2a2262de759044bf885ee7e2b0a8723f'
}
{ block: 12126983 }
{
  block: 12126983,
  offchainresolver: '0x323401A92457Ac110d48aED5C8f020Ee3F8BF2D1'
}
{
  block: 12126983,
  makotohatchresolver: '0x8fc4C380c5d539aE631daF3Ca9182b40FB21D1ae'
}
{
  block: 12126983,
  offchainaddress: '0xb8c2C29ee19D8307cb7255e1Cd9CbDE883A267d5'
}
{
  block: 12126983,
  makotohatchaddress: '0x0Bc0035cE036984749Fd22978394734B89690b5e'
}
(node:11453) UnhandledPromiseRejectionWarning: Error: call revert exception [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method="addr(bytes32)", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.6.0)
    at Logger.makeError (/Users/makoto/work/ens/tmp/ether/node_modules/@ethersproject/logger/lib/index.js:233:21)
    at Logger.throwError (/Users/makoto/work/ens/tmp/ether/node_modules/@ethersproject/logger/lib/index.js:242:20)
    at Interface.decodeFunctionResult (/Users/makoto/work/ens/tmp/ether/node_modules/@ethersproject/contracts/node_modules/@ethersproject/abi/lib/interface.js:382:23)
    at Contract.<anonymous> (/Users/makoto/work/ens/tmp/ether/node_modules/@ethersproject/contracts/lib/index.js:395:56)
    at step (/Users/makoto/work/ens/tmp/ether/node_modules/@ethersproject/contracts/lib/index.js:48:23)
    at Object.next (/Users/makoto/work/ens/tmp/ether/node_modules/@ethersproject/contracts/lib/index.js:29:53)
    at fulfilled (/Users/makoto/work/ens/tmp/ether/node_modules/@ethersproject/contracts/lib/index.js:20:58)
    at processTicksAndRejections (internal/process/task_queues.js:95:5)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:11453) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:11453) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.


*/

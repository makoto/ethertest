const { ethers } = require("ethers");
const IExtendedResolver = require('@ensdomains/offchain-resolver-contracts/artifacts/contracts/IExtendedResolver.sol/IExtendedResolver.json').abi
const { Resolver } = require('@ensdomains/ens-contracts') 
const { hash } = require('@ensdomains/eth-ens-namehash')

const url = `https://ropsten.infura.io/v3/${process.env.API_KEY}`
// console.log({url})
const provider = new ethers.providers.JsonRpcProvider(url);

function getResolverContract(address, provider){
  return new ethers.Contract(address, [...IExtendedResolver,...Resolver], provider)
}

async function getRecord(name){
  let resolver = await provider.getResolver(name)
  let resolveName = await provider.resolveName(name)
  let resolverContract = getResolverContract(resolver.address, provider)
  console.log({hashname:hash(name), resolverContract})
  let address = await resolverContract['addr(bytes32)'](hash(name), {ccipReadEnabled:true})
  // let calldata = '0x3b3b57de1c9fb8c1fe76f464ccec6d2c003169598fdfcbcb6bbddf6af9c097a39fa0048c'
  // let address = await resolverContract['resolve'](hash(name), calldata, {ccipReadEnabled:true})
  // let address = await resolver.getAddress()
  // let address0 = await resolver.getAddress(0)
  // let email = await resolver.getText('email')
  return({
    name,
    // resolverAddress:resolver.address,
    resolveName,
    address,
    // address0,
    // email
  })
}

async function main(){
    const block = await provider.getBlock()
    console.log({block:block.number})
    console.log(await getRecord('1.offchainexample.eth'))
    // console.log(await getRecord('makoto.hatch.eth'))
    // resolver2contract = getResolverContract(address2, provider) 
    
    // let addr22 = await resolver1contract['text'](hash('makoto.hatch.eth'), 'email', {ccipReadEnabled:true})
    // // let addr11 = await resolver1contract['addr(bytes32)'](hash('makoto.hatch.eth'), {ccipReadEnabled:true})
    // console.log({addr22})
    // let addr11 = await resolver1contract['text'](hash('1.offchainexample.eth'), 'email', {ccipReadEnabled:true})
    // console.log({addr11})
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

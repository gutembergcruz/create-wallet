const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

const network = bitcoin.networks.testnet

const path = `m/49'/1'/0'/0`

let minemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(minemonic)

let root = bip32.fromSeed(seed, network)

let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Carteira gerada")
console.log("Endereço:", btcAddress)
console.log("Chave privada:", node.toWIF())
console.log("Seed", minemonic)
const HDWalletProvider = require('truffle-hdwallet-provider');

const TESTNET_MNEMONIC="mutual police craft smoke welcome wait gossip bid toward runway exact sort"

const {
  INFURA_API_KEY,
} = process.env;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 7545,
      network_id: "*",
      gas: 6712390
    },
    test: {
      provider: new HDWalletProvider(TESTNET_MNEMONIC, `https://ropsten.infura.io/${INFURA_API_KEY}`),
      gas: 1800000,
      gasPrice: 12000000000,
      network_id: 3
    },
  }
};

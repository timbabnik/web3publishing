require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/C3B22DW-WlW_J0xdDCASSMsDnlvLKTVP",
      accounts: ["750340a0434805be897250489e813fa4ada53c2eff8b13f0a9f6888a5c4cfc41"],
    },
  },
  etherscan: { 
    apiKey: "DHU424T6CSH4ZXP2JH82V36JBTDX1B3KE7"
  },
  solidity: "0.8.17",
};

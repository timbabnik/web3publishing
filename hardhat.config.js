require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config()



/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 31337,
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/mKlWQflwnRw-lMHtYJWo9UzOVEoSEjPx",
      accounts: ["750340a0434805be897250489e813fa4ada53c2eff8b13f0a9f6888a5c4cfc41"],
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/2lsEqXNJ2e7Jldpx6pQVg1F6kKiBL6w1",
      accounts: [process.env.PRIVKEY],
    },
    optimismgoerli: {
      url: "https://opt-goerli.g.alchemy.com/v2/-v8z2Cq6_SKPERDEcijPiXg3PkCp0mxm",
      accounts: ["8fec11163af84335c33a78d877c39f652b3641f414cef4360d387cd7de8a104d"],
    },
    mainnet: {
      url: "https://opt-mainnet.g.alchemy.com/v2/9CenLePRunzrXpL9Xl1HxhthE5QMQijE",
      accounts: [process.env.PRIVKEY]
    }
  },
  etherscan: { 
    apiKey: "X63ZQVE3XEMJI75W5T977SWEIAICW8FU8I"
  },
  solidity: "0.8.19",
  gas: 2100000,
   gasPrice: 8000000000,
};

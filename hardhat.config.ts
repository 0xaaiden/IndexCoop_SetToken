import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "@chainlink/hardhat-chainlink";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    tenderly: {
      url: "https://rpc.tenderly.co/fork/" + process.env.TENDERLY_FORK_ID,
      accounts: [process.env.PRIVATE_KEY || ""],
      chainId: 1,
    },
    forking: {
      url: "https://rpc.tenderly.co/fork/" + process.env.TENDERLY_FORK_ID || "",
      accounts: [process.env.PRIVATE_KEY || ""],
    },
  },
};

export default config;

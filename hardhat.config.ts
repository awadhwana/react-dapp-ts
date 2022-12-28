import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    networks: {
        hardhat: {},
        goerli: {
            url: "https://eth-goerli.alchemyapi.io/v2/123abc123abc123abc123abc123abcde",
        }
    },
    solidity: "0.8.17",
};

export default config;

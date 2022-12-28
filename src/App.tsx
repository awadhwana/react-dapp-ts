import React, {useEffect} from 'react';
import './App.css';
import {Container} from "react-bootstrap";
import {Network, Alchemy} from 'alchemy-sdk';
import NFTList, {NFTListProps} from "./components/NFTList";

const {REACT_APP_ALCHEMY_KEY} = process.env;
const settings = {
    apiKey: REACT_APP_ALCHEMY_KEY,
    network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);


console.log(`Hi`)
function App() {
    useEffect(()=> {
        const latestBlock = alchemy.core.getBlockNumber();
        latestBlock.then((num) => console.log(num));
    },[])

    const nftListProps: NFTListProps = {connection: alchemy}
    return (
        <Container className="p-3">
            <Container className="p-5 mb-4 bg-light rounded-3">
                <NFTList {...nftListProps}></NFTList>
            </Container>
        </Container>
    );
}

export default App;

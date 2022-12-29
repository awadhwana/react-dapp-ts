import {Alchemy, OwnedNft} from "alchemy-sdk";
import Card from 'react-bootstrap/Card';
import React, {useEffect, useState} from "react";
import {Col, Container, Row} from "react-bootstrap";
import CardGroup from "react-bootstrap/CardGroup";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export interface NFTListProps {
    connection: Alchemy
}

type NFTDetails = {
    contractAddress: string
    imageURI: string
    name: string
    openSeaURI: string
    tokenID: string
    tokenType: string
    tokenURI: string
};

const newNftDetails = (nft: OwnedNft) => {
    const nftDetails: NFTDetails = {
        contractAddress: nft.contract.address,
        imageURI: nft.rawMetadata?.image || '',
        name: nft.rawMetadata?.name || 'unknown',
        openSeaURI: `https://testnets.opensea.io/assets/goerli/${nft.contract.address}/${nft.tokenId}`,
        tokenID: nft.tokenId,
        tokenType: nft.tokenType,
        tokenURI: nft.tokenUri?.raw || '',
    }

    return nftDetails
}

function NFTList(props: NFTListProps) {
    const [allNfts, setAllNfts] = useState<NFTDetails[]>();
    const [totalNFTs, setTotalNFTs] = useState(0);
    const [publicKey, setPublicKey] = useState(``);

    useEffect(() => {
        const getAllNfts = async () => {
            if (publicKey !== '') {
                const ownerNFTs = await props.connection.nft.getNftsForOwner(publicKey);
                setTotalNFTs(ownerNFTs.totalCount)
                setAllNfts(ownerNFTs.ownedNfts.map(newNftDetails))
            }
        }

        getAllNfts()

        return () => {
            // this now gets called when the component unmounts
        };

    }, [publicKey, props.connection]);

    // @ts-ignore
    const onSubmit = (event) => {
        setPublicKey(event.target.publicKey.value);
        event.preventDefault()
    };


    return (
        <CardGroup>
            <Container>
                <h3  className="mb-3">Total NFTs: {totalNFTs}</h3>
                <br/>
                <Form onSubmit={onSubmit}>
                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <Col sm="8">
                            <Form.Control type="text" name="publicKey" placeholder="0x74F98024d3317202dCe4FDd7d618486a4b89A0a1"/>
                        </Col>
                        <Col sm="4">
                            <Button variant="outline-primary" type="submit">Submit</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <br/>
                <Row xs={1} md={3} className="g-4">
                    {allNfts?.map((nft, idx) => (
                        <Col key={idx}>
                            <Card style={{width: '20rem'}}>
                                <Card.Img variant="top" src={nft.imageURI} height="300" width="300"/>
                                <Card.Header as="h5">{nft.tokenID}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{nft.name} : {nft.tokenType}</Card.Title>
                                    <Card.Text>{nft.contractAddress}</Card.Text>
                                    <Card.Link target="_blank" href={nft.openSeaURI}>OpenSea</Card.Link>
                                    <Card.Link target="_blank" href={nft.tokenURI}>Metadata</Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </CardGroup>
    );
}

export default NFTList

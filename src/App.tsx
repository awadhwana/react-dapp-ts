import React from 'react';
import './App.css';
import GroupExample from "./components/CardGroup";
import {Container} from "react-bootstrap";

function App() {
    return (
        <Container className="p-3">
            <Container className="p-5 mb-4 bg-light rounded-3">
                <GroupExample/>
            </Container>
        </Container>
    );
}

export default App;

import CardGroup from 'react-bootstrap/CardGroup';
import SCard from "./SCard";
import {Col, Container, Row} from "react-bootstrap";

function GroupExample() {
    return (
        <CardGroup>
            <Container>
                <Row>
                    <Col>
                        <SCard></SCard>
                    </Col>
                    <Col>
                        <SCard></SCard>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <SCard></SCard>
                    </Col>
                    <Col>
                        <SCard></SCard>
                    </Col>
                </Row>
            </Container>

        </CardGroup>
    );
}

export default GroupExample;

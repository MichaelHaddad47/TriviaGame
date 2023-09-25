import Game from './gameSections/Game'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import GameRules from './gameSections/GameRules';
import Leaderboard from './gameSections/Leaderboard';
import OpeningPage from './gameSections/OpeningPage';

function PageTrivia() {
    return (
        <Row>
            <OpeningPage />

            <Col sm="6" md="7" lg="8" xl="9" xxl="10">
                <GameRules />
            </Col>
            <Col sm="6" md="5" lg="4" xl="3" xxl="2">
                <Leaderboard />
            </Col>
            <Col>
                <Game />
            </Col>
        </Row>
    );

}

export default PageTrivia;

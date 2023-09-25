import Card from 'react-bootstrap/Card'

export default function GameRules() {
    return (
        <Card className='ms-3 my-2 me-3 me-sm-0'>
            <Card.Body>
                <h5 className="card-title">Game Rules</h5>
                <p className="card-text">Easy = +1 ⭐</p>
                <p className="card-text">Medium = +3 ⭐</p>
                <p className="card-text">Hard = +5 ⭐</p>
                <p className="card-text">Reach 15 ⭐ to win!!</p>
            </Card.Body>
        </Card>
    )
}
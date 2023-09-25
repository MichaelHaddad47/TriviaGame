import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function OpeningPage() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <Container fluid className="h-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={10} md={8} lg={6} xl={4}>
          <Modal
            show={show}
            onHide={handleClose}
            size="xl"
            centered
            contentClassName="rounded-lg border-0"
          >
            <div className="p-4">
              <h2 className="text-center mb-4">TRIVIA game</h2>
              <p className="text-center mb-4">Are you ready to test your knowledge?</p>
              <div className="text-center">
                <Button 
                    variant="light" 
                    onClick={handleClose}
                    style={{
                        backgroundColor: 'beige',
                        border: '2px solid darkgoldenrod',
                        borderRadius: '50px', // Making it oval
                        fontFamily: '"Arial Black", Gadget, sans-serif',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Adding some shadow for depth
                        fontSize: '18px',
                        fontWeight: 'bold',
                        transition: '0.3s ease',
                    }}
                    className="px-4 py-2" // padding to make it look proportionate
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'; // Slightly increase size on hover
                        e.currentTarget.style.boxShadow = '0px 6px 12px rgba(0, 0, 0, 0.15)'; // Increase shadow on hover
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'; // Reset size on mouse out
                        e.currentTarget.style.boxShadow = '0px 4px 8px rgba(0, 0, 0, 0.1)'; // Reset shadow on mouse out
                    }}
                        >
                            Play game
                        </Button>
                    </div>
                </div>
            </Modal>
        </Col>
    </Row>
</Container>

  );
}

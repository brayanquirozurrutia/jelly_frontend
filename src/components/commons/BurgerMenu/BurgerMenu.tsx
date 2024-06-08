import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons';

function BurgerMenu() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="link" onClick={handleShow} className="text-black p-0">
                <FontAwesomeIcon icon={faBars} size="2x" />
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                <FontAwesomeIcon icon={faChevronDown} /> Opción 1
                            </Accordion.Header>
                            <Accordion.Body>
                                Submenú 1
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                <FontAwesomeIcon icon={faChevronDown} /> Opción 2
                            </Accordion.Header>
                            <Accordion.Body>
                                Submenú 2
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>
                                <FontAwesomeIcon icon={faChevronDown} /> Opción 3
                            </Accordion.Header>
                            <Accordion.Body>
                                Submenú 3
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default BurgerMenu;

// TODO: VER CÓMO OBTENER LAS OPCIONES DEL MENÚ

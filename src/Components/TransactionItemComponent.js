import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Modal } from "react-bootstrap";
import { DeleteTransaction, EditTransaction } from "../Actions/TransactonAction";
import PaymentMethodIcon from "./PaymentMethodIcon";

const styles = {
    td: {
        border: '1px solid gray',
        padding: '5px',
        fontSize: '18px',
    },
    icon: {
        textAlign: 'center',
        fontSize: '28px',
        padding: '0px',
    },
    edit: {
        border: '1px solid #6c757d',
        borderRadius: '3px',
        margin: '2px',
        backgroundColor: 'lightskyblue',
    },
    delete: {
        border: '1px solid #6c757d',
        borderRadius: '3px',
        margin: '2px',
        backgroundColor: 'mistyrose',
    },
    sum: {
        border: '1px solid gray',
        padding: '5px',
        fontSize: '18px',
        color: 'red',
    },
}

const TransactionItemComponent = (props) => {

    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const dispatch = useDispatch();

    const deleteTransaction = () => dispatch(DeleteTransaction(props.transaction.id));

    const editTransaction = () => dispatch(EditTransaction(props.transaction.id));

    return (
        <tr>
            <td className="text-center" style={styles.td}>
                {props.index}
            </td>
            <td style={styles.td}>
                {props.transaction.date}
            </td>
            <td style={ {...styles.td, ...styles.icon} }>
                <PaymentMethodIcon payment={ props.transaction.payment }/>
            </td>
            <td className="text-center" style={styles.td}>
                {props.transaction.description}
            </td>
            <td className="text-center" style={styles.sum}>
                {props.transaction.sum}
            </td>
            <td className="text-center" style={styles.td}>
                <Button variant="light" size="sm"
                    onClick={ editTransaction }
                    style={styles.edit}>
                    Edit
                </Button>
            </td>  
            <td className="text-center" style={styles.td}>
                <Button variant="light" size="sm"
                    onClick={ () => setShowModal(true) }
                    style={styles.delete}>
                    Delete
                </Button>

                <Modal show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete the transaction</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <p>Are you sure you want to delete the transaction?</p>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                            onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary"
                            onClick={deleteTransaction}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

            </td>    
        </tr>

    )
}

export default TransactionItemComponent;
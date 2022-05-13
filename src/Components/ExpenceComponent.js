import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Button, Dropdown,
    InputGroup, FormControl,
    DropdownButton, Modal, } from 'react-bootstrap';
import moment from "moment";

import TransactionListComponent from "./TransactionListComponent";
import { SaveBudget, SavePeriod, ChangePayment } from "../Actions/TransactonAction";
import { PAYMENT_OBJECT } from '../Constants/Constants';


const styles = {
    title: {
        fontSize: '34px',
        margin: '10px',
    },
    dropdown: {
        fontSize: '18px',
    },
    general: {
        fontSize: '18px',
        padding: '1px 5px',
    },
    sum: {
        fontSize: '18px',
        width: '100px',
        color: 'red',
        textAlign: 'center',
    },
    month: {
        fontSize: '18px',
        width: '140px',
        color: 'red',
        textAlign: 'center',
    },
    save: {
        backgroundColor: '#e9ecef',
        color: '#212529',
        fontSize: '18px',
    },
    group: {
        display: 'flex',

    },
    modal: {
        fontSize: '18px',
    },
    modalTitle: {
        fontSize: '20px',
    }
}

const ExpenseComponent = () => {

    const currentBudget = useSelector(state => state.budget); 

    const currentPeriod = useSelector(state => state.period);
    let formatedPeriod = moment(currentPeriod).format('MM/YYYY');
    console.log(formatedPeriod);

    const [showModal, setShowModal] = useState(true);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true); //TODO: is need?

    const filterPayment = useSelector(state => state.filterPayment);

    const ChangePaymentLocal = (param) => dispatch(ChangePayment(param)); //TODO: what does do?

    const dispatch = useDispatch();

    const saveBudget = (e) => {
        dispatch(SaveBudget(e));     
    }

    const savePeriod = (e) => {
        dispatch(SavePeriod(e));
    }

    return (
        <div>
            <div className="d-flex flex-column align-items-center">
                <div style={ styles.title }>
                    Expense Tracker
                </div>
                <div className="d-flex align-items-center my-2">
                    <InputGroup className="mx-5">
                        <InputGroup.Text style={ styles.general }>
                            Month:
                        </InputGroup.Text>
                        <FormControl style={ styles.month }
                            aria-label="date"
                            name="date"
                            value={ currentPeriod }
                            type="month"
                            onChange={e => savePeriod(e.target.value)}
                        />

                        <DropdownButton 
                            variant="outline-secondary"
                            title="Save"
                            id="input-group-dropdown-2"
                            align="end"
                            >
                            <Dropdown.Item href="#">Select day</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="#">January</Dropdown.Item>
                            <Dropdown.Item href="#">February</Dropdown.Item>
                            <Dropdown.Item href="#">March</Dropdown.Item>
                        </DropdownButton>
                    </InputGroup>

                    <InputGroup className="mx-5 w-auto flex-nowrap" style={ styles.group} >
                        <InputGroup.Text style={ styles.general } >
                            Budget:
                        </InputGroup.Text>
                        <FormControl style={ styles.sum }
                            aria-label="Amount"
                            name="budget"
                            value={ currentBudget }
                            type="number" step="0.01"
                            onChange={e => saveBudget(e.target.value)}
                        />
                        <Button 
                            variant="outline-secondary"
                            align="end">
                                Save
                        </Button>
                    </InputGroup>

                    <DropdownButton align="end" className="mx-5"
                        onSelect={ ChangePaymentLocal }
                        style={ styles.dropdown }
                        title={ PAYMENT_OBJECT?.[filterPayment] ?? "Select payment method" }
                        id="dropdown-menu-align-end"
                        variant="outline-secondary">
                        <Dropdown.Item eventKey="all"
                            style={ styles.dropdown }>
                            All
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="mastercard"
                            style={ styles.dropdown }>
                            Mastercard
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="visa"
                            style={ styles.dropdown }>
                            Visa
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="amex"
                            style={ styles.dropdown }>
                            American Express
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="checks"
                            style={ styles.dropdown }>
                            Checks
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="cash"
                            style={ styles.dropdown }>
                            Cash
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="other"
                            style={ styles.dropdown }>
                            Other
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
                    {showModal &&
                    <Modal.Dialog>
                        <Modal.Header closeButton onHide={ handleClose }>
                            <Modal.Title style={styles.modalTitle}>
                                Please select:
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div style={styles.modal}>
                                Your budget, month and payment method
                            </div>
                        </Modal.Body>
                    </Modal.Dialog>
                    }
            </div>
            <TransactionListComponent />
        </div>
    )
}

export default ExpenseComponent;

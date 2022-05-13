import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, InputGroup, FormControl, Dropdown } from "react-bootstrap";
import moment from "moment";
import { AddTransaction, ChangeExistingTransaction } from "../Actions/TransactonAction";
import { PAYMENT_OBJECT } from '../Constants/Constants';

const styles = {
    form: {
        fontSize: '18px',
    },
    save: {
        fontSize: '18px',
        backgroundColor: '#e9ecef',
        color: '#212529',
    },
    payment: {
        border: '1px solid #6c757d',
        fontSize: '18px',
        backgroundColor: '#e9ecef',
        color: '#212529',
    }
}

const AddTranactionForm = (props) => {

    let transactionObject = useSelector(state => state.transactionList.find(el => el.id === state.editTransaction));
    console.log(transactionObject);

    let initialDate = '';
    if (transactionObject) {
        initialDate = moment(transactionObject.date,'DD/MM/YYYY').format('YYYY-MM-DD');
    }

    const [date, setDate] = useState(initialDate);
    const [description, setDescription] = useState(transactionObject?.description ?? '');
    const [sum, setSum] = useState(transactionObject?.sum ?? '');
    const [payment, setPayment] = useState(transactionObject?.payment ?? 'other');
    const [error, setError] = useState('');

    const filterPayment = useSelector(state => state.filterPayment);

    const editTransaction = useSelector(state => state.editTransaction);

    const dispatch = useDispatch();

    const validate = () => {
        let error = '';

        if (!date) {
            error = 'Date cannot be blank';
        }

        if (!description) {
            error = 'Description cannot be blank';
        }

        if (!sum) {
            error = 'Sum cannot be blank';
        }

        if (error) {
            setError(error)
            return false;
        }

        return true;
    }

    const save = (e) => {
        e.preventDefault();

        const isValid = validate();
        if (!isValid) {
            return
        }

        let formatedDate = moment(date).format('DD/MM/YYYY');

        let addedTransaction = {
            //id: editTransaction ?? new Date().getTime(), //for Local Store only
            payment: payment,
            date: formatedDate,
            description: description,
            sum: +sum,
        }

        console.log(editTransaction)

        if (!editTransaction) {
        dispatch(AddTransaction(addedTransaction));
            props.close()
        } else {
            dispatch(ChangeExistingTransaction(addedTransaction))   
        }

        setDate('');
        setDescription('');
        setSum('');
        setError('');
    }

    console.log(date)
    return (
        <div>
            <div className="my-3">
                <InputGroup className="mb-3" >

                    <Dropdown className="mx-2"
                        onSelect={ (param) => setPayment(param) }>
                        <Dropdown.Toggle variant="light" 
                            id="dropdown-basic"
                            style={ styles.payment }>
                            { payment }
                        </Dropdown.Toggle>

                        <Dropdown.Menu style={styles.form}>
                            <Dropdown.Item eventKey="all">All</Dropdown.Item>
                            <Dropdown.Item eventKey="mastercard">Mastercard</Dropdown.Item>
                            <Dropdown.Item eventKey="visa">Visa</Dropdown.Item>
                            <Dropdown.Item eventKey="amex">American Express</Dropdown.Item>   
                            <Dropdown.Item eventKey="checks">Checks</Dropdown.Item>  
                            <Dropdown.Item eventKey="cash">Cash</Dropdown.Item> 
                            <Dropdown.Item eventKey="other">Other</Dropdown.Item> 
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* <InputGroup.Text style={styles.form}>
                        { PAYMENT_OBJECT?.[filterPayment] }
                    </InputGroup.Text> */}

                    <FormControl aria-label="date"
                        name="date"
                        placeholder="Enter the date"
                        value={date}
                        type="date" step='1'
                        style={styles.form}
                        onChange={e => setDate(e.target.value)}
                    />

                    <FormControl aria-label="description"
                        name="description"
                        placeholder="Enter description"
                        value={description}
                        type="text"
                        style={styles.form}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <FormControl aria-label="sum"
                        name="sum"
                        placeholder="Enter the sum"
                        value={sum}
                        type="number" step="0.01"
                        style={styles.form}
                        onChange={e => setSum(e.target.value)}
                    />
                    <Button variant="outline-secondary" id="button-addon2"
                        style={styles.save}
                        onClick={ save }>
                        Save
                    </Button>
                </InputGroup>

                <div data-testid="error-element"
                    style={{ fontSize: 14, color: 'red' }}>
                    {error}
                </div>
            </div>

        </div>
    )
}

export default AddTranactionForm;

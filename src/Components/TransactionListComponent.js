import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "react-bootstrap";
import moment from "moment";
import TransactionItemComponent from "./TransactionItemComponent";
import AddTransactionForm from './AddTransactionForm';
import { PAYMENT_OBJECT } from '../Constants/Constants';

const styles = {
    table: {
        margin: '10px',
        borderCollapse: 'collapse',
        height: '100%',
    },
    th: {
        border: '1px solid gray',
        borderRadius: '2px',
        padding: '5px',
        textAlign: 'center',
        fontSize: '18px',
    },
    total: {
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '0 10px',
        marginBottom: '20px',
    },
    paid: {
        fontSize: '18px',
        
    },
    span: {
        fontSize: '20px',
        color: 'red',
        margin: '10px',
    },
    button: {
        border: '1px solid #6c757d',
        borderRadius: '3px',
        margin: '2px',
        backgroundColor: 'rgb(233, 236, 239)',
    },
}

const TransactionListComponent = () => {

    const [addTransaction, setAddTransaction] = useState(false);

    const currentPeriod = useSelector(state => state.period);
    let formatedPeriod = moment(currentPeriod).format('MM/YYYY');

    const filteredTransactions = useSelector(state => state.transactionList.filter(el => 
        (el.payment === state.filterPayment || state.filterPayment === 'all') && 
        moment(el.date, 'DD/MM/YYYY').format('MM/YYYY') === formatedPeriod)); // 1-st part what does it mean?

    const monthlyTransactionList = useSelector(state => state.transactionList.filter(el => 
        moment(el.date, 'DD/MM/YYYY').format('MM/YYYY') === formatedPeriod));
    
        const budget = useSelector(state => state.budget);

    const editTransaction = useSelector(state => state.editTransaction);

    const filterPayment = useSelector(state => state.filterPayment);

    let total = +(monthlyTransactionList.reduce((acc, curr) => acc + curr.sum , 0)).toFixed(2);

    let paidBy = +(filteredTransactions.reduce((acc, curr) => acc + curr.sum , 0)).toFixed(2);

    let restBudget = +(budget - total).toFixed(2); 

    if (!filterPayment) { // what does it mean?
        return ''
    }

    return (
         
        <div className="d-flex flex-column align-items-center my-4">
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>NN</th>
                        <th style={styles.th}>Date</th>
                        <th style={styles.th}>Payment</th>
                        <th style={styles.th}>Description</th>
                        <th style={styles.th}>Sum</th>
                        <th style={styles.th} colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map((el, i) =>
                        <TransactionItemComponent key={ el.id }
                            transaction={el} index={i + 1} />
                    )}
                </tbody>
            </table>
            <div className="d-flex align-items-center my-1"
                style={styles.paid}>
                    Paid by { PAYMENT_OBJECT?.[filterPayment] }:
                    <span style={styles.span}>
                        { paidBy }
                    </span>
                </div>
            <div className="d-flex align-items-center my-1">
                <div style={styles.total}>
                    Total paid:
                    <span style={styles.span}>
                        { total }
                    </span>
                </div>
                <div style={styles.total}>
                    Rest budget:
                    <span style={styles.span}>
                        { restBudget }
                    </span>
                </div>

            </div>

            {addTransaction || editTransaction ?
                <AddTransactionForm close={() => setAddTransaction(false)} /> 
                :
                <Button className="mx-5"
                    style={styles.button}
                    variant={'light'}
                    onClick={() => setAddTransaction(true)}> 
                    Add
                </Button>
            }

        </div>
    )
}

export default TransactionListComponent;

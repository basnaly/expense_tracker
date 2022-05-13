import axios from 'axios';
import { env } from '../env';
import { FETCH_EXPENSE_REQUEST, FETCH_EXPENSE_SUCCESS, FETCH_EXPENSE_FAILURE} from '../Constants/Constants';

const API_KEY = env.firebase;

export const ChangePayment = payment => {
    return {
        type: 'CHANGE_PAYMENT',
        payment
    }
}

export const SaveBudget = budget => {
    return {
        type: 'SAVE_BUDGET',
        budget
    }
}

export const SavePeriod = period => {
    return {
        type: 'SAVE_PERIOD',
        period
    }
}

export const EditTransaction = id => {
    return {
        type: 'EDIT_TRANSACTION',
        id
    }
}

export const ChangeExistingTransaction = transactionObject => {
    return (dispatch, getState) => {
        const id = getState().editTransaction;
        dispatch(fetchExpenseRequest())
        axios.put(`https://learn-266e7-default-rtdb.firebaseio.com/expenseTracker/${ id }.json?auth=${API_KEY}`, transactionObject)
            .then(response => {
                console.log(response)
                dispatch({type: 'CHANGE_EXISTING_TRANSACTION'})
            })
            .catch(error => {
                const errorMessage = error.message
                console.log(errorMessage)
            })
            .finally( () => {
                dispatch(fetchExpense())
            })
    }
}

export const DeleteTransaction = id => {
    return (dispatch) => {
        dispatch(fetchExpenseRequest())
        axios.delete(`https://learn-266e7-default-rtdb.firebaseio.com/expenseTracker/${ id }.json?auth=${API_KEY}`)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                const errorMessage = error.message
                console.log(errorMessage)
            })
            .finally( () => {
                dispatch(fetchExpense())
            })
    }
}

export const AddTransaction = addTransaction => {
    return (dispatch) => {
        dispatch(fetchExpenseRequest())
        axios.post(`https://learn-266e7-default-rtdb.firebaseio.com/expenseTracker.json?auth=${API_KEY}`,addTransaction)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                const errorMessage = error.message
                console.log(errorMessage)
            })
            .finally( () => {
                dispatch(fetchExpense())
            })
    }
}

export const fetchExpenseRequest = () => {
    return {
        type: FETCH_EXPENSE_REQUEST
    }
}

export const fetchExpenseSuccess = expenseData => {
    return {
        type: FETCH_EXPENSE_SUCCESS,
        expenseData
    }
}

export const fetchExpenseFailure = error => {
    return {
        type: FETCH_EXPENSE_FAILURE,
        error
    }
}

export const fetchExpense = () => {
    return (dispatch) => {
        dispatch(fetchExpenseRequest())
        axios.get(`https://learn-266e7-default-rtdb.firebaseio.com/expenseTracker.json?auth=${API_KEY}`)
            .then(response => {
                const expenseData = response.data
                dispatch(fetchExpenseSuccess(expenseData))
            })
            .catch(error => {
                const errorMessage = error.message
                dispatch(fetchExpenseFailure(errorMessage))
            })
    }
}


// export const DeleteTransaction = id => {
//     return {
//         type: 'DELETE_TRANSACTION',
//         id
//     }
// }

// export const AddTransaction = addTransaction => {
//     return {
//         type: 'ADD_TRANSACTION',
//         addTransaction
//     }
//}
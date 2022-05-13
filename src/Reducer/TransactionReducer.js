import moment from "moment";
import { FETCH_EXPENSE_REQUEST, FETCH_EXPENSE_SUCCESS, FETCH_EXPENSE_FAILURE} from '../Constants/Constants';


// const loadState = () => {
//     try {
//         const serialState = localStorage.getItem('transactionList');
//         const budgetLs = localStorage.getItem('budget');
//         const periodLs = localStorage.getItem('period');
//         if (serialState === null){
//             return {}
//         }
//         return {transactionList: JSON.parse(serialState),
//                 budget: budgetLs, period: periodLs};
//     } catch (err) {
//         return {};
//     }
// };

// const transactionListFromLs = loadState();
// console.log(transactionListFromLs)

const period = '05/2022';
let formatedPeriod = moment().format('YYYY-MM');

const initState = {
    filterPayment: undefined, 
    period: formatedPeriod,
    budget: 5000.00,
    editTransaction: undefined,
    loading: false,
    error: '',
    transactionList: [],
    // ...transactionListFromLs,
}

const TransactionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_PAYMENT':
            return {
                ...state,
                filterPayment: action.payment
            }
        case 'SAVE_BUDGET':
            return {
                ...state,
                budget: action.budget
            }
        case 'SAVE_PERIOD':
            return {
                ...state,
                period: action.period
            }

        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactionList: [...state.transactionList, action.addTransaction]
            }
        
        case 'EDIT_TRANSACTION':
            return {
                ...state,
                editTransaction: action.id
            }
        
        case 'CHANGE_EXISTING_TRANSACTION':
            return {
                ...state,
                // transactionList: state.transactionList.map(el => el.id === state.editTransaction ?
                //     action.transactionObject : el),
                editTransaction: undefined
            }

        case 'DELETE_TRANSACTION':
            let restTransactionList = state.transactionList.filter(el => {
                return el.id !== action.id
            });
            return {
                ...state,
                transactionList: restTransactionList
            }
        
        case FETCH_EXPENSE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_EXPENSE_SUCCESS:
            let loadedExpenseData = Object.keys(action.expenseData).map(el =>
                ({...action.expenseData[el], id: el})); // transform object to array
            return {
                ...state,
                loading: false,
                transactionList: loadedExpenseData
            }

        case FETCH_EXPENSE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
    
    
        default:
            return state
    }
}

export default TransactionReducer;
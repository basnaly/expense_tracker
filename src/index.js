import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { applyMiddleware, compose, createStore } from "redux";
import { Provider} from "react-redux";
import { createLogger } from 'redux-logger';
import thunk from "redux-thunk";

import "bootstrap/dist/css/bootstrap.css";
import AppExpenseTracker from './AppExpenseTracker';
import TransactionReducer from './Reducer/TransactionReducer';


// const saveState = (transactionList, budget, period) => {
//   console.log(period)
//   try {
//     const transactionListString = JSON.stringify(transactionList);
//     localStorage.setItem('transactionList', transactionListString);
//     localStorage.setItem('budget', budget);
//     localStorage.setItem('period', period);
//   } catch(err) {
//     console.log(err);
//   }
// };

const logger = createLogger({
});

const store = createStore(
  TransactionReducer,
  compose(
    applyMiddleware(logger, thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// store.subscribe(() => {
//   saveState(store.getState().transactionList, 
//             store.getState().budget, 
//             store.getState().period);
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <AppExpenseTracker />
    </Provider>   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

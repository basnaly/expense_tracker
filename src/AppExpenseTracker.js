import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import ExpenseComponent from "./Components/ExpenceComponent";
import { fetchExpense } from "./Actions/TransactonAction";

const styles = {
    div: {
        fontFamily: "'Varela Round', sans-serif",
    },
}

const AppExpenseTracker = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchExpense())
    }, [])

    return (
        <div style={ styles.div }>
            <ExpenseComponent />
        </div>
    )
}

export default AppExpenseTracker;
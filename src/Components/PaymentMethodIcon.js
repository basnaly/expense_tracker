import React from "react";

import { FaMoneyCheckAlt, 
         FaCcMastercard, 
         FaCcVisa,
         FaCcAmex
        } from 'react-icons/fa';
import { GiMoneyStack, GiGoldBar } from 'react-icons/gi';
import { GrMoney } from 'react-icons/gr';

const PaymentMethodIcon = (props) => {

    switch(props.payment){
        case 'mastercard': 
            return <FaCcMastercard color="orangered"/>

        case 'visa': 
            return <FaCcVisa color="blue"/>

        case 'amex': 
            return <FaCcAmex color="deepskyblue"/>
        
        case 'checks':
            return <FaMoneyCheckAlt color="mediumorchid"/>
        
        case 'cash':
            return <GiMoneyStack color="green"/>

        case 'other':
            return <GiGoldBar color="gold"/>

        default: 
            return ''
            
    }


}

export default PaymentMethodIcon;

import React from "react";

const styles = {
    me: {
        position: 'fixed',
        bottom: '0',
        right: '0',
        margin: '5px',
        height: '50px',
    }
}

const Me = () => {

    return (
        
        <img data-testid="sign-element" 
            style={ styles.me }
            src='https://github.com/basnaly/roman_numeric_converter/raw/main/my-photo.png'
        />
    )
}

export default Me;
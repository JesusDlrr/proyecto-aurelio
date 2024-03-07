import { Button } from '@material-tailwind/react';
import * as React from 'react';



function BuyButton() {


    const a = () => {
        window.open('/subscriptions/quicker/', '_blank', 'noreferrer');
    }
    const b = () => {
        window.open('/subscriptions/quicker/', '_blank', 'noreferrer');
    }
    // Paste the stripe-buy-button snippet in your React component
    return (
        <>
            <Button className='bg-green-700 mt-3 align-middle sm:mt-0 md:mt-0 lg:mt-0' onClick={a}>Quicker Monthly</Button>
            <Button className='bg-green-700 ml-2 mt-3 align-middle sm:mt-0 md:mt-0 lg:mt-0' onClick={b}>Quicker Yearly </Button>
        </>
        // <stripe-buy-button
        //     buy-button-id="buy_btn_1ONNM2KwKqN5WBN1vNRrBBnC"
        //     publishable-key="pk_test_4z52MZdkWrwvVbGFlPdRUIaL002t53Szbt"
        // >
        // </stripe-buy-button>
    );
}

export default BuyButton;
import React, { useState } from 'react';

import { Box, FormField, Text, TextInput } from 'grommet';
import { CreditCard, } from 'grommet-icons';

import StripeCheckoutButton from '../../stripe/stripe.component';
import './donate.styles.scss';

const DonatePage = () => {
    const [amount, setAmount]: [string, any] = useState('');

    const handleInputChange = (event) => {
        if (event.target.value === '0') {
            setAmount('1');
        } else {
            setAmount(event.target.value);
        }
    }

    const cleanAmount = () => {
        setAmount('')
    }

    return (
        <Box className="donate-box" background="white" border={{ color: 'brand', size: 'medium' }} gap="small" pad="large" width="medium">
            <h1>Oh My Dog!</h1>
            <Text>
                Thanks to our free platform, we help find a home for all signed up dogs.
        </Text>
            <Text>Join our Community today!</Text>
            <br />
            <Box direction='row' className="my-profile" background="white" pad="small" width="medium">
                <FormField className='donate-input' width='small' >
                    <TextInput min='1' type='number' maxLength={7} size='small' icon={<CreditCard />} value={amount} name='amount' reverse placeholder='GPB' onChange={handleInputChange}></TextInput>
                </FormField>
                <div className='stripe' >
                    <StripeCheckoutButton cleanAmount={cleanAmount} donation={amount} />
                </div>
            </Box>
            <h6 style={{ color: '#d6702b' }}> Please, use FAKE CARD details:
            <br />4242 4242 4242 4242 || exp: 02/22 || cvv: 123 </h6>
        </Box >
    )
}

export default DonatePage;
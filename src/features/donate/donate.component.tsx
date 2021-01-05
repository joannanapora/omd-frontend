import React, { useState } from 'react';
import { Box, FormField, Text, MaskedInput, TextInput } from 'grommet';
import { CreditCard, Money } from 'grommet-icons';
import StripeCheckoutButton from '../../stripe/stripe.component';
import CustomButton from '../../shared/custom-button/custom-button.component';
import './donate.styles.scss';

const DonatePage = () => {
    const [amount, setAmount] = useState('');
    const [donateButtons, showDonateButtons] = useState(false);

    const handleInputChange = (event) => {
        setAmount(event.target.value)
    }

    const handleDonate = () => {
        showDonateButtons(true);
    }





    return (
        <Box className="donate-box" background="white" border={{ color: 'brand', size: 'medium' }} gap="small" pad="large" width="medium">
            <h1>Oh My Dog!</h1>
            <Text>
                Thanks to our free platform, we connect dog owners with dog walkers. You can add service and undertake it yourself.
                When the owner chooses you to take care of his dog, we will enable you to contact each other!
        </Text>
            <Text>Join our Community today!</Text>
            <br />
            <Box direction='row' className="my-profile" background="white" pad="small" width="medium">
                <FormField className='donate-input' width='small'>
                    <TextInput size='small' icon={<Money />} value={amount} name='amount' reverse placeholder='GPB' onChange={handleInputChange}></TextInput>
                </FormField>
                <div className='stripe' ><StripeCheckoutButton donation={amount} /></div>
            </Box>
            <h6 style={{ color: '#d6702b' }}>Use the following credit card details:
            <br />4242 4242 4242 4242 || exp: 02/22 || cvv: 123 </h6>
        </Box >
    )
}

export default DonatePage;
import React, { useState } from 'react';
import { Box, Text } from 'grommet';
import StripeCheckoutButton from '../../stripe/stripe.component';
import { FormNextLink } from 'grommet-icons';
import { Link } from 'react-router-dom';
import CustomButton from '../../shared/custom-button/custom-button.component';
import './donate.styles.scss';

const DonatePage = () => {
    const [name, setName] = useState('Joanna')

    const price = 123

    return (
        <Box className="donate-box" background="white" border={{ color: 'brand', size: 'medium' }} gap="small" pad="large" width="medium">
            <h1>Oh My Dog!</h1>
            <Text>
                Thanks to our free platform, we connect dog owners with dog walkers. You can add service and undertake it yourself.
                When the owner chooses you to take care of his dog, we will enable you to contact each other!
        </Text>
            <Text>Join our Community today!</Text>
            <Link to='/sign-in'><h1 className='sign-in-text'>Sign In</h1></Link>
            <h6 style={{ color: 'red' }}>Use the following credit card details:
            <br />4242 4242 4242 4242 || exp: 02/22 || cvv: 123 </h6>
            <StripeCheckoutButton />
        </Box>
    )
}

export default DonatePage;
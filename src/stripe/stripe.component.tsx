import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';


import Notification, { Status } from '../shared/custom-notification/custom-notification.component';
import './stripe.styles.scss';

const StripeCheckoutButton = ({ donation }) => {

    const [notification, isNotificationVisible] = useState(false);

    const handleToken = () => {
        isNotificationVisible(true);
    }

    const publishableKey = 'pk_test_51I5qbsAzH5WZ6wWk5bFSySgNcJhsoMBalUfRP92hvr9lT2TnxrjnQn8TZqiMeyOUnL1ULpq0KYTiCXQcPAoZPxTZ00253Mx3bz';
    const donationStripe = donation * 100;


    return (
        <div className='donate' >
            <StripeCheckout
                image="https://www.flaticon.com/svg/static/icons/svg/676/676163.svg"
                name="Oh My Dog"
                description={`You are donating £${donation}`}
                label='Donate'
                panelLabel="Donate"
                amount={donationStripe}
                currency="GBP"
                stripeKey={publishableKey}
                token={handleToken}>
            </StripeCheckout>
            {notification ? (
                <Notification
                    status={Status.SUCCESS}
                    text={"Thank You for donation!"}
                ></Notification>
            ) : null}
        </div>
    );
}


export default StripeCheckoutButton;
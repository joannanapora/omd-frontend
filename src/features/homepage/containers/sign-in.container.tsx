import React from 'react';
import './sign-in.container.scss';
import CustomButton from '../components/custom-button.component'

class SignIn extends React.Component <{}, { password: any, email: any }> {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }}



        render() {
            return (
                <div className='sign-in'>
                    <CustomButton/>
                </div>
            )
        }
    
    }

export default SignIn;


import React from 'react';

import { FormField, TextArea } from 'grommet';



class WalkerPage extends React.Component<{}, { message: string }> {
    constructor(props) {
        super(props);

        this.state = {
            message: ""
        }
    }

    render() {
        return (
            <FormField htmlFor="enabled-id" name="enabled" label="">
                <TextArea name="value" placeholder="I'm the best dog walker in town because... " />
            </FormField>
        );
    }
}

export default WalkerPage;


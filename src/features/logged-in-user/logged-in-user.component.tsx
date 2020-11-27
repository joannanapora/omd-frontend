import React from 'react';
import './logged-in-user.component.scss'

import { Box, CheckBox } from 'grommet';
import OwnerPage from './owner-page.component';
import WalkerPage from './walker-page.component';


class SimpleCheckBox extends React.Component<{}, { isCheckedOwner: boolean, isCheckedWalker: boolean }> {
    constructor(props) {
        super(props);

        this.state = {
            isCheckedOwner: false,
            isCheckedWalker: false
        }
    }

    onChange = (event) => {
        if (event.target.name === "owner") {
            this.setState({
                isCheckedOwner: event.target.checked
            })
        } else {
            this.setState({
                isCheckedWalker: event.target.checked
            })
        }
    }

    render() {
        return (
            <div className="walker-owner">
                <Box align="center" pad="large">
                    <CheckBox label='Owner' name='owner' checked={this.state.isCheckedOwner} onChange={this.onChange} />
                    {this.state.isCheckedOwner ?
                        <OwnerPage /> : null
                    }
                </Box>
                <Box align="center" pad="large">
                    <CheckBox label='Walker' name='walker' checked={this.state.isCheckedWalker} onChange={this.onChange} />
                    {this.state.isCheckedWalker ?
                        <WalkerPage /> : null
                    }
                </Box>
            </div>
        );
    }
};

export default SimpleCheckBox;


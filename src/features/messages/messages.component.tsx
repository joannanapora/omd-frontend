import React from 'react';
import axios from 'axios';
import './messages.styles.scss';
import { Box, Text, Header } from 'grommet';

class Messages extends React.Component<{}, {}> {
    constructor(props) {
        super(props);

        this.state = {
        }
    };

    render() {
        return (
            <div className="messages">
                <div className="left-messages">
                    <Box
                        justify="center"
                        align="center"
                        pad="xlarge"
                        background='white'
                    >
                        <Box
                            justify="start"
                            align="start"
                            pad="small"
                            background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
                            round="medium"
                        >
                            <Text color="white">Dusty, 12.04.2021</Text>
                        </Box>
                    </Box>
                </div>
                <div className="right-messages">
                    <Box
                        justify="center"
                        align="center"
                        pad="xlarge"
                        background="linear-gradient(102.77deg, #d6702b -9.18%, #ffffff 209.09%)">
                    </Box>
                </div>
            </div>
        )
    }
}


export default Messages;
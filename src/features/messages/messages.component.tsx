import React from 'react';
import axios from 'axios';
import './messages.styles.scss';
import { Box, Button, Layer, Tab, Tabs, Text, TextArea, Header } from 'grommet';
import { Chat, ContactInfo } from 'grommet-icons';


class Messages extends React.Component<{}, { value: string }> {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        }
    };

    handleChange = (event) => {
        this.setState({ value: event.target.value })
    }

    render() {
        return (
            <div className="messages">
                <div className="messages-left">
                    <Box
                        fill>
                        <Box
                            direction="row"
                            align="center"
                            as="header"
                            elevation="small"
                            justify="between"
                            background='brand'
                            border={{ color: 'black' }}
                        >
                            <Text color='black' margin={{ left: 'small' }}>Matt Collins || service: 20-03-2020</Text>
                            <Button icon={<ContactInfo />} />
                        </Box>
                        <Box flex overflow="auto" pad="xsmall">
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>

                        </Box>
                        <Box
                            as="footer"
                            pad="small"
                            justify="end"
                            direction="row"
                            align="center"
                        >
                            <Box
                                width="large"
                                height="xxsmall"
                                border={{ color: 'brand', size: 'medium' }}
                            >
                                <TextArea resize={false} value={this.state.value} onChange={this.handleChange} fill />
                            </Box>
                            <Button secondary label="Send" />
                        </Box>
                    </Box>
                </div>
                <div className='messages-right'>
                    <Box fill>
                        <Box
                            direction="row"
                            align="center"
                            as="header"
                            elevation="small"
                            justify="between"
                            border={{ color: 'black' }}
                        >
                            <Text margin={{ left: 'small' }}>All Messages</Text>
                            <Button icon={<Chat />} />
                        </Box>
                        <Box flex overflow="auto" pad="xsmall">
                            <Box
                                margin='xsmall'
                                width={{ max: 'small' }}
                                round="small"
                                align="center"
                                justify="center"
                                background="dark-3"

                            >
                                <Text size="small" >From: Matt Collins || Dusty || service: 20-03-2020</Text>

                            </Box>
                            <Box
                                margin='xsmall'
                                height={{ min: "xsmall" }}
                                round="small"
                                align="center"
                                justify="center"
                                background="dark-3"
                            >
                                <Text size="small" >From: Matt Collins || Dusty || service: 20-03-2020</Text>
                            </Box>
                            <Box
                                margin='xsmall'
                                height={{ min: "xsmall" }}
                                round="small"
                                align="center"
                                justify="center"
                                background="dark-3"
                            >
                                <Text size="small" >From: Matt Collins || Dusty || service: 20-03-2020</Text>
                            </Box>
                            <Box
                                margin='xsmall'
                                height={{ min: "xsmall" }}
                                round="small"
                                align="center"
                                justify="center"
                                background="dark-3"
                            >
                                <Text size="small" >From: Matt Collins || Dusty || service: 20-03-2020</Text>
                            </Box>
                            <Box
                                margin='xsmall'
                                height={{ min: "xsmall" }}
                                round="small"
                                align="center"
                                justify="center"
                                background="dark-3"
                            >
                                <Text size="small" >From: Matt Collins || Dusty || service: 20-03-2020</Text>
                            </Box>
                            <Box
                                margin='xsmall'
                                height={{ min: "xsmall" }}
                                round="small"
                                align="center"
                                justify="center"
                                background="dark-3"
                            >
                                <Text size="small" >From: Matt Collins || Dusty || service: 20-03-2020</Text>
                            </Box>
                            <Box
                                margin='xsmall'
                                height={{ min: "xsmall" }}
                                round="small"
                                align="center"
                                justify="center"
                                background="dark-3"
                            >
                                <Text size="small" >From: Matt Collins || Dusty || service: 20-03-2020</Text>
                            </Box>
                            <Box
                                margin='xsmall'
                                height={{ min: "xsmall" }}
                                round="small"
                                align="center"
                                justify="center"
                                background="dark-3"
                            >
                                <Text size="small" >From: Matt Collins || Dusty || service: 20-03-2020</Text>
                            </Box>
                            <Box
                                margin='xsmall'
                                height={{ min: "xsmall" }}
                                round="small"
                                align="center"
                                justify="center"
                                background="dark-3"
                            >
                                <Text size="small" >From: Matt Collins || Dusty || service: 20-03-2020</Text>
                            </Box>

                        </Box>
                    </Box>
                </div>
            </div >
        )
    }
}


export default Messages;
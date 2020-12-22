import React from 'react';
import axios from 'axios';
import './messages.styles.scss';
import { Box, Button, Grid, Layer, Tab, Tabs, Text, TextArea, Header } from 'grommet';
import { Chat, ContactInfo } from 'grommet-icons';
import CustomButton from '../../shared/custom-button/custom-button.component';

const messages = [
    {
        key: 1,
        userId: '4rf',
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sollicitudin, libero vitae dictum placerat, erat mi vestibulum elit, sed cursus dui nibh nec nibh. Aenean auctor erat sed mi facilisis, ac tempus lorem hendrerit. Phasellus non convallis lectus. Nam non sollicitudin arcu. Sed pretium quam velit, vel luctus velit imperdiet a. Nam finibus elementum orci vel tristique. Nulla gravida sem ac sem fermentum maximus. Duis aliquet, enim et elementum rutrum, magna nibh posuere enim, at ultricies mauris lorem eu augue. Donec sit amet tristique elit."
    },
    {
        key: 2,
        userId: '99393',
        text: "Your dog is awesome"
    },
    {
        key: 2,
        userId: '99393',
        text: "Ok"
    },
    {
        key: 3,
        userId: '4rf',
        text: "Keep in touch"
    }
];

class Messages extends React.Component<{}, { textArea: string, messagesThread: any[], messagesPreview: any[] }> {
    constructor(props) {
        super(props);

        this.state = {
            textArea: "",
            messagesThread: messages,
            messagesPreview: [],

        }
    };

    handleChange = (event) => {
        this.setState({ textArea: event.target.value });
    }

    sendMessage = () => {
        this.setState({
            messagesThread: [
                ...this.state.messagesThread,
                { text: this.state.textArea, userId: '4rf', key: this.state.messagesThread[this.state.messagesThread.length - 1].key + 1 }
            ],
            textArea: "",
        })
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
                        >
                            <Text color='black' margin={{ left: 'small' }}>Matt Collins || service: 20-03-2020</Text>
                            <CustomButton primary icon={<Chat />} />
                        </Box>
                        <Box className="messages-field" overflow="auto" pad="xsmall">
                            {
                                this.state.messagesThread.map((element) => {
                                    return element.userId === "4rf" ?
                                        (<Box alignSelf="start" className="message-thread" key={element.text} pad="medium" background="brand" round={{ corner: 'right' }}>
                                            {element.text}
                                        </Box>) :
                                        (<Box alignSelf="end" className="message-thread" key={element.text} pad="medium" background="gray" round={{ corner: 'left' }}>
                                            {element.text}
                                        </Box>)

                                })
                            }
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
                            >
                                <TextArea resize={false} value={this.state.textArea} onChange={this.handleChange} fill />
                            </Box>
                            <Button onClick={this.sendMessage} secondary label="Send" />
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

                        >
                            <Text margin={{ left: 'small' }}>All Messages</Text>
                            <CustomButton default icon={<ContactInfo />} />
                        </Box>
                        <Box flex overflow="auto" pad="xsmall">
                            <Box
                                margin='xsmall'
                                width={{ max: 'small' }}
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
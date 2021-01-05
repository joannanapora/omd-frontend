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
    },
    {
        key: 4,
        userId: '4rf',
        text: "See you"
    },
    {
        key: 6,
        userId: '99393',
        text: "Ok"
    },
    {
        key: 5,
        userId: '4rf',
        text: "Ciao"
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

    messagesEnd;

    handleChange = (event) => {
        this.setState({ textArea: event.target.value });

        if (event.keyCode === 13) {
            event.preventDefault();
            this.sendMessage();

        }
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }



    sendMessage = () => {


        if (!this.state.textArea) {

            return;
        };
        if (!this.state.textArea.trim().length) {
            return;
        }

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
            <div className="chat">
                <div className="messages-container">
                    <Box border={{ color: 'brand', size: 'medium' }}
                        fill>
                        <Box
                            className='messages-box'
                            direction="row"
                            align="center"
                            as="header"
                            elevation="small"
                            justify="between"
                            background='brand'
                            pad="xsmall"
                        >
                            <Text color='black' margin={{ left: 'small' }}>Matt Collins || service: 20-03-2020</Text>
                            <CustomButton primary icon={<Chat />} />
                        </Box>
                        <div className='empty-div'></div>
                        <Box overflow="auto" pad="xsmall">
                            {
                                this.state.messagesThread.map((element) => {
                                    return element.userId === "4rf" ?
                                        (<Box height={{ min: 'auto' }} alignSelf="end" className="message-thread" key={element.text} pad="small" background="gray" round={{ corner: 'left' }}>
                                            <div>
                                                {element.text}
                                            </div>
                                        </Box>) :
                                        (<Box height={{ min: 'auto' }} alignSelf="start" className="message-thread" key={element.text} pad="small" background="brand" round={{ corner: 'right' }}>
                                            <div>
                                                {element.text}
                                            </div>
                                        </Box>)
                                })
                            }
                            <div ref={(el) => { this.messagesEnd = el; }}>
                            </div>
                        </Box>
                        <Box
                            height={{ min: 'auto' }}
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
                                <TextArea className='text-area'
                                    onKeyDown={this.handleChange}
                                    resize={false} value={this.state.textArea} onChange={this.handleChange} fill
                                />
                            </Box>
                            <Button onClick={this.sendMessage} type='submit' secondary label="Send" />
                        </Box>
                    </Box>
                </div>
                <div className='messages-preview'>
                    <Box border={{ color: 'brand', size: 'medium' }} fill>
                        <Box
                            direction="row"
                            align="center"
                            as="header"
                            elevation="small"
                            justify="between"
                            pad="xsmall"

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
            </div>
        )
    }
}


export default Messages;
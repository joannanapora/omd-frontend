import React, { useState } from "react";

import { Box, TextArea, Select } from 'grommet';
import { Send } from "grommet-icons";

import { postContact } from "../../api";

import Notification, { Status } from "../../shared/custom-notification/custom-notification.component";
import CustomButton from "../../shared/custom-button/custom-button.component";
import { mapOptionsToContactSubject } from "../../models/enums";
import './contact.styles.scss'

const MESSAGE_MAX_CHARACTERS = 450;

const Contact = () => {

  const subjectsList = [
    "Problem with Walker",
    "Problem with Owner",
    "Technical Problem",
    "Other issue",
  ];

  const [message, setMessage] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isSubjectSelectOpen] = useState(false);
  const [okNotification, setOkNotification] = useState(false);
  const [errorNotification, setErrorNotification] = useState(false);
  const [charactersLeft, setCharactersLeft] = useState(MESSAGE_MAX_CHARACTERS);


  const handleInputChange = (event) => {
    setMessage(event.target.value);
    console.log(event.target.value.length);
    setCharactersLeft(MESSAGE_MAX_CHARACTERS - event.target.value.length)
    setOkNotification(false);
  }


  const onSubmit = () => {
    postContact(
      message,
      mapOptionsToContactSubject(selectedSubject)
    )
      .then(() => {
        setOkNotification(true);
        setSelectedSubject('');
        setMessage('');
        setCharactersLeft(MESSAGE_MAX_CHARACTERS)
      })
      .catch(() => {
        setErrorNotification(true);
      });
  }

  return (
    <div className='contact'>
      <Box
        height='28rem'
        width='large'
        background='white'
        border={{ color: 'brand', size: 'medium' }}
        pad='large'
        gap='small'
      >
        <h1 className="contact-header"> Contact Us </h1>
        <Select
          placeholder="Select Subject"
          open={isSubjectSelectOpen}
          value={selectedSubject}
          options={subjectsList}
          onChange={({ option }) => setSelectedSubject(option)}
          plain
        />
        <Box
          width="large"
          height="xlarge"
          placeholder='Message...'
          border={{ color: 'brand', size: 'xsmall' }}
        >
          <TextArea size='small' maxLength={MESSAGE_MAX_CHARACTERS} resize={false} value={message} onChange={handleInputChange} fill />
        </Box>
        <h6 className='contact-char-left'>Characters Left: {charactersLeft}</h6>
        <div className='contact-button'>
          <CustomButton
            disabled={!(message && selectedSubject)}
            primary
            onClick={onSubmit}
            icon={<Send />}
            label="Send" dsffds
          /></div>
        {okNotification ? (
          <Notification
            status={Status.SUCCESS}
            text={"Message has been sent"}
          ></Notification>
        ) : null}
        {errorNotification ? (
          <Notification
            status={Status.FAILURE}
            text={"Please login to send a message."}
          ></Notification>
        ) : null}
      </Box>
    </div>
  );

}

export default Contact;

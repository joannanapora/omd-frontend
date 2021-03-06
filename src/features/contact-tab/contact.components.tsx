import React, { useState } from "react";

import { Box, TextArea, Select } from 'grommet';
import { Send } from "grommet-icons";

import Notification, { Status } from "../../shared/custom-notification/custom-notification.component";
import CustomButton from "../../shared/custom-button/custom-button.component";
import { mapOptionsToContactSubject } from "../../models/enums";
import Spinner from '../../shared/spinner/spinner.component';
import './contact.styles.scss'

import { postContact } from "../../api";

const MESSAGE_MAX_CHARACTERS = 450;

const Contact = () => {

  const subjectsList = [
    "Problem with Walker",
    "Problem with Owner",
    "Technical Problem",
    "Other issue",
  ];

  const [message, setMessage]: [string, any] = useState('');
  const [selectedSubject, setSelectedSubject]: [string, any] = useState('');
  const [isSubjectSelectOpen]: [boolean, any] = useState(false);
  const [okNotification, setOkNotification]: [boolean, any] = useState(false);
  const [errorNotification, setErrorNotification]: [boolean, any] = useState(false);
  const [charactersLeft, setCharactersLeft]: [number, any] = useState(MESSAGE_MAX_CHARACTERS);
  const [loading, setLoading]: [boolean, any] = useState(false);

  const handleInputChange = (event) => {
    setMessage(event.target.value);
    setCharactersLeft(MESSAGE_MAX_CHARACTERS - event.target.value.length)
    setOkNotification(false);
    setErrorNotification(false);
  }


  const onSubmit = () => {
    setLoading(true);
    postContact(
      message,
      mapOptionsToContactSubject(selectedSubject)
    )
      .then(() => {
        setOkNotification(true);
        setSelectedSubject('');
        setMessage('');
        setCharactersLeft(MESSAGE_MAX_CHARACTERS)
        setLoading(false);

      })
      .catch(() => {
        setErrorNotification(true);
        setLoading(false);

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
          disabled={loading}
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
          <TextArea disabled={loading} size='small' maxLength={MESSAGE_MAX_CHARACTERS} resize={false} value={message} onChange={handleInputChange} fill />
        </Box>
        <h6 className='contact-char-left'>Characters Left: {charactersLeft}</h6>
        <div className='contact-button'>
          {loading ?
            <Spinner />
            :
            <CustomButton
              disabled={!(message && selectedSubject)}
              primary
              onClick={onSubmit}
              icon={<Send />}
              label="Send" dsffds
            />}
        </div>
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

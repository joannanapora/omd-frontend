import React, { useState } from "react";

import { Box, TextArea, Button, Form, TextInput, FormField, Grommet, Select } from 'grommet';
import { Send } from "grommet-icons";
import './contact.styles.scss'

import Notification, { Status } from "../../shared/custom-notification/custom-notification.component";
import CustomButton from "../../shared/custom-button/custom-button.component";
import { mapOptionsToContactSubject } from "../../models/enums";
import { postContact } from "../../api";

const Contact = () => {

  const options = [
    "Problem with Walker",
    "Problem with Owner",
    "Technical Problem",
    "Other issue",
  ];

  const [message, setMessage] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isSelectOpen] = useState(false);
  const [showOKNotification, handleShowOkNotification] = useState(false);
  const [showFailNotification, handleShowFailNotification] = useState(false);


  const onSubmit = () => {
    postContact(
      message,
      mapOptionsToContactSubject(selectedOption)
    )
      .then(() => {
        handleShowOkNotification(true);
        setSelectedOption('');
        setMessage('');
      })
      .catch((error) => {
        handleShowFailNotification(true);
      });
  }

  return (
    <div className='contact'>
      <Box
        height='28rem'
        width='large'
        background="white"
        border={{ color: 'brand', size: 'medium' }}
        gap="medium"
        pad="large"
      >
        <h1 className="contact-box"> Contact Us </h1>
        <FormField>
          <Select
            placeholder="Select Subject"
            open={isSelectOpen}
            value={selectedOption}
            options={options}
            onChange={({ option }) => setSelectedOption(option)}
            plain
          />
        </FormField>
        <FormField>
          <TextArea
            placeholder='Message...'
            fill
            className='text-area'
            resize={false}
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          /></FormField>
        <div className='contact-button'>
          <CustomButton
            disabled={!(message && selectedOption)}
            primary
            onClick={onSubmit}
            icon={<Send />}
            label="Send"
          /></div>
        {showOKNotification ? (
          <Notification
            status={Status.SUCCESS}
            text={"Message has been sent"}
          ></Notification>
        ) : null}
        {showFailNotification ? (
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

import React, { useState } from "react";

import { Box, FormField, Select, TextArea } from "grommet";
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
  const [showNotification, handleShowNotification] = useState(false);


  const onSubmit = () => {
    postContact(
      message,
      mapOptionsToContactSubject(selectedOption)
    )
      .then(() => {
        handleShowNotification(true);
        setSelectedOption("");
        setMessage("");
      })
      .catch((error) => {
        handleShowNotification(true);
      });
  }

  return (
    <Box
      className="contact"
      background="white"
      border
      gap="medium"
      pad="large"
      width="medium"
    >
      <h1 className="contact-box"> Contact Us </h1>
      <FormField>
        <Select
          id="select"
          name="select"
          placeholder="Subject"
          open={isSelectOpen}
          value={selectedOption}
          options={options}
          onChange={({ option }) => setSelectedOption(option)}
        />
      </FormField>
      <FormField>
        <TextArea
          resize={false}
          size='medium'
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Message..."
        />
      </FormField>
      <Box fill align="center" justify="center">
        <CustomButton
          disabled={!(message && selectedOption)}
          primary
          onClick={onSubmit}
          icon={<Send />}
          label="Send"
        >
          Send Message
          </CustomButton>
      </Box>
      {showNotification ? (
        <Notification
          status={Status.SUCCESS}
          text={"Message has been sent"}
        ></Notification>
      ) : null}
    </Box>
  );

}

export default Contact;

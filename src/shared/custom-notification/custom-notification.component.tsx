import React, { useState, useEffect } from 'react';

import { Layer, Box, Button, Text } from 'grommet';
import { Alert, FormCheckmark, FormClose, StatusGood, } from 'grommet-icons';

export enum Status {
    "SUCCESS",
    "FAILURE"
}

const Notification = ({ text, status }: { text: string, status: Status }) => {

    const [isOpen, setIsOpen]: [boolean, any] = useState(false);

    useEffect(() => {
        setIsOpen(true);
        setTimeout(() => {
            setIsOpen(false)
        }, 5000);
    }, [])



    const onPopUpClose = () => {
        setIsOpen(false);
    };


    return (
        <div className='notification'>
            {isOpen && (
                <Layer
                    position="bottom"
                    modal={false}
                    margin={{ vertical: 'medium', horizontal: 'small' }}
                    onEsc={onPopUpClose}
                    responsive={false}
                    plain
                >
                    <Box
                        align="center"
                        direction="row"
                        gap="small"
                        justify="center"
                        round="medium"
                        elevation="medium"
                        pad={{ vertical: 'small', horizontal: 'small' }}
                        background={status === Status.FAILURE ? '#696969' : '#d6702b'}
                    >
                        <Box justify='center' align="center" direction="row" gap="xsmall">
                            {status === Status.FAILURE ? <Alert /> : <FormCheckmark />}
                            <Text color='black'>{text}</Text>
                        </Box>
                        <Button icon={<FormClose />} onClick={onPopUpClose} plain />
                    </Box>
                </Layer>
            )}
        </div>
    )
}

export default Notification;
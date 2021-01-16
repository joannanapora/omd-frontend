import React from 'react';
import Modal from 'react-modal';


const CustomModal = ({ content, modalIsOpen }: any) => {

    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: 'none'
        }
    };

    return (
        <Modal
            isOpen={modalIsOpen}
            style={modalStyles}
            contentLabel="Example Modal"
            appElement={document.getElementById('root')} >
            {content}
        </Modal>
    )
}

export default CustomModal;
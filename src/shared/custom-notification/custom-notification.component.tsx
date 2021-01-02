import React from 'react';
import { Layer, Box, Button, Text } from 'grommet';
import { FormClose, StatusGood, } from 'grommet-icons';

export enum Status {
    "SUCCESS",
    "FAILURE"
}

class Notification extends React.Component<{ text: string, status: Status }, { isOpen: boolean }> {
    _isMounted = false;

    constructor(props) {
        super(props);


        this.state = {
            isOpen: false
        }
    };

    onPopUpClose = () => {
        this.setState({ isOpen: false })
    };

    componentDidMount() {
        this._isMounted = true;

        this.setState({ isOpen: true })
        setTimeout(() => {
            if(this._isMounted) {
                this.setState({ isOpen: false });
            }
        }, 5000);
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    render() {

        return (
            <div className='notification'>
                {this.state.isOpen && (
                    <Layer
                        position="bottom"
                        modal={false}
                        margin={{ vertical: 'medium', horizontal: 'small' }}
                        onEsc={this.onPopUpClose}
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
                            background={this.props.status === Status.FAILURE ? 'red' : '#d6702b'}
                        >
                            <Box justify='center' align="center" direction="row" gap="xsmall">
                                {this.props.status === Status.FAILURE ? null : <StatusGood />}
                                <Text>{this.props.text}</Text>
                            </Box>
                            <Button icon={<FormClose />} onClick={this.onPopUpClose} plain />
                        </Box>
                    </Layer>
                )}
            </div>
        )
    }
}

export default Notification;
import React from 'react';

import { CheckBox } from 'grommet';

const CustomCheckBox = ({ onChange, checked, label }) => {

    return (
        <CheckBox
            label={label}
            checked={checked}
            onChange={onChange}
        />
    );
};

export default CustomCheckBox;
import React from 'react';

import { Select } from 'grommet';

import './custom-filter.styles.scss';

const CustomFilter = ({ options, selectedOptions, name, placeholder, onChange, ...rest }) => {

    const onSelect = (props) => {
        onChange({ name: name, value: props });
    };

    return (
        <Select
            {...rest}
            plain
            alignSelf="start"
            placeholder={placeholder}
            name={name}
            closeOnChange={false}
            multiple
            value={selectedOptions}
            options={options}
            selected={selectedOptions}
            onChange={({ selected: nextSelected }) => {
                onSelect([...nextSelected].sort());
            }}
        />
    );
};

export default CustomFilter;
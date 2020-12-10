import React, { useState } from 'react';

import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';
import { normalizeColor, deepMerge } from 'grommet/utils';

import { FormCheckmark } from 'grommet-icons';


class CustomCheckBox extends React.Component<{ onChange: (event: any) => void, checked: boolean, label: string }, {}> {
    constructor(props) {
        super(props);
    };


    customCheckBoxTheme = {
        checkBox: {
            border: {
                color: {
                    light: 'brand',
                },
                // width: 'xsmall',
                radius: '5px',
            },
            check: {
                extend: ({ theme, checked }) => `
          ${checked && `background-color: ${normalizeColor('brand', theme)};`}
          `,
            },
            color: {
                light: 'brand',
                dark: 'brand',
            },
            hover: {
                border: {
                    color: 'brand',
                },
            },
            icon: {
                size: '18px',
                extend: 'stroke: white;',
            },
            icons: {
                checked: FormCheckmark,
            },
            size: '30px',
            extend: `
        color: 'brand';
      `,
        },
    };
    render() {
        return (
            <Box align="center" pad="medium">
                <CheckBox
                    label={this.props.label}
                    checked={this.props.checked}
                    onChange={this.props.onChange}
                />
            </Box>
        );
    };
}

export default CustomCheckBox;
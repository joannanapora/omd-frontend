import React from "react";
import './custom-button.component.scss';
import { Button } from "grommet";

const CustomButton = ({ children, ...otherProps }: any) => (
  <Button className='custom-button'
    onClick={() => { }} {...otherProps}>
    {children}
  </Button>
);


export default CustomButton;

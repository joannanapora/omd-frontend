import React from "react";

import { Box, Button } from "grommet";

export const CustomButton = ({ children, ...otherProps }: any) => (
  <Box align="center" pad="xsmall">
    <Button className='custom-button' primary

      onClick={() => { }} {...otherProps}>
      {children}
    </Button>
  </Box>
);

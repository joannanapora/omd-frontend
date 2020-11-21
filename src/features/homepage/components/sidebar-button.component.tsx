import React from 'react';
import { Box, Avatar, Button, Text } from "grommet";

export const SidebarButton = ({image, label, ...rest}) => (
    <Button plain {...rest}>
      {({ hover }) => (
        <Box
          background={hover ? 'accent-1' : undefined}
          pad={{ horizontal: 'large', vertical: 'medium' }}
        >
          <Text size="large">{label}</Text>
          <Avatar size="large" src={''} round="large" />
        </Box>
      )}
    </Button>
  );
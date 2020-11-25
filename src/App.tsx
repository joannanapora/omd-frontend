import React from "react";
import "./App.css";
import HomePage from "./homepage/homepage.container";
import { Grommet, ThemeType } from "grommet";


const theme = {
  global: {
    colors: {
      brand: "#d6702b",
      active: "#d6702b",
    },
    font: {
      family: 'Texturina',
      size: "1px",
      height: "2px",
    },
  },
  button: {
    default: {
      background: { color: "white" },
      color: "text",
      border: undefined,
      padding: {
        horizontal: "30px",
        vertical: "23px",
      },
    },
    primary: {
      background: { color: "black" },
      border: undefined,
      color: "white",
      font: { weight: "bold" },
      padding: {
        horizontal: "1.6rem",
        vertical: ".5rem",
      },
    },
    secondary: {
      border: { color: "black", width: "4px" },
      color: "text",
      padding: {
        horizontal: "8px",
        vertical: "4px",
      },
    },
    active: {
      background: { color: "black" },
      color: "text",
      secondary: {
        background: "none",
        border: {
          color: "brand-contrast",
        },
      },
    },
    disabled: {
      opacity: 0.3,
      secondary: {
        border: { color: "text-weak" },
      },
    },
    hover: {
      background: { color: "active" },
      secondary: {
        border: { color: "active" },
      },
    },
  },
  select: {
    background: {
      color: "black"
    }
  },
  formField: {
    border: {
      error: {
        color: 'border',
      },
      color: 'border',
    },
    disabled: {
      background: {
        color: undefined,
      },
      border: {
        color: 'status-disabled',
      },
      label: {
        color: 'status-disabled',
      },
    },
    error: {
      background: {
        color: { light: '#FF404033', dark: '#FF40404D' },
      },
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none',
      },
    },
    help: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none',
        bottom: 'xsmall',
      },
    },
    info: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none',
      },
    },
    label: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        horizontal: 'none',
      },
    },
    round: '4px',
  },
};

function App() {
  return (
    <Grommet className="container" theme={theme}>
      <HomePage />
    </Grommet>
  );
}

export default App;

import React from "react";
import "./App.css";
import HomePage from "./homepage/homepage.container";
import { Grommet } from "grommet";


const theme = {
  global: {
    colors: {
      brand: "#d6702b",
      active: 'brand',
    },
    font: {
      family: 'Texturina',
      size: "1px",
      height: "2px",
    },
    focus: {
      border: {
        color: 'brand',
      },
      outline: {
        color: 'transparent',
      },
      shadow: {
        color: 'none',
      },
    },
  },
  button: {
    default: {
      active: "#d6702b",
      background: { color: "white" },
      color: "black",
      border: { color: "#d6702b" },
      padding: {
        horizontal: "1.6rem",
        vertical: ".5rem",
      },
    },
    primary: {
      active: "#d6702b",
      background: { color: "#d6702b" },
      color: "white",
      font: { weight: "bold" },
      padding: {
        horizontal: "1.6rem",
        vertical: ".5rem",
      },
    },
    secondary: {
      active: "#d6702b",
      border: { color: "#d6702b", width: "4px" },
      color: "text",
      padding: {
        horizontal: "8px",
        vertical: "4px",
      },
    },
    active: {

      background: { color: "black" },
      color: "d6702b",
      secondary: {
        background: "none",
        border: {

          active: "#d6702b", color: "#d6702b",
        },
      },
    },
    disabled: {
      opacity: 0.3,
      secondary: {
        active: "#d6702b",
        border: { color: "text-weak" },
      },
    },
    hover: {
      background: { color: "active" },
      secondary: {

        active: "#d6702b",
        border: { color: "#d6702b" },
      },
    },
  },
  select: {
    active: "#d6702b",
    color: '#d6702b',
    background: {
      color: "d6702b"
    }
  },
  formField: {
    border: {
      error: {
        color: 'brand',
      },
      color: 'brand',
    },
    disabled: {
      background: {
        color: undefined,
      },
      border: {
        active: "#d6702b",
        color: 'status-disabled',
      },
      label: {
        active: "#d6702b",
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

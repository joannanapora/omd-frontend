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
        horizontal: "0.6rem",
        vertical: "0.2rem",
      },
    },
    primary: {

      border: { color: "#d6702b" },
      background: { color: "#d6702b" },
      color: "white",
      font: { weight: "bold" },
      padding: {
        horizontal: "1.8rem",
        vertical: ".5rem",
      },
    },
    secondary: {
      active: { color: "brand" },
      background: { color: "white" },
      border: { color: "brand" },
      color: "black",
      padding: {
        horizontal: "1.8rem",
        vertical: ".8rem",
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

      default: {
        background: { color: "white" },
        active: "#d6702b",
        focus: "brand",
        color: 'black'
      },
      primary: {
        background: { color: "brand" },
        active: "brand",
        color: 'black'
      },
      secondary: {
        background: { color: "brand" },
        active: "brand",
        color: 'black'
      },
    },
  },
  input: {
    background: "white",
    color: "black"
  },
  select: {
    active: "#d6702b",
    color: '#d6702b',
    background: {
      color: "white"
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
        color: 'white',
      },
      border: {
        active: "#d6702b",
        color: 'black',
      },
      label: {
        active: "#d6702b",
        color: 'black',
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

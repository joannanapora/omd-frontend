import React from "react";
import "./App.css";
import HomePage from "./homepage/homepage.container";
import { Grommet } from "grommet";
import { defaultProps } from 'grommet'

const theme = {
  global: {
    colors: {
      brand: "#d6702b",
      active: 'brand',
      label: 'black'
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
  card: {
    container: {
      elevation: 'large',
    },
    footer: {
      pad: 'medium',
    },
  },
  button: {
    default: {
      width: '100%',
      active: "#d6702b",
      background: { color: "white" },
      color: "black",
      padding: {
        horizontal: "0.6rem",
        vertical: "0.2rem"
      },
    },
    primary: {
      border: { color: "#d6702b" },
      background: { color: "#d6702b" },
      color: "white",
      font: { weight: "bold" },
      padding: {
        horizontal: "1.1rem",
        vertical: ".5rem",
      },
    },
    secondary: {
      active: { color: "brand" },
      background: { color: "white" },
      border: { color: "brand" },
      color: "black",
      padding: {
        horizontal: "1.1rem",
        vertical: ".5rem",
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

      primary: {
        background: { color: "brand" },
        active: "brand",
        color: 'black'
      },
      secondary: {
        background: { color: "white" },
        active: "brand",
        color: 'black'
      },
      default: {
        background: { color: "white" },
        active: "#d6702b",
        focus: "brand",
        color: 'black',
        round: '0px',
      },
    },
  },
  input: {
    background: "white",
    color: "black",

  },
  select: {
    active: "black",
    color: "black",
    background: {
      color: "white"
    }
  },
  formField: {
    color: 'black',
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
        active: "black",
        color: 'black',
      },
      label: {
        active: "black",
        color: 'black',
        size: 'small'
      },
      placeholder: {
        color: 'text-weak'
      }
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
      size: 'medium',
      color: 'black',
      margin: {
        horizontal: 'none',
      },
    },
    round: '4px',
  },
};

function App() {
  return (
    <Grommet full theme={theme}>
      <div className="container">
        <HomePage />
      </div>
    </Grommet>
  );
}

export default App;

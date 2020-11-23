import React from "react";
import "./App.css";
import HomePage from "./features/homepage/containers/homepage.container";
import { Grommet } from "grommet";

const theme = {
  global: {
    colors: {
      brand: "white",
      active: "#eecc33",
    },
    font: {
      family: "Srisakdi, cursive",
      size: "18px",
      height: "20px",
    },
  },
  button: {
    default: {
      color: "text",
      border: undefined,
      padding: {
        horizontal: "30px",
        vertical: "23px",
      },
    },
    primary: {
      background: { color: "brand" },
      border: undefined,
      color: "text-strong",
      font: { weight: "bold" },
      padding: {
        horizontal: ".5rem",
        vertical: ".5rem",
      },
    },
    secondary: {
      border: { color: "brand", width: "4px" },
      color: "text",
      padding: {
        horizontal: "8px",
        vertical: "4px",
      },
    },
    active: {
      background: { color: "brand-contrast" },
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
};

function App() {
  return (
    <Grommet className="container" theme={theme}>
      <HomePage />
    </Grommet>
  );
}

export default App;

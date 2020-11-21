import React from 'react';
import './App.css';
import HomePage from './features/homepage/containers/homepage.container';
import { Grommet } from 'grommet';


const theme = {
  global: {
    font: {
      family: 'Srisakdi, cursive',
      size: '18px',
      height: '20px',
    },
  },
};


function App() {
  return (
    <Grommet className = "gromet" theme={theme}>
      <HomePage/>
    </Grommet>
  );
}

export default App;

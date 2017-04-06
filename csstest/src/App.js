import React, { Component } from 'react';
import Input from './input/input';

class App extends Component {
  render() {
    return (
      <div>
        <Input
          id="myInput"
          inputType="email"
          placeholder="john@gmail.com"
          labelName="EMAIL ADDRESS"
          required
        />
        <Input
          id="myInline"
          inline
          inputType="text"
          placeholder="otherthing"
          labelName="INLINE LABEL"
          required
        />
        <Input
          id="myPassword"
          inputType="password"
          placeholder="******"
          labelName="PASSWORD"
          required
        />
      </div>
    );
  }
}

export default App;

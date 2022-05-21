import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import FirstComponent from './components/learning-examples/FirstComponent';
import SecondComponent from './components/learning-examples/SecondComponent';
import Counter from './components/counter/Counter';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Counter/>
      </div>
    );
  }
}




class LearningComponents extends Component {
  render() {
    return (
      <div className="LearningComponents">
        My Hello World
        <FirstComponent/>
        <SecondComponent/>
    
      </div>
    );
  }
}

export default App;

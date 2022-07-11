import { Component } from 'react';
import INT from './components/INT/INT';
import TodoApp from './components/todo/TodoApp';
import Navbar from './components/INT/navbar';
import SBU from './components/INT-SBU/SBU-App';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <TodoApp/> */}
        {/* <INT/> */}
        <SBU/>
      </div>
    );
  }
}


export default App;

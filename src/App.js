import { Component } from 'react';
import INT from './components/INT/INT';
import TodoApp from './components/todo/TodoApp';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<Counter/>*/}
        <TodoApp/>
        {/* <INT/> */}
      </div>
    );
  }
}


export default App;

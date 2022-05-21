import { Component } from "react";
import './Counter.css'
import PropTypes from 'prop-types';

class Counter extends Component {

    constructor(props) {
        super();

        this.state = {
            counter: 0
        }

        //this.increment = this.increment.bind(this);
    }

    render() {
        return (
            <div className="Counter">
                <CounterButton by={1} incrementMethod={this.increment} />
                <CounterButton by={5} incrementMethod={this.increment} />
                <CounterButton by={10} incrementMethod={this.increment} />
                <span className="count">{this.state.counter}</span>
            </div>
        );
    }

    increment = (by) => {
        this.setState(
            (prevState) => {
                return { counter: prevState.counter + by }
            })
    }
}

class CounterButton extends Component {

    constructor(props) {
        super();

        this.state = {
            counter: 0
        }

    }

    render() {
        return (
            <div className="Counter">
                <button onClick={this.increment}>+{this.props.by}</button>
            </div>
        )
    }

    increment = () => {
        console.log("Increment");
        this.setState(
            (prevState) => {
                return {counter: prevState.counter + this.props.by}
                }
        )

        this.props.incrementMethod(this.props.by)
    }


}

CounterButton.defaultProps = {
    by: 1
}

CounterButton.propTypes = {
    by: PropTypes.number
}
export default Counter;
import React, { Component } from 'react';

//Stylsheet
import '../../styles/RangeInput.css';

class RangeInput extends Component {
  constructor(props) {
    super(props);

    this.state = { leftThumb: null, leftDragging: false, rightThumb: null, rightDragging: false, selection: { left: null, width: 0 } };
    this.container = React.createRef();

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentDidMount() {
    const defaultLeft = this.props.defaultLeft || 0;
    const defaultRight = this.props.defaultRight || 100;

    const leftPosX = (defaultLeft / 100) * (this.container.current.offsetWidth - 32);

    const rightPosX = (defaultRight / 100) * (this.container.current.offsetWidth - 32);

    //Now update the selection bar
    this.setState({
      leftThumb: leftPosX,
      rightThumb: rightPosX,
      selection: {
        left: leftPosX,
        width: rightPosX - leftPosX
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseDown(e) {
    const target = e.target.parentNode.className;
    if (target.includes('left-thumb')) {
      this.setState({ leftDragging: true });
    } else if (target.includes('right-thumb')) {
      this.setState({ rightDragging: true });
    }

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseUp() {
    this.setState({ leftDragging: false, rightDragging: false });
  }

  handleMouseMove(e) {
    const { leftThumb, rightThumb, leftDragging, rightDragging, selection } = this.state;
    let clientX,
      thumbWidth = 32;

    //If the Dragging, collect mouse data
    if (leftDragging || rightDragging) {
      //ClientX is mouse location
      clientX = e.clientX;
    }

    //If dragging left thumb
    if (leftDragging) {
      //Calculate the left position, offsetting by thumb width
      let left = clientX - this.container.current.offsetLeft - thumbWidth / 2;

      //Check collisions
      if (left < 0) {
        left = 0;
      } else if (left >= rightThumb - thumbWidth) {
        left = rightThumb - thumbWidth;
      }

      //Calculate the width of the selection bar
      const selectionWidth = rightThumb - left;

      //Set the left location and other stuff
      this.setState({ leftThumb: left, selection: { left: left, width: selectionWidth } });

      //Send the data
      this.sendData();

      //If dragging right thumb
    } else if (rightDragging) {
      //Find new location
      let left = clientX - this.container.current.offsetLeft - thumbWidth / 2;

      //Check collisions
      if (left > this.container.current.offsetWidth - thumbWidth) {
        left = this.container.current.offsetWidth - thumbWidth;
      } else if (left <= leftThumb + thumbWidth) {
        left = leftThumb + thumbWidth;
      }

      //Find new selection width
      const selectionWidth = left - leftThumb;

      //Set the values
      this.setState({ rightThumb: left, selection: { left: selection.left, width: selectionWidth } });

      //Send the data
      this.sendData();
    }
  }

  sendData() {
    this.props.sendDataTo({ min: this.getValues().left, max: this.getValues().right });
  }

  getValues() {
    //Get values
    let leftValue, rightValue;
    if (this.container.current) {
      const leftPerc = this.state.leftThumb / (this.container.current.offsetWidth - 64);
      const rightPerc = (this.state.rightThumb - 32) / (this.container.current.offsetWidth - 64);
      leftValue = (leftPerc * (this.props.max - this.props.min) + this.props.min).toFixed(0);
      rightValue = (rightPerc * (this.props.max - this.props.min) + this.props.min).toFixed(0);
    } else {
      leftValue = (this.state.leftThumb / this.props.max) * 100;
      rightValue = (this.state.rightThumb / this.props.max) * 100;
    }

    return { left: Number(leftValue), right: Number(rightValue) };
  }

  render() {
    const leftValue = this.getValues().left,
      rightValue = this.getValues().right;
    return (
      <span className="range-input-container container fw" ref={this.container}>
        <span className="range-input-bar" />
        <span className="range-input-selection" style={{ left: this.state.selection.left, width: this.state.selection.width }} />
        <span className="range-input-thumb left-thumb" style={{ left: this.state.leftThumb }} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
          <span>&#8250;</span>
        </span>
        <span className="range-input-thumb right-thumb" style={{ left: this.state.rightThumb }} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
          <span>&#8249;</span>
        </span>
        <br />
        <br />
        <span>{leftValue}-</span>
        <span>{rightValue}</span>
      </span>
    );
  }
}

export default RangeInput;

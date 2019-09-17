import React, {Component} from 'react';

interface Props {
  handleSpeedChange: any;
}

interface State {
  activeButton: string;
}

class SpeedControls extends Component<Props, State> {
  state = {
    activeButton: '400'
  };

  handleSpeedChange = (speed: string): void => {
    let {activeButton} = this.state;

    if (activeButton !== speed) {
      activeButton = speed;
      this.setState({activeButton});
      this.props.handleSpeedChange(parseInt(speed, 10))
    }
  }

  render() {
    const bgStyle = (value: string) => (value === this.state.activeButton ? "#6C49B8" : "#29cacf");

    return(
      <div className="control-buttons">
        <button onClick={() => this.handleSpeedChange('400')} style={{backgroundColor: bgStyle("400")}}>X1</button>
        <button onClick={() => this.handleSpeedChange('200')} name="200" style={{backgroundColor: bgStyle("200")}}>X2</button>
        <button onClick={() => this.handleSpeedChange('40')} name="40" style={{backgroundColor: bgStyle("40")}}>X5</button>
      </div>
    )
  }
}

export default SpeedControls;

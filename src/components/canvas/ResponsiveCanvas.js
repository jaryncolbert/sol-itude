import React from "react";
import Canvas from "./P5Canvas";

export default class ResponsiveCanvas extends React.Component {
  static defaultProps = {
    scaleWidth: 0.9,
    scaleHeight: 0.5,
    minWidth: 0,
    minHeight: 0
  };

  state = {
    windowWidth: 0,
    windowHeight: 0
  };

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  };

  render() {
    const {
      scaleWidth,
      scaleHeight,
      minWidth,
      minHeight,
      ...otherProps
    } = this.props;

    const newWidth = Math.round(this.state.windowWidth * scaleWidth);
    const newHeight = Math.round(this.state.windowHeight * scaleHeight);
    const width = Math.max(newWidth, minWidth);
    const height = Math.max(newHeight, minHeight);

    return (
      <Canvas {...otherProps} width={width} height={height}>
        {this.props.children}
      </Canvas>
    );
  }
}

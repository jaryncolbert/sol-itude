import React from "react";
import p5 from "p5";
import PropTypes from "prop-types";

import Point from "./shapes/Point";
import Rectangle from "./shapes/Rectangle";

export default class Canvas extends React.Component {
  static defaultProps = {
    width: 600,
    height: 400,
    start: new Point(0, 0),
    background: "#FFFFFF"
  };

  static childContextTypes = {
    subscribe: PropTypes.func,
    unsubscribe: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.drawables = [];
  }

  getChildContext() {
    return {
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe
    };
  }

  componentDidMount() {
    const { setup, draw } = this;
    const sketch = p => {
      p.setup = () => setup(p);
      p.draw = () => draw(p);
    };
    this.p = new p5(sketch, this.container);
  }

  setup = p => {
    const { width, height } = this.props;
    p.createCanvas(width, height);
  };

  subscribe = childFn => {
    this.drawables.push(childFn);
  };

  unsubscribe = childFn => {
    this.drawables = this.drawables.filter(c => c !== childFn);
  };

  draw = p => {
    const { background } = this.props;

    p.background(background);
    this.drawables.forEach(c => c(p));
  };

  componentWillUnmount() {
    this.p.remove();
  }

  render() {
    const { children, background, ...otherProps } = this.props;

    return (
      <div ref={e => (this.container = e)}>
        <Rectangle color={background} fillColor={background} {...otherProps} />
        {children}
      </div>
    );
  }
}

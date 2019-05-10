import React from "react";

import { Consumer } from "./context";

export default class Link extends React.Component {
  constructor(props, context) {
    super(props, context)
  };
  render() {
    return (<Consumer>
      {state => {
        return <a onClick={() => {
          state.history.push(this.props.to)
        }}>
           {this.props.children}
        </a>
      }}
    </Consumer>)
  }
}
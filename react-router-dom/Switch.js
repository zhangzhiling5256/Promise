import React from "react";

import { Consumer } from "./context";

import pathToRegexp from "path-to-regexp";

export default class Switch extends React.Component {
  constructor(props, context) {
    super(props, context)
  };

  render() {
    return (<Consumer>
      {state => {
        let pathName = state.location.pathName;
        let children = this.props.children;
        for (let i = 0; i < children.length; i++) {
          let child = children[i];
          let path = child.props.path||"";
          let reg = pathToRegexp(path, [], { end: false });
          if (reg.test(pathName)) {
            return child;
          }
        }
        return null;
      }}
    </Consumer>)
  }
} 
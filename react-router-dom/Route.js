import React from "react";

import { Consumer } from "./context"

import pathToReg from "path-to-regexp";

export default class Route extends React.Component {
  constructor(props, context) {
    super(props, context)
  };

  render() {
    return (<Consumer>
      {state => {
        //path是routr属性上的路径
        let { path, component: Component, exact = true } = this.props;

        //pathName是location中的路径
        let pathName = state.location.pathName;

        //exact 不传的处理
        if (this.props.exact) {
          exact = true;
        } else {
          exact = false;
        }
        
        let keys = [];
        let reg = pathToReg(path, keys, { end: exact })
        keys = keys.map((item) => { return item.name })
        let result = pathName.match(reg)
        let [url, ...values] = result || [];
        let props = {
          location: state.location,
          history: state.history,
          match: {
            params: keys.reduce((obj, current, idx) => {
              obj[current] = values[idx];
              return obj;
            }, {})
          }
        }
        if (result) {
          return <Component {...props}></Component>
        }
        return null;
      }}
    </Consumer>)
  }
} 
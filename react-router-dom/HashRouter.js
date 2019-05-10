import React from "react";

import { Provider, Consumer } from "./context"



export default class HashRouter extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      location: {
        pathName: window.location.hash.slice(1) || "/"
      }
    }
  };

  componentDidMount() {
    //默认hash值是/
    window.location.hash = window.location.hash || "/";

    //监听hash值变化，重新设置状态
    window.addEventListener("hashchange", () => {
      this.setState({
        location: {
          ...this.state.location,
          pathName: window.location.hash.slice(1) || "/"
        }
      })
    })
  }

  render() {
    let obj = {
      location: this.state.location,
      history: {
        push(to) {
           window.location.hash=to;
        }
      }
    }
    return (<Provider value={obj}>
      {this.props.children}
    </Provider>)
  }
} 
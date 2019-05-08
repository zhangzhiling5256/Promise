import React from "react";
import PropTypes from "prop-types";


class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  getChildContext() {
    return {
      store: this.props.store
    }
  }
  constructor(props, context) {
    super(props, context)
  };
  render() {
    return this.props.children
  }
}

function connect(mapStateToProps, mapDispatchToProps) {

  return function connectHOT(Component) { //传递进来的是要操作的组件，我们需要把指定的属性和方法都挂载到当前组建的属性上。
    return class Proxy extends React.Component { //返回一个新的Proxy代理组件，在代理组件中，要获取Provider在上下文中存储的store，紧接着获取staore中的state和dispatch，把mapStateToProps, mapDispatchToProps回调函数执行，接受返回的结果，在把这些结果挂载到Component这个要操作组件的属性上。

      //获取上下文中的store
      static childContextTypes = {
        store: PropTypes.object
      };
      //获取store中的state/dispach，把传递的两个回调函数执行，接受返回的结果。
      constructor(props, context) {
        super(props, context);
        this.state = this.queryMountProps();
      };

      //基于redux中的subscribe向事件池中追加一个方法，当容器中状态改变，我们需要重新获取最新发状态信息，并且葱芯把commponent渲染，把最新的状态信息通过属性传递给componet。
      componentDidMount() {
        this.context.store.subscribe(() => {
          this.setState(this.queryMountProps());
        })
      }

      //渲染coponent组件，并且把获取的信息（状态，方法）挂载到组件上。
      render() {
        return (
          <Component {...this.state} {...this.props}></Component>
        );
      }

      //从redux中获取最新的信息，基于回调函数筛选，返回的是需要挂载到组件属性上的信息
      queryMountProps = () => {
        let { store } = this.context,
          state = store.getState();
        let propsState = typeof mapStateToProps === "function" ? mapStateToProps(state) : {};
        let propsDispatch = typeof mapDispatchToProps === "function" ? mapDispatchToProps(store.dispatch) : {};
        return {
          ...propsState,
          ...propsDispatch
        }
      };
      render() {

      }
    }
  }
}

export {
  Provider,
  connect
};
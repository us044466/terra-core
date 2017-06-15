import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'terra-popup';
import 'terra-base/lib/baseStyles';
import MenuItem from './MenuItem';
import MenuItemGroup from './MenuItemGroup';
import SubMenu from './SubMenu';
import './Menu.scss';

const propTypes = {
  target: PropTypes.element,
  children: PropTypes.node,
};

const defaultProps = {
  children: [],
};

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.setButtonNode = this.setButtonNode.bind(this);
    this.getButtonNode = this.getButtonNode.bind(this);
    this.handleItemSelection = this.handleItemSelection.bind(this);
    this.wrapOnClick = this.wrapOnClick.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    const items = this.props.children.map((item) => {
      if (item.props.subMenuItems && item.props.subMenuItems.length > 0) {
        return React.cloneElement(item, { onClick: this.wrapOnClick(item) });
      }

      return item;
    });

    const initialMenu = (
      <SubMenu>
        {items}
      </SubMenu>
    );

    return {
      isOpen: false,
      stack: [initialMenu],
    };
  }

  setButtonNode(node) {
    if (node === null) { return; }
    this.buttonNode = node;
  }

  getButtonNode() {
    return this.buttonNode;
  }

  handleOnClick() {
    if (this.props.children) {
      this.setState({ isOpen: true });
    }
  }

  handleRequestClose() {
    this.setState(this.getInitialState());
  }

  handleItemSelection(event, item) {
    this.push(<SubMenu title={item.props.text} onBack={this.pop}>{item.props.subMenuItems}</SubMenu>);
  }

  wrapOnClick(item) {
    const onClick = item.props.onClick;
    return (event) => {
      this.handleItemSelection(event, item);

      if (onClick) {
        onClick(event);
      }
    };
  }

  pop() {
    this.setState((prevState) => {
      prevState.stack.pop();
      return { stack: prevState.stack };
    });
  }

  push(content) {
    this.setState((prevState) => {
      prevState.stack.push(content);
      return { stack: prevState.stack };
    });
  }

  render() {
    const { target, children, ...customProps } = this.props;
    const attributes = Object.assign({}, customProps);
    const targetClone = React.cloneElement(target, { onClick: this.handleOnClick });

    return (
      <div {...attributes}>
        <Popup
          isOpen={this.state.isOpen}
          targetRef={this.getButtonNode}
          onRequestClose={this.handleRequestClose}
          isArrowDisplayed
        >
          {this.state.stack[this.state.stack.length - 1]}
        </Popup>
        <div ref={this.setButtonNode}>
          {targetClone}
        </div>
      </div>
    );
  }
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;
Menu.Item = MenuItem;
Menu.ItemGroup = MenuItemGroup;

export default Menu;

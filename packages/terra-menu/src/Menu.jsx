import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'terra-popup';
import 'terra-base/lib/baseStyles';
import MenuToggle from './MenuToggle';
import MenuItem from './MenuItem';
import MenuItemGroup from './MenuItemGroup';
import SubMenu from './SubMenu';
import './Menu.scss';

const propTypes = {
  /**
   * Bounding container for the popup, will use window if no value provided.
   */
  boundingRef: PropTypes.func,
  /**
   * The children to be displayed as content within the popup.
   */
  children: PropTypes.node.isRequired,
  /**
   * CSS classnames that are append to the arrow.
   */
  classNameArrow: PropTypes.string,
  /**
   * CSS classnames that are append to the popup content inner.
   */
  classNameContent: PropTypes.string,
  /**
   * CSS classnames that are append to the overlay.
   */
  classNameOverlay: PropTypes.string,

  /**
   * Should the default behavior, that inserts a header when constraints are breached, be disabled.
   */
  isHeaderDisabled: PropTypes.bool,
  /**
   * Should the popup be presented as open.
   */
  isOpen: PropTypes.bool,
  /**
   * Callback function indicating a close condition was met, should be combined with isOpen for state management.
   */
  onRequestClose: PropTypes.func.isRequired,
  /**
   * Target element for the popup to anchor to.
   */
  targetRef: PropTypes.func.isRequired,
};

const defaultProps = {
  children: [],
};

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.wrapOnRequestClose = this.wrapOnRequestClose.bind(this);
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

  wrapOnRequestClose() {
    const onRequestClose = this.props.onRequestClose;

    return (event) => {
      this.handleRequestClose();
      onRequestClose(event);
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
    const { onRequestClose, children, ...customProps } = this.props;
    const attributes = Object.assign({}, customProps);

    return (
      <Popup
        {...attributes}
        onRequestClose={this.wrapOnRequestClose}
        isArrowDisplayed
      >
        {this.state.stack[this.state.stack.length - 1]}
      </Popup>
    );
  }
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;
Menu.Toggle = MenuToggle;
Menu.Item = MenuItem;
Menu.ItemGroup = MenuItemGroup;

export default Menu;

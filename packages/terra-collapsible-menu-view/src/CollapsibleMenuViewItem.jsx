import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import ButtonGroup from 'terra-button-group';
import Menu from 'terra-menu';

const propTypes = {
  /**
  * An optional icon. Nested inline with the text when provided
  **/
  icon: PropTypes.element,

  /**
  * Reverses the position of the icon and text
  **/
  isReversed: PropTypes.bool,

  /**
   * Sets the item's text
   **/
  text: PropTypes.string,

  /**
   * Indicates if the item is selected.
   **/
  isSelected: PropTypes.bool,

  /**
   * Private.
   */
  isButtonStyle: PropTypes.bool,

  /**
   * List of Menu.Items to display in a submenu when this item is selected.
   **/
  menuItems: PropTypes.arrayOf(PropTypes.element),
};

const contextTypes = {
  isGroupItem: PropTypes.bool,
};

const defaultProps = {
  isReversed: false,
  isButtonStyle: false,
  text: '',
};

class CollapsibleMenuViewItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.setButtonNode = this.setButtonNode.bind(this);
    this.getButtonNode = this.getButtonNode.bind(this);
    this.state = { open: false };
  }

  setButtonNode(node) {
    this.buttonNode = node;
  }

  getButtonNode() {
    return this.buttonNode;
  }

  handleButtonClick() {
    this.setState({ open: true });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  render() {
    const {
      icon,
      isReversed,
      text,
      isSelected,
      isButtonStyle,
      menuItems,
      ...customProps
    } = this.props;

    const { isGroupItem } = this.context;

    const attributes = Object.assign({}, customProps);

    let item;

    if (isButtonStyle && isGroupItem) {
      item = <ButtonGroup.Button {...attributes} icon={icon} text={text} isReversed isSelected />;
    } else if (isButtonStyle) {
      item = (
        <div className="terra-CollapsibleMenuViewItem" ref={this.setButtonNode}>
          <Menu tergetRef={this.getButtonNode}>
            {menuItems}
          </Menu>
          <Button {...attributes} icon={icon} text={text} isReversed={isReversed} />
        </div>
      );
    } else {
      item = <Menu.Item text={text} isSelected isSelectable subMenuItems={menuItems} />;
    }

    return item;
  }
}

CollapsibleMenuViewItem.propTypes = propTypes;
CollapsibleMenuViewItem.defaultProps = defaultProps;
CollapsibleMenuViewItem.contextTypes = contextTypes;

export default CollapsibleMenuViewItem;

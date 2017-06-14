import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import ButtonGroup from 'terra-button-group';
import List from 'terra-list';
import 'terra-base/lib/baseStyles';
import './MenuItem.scss';

const propTypes = {
  /**
   * Sets the item's text
   **/
  text: PropTypes.string,

  /**
   * An optional icon. Nested inline with the text when provided
   **/
  icon: PropTypes.element,

  /**
   * Reverses the position of the icon and text
   **/
  isReversed: PropTypes.bool,

  /**
   * Indicates if the item is selected.
   **/
  isSelected: PropTypes.bool,

  isSelectable: PropTypes.bool,

  /**
   * List of Menu.Items to display in a submenu when this item is selected.
   **/
  subMenuItems: PropTypes.arrayOf(PropTypes.element),

  /**
   * This should only be set if the item is being placed in a collapsible menu view, or as the `target` in a menu.
   **/
  isButtonStyle: PropTypes.bool,

  /**
   * Private.
   **/
  isGroupItem: PropTypes.bool,
};

const defaultProps = {
  text: '',
  isReversed: false,
  isSelected: false,
  isSelectable: false,
  isButtonStyle: false,
  isGroupItem: false,
  subMenuItems: [],
};

const MenuItem = ({
  text,
  icon,
  isReversed,
  isSelected,
  isSelectable,
  isButtonStyle,
  isGroupItem,
  subMenuItems,
  ...customProps
}) => {
  const attributes = Object.assign({}, customProps);

  let item;
  if (isButtonStyle && isGroupItem) {
    item = (
      <ButtonGroup.Button {...attributes} text={text} icon={icon} isSelected={isSelected} />
    );
  } else if (isButtonStyle) {
    item = <Button {...attributes} text={text} icon={icon} isReversed={isReversed} />;
  } else {
    item = (
      <List.Item
        {...attributes}
        hasChevron={subMenuItems.length > 0}
        content={<div>{text}</div>}
        isSelectable={subMenuItems.length > 0 || isSelectable || attributes.onClick}
        isSelected={isSelected}
      />
    );
  }

  return item;
};

MenuItem.propTypes = propTypes;
MenuItem.defaultProps = defaultProps;

export default MenuItem;

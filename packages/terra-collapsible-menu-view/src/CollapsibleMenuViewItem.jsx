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
   * Indicates if the item should be selectable
  **/
  isSelectable: PropTypes.bool,

  /**
   * List of Menu.Items to display in a submenu when this item is selected.
   **/
  subMenuItems: PropTypes.arrayOf(PropTypes.element),
};

const defaultProps = {
  isReversed: false,
  text: '',
};

const CollapsibleMenuViewItem = ({
  icon,
  isReversed,
  text,
  subMenuItems,
  ...customProps
}, {
  isGroupItem,
  isButtonStyle,
}) => {
  const attributes = Object.assign({}, customProps);

  let item;

  if (isButtonStyle && isGroupItem) {
    item = <ButtonGroup.Button {...attributes} icon={icon} text={text} isReversed isSelected />;
  } else if (isButtonStyle) {
    item = (
      <div className="terra-CollapsibleMenuViewItem">
        <Button {...attributes} icon={icon} text={text} isReversed={isReversed} />
      </div>
    );
  } else {
    item = <Menu.Item text={text} isSelected isSelectable subMenuItems={subMenuItems} />;
  }

  return item;
};

CollapsibleMenuViewItem.propTypes = propTypes;
CollapsibleMenuViewItem.defaultProps = defaultProps;

export default CollapsibleMenuViewItem;

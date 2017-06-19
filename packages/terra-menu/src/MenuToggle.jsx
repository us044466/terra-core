import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';

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
  * Text to display
  **/
  text: PropTypes.string,
};

const defaultProps = {
  isReversed: false,
  text: '',
};

const MenuToggle = ({
  icon,
  isReversed,
  text,
  ...customProps
}) => {
  const attributes = Object.assign({}, customProps);

  return (
    <Button {...attributes} icon={icon} text={text} isReversed={isReversed} />
  );
};

MenuToggle.propTypes = propTypes;
MenuToggle.defaultProps = defaultProps;

export default MenuToggle;

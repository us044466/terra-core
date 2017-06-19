import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'terra-button-group';
import SingleSelectList from 'terra-list/lib/SingleSelectList';
import 'terra-base/lib/baseStyles';
import './MenuItemGroup.scss';

const propTypes = {
  isSelectable: PropTypes.bool,
  isButtonStyle: PropTypes.bool,
  children: PropTypes.array,
};

const defaultProps = {
  isSelectable: false,
  isButtonStyle: false,
  children: [],
};

const MenuItemGroup = ({ isSelectable, isButtonStyle, children, ...customProps }) => {
  const attributes = Object.assign({}, customProps);
  const items = children.map(child => (
    React.cloneElement(child, {
      isButtonStyle,
      isSelectable,
      isGroupItem: true,
    })
  ));

  let group;
  if (isButtonStyle) {
    group = (
      <ButtonGroup {...attributes} isSelectable={isSelectable}>
        {items}
      </ButtonGroup>
    );
  } else {
    group = (
      <SingleSelectList {...attributes} >
        {items}
      </SingleSelectList>
    );
  }

  return group;
};


MenuItemGroup.propTypes = propTypes;
MenuItemGroup.defaultProps = defaultProps;

export default MenuItemGroup;

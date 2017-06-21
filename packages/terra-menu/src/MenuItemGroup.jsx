import React from 'react';
import PropTypes from 'prop-types';
import SingleSelectList from 'terra-list/lib/SingleSelectList';
import 'terra-base/lib/baseStyles';
import './MenuItemGroup.scss';

const propTypes = {
  /**
   * Indicates if the group should have toggle-style selection
  **/
  isSelectable: PropTypes.bool,

  /**
   * Menu.Items to be grouped together
  **/
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  isSelectable: false,
  children: [],
};

const MenuItemGroup = ({ isSelectable, children, ...customProps }) => {
  const attributes = Object.assign({}, customProps);
  const items = children.map(child => (
    React.cloneElement(child, {
      isSelectable,
    })
  ));

  return (
    <SingleSelectList.Item
      {...attributes}
      isSelectable={false}
      content={(
        <SingleSelectList>
          {items}
        </SingleSelectList>
      )}
    />
  );
};


MenuItemGroup.propTypes = propTypes;
MenuItemGroup.defaultProps = defaultProps;

export default MenuItemGroup;

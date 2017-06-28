import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from 'terra-button-group';
import List from 'terra-list/lib/single-select-list';

const propTypes = {
  isButtonStyle: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  isButtonStyle: false,
};


const CollapsibleMenuViewItemGroup = ({
    isButtonStyle,
    children,
    ...customProps
  }) => {
  const attributes = Object.assign({}, customProps);

  if (isButtonStyle) {
    return (
      <ButtonGroup {...attributes}>
        {children}
      </ButtonGroup>
    );
  }

  return (
    <List {...attributes}>
      {children}
    </List>
  );
};

CollapsibleMenuViewItemGroup.propTypes = propTypes;
CollapsibleMenuViewItemGroup.defaultProps = defaultProps;

export default CollapsibleMenuViewItemGroup;

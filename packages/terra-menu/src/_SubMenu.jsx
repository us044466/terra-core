import React from 'react';
import PropTypes from 'prop-types';
import Button from 'terra-button';
import SingleSelectList from 'terra-list/lib/SingleSelectList';
import IconLeft from 'terra-icon/lib/icon/IconLeft';

const propTypes = {
  title: PropTypes.string,
  onBack: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  children: [],
};

const SubMenu = (props) => {
  const header = props.title ? <h1><Button icon={<IconLeft />} onClick={props.onBack} />{props.title}</h1> : null;
  return (
    <div>
      {header}
      <SingleSelectList>
        {props.children}
      </SingleSelectList>
    </div>
  );
};

SubMenu.propTypes = propTypes;
SubMenu.defaultProps = defaultProps;

export default SubMenu;

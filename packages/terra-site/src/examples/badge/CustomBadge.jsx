import React from 'react';
import Badge from 'terra-badge/src/Badge';
import styles from './custom.scss';

const CustomBadge = (props) => {
  return <Badge className={styles.custom} {...props} />;
};

export default CustomBadge;

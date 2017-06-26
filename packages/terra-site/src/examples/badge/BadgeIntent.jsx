import React from 'react';
import Badge from 'terra-badge/src/Badge';
import CustomBadge from './CustomBadge';

const BadgeIntent = () => (
  <div>
    <Badge text="Default" />
    {' '}
    <Badge intent="primary" text="Primary" />
    {' '}
    <Badge intent="secondary" text="Secondary" />
    {' '}
    <Badge intent="positive" text="Positive" />
    {' '}
    <Badge intent="negative" text="Negative" />
    {' '}
    <Badge intent="warning" text="Warning" />
    {' '}
    <Badge intent="info" text="Info" />
    {' '}
    <CustomBadge text="Custom" />
  </div>
);

export default BadgeIntent;

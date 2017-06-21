/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { Route } from 'react-router';
import MenuItemTests from './MenuItemTests';

// Test Cases
import DefaultMenuItem from './DefaultMenuItem';

const routes = (
  <div>
    <Route path="/tests/menu-item-tests" component={MenuItemTests} />
    <Route path="/tests/menu-item-tests/default" component={DefaultMenuItem} />
  </div>
);

export default routes;

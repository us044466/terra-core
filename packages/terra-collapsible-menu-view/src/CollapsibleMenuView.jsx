import React from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Menu from 'terra-menu';
import 'terra-base/lib/baseStyles';
import CollapsibleMenuViewItem from './CollapsibleMenuViewItem';
import CollapsibleMenuViewItemGroup from './CollapsibleMenuViewItemGroup';
import './CollapsibleMenuView.scss';

const propTypes = {
  children: PropTypes.node.isRequired,
};

class CollapsibleMenuView extends React.Component {
  constructor(props) {
    super(props);
    this.setContainer = this.setContainer.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.visibleChildComponents = this.visibleChildComponents.bind(this);
    this.hiddenChildComponents = this.hiddenChildComponents.bind(this);
    this.state = {
      hiddenIndexes: [],
      toggleOpen: false,
      toggleHidden: false,
    };
  }

  componentDidMount() {
    if (this.container) {
      this.resizeObserver = new ResizeObserver((entries) => {
        this.setState({ hiddenIndexes: [], toggleOpen: this.state.toggleOpen, toggleHidden: false });
        this.forceUpdate();
        this.handleResize(entries[0].contentRect.width);
      });
      this.resizeObserver.observe(this.container);
    }
  }

  componentWillUnmount() {
    if (this.container) {
      this.resizeObserver.disconnect(this.container);
      this.container = null;
    }
  }

  setContainer(node) {
    if (node === null) { return; } // Ref callbacks happen on mount and unmount, element will be null on unmount
    this.container = node;
  }

  handleResize(width) {
    // do calculation here
    const availableWidth = width;
    const hiddenIndexes = [];
    let calcWidth = 0;

    for (let i = 0; i < this.props.children.length; i += 1) {
      const child = this.container.children[i];
      if (!child) {
        break;
      }
      calcWidth += child.getBoundingClientRect().width;
      if (calcWidth > availableWidth) {
        hiddenIndexes.push(i);
      }
    }
    // this needs to match arrays
    if (hiddenIndexes.length !== this.state.hiddenIndexes.length) {
      this.setState({ toggleOpen: false, hiddenIndexes });
    }
  }

  visibleChildComponents(children) {
    const visibleChildren = [];
    for (let i = 0; i < children.length; i += 1) {
      if (this.state.hiddenIndexes.indexOf(i) < 0) {
        visibleChildren.push(React.cloneElement(children[i], { isButtonStyle: true, className: 'terra-CollapsibleMenuView-item' }));
      }
    }
    return visibleChildren;
  }

  hiddenChildComponents(children) {
    const indexes = this.state.hiddenIndexes;
    const hiddenChildren = [];
    for (let i = 0; i < indexes.length; i += 1) {
      hiddenChildren.push(React.cloneElement(children[indexes[i]], { isButtonStyle: false }));
    }
    return hiddenChildren;
  }

  render() {
    const { children, ...customProps } = this.props;
    const visibleChildren = this.visibleChildComponents(children);
    const hiddenChildren = this.hiddenChildComponents(children);
    const collapsibleMenuViewClassName = classNames([
      'terra-CollapsibleMenuView',
      customProps.className,
    ]);

    return (
      <div {...customProps} className={collapsibleMenuViewClassName}>
        <div className="terra-CollapsibleMenuView-container" ref={this.setContainer}>
          {visibleChildren}
        </div>
        <div className="terra-CollapsibleMenuView-toggle" >
          <Menu.Item text="..." isButtonStyle>
            <Menu>
              {hiddenChildren}
            </Menu>
          </Menu.Item>
        </div>
      </div>
    );
  }
}

CollapsibleMenuView.Item = CollapsibleMenuViewItem;
CollapsibleMenuView.ItemGroup = CollapsibleMenuViewItemGroup;

CollapsibleMenuView.propTypes = propTypes;

export default CollapsibleMenuView;

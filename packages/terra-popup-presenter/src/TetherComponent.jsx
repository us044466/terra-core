import React from 'react';
import PropTypes from 'prop-types';
import Tether from 'tether';

const ATTACHMENT_POSITIONS = [
  'top left',
  'top center',
  'top right',
  'middle left',
  'middle center',
  'middle right',
  'bottom left',
  'bottom center',
  'bottom right',
];

const propTypes = {
  /**
   * A hash of tether classes which should be changed or disabled.
   */
  classes: PropTypes.object,
  /**
   * The prefix placed at the beginning of the default classes.
   */
  classPrefix: PropTypes.string,
  /**
   * Rule set to pass to tether, contraining the content to by setting 'to', 'attachment', and/or 'pin'.
   * Also allows for class aliasing or 'outOfBoundsClass' and 'pinnedClass'.
   */
  constraints: PropTypes.array,
  /**
   * The content to be tethered.
   */
  content: PropTypes.element,
  /**
   * String pair of top, middle, bottom, and left, center, right.
   */
  contentAttachment: PropTypes.oneOf(ATTACHMENT_POSITIONS).isRequired,
  /**
   * String pair of top and left offset, ie "10px -4px".
   */
  contentOffset: PropTypes.string,
  /**
   * Should tethering be disabled following the initial positioning.
   */
  disableOnPosition: PropTypes.bool,
  /**
   * Should element be tethered to the page.
   */
  isEnabled: PropTypes.bool,
  /**
   * The ability to disable "gpu" and "moveElement" optimizations.
   */
  optimizations: PropTypes.object,
  /**
   * Required element to be presented and tethered to.
   */
  targetRef: PropTypes.func.isRequired,
  /**
   * String pair of top, middle, bottom, and left, center, right.
   */
  targetAttachment: PropTypes.oneOf(ATTACHMENT_POSITIONS),
  /**
   * Can be set to 'visible' or 'scroll-handle'.
   */
  targetModifier: PropTypes.string,
  /**
   * String pair of top and left offset, ie "10px -4px".
   */
  targetOffset: PropTypes.string,
  /**
   * Callback function when each tether component is updated.
   */
  onUpdate: PropTypes.func,
  /**
   * Callback function when the tether is moved.
   */
  onRepositioned: PropTypes.func,
};

const defaultProps = {
  isEnabled: false,
  disableOnPosition: false,
};

class TetherComponent extends React.Component {
  constructor(props) {
    super(props);
    this.setElementNode = this.setElementNode.bind(this);
    this.handleOnUpdate = this.handleOnUpdate.bind(this);
    this.handleOnRepositioned = this.handleOnRepositioned.bind(this);
  }

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  componentWillUnmount() {
    this.destroy();
  }

  setElementNode(node) {
    this.elementNode = node;
  }

  getNodeBounds() {
    const targetBounds = Tether.Utils.getBounds(this.props.targetRef());
    const presenterBounds = Tether.Utils.getBounds(this.elementNode);
    return { targetBounds, presenterBounds };
  }

  handleOnUpdate(event) {
    if (this.props.onUpdate) {
      const bounds = this.getNodeBounds();
      this.props.onUpdate(event, bounds.targetBounds, bounds.presenterBounds);
    }
  }

  handleOnRepositioned(event) {
    if (this.props.disableOnPosition) {
      this.disable();
    }

    if (this.props.onRepositioned) {
      const bounds = this.getNodeBounds();
      this.props.onRepositioned(event, bounds.targetBounds, bounds.presenterBounds);
    }
  }

  disable() {
    if (this.tether) {
      this.tether.disable();
    }
  }

  enable() {
    if (this.tether) {
      this.tether.enable();
    }
  }

  position() {
    if (this.tether) {
      this.tether.position();
    }
  }

  destroy() {
    if (this.elementNode) {
      this.elementNode.parentNode.removeChild(this.elementNode);
    }

    if (this.tether) {
      this.tether.off('update');
      this.tether.off('repositioned');
      this.tether.destroy();
    }

    this.elementNode = null;
    this.tether = null;
  }

  update() {
    const { content } = this.props;

    if (!content) {
      if (this.tether) {
        this.destroy();
      }
      return;
    }

    this.updateTether();
  }

  updateTether() {
    const {
      isEnabled,
      targetRef,
      content,
      contentAttachment,
      contentOffset,
      ...customProps
      } = this.props; // eslint-disable-line no-unused-vars

    const tetherOptions = {
      attachment: contentAttachment,
      element: this.elementNode,
      target: targetRef(),
      ...customProps,
    };

    // Aliased parameters
    if (contentOffset) {
      tetherOptions.offset = contentOffset;
    }
    if (isEnabled !== undefined) {
      tetherOptions.enabled = true;
    }

    if (!this.tether) {
      this.tether = new Tether(tetherOptions);
      this.tether.on('update', this.handleOnUpdate);
      this.tether.on('repositioned', this.handleOnRepositioned);
    } else {
      this.tether.setOptions(tetherOptions);
    }

    this.tether.position();
  }

  render() {
    const {
      classes,
      classPrefix,
      constraints,
      content,
      contentAttachment,
      contentOffset,
      disableOnPosition,
      isEnabled,
      optimizations,
      targetRef,
      targetAttachment,
      targetModifier,
      targetOffset,
      onUpdate,
      onRepositioned,
      ...customProps
    } = this.props;

    return (
      <div {...customProps} ref={this.setElementNode}>
        {content}
      </div>
    );
  }
}

TetherComponent.propTypes = propTypes;
TetherComponent.defaultProps = defaultProps;
TetherComponent.attachmentPositions = ATTACHMENT_POSITIONS;

export default TetherComponent;

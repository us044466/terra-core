import React from 'react';
import ButtonGroup from '../src/ButtonGroup';

const ButtonGroupCompact = () => (
  <div>
    <div>
      <ButtonGroup
        isCompact
        buttons={[<ButtonGroup.Button text="Compact" key="compact1" />,
          <ButtonGroup.Button text="Compact" key="compact2" />]}
      />
    </div>
  </div>
);

export default ButtonGroupCompact;

import React from 'react';
import DatePicker from 'terra-date-picker';
import PropTypes from 'prop-types';

const propTypes = {
  onFocusGain: PropTypes.func,
  onFocusLoss: PropTypes.func,
};

const handleOnChange = (selectedDate) => {
  window.console.log('**handleOnChange** The selected date is: ', selectedDate);
};

const DatePickerOnChange = ({
    onFocusGain,
    onFocusLoss,
    ...customProps
  }) => {
  return (
    <div>
      <DatePicker
        onChange={handleOnChange}
        onFocusGain={onFocusGain}
        onFocusLoss={onFocusLoss}
      />
    </div>
  )
};

export default DatePickerOnChange;

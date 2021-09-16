import React from 'react';
import { Input} from 'antd';
import './styles.css'
export class NumericInput extends React.Component {
  onChange = e => {
    const { value } = e.target;
    const reg = /\B(?=(\d{3})+(?!\d))/g
    if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
      this.props.onChange(value);
    }
  };

  // '.' at the end or only '-' in the input box.
  onBlur = () => {
    const { value, onBlur, onChange } = this.props;
    if(value){
      if (value.charAt(value.length - 1) === '.' || value === '-') {
        onChange(value.slice(0, -1));
      }
    }
    if (onBlur) {
      onBlur();
    }
  };

  render() {
    // const { value } = this.props;
    return (
        <Input className='Numero'
          {...this.props}
          onChange={this.onChange}
          onBlur={this.onBlur}
        />
    );
  }
}
export default (NumericInput);

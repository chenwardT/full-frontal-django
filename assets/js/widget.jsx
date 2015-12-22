import React from 'react';

export default class Widget extends React.Component {
  render() {
    return (
      <span>
        {this.props.text}
      </span>
    );
  }
}
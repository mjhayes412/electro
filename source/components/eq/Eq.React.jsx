'use strict';
import React from 'react';

class Eq extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
  //TODO there's a better way to set this up.
    $(this.refs.low).knob({ height: 40, width: 40, min: -40, value: 0,min: -40, max: 40, thickness: 0.5, change: (v) => {
      this.props.track.channel.low.gain.value = v;
      console.log(v);
    }});

    $(this.refs.mid).knob({ height: 40, width: 40, min: -40, value: 0,min: -40, max: 40, thickness: 0.5, change: (v) => {
      this.props.track.channel.mid.gain.value = v;
      console.log(v);
    }});

    $(this.refs.high).knob({ height: 40, width: 40, min: -40, value: 0,min: -40, max: 40, thickness: 0.5, change: (v) => {
      this.props.track.channel.high.gain.value = v;
      console.log(v);
    }});
  }

  componentDidUpdate(){
  }

  render(){
    return (
      <div className='eq'>
        <div type='text' ref='low'></div>
        <div type='text' ref='mid'></div>
        <div type='text' ref='high'></div>
      </div>
    );
  }
}

export default Eq;

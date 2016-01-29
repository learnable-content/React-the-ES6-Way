import React from 'react'
import ReactDOM from 'react-dom'

class ReactReadingTime extends React.Component {
  render() {
    return (
      <div className='container'>
        Hello React!
      </div>
    );
  }
}

ReactDOM.render(<ReactReadingTime/>, document.getElementById('react'));

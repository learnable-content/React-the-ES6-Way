import React from 'react'

export default class ReadingTime extends React.Component {
  static propTypes = {
    wordsPerMinute: React.PropTypes.number
  };

  static defaultProps = {
    wordsPerMinute: 270
  };

  constructor(props) {
    super(props)

    this.state = {
      readTime: 0
    }
  }

  componentWillMount() {
    this.updateReadingTime(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateReadingTime(nextProps);
  }

  updateReadingTime(props) {
    const words = this.countWords(props.text);
    const readTime = Math.round(words / props.wordsPerMinute);

    this.setState({ readTime });
  }

  countWords(text) {
    return text.split(/\s+/).length
  }

  render() {
    return (
      <div>
        <p>
          Estimated read time:<br /><br />
          <span>{this.state.readTime}</span>
        </p>
      </div>
    )
  }
}

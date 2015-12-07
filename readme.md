# Sensible defaults and finishing up!!!

We're almost done creating our widget. We just need to wrap up a few more
things. One thing you may have noticed is that we are using a static selector
to grab the DOM node where the article lives. This works for our use case, but
other users may want to use a different selector. What we'll want to do is
add a prop for this, so that it can be defined. Let's refactor our `ReadingTime`
component to allow this.

First, we'll add it to the `propTypes`:
```es6
static propTypes = {
  wordsPerMinute: React.PropTypes.number,
  selector: React.PropTypes.string
}
```

Then we can add it to the `defaultProps`, and we'll use our current selector
as the default:
```es6
static defaultProps = {
  wordsPerMinute: 270,
  selector: '[data-article]'
}
```

Ok, so now we've defined the props. Let's update our code to use these props.
We will only need to update the `updateReadingTime` function to use this
selector, as that's the only place in our component where the selector is used:
```es6
updateReadingTime = () => {
  let { selector, wordsPerMinute } = this.props,
      article = document.querySelector(selector),
      text = this.getText(article),
      wordCount = this.countWords(text),
      readTime = Math.round(wordCount / wordsPerMinute)

  this.setState({ readTime: readTime })
}
```

Great, now our component is way more flexible, and users can pass in a custom
selector! You may have noticed that I added in a bit of destructuring there
too in order to make accessing our variables easier. Gotta love ES6!!

Ok, we're are almost there, I just want to add one more piece to make it just
a bit more customizable, and to be able to demonstrate one more neat feature
of destructuring. Let's allow the user to customize the text color inside the
widget. We'll add one more prop to our `propTypes` and `defaultProps`:
```es6
static propTypes = {
  wordsPerMinute: React.PropTypes.number,
  selector: React.PropTypes.string,
  textColor: React.PropTypes.string
}

static defaultProps = {
  wordsPerMinute: 1,
  selector: '[data-article]',
  textColor: 'blue'
}
```

The last thing we need to do is update our render method:
```es6
render() {
  const { textColor, ...rest } = this.props,
        { readTime } = this.state,
        minutes = readTime === 1 ? 'minute' : 'minutes'

  return (
    <div {...rest}>
      <p style={{ color: textColor }}>
        Estimated read time:<br /><br />
        <span>{readTime} {minutes}</span>
      </p>
    </div>
  )
}
```

What I've done here is use the power of ES6 destructuring to be able to grab
just the variables I need from the props, and then assign the "rest" of them
to a variable so they can be passed into our components main div. This allows
us to have some static props that we need to use in our component, but still
allow other developers to pass in arbitrary props and they will end up on the
div. Pretty awesome! I also used the `textColor` prop to set the text color
in our widget.

That's it! We've finished our whirlwind tour of React, and you should now be
able to go out into the world and write some amazing ReactJS applications!

Congratulations!

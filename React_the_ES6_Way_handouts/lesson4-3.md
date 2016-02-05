![](headings/4.3.png)

# Sensible defaults and finishing up

We're almost done creating our widget. We just need to wrap up a few more things. Lets allow the user to customize the text color inside the widget. We'll add one more prop to our `propTypes` and `defaultProps`:

```es6
static propTypes = {
  wordsPerMinute: React.PropTypes.number,
  textColor: React.PropTypes.string
}

static defaultProps = {
  wordsPerMinute: 1,
  textColor: 'blue'
}
```

Great, now our component is more flexible, because users can pass in a custom color!

Ok, we're are almost there, I just want to add one more piece to make it a bit more customizable, and to be able to demonstrate one more neat feature of destructuring.

The last thing we need to do is update our `render` method:

```es6
render() {
  const { textColor, ...rest } = this.props;
  const { readTime } = this.state;
  const minutes = readTime === 1 ? 'minute' : 'minutes';

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

What I've done here is use the power of ES6 destructuring to be able to grab just the variables I need from the props, and then assign the "rest" of them to a variable so they can be passed into our component's main `div`. This allows us to have some static props that we need to use in our component, but still allow other developers to pass in arbitrary props and they will end up on the
`div`. Pretty awesome! I also used the `textColor` prop to set the text color in our widget.

That's it! We've finished our whirlwind tour of React, and you should now be able to go out into the world and write some amazing ReactJS applications!

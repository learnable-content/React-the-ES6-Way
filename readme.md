# Refactoring!!

There are a few places where we can clean up some of our code and make this
look a bit better. You may have noticed that when we added the `onChange`
handler in the last lesson that we used the exact same code to get a new reading
time that we did in the `componentDidMount` function. Let's update the
`componentDidMount` function to call this new function that we created to
calculate the reading time:
```es6
componentDidMount() {
  this.updateReadingTime()
}
```

Refresh your page and make sure it works. And it does!

In the last lesson we also added the word `minutes` to our reading time
output. But what about the case where the number is `1`? That's not going to
make much sense. We're going to need a little bit of logic to determine
whether or not to use the plural form of minute or not. Lets add some
logic in the render method to accomplish this. Update your `render` method to
look like this:
```es6
render() {
  let props = this.props,
      { readTime } = this.state,
      minutes = readTime === 1 ? 'minute' : 'minutes'

  return (
    <div {...props}>
      <p>
        Estimated read time:<br /><br />
        <span>{readTime} {minutes}</span>
      </p>
    </div>
  )
}
```

Ok so we've introduced a few new concepts that may seem strange here. Let's
start with this strange looking variable assignment:
```es6
{ readTime } = this.state
```

This is called `destructuring` and is an ES6 feature that makes assigning object properties
to individual variables super easy. Remember what our `state` object looks like:
```json
{
  readTime: 1
}
```

By using the destructuring syntax, you can assign variables to the names of
the keys in the object, and the variable will receive the value of that key.
Pretty neat! Now any time we want to use the variable from the state we can
just type `readTime` instead of `this.state.readTime`. Saves a **lot** of
typing.

The next thing we should do is change our variable assignment from a `let`
to a `const`. This is good practice when creating variables that we don't intend
to reassign. Anything inside the render method should be immutable, so we can convey that message
by changes all the assignments to a `const`:
```es6
render() {
  const props = this.props,
        { readTime } = this.state,
        minutes = readTime === 1 ? 'minute' : 'minutes'

  return (
    <div {...props}>
      <p>
        Estimated read time:<br /><br />
        <span>{readTime} {minutes}</span>
      </p>
    </div>
  )
}
```

That's it for our refactoring! Our little app is looking pretty good!

## Next lesson...

We've got one final lesson, and we're going to fine tune our widget and give
it a few more defaults...

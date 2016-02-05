![](headings/4.2.png)

# Refactoring

In the last lesson we also added the word `minutes` to our reading time output. But what about the case where the number is `1`? That's not going to make much sense. We're going to need a little bit of logic to determine whether or not to use the plural form of minute or not. Lets add some
logic in the render method to accomplish this. Update your `render` method to look like this:

```es6
render() {
  const { props } = this;
  const { readTime } = this.state;
  const minutes = readTime === 1 ? 'minute' : 'minutes';

  return (
    <div {...props}>
      <p>
        Estimated read time:<br /><br />
        <span>{readTime} {minutes}</span>
      </p>
    </div>
  );
}
```

Ok so we've introduced a few new concepts that may seem strange here. Let's start with this strange looking variable assignment:

```es6
{ readTime } = this.state
```

This is called `destructuring` and is an ES6 feature that makes assigning object properties to individual variables super easy. Remember what our `state` object looks like:

```js
{
  readTime: 1
}
```

By using the destructuring syntax, you can assign variables to the names of the keys in the object, and the variable will receive the value of that key. Pretty neat! Now any time we want to use the variable from the state we can just type `readTime` instead of `this.state.readTime`. Saves a **lot** of typing.

You may have also noticed that when assigning variables in our `render` method we used `const`. This is good practice when creating variables that we don't intend to reassign.
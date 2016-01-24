# Finishing the ReadingTime component

We're going to go ahead and finish up the `ReadingTime` component in this
lesson and we'll see how updating state makes the UI update.

First we're going to add a function that is going to simply count the number
of words in a string of text that is passed into it.

```es6
countWords(text) {
  return text.split(/\s+/).length
}
```

The `countWords` function takes a string, splits it wherever there is a
space and counts how many words there are.

## Component lifecycles

The next thing we need to do is estimate what the reading time is going to be.
We *could* execute that code in the constructor of
the component, but if we did that, the component would not be properly updated
when it received new props from the parent component. We're going to use React's
lifecycle hooks to run this code any time the component receives props. Our
component is going to receive new props any time the `textarea` on the parent
component is updated. There are quite a few
[lifecycle hooks in React](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods).
For this use case, we'll be using the `componentWillReceiveProps` hook, so let's add
this to our `ReadingTime` component. React convention is to put this function
immediately after the constructor function and before any other code:

```es6
componentWillReceiveProps(nextProps) {
  const words = this.countWords(nextProps.text);
  const readTime = Math.round(words / nextProps.wordsPerMinute);

  this.setState({ readTime });
};
```

Ok so what's happening here? The `componentWillReceiveProps` lifecycle hook
receives one argument, and that's an object containing the new props. We'll use
these new props to calculate the new reading time and set the state.

THe first thing we do is use our `countWords` function to count the number of
words in the new string, and then just divide that by the `wordsPerMinute` prop
and we're done! We then just set the state and we're good to go! But we can't simply update the value
of `this.state`. We need to treat the component state as immutable, and use
React's internal methods to update the state. That's why we use the `setState`
method to set the state. Using this method also triggers a DOM update, so React will
update the Virtual DOM, perform the diff, and update the pieces of the DOM that have changed.

But wait a minute! What's this weird syntax we're using? Shouldn't there be a
key *AND* a value inside of that object? This is just some more new ES6 syntax
that allows for more shorthand assigning of variables! It will set the key to
the name of the variable passed in, and the value to the value of that variable!

Up until now our component has always said that the reading time is 0.
Unfortunately, it's still going to, because we only have 5 words in our text
box. So go ahead and update the initial `text` state variable in the constructor
of the `ReactReadingTime` component to something really, really long, and you
should see the estimated reading time jump up when the page loads.

If you've done everything right it should work! You won't even see that initial
value of 0 on the page (although it is actually rendered initially) because
all of React's updating happens so very fast.

## Next lesson...

We've completed 3 sections in this tutorial and are ready to move on to the
final one and tie all of this together! We'll have a truly dynamic application
and will do some great refactoring... Let's go!!!

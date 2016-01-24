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

The next thing we need to do is estimate what the reading time is going to be
when the component mounts. We *could* execute that code in the constructor of
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

## JSX Spread Operators

We're going to add some classes to our component to help make it look just a
little bit prettier.

If you'll recall from our `ReactReadingTime` component, when we rendered the
`ReadingTime` widget, we added some classes to it:
```jsx
<ReadingTime text={this.state.text} className='col-lg-2 well' />
```

But if you inspect the DOM that it actually rendered, these class names are
nowhere to be found. This is because those class names are just passed into
our custom component as `this.props.className` and because we didn't do
anything with them, they just died there.

We can do the following to add these classes to our markup:
```es6
render() {
  return (
    <div className={this.props.className}>
      <p>
        Estimated read time:<br /><br />
        <span>{this.state.readTime}</span>
      </p>
    </div>
  );
}
```

And this will work just fine. The names of the classes in the `className` prop will be
passed into the `div` and rendered into the DOM. But what if later we want to
expand this component and add more props? Then we have to add another attribute
to that `div` to pass the new props in. What if we decide to release this module
into the wild on npm and the end user wants to add custom attributes to this
component? That's where JSX spread operators come into play. With spread
operators we can rewrite that like this:
```es6
render() {
  const {text, ...tags} = this.props;

  return (
    <div {...tags}>
      ...
    </div>
  );
}
```

What's going on there? What we're saying here is to take all the props and
apply them to our `div`. So if our props looked like this:
```javascript
{
  className: 'foo',
  name: 'bar'
}
```

Then the component would end up looking like this:
```es6
<div className='foo' name='bar'></div>
```

This allows us to pass in any number of arbitrary props to the component that
we as the module developers may never think of. It also saves a whole lot of
typing. :) Which makes for developer happiness.

So if you update your code to use those spread operators, you should have a
nice well drawn around your reading time widget! We're getting there!

## Next lesson...

We've completed 3 sections in this tutorial and are ready to move on to the
final one and tie all of this together! We'll have a truly dynamic application
and will do some great refactoring... Let's go!!!

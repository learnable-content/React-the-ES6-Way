# Finishing the ReadingTime component

We're going to go ahead and finish up the `ReadingTime` component in this
lesson and we'll see how updating state makes the UI update.

First we'll need to add some boilerplate code that will count the actual
words inside of the `textarea`. This code is pretty boring, and
doesn't have anything to do with React, so we'll just paste it in:
```es6
countWords(text) {
  return text.split(/\s+/).length
}

getText(domElement) {
  let text = '',
      length = domElement.childNodes.length

  for (var i = 0; i < length; i++) {
    let el = domElement.childNodes[i]

    if (el.nodeType != 8) {
      if (el.type && el.type.match(/(textarea|input)/)) {
        text += el.value
      } else {
        text += el.nodeType === 3 ? el.nodeValue : this.getText(el)
      }
    }
  }

  return text
}
```

Time for a quick rundown of these functions. The `getText` function traverses
all of the children of the `domElement` parameter, grabs all the text that
is inside of them and concatenates it into one long string.

The `countWords` function takes a string, splits it wherever there is a
space and counts how many words there are. Nothing too exciting here, but we
will need these two functions to get our reading time estimator to work.

## Component lifecycles

The next thing we need to do is estimate what the reading time is going to be
when the component mounts. We can't execute that code in the constructor of the
component, because when the component is created the DOM has not yet been rendered,
so the word count would always be zero. We're going to use React's lifecycle hooks to run
this code immediately after the DOM has been rendered. There are quite a few
[lifecycle hooks in React](https://facebook.github.io/react/docs/component-specs.html#lifecycle-methods).
For this use case, we'll be using the `componentDidMount` hook, so let's add
this to our `ReadingTime` component. React convention is to put this function
immediately after the constructor function and before any other code:
```es6
componentDidMount() {
  let article = document.querySelector('[data-article]'),
      text = this.getText(article),
      readTime = Math.round(this.countWords(text) / this.props.wordsPerMinute)

  this.setState({ readTime: readTime })
}
```

Ok so what's happening here? The first thing we're doing is assigning a reference to the
DOM node containing the article text. Remember a few lessons ago
when we created the `textarea`, and the containing `div` had that data attribute
on it? That's why we put that there.

We're then passing that element into our `getText` function to pull all the text
from the container and dump it into a string, which will then be assigned to the
`text` variable. Then we're getting the total word count using `this.countWords`
and dividing it by the `wordsPerMinute` prop that we defined in an earlier lesson.

After we've calculated what the reading time is going to be for this article
it's as simple as setting the state! But we can't simply update the value
of `this.state`. We need to treat the component state as immutable, and use
React's internal methods to update the state. That's why we use the `setState`
method to set the state. Using this method also triggers a DOM update, so React will
update the Virtual DOM, perform the diff, and update the pieces of the DOM that have changed.

Up until now our component has always said that the reading time is 0.
Unfortunately, it's still going to, because we only have 5 words in our text
box. So go ahead and update the `defaultText` variable in the `render` method
of the `ReactReadingTime` component to something really, really long, and you
should see the estimated reading time jump up when the page loads.

You'll notice that you have to refresh the page to get an updated value. This
is because the `componentDidMount` function will be called once, and only
once, when the component first mounts. Our hot loader just inserts new code
into the existing code, and does not cause the component to remount, so we
have to refresh the page.

If you've done everything right it should work! You won't even see that initial
value of 0 on the page (although it is actually rendered initially) because
all of React's updating happens so very fast.

## JSX Spread Operators

We're going to add some classes to our component to help make it look just a
little bit prettier.

If you'll recall from our `ReactReadingTime` component, when we rendered the
`ReadingTime` widget, we added some classes to it:
```jsx
<ReadingTime className='col-lg-2 well' />
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
  )
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
  let props = this.props

  return (
    <div {...props}>
      ...
    </div>
  )
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

# Event Handlers

So far we've built our little app to count the number of words in an existing
article and display that in our widget. This works, but isn't very exciting
and doesn't respond to any changes on the page. Let's use some event handlers
to trigger updates on our `ReadingTime` widget. Open up the `ReadingTime`
component and add an `onChange` handler to the `textarea`.
```es6
<textarea
  defaultValue={defaultText}
  onChange={this.textChanged}
  className='form-control'
  style={{ height: '500px', resize: 'none' }}>
</textarea>
```

We've just updated the textarea to call the component's `textChanged` method any time the
`textarea` value changes. Ok, so now we need to implement this method. Let's
add this function at the top of our component:
```es6
textChanged = () => {

}
```

## Arrow functions

You may notice some funny looking syntax there. What's with this fat arrow
business `=>`? Arrow functions are a simplified function added in ES6. They have a
few benefits, but the one we're counting on here is called "lexical scope". The `this`
variable in an arrow function will be the context in which the function expression was called,
not the caller. If you've ever used `this` in an event handler
and been surprised that it's a DOM node instead of an object, the arrow function
is what you've been waiting for. In our case `this` is a reference to the component instance.

## Making the component update

Ok, so now we've trapped that `onChange` event, but what do we do with it? We
need to tell the `ReadingTime` component to update the word count when this
happens. But how do we communicate with it? React provides a way to do this
called [`refs`](https://facebook.github.io/react/docs/more-about-refs.html).
We can add a "reference" to a component, and then access its internal
methods inform the parent component. Let's add a `ref` to the `ReadingTime` component:
```es6
<ReadingTime ref='readingTime' className='col-lg-2 well' />
```

Now that we have a reference to the component, we can tell it to update:
```es6
textChanged = () => {
  this.refs.readingTime.updateReadingTime()
}
```

When you add a `ref` to a component, that component is then added to a `refs`
object on the parent component. We can access it through `this.refs` and
then the name of the ref. At this point, we have the instance of the element
and call tell it to do whatever we want! Now we'll need to implement the
`updateReadingTime` function in the `ReadingTime` component. Go ahead and open
that file and let's add it:
```es6
updateReadingTime = () => {
  let article = document.querySelector('[data-article]'),
      text = this.getText(article),
      readTime = Math.round(this.countWords(text) / this.props.wordsPerMinute)

  this.setState({ readTime: readTime })
}
```

That's all we need to do! Now you will be able to happily type away and the widget
will update automatically! Awesome stuff! Of course, because we need to add
270 words to make the reading time increase by 1 minute, it will take quite
a few words to make it update. To make it more responsive go ahead and update
the default `wordsPerMinute` to something much lower (like 1) and watch it
update right away. Just make sure you move it back up to 270. :)

Let's update the `ReadingTime` widget to make the output look just a bit nicer:
```es6
return (
  <div {...props}>
    <p>
      Estimated read time:<br /><br />
      <span>{this.state.readTime} minutes</span>
    </p>
  </div>
)
```

All we did there was just add the word `minutes` at the end of the reading time
count.

## Next lesson...

We're almost there! We just need to spend some time cleaning a few things up...

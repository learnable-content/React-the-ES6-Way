# The Virtaul DOM

So up until now you may have been wondering how React can possibly manage
to update the state of your components? You may have also heard of this
magical sounding thing called the Virtual DOM. Well the Virtual DOM is how
React works it's magic.

Imagine looking at all of the HTML markup on your page, and being able to
just take a snapshot of it in your memory, and just know when any little piece
of it has changed. That's essentially what the Virtual DOM is.

When your application is initially rendered into the DOM, with it's initial
state, React takes a "snapshot" of this and holds it in memory. This is the
Virtual DOM.

Any time a DOM update is triggered, React updates the Virtual DOM to reflect
the new state of the app. It then does what's called a DOM diff, and selects
only the pieces the DOM that have changed. It compares the Virtual DOM, with
the actual DOM, and only updates the parts of the DOM that have changed.

This makes updating the application state extremely fast and efficient, as
we do not have to update the entire page to reflect the new state of the app.
Also, we, as developers, do not have to programatically get the reference to
the DOM node that needs to be updated, and then perform the update ourselves.
We simply change a variable in the state tree and let React do all the work
for us.

## Putting it into practice

Ok awesome. This is great. But let's see it in action. Do you remember when
we created the constructor for our component in the last lesson? We set
the initial state of the app:
```es6
this.state = {
  readTime: 0
}
```

Let's use that state to display something in our widget. Update the render
method of your `ReadingTime` component to look like this:
```es6
render() {
  return (
    <div>
      <p>
        Estimated Read Time:<br /><br />
        <span>{this.state.readTime}</span>
      </p>
    </div>
  )
}
```

For the purposes of demonstration

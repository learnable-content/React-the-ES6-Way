![](headings/1.1.png)

# ReactJS the ES6 Way

Welcome to ReactJS, the ES6 way! My name is Darin Haener, and I'll be taking
you on a whirlwind introductory tour of ReactJS, and as the course name
suggests, we'll be doing it the ES6 way!

React is a unique JavaScript library in that it is *only* the "V" in MVC.
Meaning that it is only used on the View layer in web applications. This
allows it to be narrowly focused on doing one thing and doing it well.

React uses many innovative technologies to create a fast, modular, and
easy to use interface library.

## The Virtual DOM

This is one term you'll hear thrown around a lot in the React community,
and it is what React uses to make page updates blazing fast and efficient.
We'll be discussing this in more detail later.

## ES6

Hopefully, if you're taking this course, you've made yourself at least a little
bit familiar with the newest JavaScript specification - ECMAScript 2015 - also
known as ES6. We'll be using ES6 to create our React components in this
class, because it's awesome, and makes programming in JavaScript even more
fun.

ES6 allows you do to neat things like create classes:

```es6
import React from 'react';

class MyComponent extends React.Component {
  ...
}
```

As you can see you can easily import modules and extend other
classes! Awesome stuff, and we'll be using these new idioms to make our
components clean and easy to code.

Although [browsers are improving their ES6 support](https://kangax.github.io/compat-table/es6/), for now we'll need to compile our code into ES5. We'll use [Babel](https://babeljs.io/) for this task.


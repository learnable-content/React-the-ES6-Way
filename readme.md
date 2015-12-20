# Development Environment

Let's get your development environment up and running so that we can start
writing some code shall we?

## NVM

Unlike npm, NVM *is* an acronym and stands for what you think it does(no, not
nevermind), "Node Version Manager". NVM allows us to have multiple, self
contained, versions of Node running on the same system. While not entirely
necessary, it is very handy when working on multiple projects that are running
different version of Node.  It also makes it super easy to install newer
versions of Node, and since it seems like lately theres a new version released
every other week, it's a great tool to have. If you don't agree with any of
this, or just plain can't get it installed, feel free to skip this section, as
it's not *required* to complete this course.

### OS X

The first thing to do is to ensure that you have XCode installed. So open up
your terminal and type:
```bash
$ xcode-select --install
```
If it's already installed you'll get an error message that reads something like
this:
```bash
xcode-select: error: command line tools are already installed, use "Software Update" to install updates
```
You're good to go and can move on. Otherwise, a window will pop up prompting
you to install XCode. Go ahead and click install and grab a cup of coffee
while it downloads and installs.

### Linux

On Linux, you need to make sure you have the `build-essential` and `libssl-dev`
packages installed:
```bash
$ apt-get install build-essential libssl-dev
```

### Install NVM

Once those dependencies are installed, you can go ahead and run the install
script using either curl or wget:
```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash
```

After the install script runs all you have to do is source it from your shell:
```bash
$ . ~/.nvm/nvm.sh
```

To make it source nvm upon every login just add the following to your `~/.bashrc`,
`~/.profile`, or `~/.zshrc` file:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

That's it! NVM is now installed. For more information and troubleshooting help
visit the [NVM Homepage](https://github.com/creationix/nvm)

### Windows

I didn't forget about you Windows users. NVM is actually unavailable on Windows.
There are a few alternatives:
  * [nvmw](https://github.com/hakobera/nvmw)
  * [nvm-windows](https://github.com/coreybutler/nvm-windows)
  * [nodist](https://github.com/marcelklehr/nodist)

If any of these don't work well for you, don't worry about it, you can just
use one version of Node.

## Installing Node

For those of you who were able to install NVM, congratulations! Installing
Node is as easy as this:
```bash
$ nvm install 5.1.1
```

That's it! So go ahead and install Node 5.1.1 and we'll be on our way!

If you weren't able to install NVM, or are using Windows, just go to the
[Node.js](https://nodejs.org/en/) site and download the installer for the
latest version and install it.

## Installing npm

You're done already. npm is installed alongside Node. Woohoo!

## Installing React

Next we're going to go ahead and get React installed. As of React 0.14, it
is broken up into several modules. `React` and `ReactDOM` are the two major
ones, and what we will start with.

But first we need to create a folder for our app so we have a place to store
all of this stuff. Go into whatever directory you like to store all of your code
in and make a new directory inside of that one:
```bash
$ mkdir react-reading-time
```

By the way, we'll be making a small reusable React component in this tutorial
that will show estimated reading time for an atricle. Neat eh?

Now let's `cd` into that directory and create a boilerplate `package.json` file:
```bash
$ cd react-reading-time
$ npm init --yes
```
Using the `--yes` flag just skips all prompts and uses the defaults to
initialize the `package.json` file.

After this is done we can install `React` and `ReactDOM`:
```bash
$ npm install --save-dev react react-dom
```

You'll notice that we added the `--save-dev` flag. This tells npm to add both of
those packages to the `devDependencies` section of our `package.json` file.
We're saving it as a development dependency because this little module will
likely be a part of a bigger application that will already have React installed.

Great! React is now installed and all we need to do now is install a few more
packages and get our development server up and running!

## Development server

In order to get our development server up and running we're going to have to
install a few modules, and create a couple of new files. Let's start by
installing a few things.

### Webpack

We're going to use [Webpack](https://webpack.github.io/) to pipe our ES6 code through
Babel and bundle the ES5 output for optimal download and execution speed.
Webpack also provides a development server.

With the development server our assets will be `hot-reloading`, which means
any changes we make to our included JavaScript or CSS files will be automatically
compiled, updatedm in the bundle, and injected into the existing browser tab without
us having to reload to see our changes. Now THAT is awesome stuff.

Let's begin by installing Webpack. We will be installing Webpack globally
so that we have access to the Command Line tools. We do that by using the
`-g` flag:

```bash
$ npm install -g webpack
```

#### Install Global?!?!

Whoa, whoa, whoa, wait a minute. What's this `install global` stuff mean
anyways? Up until now we've been installing all of our packages locally,
meaning that npm fetches the modules, and installs them in the `/node_modules`
directory in the root of our app. This is great for modules that *only* our app
is dependent on, or modules that don't have a [CLI](https://en.wikipedia.org/wiki/Command-line_interface),
but for things like Webpack or Grunt this is necessary.


### Babel

Ok now that we have that all cleared up let's move on and install all of the
Babel dependencies we will need:
```bash
$ npm install --save-dev babel babel-core babel-loader
```

We'll also need to install the babel preset modules so it knows how to
transpile all of our code:
```bash
$ npm install -s-ave-dev babel-preset-es2015 babel-preset-react babel-preset-stage-0
```

Great! Babel and all of the dependencies related to Babel have been installed.
But wait a minute! At the end of the install npm complained in big bright red
letters: `UNMET PEER DEPENDENCY webpack@^1.0.0`. But we just installed Webpack
didn't we? We did! But if you'll remember we installed it globally. When npm
was resolving [peer dependencies](https://docs.npmjs.com/files/package.json#peerdependencies)
it detected that we didn't have Webpack installed anywhere in our `node_modules`
directory, and we don't, so let's install it locally now.
```bash
$ npm install --save-dev webpack
```

#### Peer Dependencies?!?!

Wait up a second, now what's a peer dependency? Simply stated, it's a module
that has code that is needed for the parent module to run properly, but shouldn't
necessarily be included with the module. For instance, if you're writing a reusable
React component that you would like to publish on npm for the whole world to
use, it's not really a great idea to include React as a dependency. It's
inferred that the person using this module is already going to have React
installed in their project, and therefore not necessary to include in the
dependency tree.

### Webpack Dev Server and React Hot Loader

These are the two pieces that allow us to do the hot-reloading that we were
talking about earlier. Let's go ahead and install them:
```bash
$ npm install --save-dev webpack-dev-server react-hot-loader
```

### Configure the server

In order to configure the server we're going to have to create a configuration
file for Webpack. This isn't a Webpack class, so I won't go into the details.
First create a directory for our example application, and create the config file:
```bash
$ mkdir example
$ cd example
$ touch webpack.config.js
```

Now open up that file and copy the following code in:
```js
var webpack = require('webpack');

module.exports = {
  entry: {
    'react-reading-time': [
      'webpack-dev-server/client?http://localhost:8881/',
      'webpack/hot/only-dev-server',
      './example/react-reading-time.jsx'
    ]
  },
  output: {
    path: __dirname,
    filename: "[name].js",
    publicPath: 'http://localhost:8881/',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [
      { test: /\.jsx$|\.es6$|\.js$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
      { test: /\.scss$|\.css$/, loader: 'style-loader!style!css!sass' }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  devtool: "eval-source-map"
};
```

Awesome! We've got our Webpack configuration in place. Now let's add some scripting
commands to our `package.json` file so we can easily start it up. Open up `package.json`
and add the following line in the `scripts` object:
```json
"start": "webpack-dev-server --config ./example/webpack.config.js --hot --port 8881"
```

We won't be doing any testing in this tutorial, so go ahead and remove the "test"
line. Your `scripts` object should now look like this:
```json
"scripts": {
  "start": "webpack-dev-server --config ./example/webpack.config.js --hot --port 8881"
}
```

This will give us the `npm start` command which we can use to fire up our development
server.

Now we can fire up our development server. Let's give it a shot:
```bash
$ npm start
```

You should see Webpack initialize and try to compile our bundle. It's going to
complain and tell you that it can't find `example/react-reading-time.jsx`, and
that's ok because we haven't created that file yet! We'll be doing that shortly!

You can also visit `localhost:8881` and see the glorious web server in action.
Although there isn't much to see just yet...

## Next lesson.....

Phew! After a whirlwind tour of npm and Webpack, we're ready to create a few
more files that we need to get our application going....

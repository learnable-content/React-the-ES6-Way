# What's this npm thing anyways?

npm, commonly referred to as "node package manager" is just that. It's a package
manager for node. Although, npm does *not* stand for "node package manager".
I won't go into the details of that, but if you'd like to, you can read all
about it [here](https://docs.npmjs.com/misc/faq#if-npm-is-an-acronym-why-is-it-never-capitalized).

npm makes it really easy to install, and maintain specific versions of
JavaScript packages without the old copy and paste that we used to have to do
back in the "old days".

Application requirements are defined in a file that typically lives in the
root directory of your application called package.json:

```json
{
  "name": "My Cool App",
  "version": "1.0.0",
  "description": "The most awesome nebulous app ever made",
  "author": "Tony Stark <foo@bar.com> (https://github.com/i-am-fictitious)",
  "license": "ISC",
  "devDependencies": {
    "react-hot-loader": "1.3.0",
    "webpack": "1.12.6",
    "webpack-dev-server": "1.12.1"
  },
  "dependencies": {
    "babel-cli": "6.2.0",
    "babel-core": "6.1.21",
    "babel-loader": "6.2.0",
    "babel-polyfill": "^6.2.0",
    "babel-preset-es2015": "6.1.18",
    "babel-preset-react": "6.1.18",
    "babel-preset-stage-0": "6.1.18",
    "babel-runtime": "6.1.18",
    "css-loader": "^0.23.0",
    "express": "4.13.3",
    "extract-text-webpack-plugin": "^0.9.1",
    "history": "~1.13.1",
    "node-sass": "^3.4.2",
    "normalize.css": "^3.0.3",
    "react": ">=0.14.2",
    "react-dom": ">=0.14.2",
    "sass-loader": "^3.1.2",
    "style-loader": "^0.13.0"
  }
}
```

As you can see, the `package.json` files not only specifically says what
JavaScript modules we need to run our application in the `dependencies`
section, but it also includes the modules that aren't needed at run-time,
but we need in order to develop our application, in the `devDependencies`
section. It also includes some ancillary information that is needed if we
are going to push our package up to npm.

Let's now dive into what some of the weird characters and squiggly lines
that you see in front of some of the version numbers mean.

We'll start with the more obvious `>=`. It simply means "install the newest
version of this package that has at least this version number". Nothing too
ground breaking there, but what about this squiggly line business?

Let's take a look at the `history` entry in our `package.json` file:
```json
"history": "~1.13.1"
```
This is called [tilde ranges](https://docs.npmjs.com/misc/semver#tilde-ranges-1-2-3-1-2-1),
and means that it allows the version number to change based on whether or not
the patch or minor version number is specified. In our current setup, any
version greater than or equal to `1.13.1` or less than `1.14.0` will be
an acceptable package. Now, had we specified it this way:
```json
"history": "~1.13"
```
then the rules change. In this scenario, npm will accept anything that is
greater than or equal to `1.13.0` and less than `1.14.0`. Again, if we remove
one more level of versioning in our dependency:
```json
"history": "~1"
```
the rules change yet again. Here, npm will accept any version that is greater
than or equal to `1.0` and less than or equal to `2.0`.

Next we'll take a quick peek at the [caret ranges](https://docs.npmjs.com/misc/semver#caret-ranges-1-2-3-0-2-5-0-0-4)
that are seen in our `package.json` file:
```json
"sass-loader": "^3.1.2"
```
From npm:
> Allows changes that do not modify the left-most non-zero digit in
> the [major, minor, patch] tuple. In other words, this allows patch and minor
> updates for versions 1.0.0 and above, patch updates for versions 0.X >=0.1.0,
> and no updates for versions 0.0.X.

Essentially, this means "give me the newest version of this package that
doesn't have a breaking change". Typically when a package author using
[semver](https://docs.npmjs.com/misc/semver) makes a relatively minor, but
breaking change to their module, they will bump the minor version. So a
`0.1.x` package will become `0.2.0`. Let's say that we had a package that was
at version `0.1.3` and we were using caret ranges. During installation npm
finds two newer version of this package: `0.1.4` and `0.2.0`. Because we specified
a carat range, npm will select the `0.1.4` version.


That's all we are going to cover in this section in regards to npm and semantic
version, but there is a lot more information about this on the npm [semver](https://docs.npmjs.com/misc/semver)
page if you'd like to dive into it a little deeper.

## Next lesson...

Let's get our development environment setup so we can finally get started
with some code...

# namesake-cli &middot; [![Version](https://img.shields.io/npm/v/namesake-cli.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/namesake-cli) [![License](https://img.shields.io/npm/l/namesake-cli.svg?style=flat-square&maxAge=3600)](https://www.npmjs.com/package/namesake-cli) [![Travis CI](https://img.shields.io/travis/citycide/namesake-cli.svg?style=flat-square&maxAge=3600)](https://travis-ci.org/citycide/namesake-cli) [![LightScript](https://img.shields.io/badge/written%20in-lightscript-00a99d.svg)](http://www.lightscript.org)

> Find available & relevant npm package names from the command line.

Supposedly:

> There are only three hard things in Computer Science:
> cache invalidation, naming things, off-by-one errors,
> and being original.
> - Phil Karlton et al.¹

¹ original quote is becoming lost to history / legend

`namesake` can do absolutely nothing to help you with
cache invalidation and off-by-one errors but it _can_
help you with naming things. Being original is still
up to you.

## installation

```console
npm i -g namesake-cli
```

## usage

```console
Usage: namesake [options]  <word>

Generate a list of words that just so happen to also
be available as npm package names.

Optionally, you can use any word as input to find
related words and terms.

Options:

  -h, --help       Show usage information.
  -l, --limit <n>  Limit the number of results returned. (defaults to 50)
  -v, --version    Output the version number
```

## example

> Note: namesake's output is non-deterministic by design.
> so the following example is not 100% reproduceable,
> and these are available package names at time of writing.

```console
$ namesake car

Available package names related to 'car':

acr           automobile    fund         cadillac
railcar       bombs         cable-car    accident
mercedes      gondola       carload
malibu        wagons        trolley
automotive    autos         automaker
sedan         consignment   carpark
elevator-car  escalade      buick
motorcar      motoring      pinto
parking       railway-car   carla
backseat      railroad-car  driving
lading        vehicles      automobiles
```

Limiting the number of results:

```console
$ namesake car --limit 5

Available package names related to 'car':

gondola  carload  driving  carpark  motorcar
```

## see also

- [`namesake`](https://github.com/citycide/namesake) - the module powering this command line tool
- [LightScript](http://www.lightscript.org) - the compile-to-JS language this tool is written in, leveraging [Babel](https://babeljs.io)
- [Datamuse API](http://www.datamuse.com/api/) - powers the related word search capabilities
- [Set Get Go API](http://www.setgetgo.com/randomword/) - the random word API used in this module

## contributing

Pull requests and any [issues](https://github.com/citycide/namesake-cli/issues)
found are always welcome.

1. Fork the project, and preferably create a branch named something like `feat-make-better`
2. Modify as needed, `src/index.lsc` being the source file
3. Make sure all tests continue to pass, and it never hurts to have more tests
4. Push & pull request! :tada:

## license

MIT © [Bo Lingen / citycide](https://github.com/citycide)

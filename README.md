# TodoMVP

Developers these days are spoiled with choice when it comes to selecting an MV*
framework for structuring and organizing their JavaScript web apps.

Vue, React, Angular… the list of new and stable solutions continues to grow,
but just how do you decide on which to use in a sea of so many options?

To help solve this problem, [TasteJS](http://tastejs.com/) created
[TodoMVC](http://todomvc.com/) - a project which offers the same Todo application implemented using MV* concepts in most of the popular JavaScript MV* frameworks.

This project, **TodoMVP**, tries to solve this problem with another
approach. It is just another implementation of the same Todo application that
uses the <abbr title="Model View Presenter">MVP</abbr> design pattern to isolate the
application and the presentation logic from any used framework.

The aim of this approach is to be able to test the application without depending
on the chosen framework and to be able to switch or update the chosen framework
with the least effort possible.

This is just an example created by [Alberto Varela](https://www.berriart.com/)
in Typescript without any other dependency library. To demonstrate how it can
helps switching between frameworks it includes two implementations:
Vue and Angular.

If you want to dig deeper in the <abbr title="Model View Presenter">MVP</abbr>
pattern, better than looking into this repository is to read about its
evolution and its multiple variants, including the relationship
of MVP to other design patterns such as MVC, in this
[article by Martin Fowler](https://www.martinfowler.com/eaaDev/uiArchs.html)
and [this one by Derek Greer](http://www.aspiringcraftsman.com/2007/08/25/interactive-application-architecture/).

## Contents

```txt
todomvc
│
└───app       -> MVP Application
│   │
│   └───src   ----> Code
│   │   │
│   │   └───framework   --------> Infrastructure
│   │   │
│   │   └───model       --------> Model
│   │   │
│   │   └───presenters  --------> Presenters
│   │   │
│   │   └───views       --------> View contracts
│   │
│   └───test  ----> Tests
│
│
└───angular   -> Angular view implementation
│
└───vue       -> Vue view implementation
```

## Running the project

### MVP Application

The application can not run by itself. It's intended to be wrapped by a frmamework of
your choice (Vue, Angular, React,...), but you can test the app behaviour.

```bash
cd app
npm install
npm run test
```

### Angular

Implementation using angular.

```bash
cd angular
npm install
npm start
```

### Vue

Implementation using Vue.

```bash
cd vue
npm install
npm run serve
```

## In progress

Remaining todos:

- Implement todo component
- Pluralize items left
- Switch links by routing
- Create React app

## License

<a rel="license" href="http://creativecommons.org/licenses/by/4.0/deed.en_US"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br />The html files in this repo are based in a <span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" rel="dct:type">work</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://sindresorhus.com" property="cc:attributionName" rel="cc:attributionURL">TasteJS</a> which is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/deed.en_US">Creative Commons Attribution 4.0 International License</a>.

Everything else in this repo is MIT License unless otherwise specified.

Copyright 2019 Alberto Varela

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

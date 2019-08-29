# Automation Scripts

As with any system, automation scripts can cause unwanted complications if misused or left open for 
modification by users who may do harm, willingly or otherwise.

You (or whoever will configure this system) is responsible for making sure scripts are written
in a way that do not cause problems to users or the underlying system running them.

## Modern JavaScript 

### About async/await and Promises
If you are not familiar with Promises, we strogly recommend reading MDN article
{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises about using promises}

  In short: Promises solve problem of asynchronous code and remove the need for cumbersome
  callbacks via function parameters. They provide a simple and readable syntax and error
  handling via .catch().

### About use of await/async syntactic sugar

  You will find examples with await prefix. You can not use this on the global scope of the script, it will
  result in "await is only valid in async function syntax error".

You can, however wrap your code with `(async () => { ... }())` and place your await calls there.</p>

### The arrow function expression (=>)
MDN article {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions about arrow functions}


## Including outside libraries & modules

In Corredor (non-browser) automation scripts we allow a predefined list of libraries you can use:

### axios

> A JavaScript utility library delivering consistency, modularity, performance, & extras.

This is the library used by Corteza API clients.

Visit https://github.com/axios/axios for more info

```javascript
const axios = require('axios')

// ...
```

### request

> Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.

Visit https://github.com/request/request for more info
 
 ```javascript
const request = require('request')

// ...
```

### lodash

> A JavaScript utility library delivering consistency, modularity, performance, & extras.
 
 ```javascript
const _ = require('lodash')

// ...
```

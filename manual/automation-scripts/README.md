# Automation Scripts

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


## Automation script context

### IDs

You'll see a lot of "numeric" IDs stored as string. Reason for this is that the backend uses uint64 type
for generating and storing IDs and JavaScript does not support this type natively.
No special action is needed for the automation script writers.


### Current user ($authUser)

Access info (User object) about the current user

### Current $record, current $module
  
On automatically triggered scripts (before/after-create/update/delete) events and
manually triggered scripts on record-pages, scripts can use $record and $module
variables to access current record and/or current module.

In all methods where there is a function param for record or module that
param can be omitted (or NULL-ed) and function will use current record or module (when available)

### Module parameter
Resolution rules for module parameter in every ComposeHelper class method:

 - if string with only digits, use as module ID and load module
 - if string, use as module name and load module
 - object, verify that it has namespaceID and moduleID properties
 - if null, use current $module (when available)


## Modifying current $record and returning from automation script

Rules:

 - Critical scripts have to be executed sucessfully and return [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value.
 - Scripts can return Record value or modify $record
 - Modifications and return values of async scripts are ignored
 - Modifications and return values of after* triggers are ignored 

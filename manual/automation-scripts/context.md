# Automation script context

### Authenticated user ($authUser)

Access info (User object) about the authenticated user (user who's running the script)

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
 - If automation scripts returns Record system will update current $record (if Module then $module, etc...)
 - Modifications of $record (and other $*) and return values of async scripts are ignored
 - Modifications of $record (and other $*) and return values of after* triggers are ignored 


# Returning values

You can abort script execution by returning (`return ...`) at 
any point in the script. Returning `false` will cause abort
and will prevent record create/update/delete in before* triggers.

You can always return the (changed) record you're currently running the script
for and cause that a modified (by your script) version of an object 
is then passed back to Compose. This can be used in beforeCreate and 
beforeUpdate triggers to save modified version or in manual triggers
to change the current record on the fly (even without explicitly 
saving it in the script) 

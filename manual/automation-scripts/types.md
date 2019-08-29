# Variable types

## IDs

You'll see a lot of "numeric" IDs stored as string. 

Reason for this is that the backend uses uint64 type
for generating and storing IDs and JavaScript does not support this type natively.
No special action is needed for the automation script writers.

## Compose 

### Record

Type of current `$record` variable.

_todo_

### Module

Type of current `$module` variable 

_todo_

### Namespace

Type of current `$namespace` variable 

_todo_

## Messaging

### Channel

Type of current `$channel` variable 

_todo_

## System

### User

Type of `$authUser` and current `$user` variable 

_todo_

### Role

Type of current `$role` variable 


_todo_

## Shared

### Permission Rule

_todo_

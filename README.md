## About Scriptr.io Terminal
[Scriptr.io Terminal](https://api.scriptrapps.io/apsdb/rest/modules/terminal/tty) provides a rich set of commands for invoking endpoints using different protocols and options and displays a more readable formatting of JSON responses and logs. The terminal can be used with multiple servers and accounts using url/token interchange.

## Purpose of the scriptr.io connector for Terminal
The purpose of this connector is to simplify invoking enpoints. It is also a very useful scriptr.io debugging tool.

## Commands
Commands can be used to invoke certain functions.
- about: displays the Welcome to scriptr.io Terminal
- clear: clears the screen
- delete: invoke the HTTP delete method
- echo: prints the name on screen
- get: invoke the HTTP get method
- help: invokes help
- history: shows history of typed commands
- mapCommand: map parameters to invoke scripts from command line without having to create a JSON
- option: invoke the HTTP option method
- patch: invoke the HTTP patch method
- post: invoke the HTTP post method (Default if command is not entered)
- put: invoke the HTTP put method
- set: set various terminal options
- theme: changes the terminal theme to white or default
- ws: invokes an endpoint by using websocket connection

### How To Use
- Deploy the aforementioned scripts in your scriptr account, in a folder named "terminal" or access the Terminal directly using the tabs in the top right corner of the scriptr.io page
- Create a test script in scriptr
- Obtain access / anonymous tokens from scriptr.io Account pop-up

### AutoExec
Commands in Autoexec.terminal, will be executed when the terminal is started. For example:
Invoking:
```
# Commands in Autoexec.terminal, will be execute when the terminal is started
# they can be used to set various defaults such as token, url, mapCommand etc.
# mapCommand devices/execute id method -description This sends a message to a device
#
# echo mapping frequent commands for easier invocation
theme white
```
Results in a white terminal.

### Using the Terminal
This test script can be used an example to explain the commonly-used commands:
```
console.log(request.method);
return request.headers['headers'] + " & " + request.parameters['params'];
```
#### delete, get, option, patch, post, & put
Invoking:
```
test -p {"params": "p1"} -h {"headers":"h1"} 
```
Results in:
```
Log (extracted from response.metadata.scriptLog):
2017-01-11 15:13:23.340logPOST
Script response (hiding response.metadata.scriptLog):
```
```json
{
"response": {
"metadata": {
"requestId": "e72535bf-7b68-4840-a4a7-1a9d137ef1cc",
"status": "success",
"statusCode": "200"
},
"result": "h1 & p1"
}
}
```
#### mapCommand
Invoking:
```
mapCommand test params
test p1
```
Results in:
```
Log (extracted from response.metadata.scriptLog):
2017-01-11 15:33:44.864logPOST
Script response (hiding response.metadata.scriptLog):
```
```json
{
"response": {
"metadata": {
"requestId": "c5432a90-5db2-4e85-8a00-97ab8dff2f5e",
"status": "success",
"statusCode": "200"
},
"result": "null & p1"
}
}
```
#### ws
Invoking:
```
ws test -p {"params": "p1"}
```
Results in:
```
Log (extracted from response.scriptLog):
2017-01-11 15:48:41.652logGET
Script response (hiding response.scriptLog):
```
```json
{
"id": "bd15b05a-1484149721415",
"status": "success",
"statusCode": "200",
"result": "null & p1"
}
```

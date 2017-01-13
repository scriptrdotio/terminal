## About Scriptr.io Terminal
Scriptr.io Terminal provides a rich set of commands for invoking endpoints using different protocols and options and displays a more readable formatting of JSON responses and logs. The terminal can be used with multiple servers and accounts using url/token interchange.

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
- Obtain access / anonymous tokens from scriptr.io Account pop-up

### AutoExec
Commands in Autoexec.terminal on the root folder, will be executed when the terminal is started.
For example invoking:
```
theme white
```
Results in a white terminal.

### Using the Terminal
Create a test script in scriptr.
```
console.log(request.method);

var returnedValue = {};
if(request.headers['content-type']){
 console.log('content type is set');
 returnedValue['contentType']  = request.headers['content-type'];
}

if(request.parameters['color']){
 console.log('color parameter is set');
 returnedValue['color'] = request.parameters['color'];
}

return returnedValue;
```
This test script can be used an example to explain the commonly-used commands:

#### delete, get, option, patch, post, & put
Invoking:
```
test -p {"color" : "blue"} -h {"content-type":"text/plain"} 
```
Results in:
```
Log (extracted from response.metadata.scriptLog):
2017-01-13 13:42:24,460 LOG 
POST
2017-01-13 13:42:24,460 LOG content type is set
2017-01-13 13:42:24,460 LOG color parameter is set
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
   "result": {
		  "contentType": "text/plain",
		  "color": "blue"
	  }
  }
}
```
Invoking:
```
test -p {"color": "blue"} -h {"content-type":"text/plain"} -nolog
```
Results in:
```
Log (extracted from response.metadata.scriptLog):
Script response (hiding response.metadata.scriptLog):
```
```json
{
    "response": {
        "metadata": {
            "requestId": "3c3eb5ea-bc78-423a-8a89-15de77c26b0e",
            "status": "success",
            "scriptLog": [
                {
                    "timestamp": "2017-01-13 13:51:22.718",
                    "level": "log",
                    "component": "test",
                    "message": "POST"
                },
                {
                    "timestamp": "2017-01-13 13:51:22.718",
                    "level": "log",
                    "component": "test",
                    "message": "content type is set"
                },
                {
                    "timestamp": "2017-01-13 13:51:22.718",
                    "level": "log",
                    "component": "test",
                    "message": "color parameter is set"
                }
            ],
            "statusCode": "200"
        },
        "result": {
            "contentType" : "text-plain",
            "color"` : "blue"
        }
    }
}
```
Invoking:
```
test -p {"color": "blue"} -h {"content-type":"text/plain"} -noresponse
```
Results in:
```
Log (extracted from response.metadata.scriptLog):
2017-01-13 13:42:24,460 LOG POST
2017-01-13 13:42:24,460 LOG content type is set
2017-01-13 13:42:24,460 LOG color parameter is set
```
#### mapCommand
Invoking:
```
mapCommand test color
test blue
```
Results in:
```
Log (extracted from response.metadata.scriptLog):
2017-01-13 13:42:24,460 LOG POST
2017-01-13 13:42:24,460 LOG content type is set
2017-01-13 13:42:24,460 LOG color parameter is set
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
   "result": {
		  "contentType": "application/x-www-form-urlencoded; charset=UTF-8"",
		  "color": "blue"
	  }
  }
}
```
#### ws
Invoking:
```
ws test -p {"color": "blue"}
```
Results in:
```
Log (extracted from response.scriptLog):
2017-01-13 13:42:24,460 LOG GET
2017-01-13 13:42:24,460 LOG color parameter is set
Script response (hiding response.scriptLog):
```
```json
{
  "id": "bd15b05a-1484149721415",
  "status": "success",
  "statusCode": "200",
  "result": {
	  "color": "blue"
	 }
}
```

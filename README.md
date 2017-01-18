## About Scriptr.io Terminal
Scriptr.io Terminal provides a rich set of commands for invoking endpoints using different protocols and options and displays a more readable formatting of JSON responses and logs. The terminal can be used with multiple servers and accounts using url/token interchange.

## Purpose of the scriptr.io connector for Terminal
The purpose of this connector is to simplify invoking enpoints. It is also a very useful scriptr.io debugging tool.

## Commands
Commands can be used to invoke certain functions.
- about: displays the Welcome to scriptr.io Terminal
- clear: clears the screen
- delete: invokes the HTTP delete method on scripts
- echo: prints the name on screen
- get: invokes the HTTP get method on scripts
- help: invokes help
- history: shows history of typed commands
- mapCommand: maps parameters to invoke scripts from command line without having to create a JSON
- option: invokes the HTTP option method on scripts
- patch: invokes the HTTP patch method on scripts
- post: invokes the HTTP post method (Default if command is not entered)
- put: invokes the HTTP put method on scripts
- set: sets various terminal options
- theme: changes the terminal theme to white or default
- ws: invokes an endpoint by using websocket connection

### How To Use
- Access the Terminal directly using the tabs in the top right corner of the scriptr.io page
- Obtain access / anonymous tokens from scriptr.io Account overlay

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

- -p:parameters to pass
- -h: headers to pass
- -nolog: logs show in the request
- -norespsonse: only logs should show

The following tests use the POST method

Invoking:
```
test -p {"color" : "blue"} -h {"content-type":"application/x-www-form-urlencoded; charset=UTF-8"} 
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
test -p {"color": "blue"} -h {"content-type":"application/x-www-form-urlencoded; charset=UTF-8"} -nolog
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
            "contentType" : "application/x-www-form-urlencoded; charset=UTF-8",
            "color" : "blue"
        }
    }
}
```
Invoking:
```
test -p {"color": "blue"} -h {"content-type":"application/x-www-form-urlencoded; charset=UTF-8"} -noresponse
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
   	"contentType": "application/x-www-form-urlencoded; charset=UTF-8",
	"color" : "blue"
    }
   }
}
```
#### ws

Using this command, a websocket connection is created and then the script is invoked.

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
    "id": "c7c4b1d1-1484580791420",
    "status": "success",
    "statusCode": "200",
    "result": {
        "color": "blue"
    }
}
```

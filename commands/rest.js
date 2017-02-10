function registerHTTPVerb(method) {
  function http(method, url, script, params, headers, showResponse, showLogs, repeat, term) {
    term.pause()
	if(script.charAt(0) == "/"){
      script = script.substring(1,script.length);
    }
    var processData = true;
    var url = (url.slice(-1) == "/") ? "/" + script : "https://"+ url + "/" + script;
    var timestamp = (new Date()).getTime()
 	if(method.toLowerCase().trim() == "post" && headers['content-type'] && headers['content-type'].toLowerCase().trim() == "application/json"){
      params = JSON.stringify(params);
      processData = false;
    }
      
    var p = {
      url: url,
      data: params,
      headers: headers,
      method: method,
      'processData': processData,
      dataType: 'json',
      success: function(data) {
        var hiddenLog = false
        if (showLogs) {
          try {
            if (data.response.metadata.scriptLog) {
              term.echo(" ")
              term.echo("Log (extracted from response.metadata.scriptLog):")
              data.response.metadata.scriptLog.forEach(function(l) {
                term.echo(template2(l), {raw:true})
              })
            }
            delete data.response.metadata.scriptLog
            hiddenLog = true
          } catch(e) {}
        }

        if (showResponse) {
          term.echo(" ")
          term.echo("Script response" + (hiddenLog?" (hiding response.metadata.scriptLog):":":"))
          term.echo("<pre>"+syntaxHighlight(JSON.stringify(data,null,4))+"</pre>",{raw:true})
        }

        term.echo(" ")
        term.echo("Request execution time: "+((new Date()).getTime()-timestamp)+"ms",{raw:true})
        term.echo(" ")
        term.resume()

        var msg = {
          timestamp: Date(),
          level: 0,
          txt: JSON.stringify(data,null,4)
        }
      },
      error: function(data) {
        try {
          if (data.responseJSON.response.metadata.status == 'failure') {
            term.echo("Request execution time: "+((new Date()).getTime()-timestamp)+"ms",{raw:true})
            term.echo("Operation failed with error code: "+data.responseJSON.response.metadata.errorCode,{raw:true})
            term.echo(data.responseJSON.response.metadata.errorDetail,{raw:true})
            term.resume()
          }
        } catch(e) {
          term.echo(data.responseText)
          term.echo(" ")
          term.resume()
        }
      }
    }
    $.ajax(p)
  }

  window.scriptr.terminal.Interpreter.add({
    command : method,
    handler : function(params, term){
      var script, showResponse=false, token
      var url = window.scriptr.terminal.url

      if (!params) {
        term.echo("No parameters provided. Nothing to do!")
        return
      }
      var t = params.split(" ")
      var script = t[0]
      var _url

      try {
        parameters = parseForParam(params, "-d", true)
        _url = parseForParam(params, "-u")
        if (_url) url = _url
        var showResponse = (params.indexOf("--no-response")<0)

        var headers = {}   

        if (window.scriptr.terminal.token!="") headers['Authorization']='bearer '+window.scriptr.terminal.token

        jQuery.extend(headers, parseForParam(params, "-H", true))

        var repeat = 1
        repeat = parseForParam(params, "--repeat")
        if (!repeat) repeat=1

        var showLogs = false
        showLogs = (params.indexOf("--no-log")<0)

        http(method, url, script, parameters, headers, showResponse, showLogs, repeat, term)

      } catch (e) {
        var s=""
        for (var i=0;i<e.position-1;i++) s+=" "
        term.echo("")
        term.echo(e.message)
        term.echo("")
      }

    },
    help: {id:"help-rest", values:{method: method}}
  })
}

jQuery(document).ready(function($) {
  registerHTTPVerb("get")
  registerHTTPVerb("put")
  registerHTTPVerb("delete")
  registerHTTPVerb("post")
  registerHTTPVerb("patch")
  registerHTTPVerb("option")
})


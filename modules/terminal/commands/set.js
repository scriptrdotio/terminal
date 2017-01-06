jQuery(document).ready(function($) {
  function getUser(f) {
    var p = {
      url: "/modules/terminal/backend/info?auth_token="+SCRIPTR_TOKEN,
      method: "get",
      dataType: 'json',
      success: function(data) {
        f(data.response.result.user.id?data.response.result.user.id:data.response.result.user.name)
      },
      error: function(data) {
        f(null)
      }
    }
    $.ajax(p)
  }

  function displayVariables(term) {
    term.echo("token="+SCRIPTR_TOKEN)
    term.echo("url="+SCRIPTR_URL)
    term.echo(" ")
  }
  
  window.scriptrCommands.add({
    command: "set",
    handler: function(params, term){
      if (params) {
        var t = params.split("=")  

        switch(t[0].trim()) {
          case "token":
            SCRIPTR_TOKEN=t[1].trim()
              getUser(function(userId) {
                if (!userId) {
                  term.echo("Bad token!") 
                  term.echo("")
                  userId=""
                }
                term.set_prompt(userId+"&zwnj;@"+scriptr.terminal.prompt)
               })
            break;
          case "url":
            SCRIPTR_URL=t[1].trim()
            break;
        }

        term.echo(" ")
      } else {
        displayVariables(term)
      }
    },
    help: {id:"help-set"}
  })

})

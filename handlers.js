"use strict";

var http = require('http');

exports.callSusiApi = (slots, session, response) => {
    let query = slots.query.value;
    console.log(query);

    var endpoint = "http://api.susi.ai/susi/chat.json?q="+query; // ENDPOINT GOES HERE
    var body = "";
    var viewCount;
    http.get(endpoint, (response) => {
      response.on('data', (chunk) => { body += chunk })
      response.on('end', () => {
        var data = JSON.parse(body);
        if(data.answers[0].actions[1]){
            if(data.answers[0].actions[1].type === 'rss'){
                viewCount = 'I have no idea about it, sorry.';
            }
        }
        else{
            if(data.answers[0].actions[0].type === 'table'){
                var colNames = data.answers[0].actions[0].columns;
                viewCount = '';
                if((data.answers[0].metadata.count)>10)
                    viewCount += 'Due to message limit, only some results are spoke. They are: ';
                for(var i=0;i<(((data.answers[0].metadata.count)>10)?10:data.answers[0].metadata.count);i++){
                    viewCount += data.answers[0].data[i].name+',';
                }
            }
            else
            {
                viewCount = data.answers[0].actions[0].expression;
            }
        }
        response.say(viewCount);
      })
    })
};
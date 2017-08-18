"use strict";

exports.callSusiApi = (slots, session, response) => {
    let query = slots.query.value;
    console.log(query);
    response.say("OK, in what city?");
};

exports.getDate = function() {
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };
    let today = new Date();
    
    
    return today.toLocaleString("En-IN", options);


};

exports.getDay = function() {
    let options = {
        weekday: "long",
    };
    let today = new Date();
    
    
    return today.toLocaleString("En-IN", options);

};



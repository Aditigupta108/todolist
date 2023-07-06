exports.getdate=getdate;
var getdate=function(){
var today=new Date();
var options = { 
    weekday: 'long',
     year: 'numeric',
      month: 'long',
       day: 'numeric'
     };
     return today.toLocaleDateString("en-US",options);
     
    };
exports.getday=getday;
    var getday=function(){
        var today=new Date();
        var options={
            weekday:'long'
        };
        return today.toLocaleDateString("en-US",options);
    };
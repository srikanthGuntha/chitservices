module.exports = {
    createobj: function(){
      return reobj = {
          status: "success",
          statusCode: 200,
          message: "Operation was successfull!"
      }
    },
    response: function(status, data) {
        if (status === "success") {
            var reobj = {
                message: "Operation was successfull!",
                reqStatus: "success"
            };
            if(data) {
              reobj.data = data;
            }
            return reobj;
        } else if (status === "failure") {
        	return reobj = {
                message:  data.errmsg || (data && data.message) || "Something wrong with input data or server connection!",
                reqStatus: "failed"
            }
        }
    }
}

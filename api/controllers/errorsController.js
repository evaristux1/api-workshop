class ErrorsController{
    getStatusToError(error){
        let status = 500;
        if(error.idError == 1 || error.idError == 2 || error.idError == 4 || error.idError == 5){
            status = 400;
        }else if(error.idError == 6 || error.idError == 8){
            status = 401;
        }else if(error.idError == 3){
            status = 403;
        }else if(error.idError == 7){
            status = 404;
        }
        return status;
    }
}

module.exports = new ErrorsController();
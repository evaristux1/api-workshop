class NotFound extends Error{
    constructor(msg){
        super(`The ${msg} was not found`);
        this.name = 'NotFound';
        this.idError = 7;
        this.errorStatus = 404;
    }
}

module.exports = NotFound;
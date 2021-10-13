class EmailRegistered extends Error{
    constructor(){
        super('already registered user');
        this.name = 'Emailregistered';
        this.idError = 1;
        this.errorStatus = 400;
    }
}

module.exports = EmailRegistered;
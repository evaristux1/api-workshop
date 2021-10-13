class EmailOrPasswordInvalid extends Error{
    constructor(){
        super('invalid email or password');
        this.name = 'EmailOrPasswordInvalid';
        this.idError = 8;
        this.errorStatus = 401;
    }
}
module.exports = EmailOrPasswordInvalid;
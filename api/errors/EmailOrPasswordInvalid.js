class EmailOrPasswordInvalid extends Error{
    constructor(){
        super('invalid email or password');
        this.name = 'EmailOrPasswordInvalid';
        this.idError = 8;
    }
}
module.exports = EmailOrPasswordInvalid;
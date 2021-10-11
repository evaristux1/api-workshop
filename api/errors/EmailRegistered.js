class EmailRegistered extends Error{
    constructor(){
        super('already registered user');
        this.name = 'Emailregistered';
        this.idError = 1;
    }
}

module.exports = EmailRegistered;
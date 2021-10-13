class UnauthanticatedUser extends Error{
    constructor(){
        super('unauthenticated user');
        this.name = 'UnauthanticatedUser';
        this.idError = 6;
        this.errorStatus = 401;
    }
}
module.exports = UnauthanticatedUser;

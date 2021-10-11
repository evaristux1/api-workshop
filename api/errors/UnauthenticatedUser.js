class UnauthanticatedUser extends Error{
    constructor(){
        super('unauthenticated user');
        this.name = UnauthanticatedUser;
        this.idError = 6;
    }
}
module.exports = UnauthanticatedUser;

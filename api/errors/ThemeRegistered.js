class ThemeRegistered extends Error{
    constructor(){
        super('already registered theme');
        this.name = 'ThemeRegistered';
        this.idError = 2;
        this.errorStatus = 400;
    }
}

module.exports = ThemeRegistered;
class DateLower extends Error{
    constructor(){
        super('date must be greater than today');
        this.name = 'DateLower';
        this.idError = 5;
    }
}
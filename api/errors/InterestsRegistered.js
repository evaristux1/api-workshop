class InterestsRegistered extends Error{
    constructor(){
        super('already registered interest');
        this.name = 'InterestsRegistered';
        this.idError = 4;
    }
}
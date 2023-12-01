export class Date {

    canBePass:Boolean;
    includesHours:Boolean;
    term:Boolean;
    scheduling:Boolean;
    
    constructor(canBePass:Boolean,includesHours:Boolean,term:Boolean,scheduling:Boolean){
        this.canBePass=canBePass;
        this.includesHours=includesHours;
        this.term=term;
        this.scheduling=scheduling;
    }

}

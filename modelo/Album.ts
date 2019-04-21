export class Album {
    id: number;
    name: string;
    year: number;
    
    constructor(newName: string, newYear: number){
        this.name = newName;
        this.year = newYear;
        this.id = 1;
    }

    getName() : string {
        return this.name;
    }
    getYear() : number {
        return this.year;
    }
}
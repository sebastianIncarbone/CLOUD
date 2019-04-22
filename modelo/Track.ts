export class Track {
    genres: string[];
    name: string;
    duration: number; // in seconds
    id: number;

    constructor(newName: string, newDuration:number, newGender: string[]){
        this.genres = newGender;
        this.name = newName;
        this.duration = newDuration;
        this.id = 1;
    }
    getName(): string{
        return this.name;
    }
    getDuration(): number{
        return this.duration;
    }
    getGenders(): string[] {
        return this.genres;
    }
    getId(): number {
        return this.id;
    }
}
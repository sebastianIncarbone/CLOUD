export class Track {
    gender: string;
    id: number;

    constructor(newGender: string){
        this.gender = newGender;
        this.id = 1;
    }
    getGender(): string {
        return this.gender;
    }
    getId(): number {
        return this.id;
    }
}
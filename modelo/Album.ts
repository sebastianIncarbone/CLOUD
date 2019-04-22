import { Track } from "./Track";

export class Album {
    id: number;
    name: string;
    year: number;
    tracks: Track[];
    
    constructor(newName: string, newYear: number){
        this.name = newName;
        this.year = newYear;
        this.tracks = []
        this.id = 1;
    }

    getName() : string {
        return this.name;
    }
    getYear() : number {
        return this.year;
    }
    getTracks() : Track[]{
        return this.tracks;
    }

    addTrack(newTrack: Track): void{
        this.tracks.push(newTrack);
    }
}
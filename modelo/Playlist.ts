import { Track } from "./Track";

export class Playlist {

    name: string;
    genders: string[];
    maxDuration: number;
    tracks: Track[];
    id: number

    constructor(newName: string, newGenders: string[], newMaxDuration: number) {
        this.name = newName;
        this.genders = newGenders;
        this.maxDuration = newMaxDuration;
        this.tracks = [];
        this.id = 1;
    }

    getName(): string {
       return this.name;
    }

    getgenders(): string[] {
       return this.genders;
    }

    getmaxDuration(): number {
       return this.maxDuration;
    }
    
    addTrack(newTrack: Track): void {
        this.tracks.push(newTrack);
    }
    getId(): number{
        return this.id;
    }

    hasTrack(aTrack: Track): boolean {
        return this.tracks.includes(aTrack);
    }
}
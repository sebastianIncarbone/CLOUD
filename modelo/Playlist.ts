import { Track } from "./Track";

export class Playlist {

    name: string;
    genders: string[];
    maxDuration: number;
    tracks: Track[];

    constructor(newName: string, newGenders: string[], newMaxDuration: number) {
        this.name = newName;
        this.genders = newGenders;
        this.maxDuration = newMaxDuration;
        this.tracks = [];
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
    
    addTrack(newTrack: Track) {
        this.tracks.push(newTrack);
    }

    hasTrack(aTrack: Track): boolean {
        return this.tracks.includes(aTrack);
    }
}
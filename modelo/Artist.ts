import { Album } from "./Album";

export class Artist {
    id: number;
    name: string ;
    country: string;
    albums: Album[];

    constructor(newName: string, newCountry: string) {
        this.id = 1
        this.name = newName;
        this.country = newCountry;
        this.albums = []; 
    }

    getId(): number {
        return this.id
    }
    getName() : string {
        return this.name;
    }
    getCountry() : string {
        return this.country;
    }
    getAlbums() {
        return this.albums;
    }
    addAlbum(newAlbum: Album) {
        this.albums.push(newAlbum);
    }
}
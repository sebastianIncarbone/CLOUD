import { assert } from "chai";
import { Playlist } from "../../modelo/Playlist";
import { Track } from "../../modelo/Track";

describe('playlist', () => {
    it('tiene nombre', () =>{
        const nombre: string = 'Roses playlist';
        const nvaPlaylist = new Playlist(nombre, ['pop'], 1400);
        assert.equal(nvaPlaylist.getName(), nombre);
    })
    it('tiene una duracion', () =>{
        const duration: number = 1400;
        const nvaPlaylist = new Playlist('Roses playlist', ['pop'], duration);
        assert.equal(nvaPlaylist.getmaxDuration(), duration);
    })    
    it('conoce si tiene un Track en su lista', () =>{
        const durationPlaylist: number = 1400;
        const nvaPlaylist = new Playlist('Roses playlist', ['pop'], durationPlaylist);

        const genders  = ["Rock Argentino", "Calm Rock", "Sad Rock"];
        const duration = 380;
        const name = "Te Para Tres";
        
        const teParaTres = new Track(name, duration, genders);

        nvaPlaylist.addTrack(teParaTres);

        assert.isOk(nvaPlaylist.hasTrack(teParaTres));
    })
})
import { Album  } from "../../modelo/Album";
import {Track} from "../../modelo/Track";
import { Artist } from "../../modelo/Artist"
import { assert } from "chai";
import { Track } from "../../modelo/Track";

describe('album' ,() => {
    it('has a name ,a year of creation and an id', () =>{
        const circoBeat = new Album("Circo Beat", 1994);

       assert.equal(circoBeat.getName(), "Circo Beat");
       assert.equal(circoBeat.getYear(), 1994);
       assert.equal(circoBeat.getId(), 1);
    })
    it('can add tracks ', () =>{
        const pianoBar = new Album("Piano bar", 1984);

        const genres = ["Rock Nacional", "Rock de verdad"]
        const demoliendoHoteles = new Track("Demoliendo Hoteles", 272,genres);

        pianoBar.addTrack(demoliendoHoteles);

        assert.isOk(pianoBar.getTracks().includes(demoliendoHoteles));
    })
})
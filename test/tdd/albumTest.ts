import { Album  } from "../../modelo/Album";
import { Artist } from "../../modelo/Artist"
import { assert } from "chai";

describe('album' ,() => {
    it('Un album tiene un nombre y un año de creacion', () =>{
        const circoBeat = new Album("CircoBeat", 1994);

       assert.equal(circoBeat.getName(), "CircoBeat");
       assert.equal(circoBeat.getYear(), 1994);
    })
})
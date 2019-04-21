import { assert } from "chai";
import { Track } from "../../modelo/Track";

describe('track' ,() => {
    it('un track tiene un genero', () => {
        let mariposaMulticolor = new Track("Rock");

        assert.equal(mariposaMulticolor.getGender(), "Rock");
        assert.equal(mariposaMulticolor.getId(), 1);
        
    })  
    
})
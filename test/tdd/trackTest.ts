import { assert } from "chai";
import { Track } from "../../modelo/Track";

describe('track' ,() => {
    it('a track has a name, a duration an a gender', () =>{
        const genders  = ["Trap"];
        const duration = 320;
        const name = "Ouke";
        
        const ouke = new Track(name, duration, genders);

        assert.equal(ouke.getName(), "Ouke");
        assert.equal(ouke.getDuration(), 320);

    })
    it('a track has only one gender in his list and also an id', () => {
        // aca le pasan un genero pero un track tiene una lista de generos
        const duration = 200;
        const name     = "mariposa Multicolor";
        const genders: Array<string> = ['Rock'];
        const mariposaMulticolor     = new Track(name, duration, genders);

        assert.isOk(mariposaMulticolor.getGenders().includes('Rock'));
        assert.equal(mariposaMulticolor.getGenders().length, 1);
        assert.equal(mariposaMulticolor.getId(), 1);
        
    })  
    it('a track has many genders in his list', () => {
        const duration = 200;
        const name     = "mariposa Multicolor";
        const genders  = ["Rock", "Hard Rock", "Rock Argentino"];
        const mariposaMulticolor = new Track(name, duration, genders);

        assert.isOk(mariposaMulticolor.getGenders().includes('Rock'));
        assert.isOk(mariposaMulticolor.getGenders().includes('Hard Rock'));
        assert.isOk(mariposaMulticolor.getGenders().includes('Rock Argentino'));

        assert.equal(mariposaMulticolor.getGenders().length, 3);

    })

    
})
import { app } from './App';
import { UNQfy } from '../modelo/unqfy';
import bodyParser = require('body-parser');

const PORT = 3030;
const unqfy = new UNQfy();

app.use(bodyParser());

app.post('/artist', (req, res) => {
  const nameOfArtist: string = req.body.name;
  const countryOfArtist: string = req.body.country;

  try {
    unqfy.addArtist({ name: nameOfArtist, country: countryOfArtist });
    res.status(201);
    res.send({
      id: unqfy.findArtistByName(nameOfArtist).getId(),
      name: nameOfArtist,
      country: countryOfArtist,
      albums: [],
    });

  } catch (e) {
    res.status(401);
    res.send('ojo gato');
  }
});

app.get('/artists/:id', (req, res) => {

  try {
    const artist =  unqfy.getArtistById(req.params);
    res.send({
      id: artist.getId(),
      name: artist.getName(),
      country: artist.getCountry(),
      albums: artist.getAlbums(),
    });

  } catch (e) {

  }
});

app.patch('artists/:id', (req, res) => {
  try {
    const newName = req.body.name;
    const newCountry = req.body.country;
    const artist = unqfy.getArtistById(req.params);
    artist.country = newCountry;
    artist.name = newName;

    res.send({
      id: artist.getId(),
      name: artist.getName(),
      country: artist.getCountry(),
      albums: artist.getAlbums(),

    });
  } catch (e) {

  }
});

app.delete('/artists/:id', (req, res) => {
  try {
    unqfy.deleteArtist(req.params);
    res.status(204);
  }catch (e) {

  }
});

app.get('artist/');
app.listen(PORT, () => console.log('Server satarted'));

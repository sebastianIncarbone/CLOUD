import { app } from "../resources/App";
import { artistController } from '../controllers/ArtistController';

app.post('/api/artists', (req, res) => {
    artistController.addArtist(req, res);
});

app.get('/api/artists/:id', (req, res) => {
    artistController.findById(req,res);
});

app.patch('/api/artists/:id', (req, res) => {
    artistController.update(req,res);
});

app.delete('/api/artists/:id', (req, res) => {
    artistController.delete(req,res);
});

app.get('/api/artists', (req, res) => {
    artistController.getAll(req,res);
});

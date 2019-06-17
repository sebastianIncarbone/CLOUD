import {app} from '../resources/App';
import { albumController } from '../controllers/AlbumController';

app.post('/api/albums', (req, res) => {
    albumController.addAlbum(req,res);
});

app.get('/api/albums/:id', (req, res) => {
    albumController.getById(req,res);
});

app.put('/api/albums/:id', (req, res) => {
    albumController.updateYear(req,res);
});

app.delete('/api/albums/:id', (req, res) => {
    albumController.delete(req,res);
});

app.get('/api/albums', (req, res) => {
    albumController.getAll(req,res);
});

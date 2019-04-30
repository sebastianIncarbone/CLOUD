# CLOUD
[Imagen UML del proyecto](https://drive.google.com/open?id=1iSGLmGwrVdURsQpaXamcJGvaOwsAGh61)

[Participantes y tareas](https://docs.google.com/document/d/1oZkZBpJpao1iOtaDj5O7Xel5HWM6COfErh9GmqVyri0)




# Como usar el CLI

En principio, todos los comandos deben escribirse sin especificar el nombre de cada parámetro. En el caso de aquellos comandos que requieran pasar un Array como argumento (como es el caso de addTrack), éste debe pasarse de la siguiente forma: `"['genero1', 'genero2', 'genero3']"`

## Lista de comandos:

### Adding

addArtist

``ts-node main.ts addArtist "Ricardo Montaner" "Argentina"``

addAlbum

`ts-node main.ts addAlbum "Muse" "The Resistance" 2009`

addTrack

``ts-node main.ts addTrack "Viva la Vida or Death and All His Friends​" "Viva la Vida" 10 "['pop']"``

### Deleting

deleteArtist

`ts-node main.ts deleteArtist "id del artista"`

deleteAlbum

`ts-node main.ts deleteAlbum "id del artista"`

deleteTrack

`ts-node main.ts deleteTrack "id del artista"`

### Printing by Name

printArtist

`ts-node main.ts printArtist "Ricardo Montaner"`

printAlbum

`ts-node main.ts printAlbum "The Resistance"`

printTrack

`ts-node main.ts printTrack "Viva la Vida"`

printTracksByArtist

`ts-node main.ts printTracksByArtist "Ricardo Montaner"`

printTracksByGenre

`ts-node main.ts printTracksByGenre "pop"`

### Searching by ID

searchTrackByID

`ts-node main.ts searchTrackByID "id de la cancion"`

searchAlbumByID

`ts-node main.ts searchAlbumByID "id del album"`

searchPlaylistByID

`ts-node main.ts searchPlaylistByID "id de la playlist"`

searchArtistByID

`ts-node main.ts searchArtistByID "id del artista"`

### Playlist Creation

createPlaylist

`ts-node  main.ts createPlaylist "nombre de la playlist" ['pop'] 10000`

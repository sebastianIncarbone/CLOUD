# CLOUD
[UML del proyecto en formato .uxf para UMLet] (https://drive.google.com/open?id=1-2fpGDMqsugofodmgfh4mIQsrTqtYr2h)




# Como usar el CLI

En principio, todos los comandos deben escribirse sin especificar el nombre de cada parámetro. En el caso de aquellos comandos que requieran pasar un Array como argumento (como es el caso de addTrack), éste debe pasarse de la siguiente forma: `['genero1', 'genero2', 'genero3']`

##Lista de comandos:

### Adding

addArtist

``ts-node main.ts addArtist "Ricardo Montaner" "Argentina"``

addAlbum

`ts-node main.ts addAlbum "id del artista" "The Resistance" 2009`

addTrack

``ts-node main.ts addTrack "id del album" "Viva la Vida" 10 ['pop']``

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

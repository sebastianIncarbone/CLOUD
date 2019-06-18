import requestPromise from 'request-promise';
import {Album} from "./Album";
import {Track} from "./Track";

export class AdministradorSpotify {
  private accessToken = 'BQAGyjcmSnHvBc2-khy5v1BjpTlHzEZaGpYssaeMcQhrEEOYgGhvOWxbGjQVZfbbVt-6gO106rq0QEHRvG9kYJtxdY7-ZbbWYq2e0g91_RkLuD3UOEFR3s5dJTWZlcD9G75kZ3ZtIFVmeRJxhHf4dePkUikznPhHoA';

  getOptions(url: string) {
    return {
      url,
      headers: { Authorization: `Bearer ${this.accessToken}` },
      json: true,
    };
  }

  async getAlbumsDataForArtist(artistName: string) {
    const artistResponse = await requestPromise.get(this.getOptions(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`));
    const artistId = artistResponse.artists.items[0].id;
    const albumsResponse = await requestPromise.get(this.getOptions(`https://api.spotify.com/v1/artists/${artistId}/albums`));
    const albumsIds = albumsResponse.items.map((album: any) => album.id)
    let trackPromises: any[] = []
    albumsIds.forEach((id: string) => trackPromises.push(requestPromise.get(this.getOptions(`https://api.spotify.com/v1/albums/${id}/tracks`))))
    trackPromises = await Promise.all(trackPromises)
    const finalResult: Album[] = []
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < albumsResponse.items.length; i++) {
      const actualTracks = trackPromises[i].items.map((falseTrack: any) => new Track(falseTrack.name, falseTrack.duration_ms, albumsResponse.items[i].genres, albumsResponse.items[i].name))
      const newAlbum = new Album(albumsResponse.items[i].name, parseInt(albumsResponse.items[i].release_date, 10), artistResponse.artists.items[0].name)
      actualTracks.forEach((track: Track) => newAlbum.addTrack(track))
      finalResult.push(newAlbum);
    }
    return finalResult;
  }
}

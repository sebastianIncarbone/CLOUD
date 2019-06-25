import requestPromise from 'request-promise';
import { Album } from './Album';
import { Track } from './Track';

export class AdministradorSpotify {
  private accessToken = 'BQBG_TWotLPwUNhoAeSpVoVHiyOeraT0wpnO0yGRQpzaehYAPEpF5KRvhzxbfRvZGfxAdQ0HbrkLlmX_p5FSGVTyx9S9ghNPdKf2S-CMVyHw_QSRenpGDq4gJ0otgcqnhnl6zTG54e5sigb3MbshNY73pnElTxk';
  private baseUrl = 'https://api.spotify.com/v1';

  getOptions(url: string) {
    return {
      url,
      headers: { Authorization: `Bearer ${this.accessToken}` },
      json: true,
    };
  }

  async getAlbumsDataForArtist(artistName: string) {
    const { artistId, artistName: artistReturnedName } = await this.getArtistIdAndName(artistName);
    const albumsResponse = await this.getAlbumsForArtist(artistId);
    const albumsIds = albumsResponse.items.map((album: any) => album.id);
    const tracksForAlbums = await this.getTracksForAlbums(albumsIds);
    return this.albumsWithTracks(albumsResponse, tracksForAlbums, artistReturnedName);
  }

  private async getAlbumsForArtist(artistId: number) {
    const albumsResponse = await requestPromise.get(this.getOptions(`${this.baseUrl}/artists/${artistId}/albums`));
    return albumsResponse;
  }

  private albumsWithTracks(albumsResponse: any, tracksForAlbums: any, artistName: string) {
    const result: Album[] = [];
    // tslint:disable-next-line:no-increment-decrement
    for (let i = 0; i < albumsResponse.items.length; i++) {
      const actualTracks = tracksForAlbums[i].items.map((falseTrack: any) => new Track(falseTrack.name, falseTrack.duration_ms, albumsResponse.items[i].genres, albumsResponse.items[i].name));
      const newAlbum = new Album(albumsResponse.items[i].name, parseInt(albumsResponse.items[i].release_date, 10), artistName);
      actualTracks.forEach((track: Track) => newAlbum.addTrack(track));
      result.push(newAlbum);
    }
    return result;
  }

  private async getTracksForAlbums(albumsIds: string[]) {
    let trackPromises: any[] = [];
    albumsIds.forEach((id: string) => trackPromises.push(requestPromise.get(this.getOptions(`${this.baseUrl}/albums/${id}/tracks`))));
    trackPromises = await Promise.all(trackPromises);
    return trackPromises;
  }

  private async getArtistIdAndName(artistName: string): Promise<{artistId:number, artistName: string}> {
    const artistResponse = await requestPromise.get(this.getOptions(`${this.baseUrl}/search?q=${artistName}&type=artist`));
    const artistId = artistResponse.artists.items[0].id;
    return {
      artistId,
      artistName: artistResponse.artists.items[0].name,
    };
  }
}

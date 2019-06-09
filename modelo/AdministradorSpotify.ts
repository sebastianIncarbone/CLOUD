import { UNQfy } from './unqfy';
import express from 'express';
// @ts-ignore
import * as rp from 'request-promise';
import { Album } from './Album';

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
    const artistResponse = await rp.get(this.getOptions(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`));
    const artistId = artistResponse.artists.items[0].id;
    const albumsResponse = await rp.get(this.getOptions(`https://api.spotify.com/v1/artists/${artistId}/albums`));
    return albumsResponse.items.map((album: any) => {
      return {
        name: album.name,
        year: parseInt(album.release_date, 10),
      };
    });
  }
}

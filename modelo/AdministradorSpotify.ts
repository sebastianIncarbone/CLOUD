import express from 'express';
// @ts-ignore
import * as rp from 'request-promise';

const app = express()

export class AdministradorSpotify {
  private accessToken = 'BQAGyjcmSnHvBc2-khy5v1BjpTlHzEZaGpYssaeMcQhrEEOYgGhvOWxbGjQVZfbbVt-6gO106rq0QEHRvG9kYJtxdY7-ZbbWYq2e0g91_RkLuD3UOEFR3s5dJTWZlcD9G75kZ3ZtIFVmeRJxhHf4dePkUikznPhHoA'

  getOptions(url: string) {
    return {
      url,
      headers: { Authorization: `Bearer ${this.accessToken}` },
      json: true,
    };
  }

  async populateAlbumsForArtist(artistName: string) {
    return await rp.get(this.getOptions('https://api.spotify.com/v1/search?q=chano&type=artist'));
  }
}

const asd = new AdministradorSpotify()

app.get('/', async (req, res) => {
  const response = await asd.populateAlbumsForArtist('chano');
  res.send(response)
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})

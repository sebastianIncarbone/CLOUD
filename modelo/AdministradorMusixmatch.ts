import * as rp from 'request-promise';

export class AdministradorMusixmatch {
  private BASE_URL = 'http://api.musixmatch.com/ws/1.1';

  async getTrackId(trackName: string): Promise<number> {
    const response = await rp.get(
      {
        uri: `${this.BASE_URL}/track.search`,
        qs: {
          apikey: '7c39a5da5c1469cbdad26d22dd903e5c',
          q_track: trackName,
        },
        json: true,
      });
    return response.message.body.track_list[0].track.commontrack_id;
  }

  async getLyrics(trackName: string): Promise<any> {
    const firstResponse = await this.getTrackId(trackName);

    const response = await rp.get({
      uri: `${this.BASE_URL}/track.lyrics.get`,
      qs: {
        apikey: '7c39a5da5c1469cbdad26d22dd903e5c',
        commontrack_id: firstResponse,
      },
      json: true,
    });

    return response.message.body;
  }
}

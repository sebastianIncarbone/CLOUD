import * as rp from 'request-promise';

export class AdministradorMusixmatch {
  private BASE_URL: string = 'http://api.musixmatch.com/ws/1.1';
  private musixMatchKey: string = '7c39a5da5c1469cbdad26d22dd903e5c';

  async getTrackId(trackName: string): Promise<number> {
    const response = await rp.get(
      {
        uri: `${this.BASE_URL}/track.search`,
        qs: {
          apikey: this.musixMatchKey,
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
        apikey: this.musixMatchKey,
        commontrack_id: firstResponse,
      },
      json: true,
    });

    return response.message.body;
  }
}

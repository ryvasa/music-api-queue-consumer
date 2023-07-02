const { Pool } = require('pg');
const { songModel } = require('./utils/songModel');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylists(id) {
    const query = {
      text: 'SELECT p.id as "playlistId", p.name as "playlistName", s.id as id, s.title as title, s.performer as performer FROM playlists as p  JOIN playlist_songs ps ON p.id = ps.playlist_id JOIN songs as s ON s.id = ps.song_id WHERE p.id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    const songs = result.rows.map(songModel);
    const playlist = {
      id: result.rows[0].playlistId,
      name: result.rows[0].playlistName,
    };
    return {
      playlist: {
        ...playlist,
        songs,
      },
    };
  }
}

module.exports = PlaylistsService;

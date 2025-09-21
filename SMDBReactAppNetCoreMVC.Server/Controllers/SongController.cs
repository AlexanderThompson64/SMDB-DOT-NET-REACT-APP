using Microsoft.AspNetCore.Mvc;
using SMDBReactAppNetCoreMVC.Server.Interfaces;
using SMDBReactAppNetCoreMVC.Server.Models;
using SMDBReactAppNetCoreMVC.Server.Services;

namespace SMDBReactAppNetCoreMVC.Server.Controllers;

public class SongController : ControllerBase
{
    private readonly IHttpClientFactory _httpClientFactory;

    public SongController(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    private IMusicService GetMusicService()
    {
        var bearerToken = Request.Headers["Authorization"].ToString().Replace("Bearer ", "");
        var httpClient = _httpClientFactory.CreateClient();
        httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);
        return new MusicService(httpClient);
    }

    [HttpGet]
    public async Task<ActionResult<List<Song>>> GetAllSongs()
    {
        try
        {
            var musicService = GetMusicService();
            var songs = await musicService.GetAllSongsAsync();
            return Ok(songs);
        }
        catch (Exception)
        {
            return Unauthorized();
        }
    }

    [HttpGet("genre/{genre}")]
    public async Task<ActionResult<List<Song>>> GetSongsByGenre(string genre)
    {
        try
        {
            var musicService = GetMusicService();
            var songs = await musicService.GetSongsByGenreAsync(genre);
            return Ok(songs);
        }
        catch (Exception)
        {
            return Unauthorized();
        }
    }
}

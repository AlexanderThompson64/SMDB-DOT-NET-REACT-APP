using System.Text.Json;
using SMDBReactAppNetCoreMVC.Server.Models;
using SMDBReactAppNetCoreMVC.Server.Interfaces;

namespace SMDBReactAppNetCoreMVC.Server.Services;

public class MusicService : IMusicService
{
    private readonly HttpClient _httpClient;

    public MusicService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.BaseAddress = new Uri("https://smdb.azurewebsites.net/api/");
    }

    public async Task<List<Song>> GetSongsByGenreAsync(string genre)
    {
        var response = await _httpClient.GetAsync($"songs?genre={genre}");
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<Song>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }) ?? new List<Song>();
    }

    public async Task<List<Song>> GetAllSongsAsync()
    {
        var response = await _httpClient.GetAsync("songs");
        response.EnsureSuccessStatusCode();

        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<List<Song>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }) ?? new List<Song>();
    }
}

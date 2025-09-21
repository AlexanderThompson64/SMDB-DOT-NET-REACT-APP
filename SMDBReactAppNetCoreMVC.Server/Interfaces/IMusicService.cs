using SMDBReactAppNetCoreMVC.Server.Models;

namespace SMDBReactAppNetCoreMVC.Server.Interfaces;

public interface IMusicService
{
    Task<List<Song>> GetSongsByGenreAsync(string genre);
    Task<List<Song>> GetAllSongsAsync();
}

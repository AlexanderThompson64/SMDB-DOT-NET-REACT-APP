using SMDBReactAppNetCoreMVC.Server.Interfaces;

namespace SMDBReactAppNetCoreMVC.Server.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IHttpClientFactory _httpClientFactory;

    public AuthenticationService(IHttpClientFactory httpClientFactory)
    {
        _httpClientFactory = httpClientFactory;
    }

    public async Task<bool> AuthenticateAsync(string bearerToken)
    {
        if (string.IsNullOrWhiteSpace(bearerToken))
        {
            return false;
        }

        try
        {
            var httpClient = _httpClientFactory.CreateClient();
            httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", bearerToken);
            var response = await httpClient.GetAsync("https://smdb.azurewebsites.net/api/songs");
            return response.IsSuccessStatusCode;
        }
        catch
        {
            return false;
        }
    }
}
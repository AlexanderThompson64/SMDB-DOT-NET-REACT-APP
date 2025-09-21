namespace SMDBReactAppNetCoreMVC.Server.Interfaces;

public interface IAuthenticationService
{
    Task<bool> AuthenticateAsync(string bearerToken);
}
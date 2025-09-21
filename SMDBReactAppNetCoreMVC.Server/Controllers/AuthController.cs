using Microsoft.AspNetCore.Mvc;
using SMDBReactAppNetCoreMVC.Server.Interfaces;

namespace SMDBReactAppNetCoreMVC.Server.Controllers;

public class LoginRequest
{
    public string? BearerToken { get; set; }
}

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;

    public AuthController(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        if (request.BearerToken == null)
        {
            return BadRequest();
        }

        var isAuthenticated = await _authenticationService.AuthenticateAsync(request.BearerToken);

        if (isAuthenticated)
        {
            return Ok();
        }

        return Unauthorized();
    }
}
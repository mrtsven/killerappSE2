using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KillerAPP.Repositories;
using KillerAPP.Domain;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace KillerAPP.Controllers
{
  public class AccessToken
  {
    public string access_token { get; set; }
  }

  public class UserCredentials
  {
    public string username { get; set; }
  }

  public class OpenIdToken
  {
    public string clientId { get; set; }
    public string redirectUri { get; set; }
    public string state { get; set; }
    public string code { get; set; }
    public string authuser { get; set; }
    public string session_state { get; set; }
    public string prompt { get; set; }
    public string consent { get; set; }
  }
  [Route("api/[controller]/[action]")]
  public class AuthController: Controller
    {
    
    ICharacterRepository charRepo;
    public AuthController()
    {
      charRepo = new CharacterRepository(new Connection());
    }

    [HttpPost]
    public AccessToken Login([FromBody] dynamic credentials)
    {
      string username = credentials.username;

      if (!charRepo.loginCharacter(username)) throw new UnauthorizedAccessException();
      Character user = charRepo.find(username);

      return CreateAccessToken(user.id.ToString(), user.name);
    }

    private static AccessToken CreateAccessToken(string userId,
                                                 string name)
    {
      var claims = new List<Claim>();
      
      claims.Add(new Claim("userid", userId));
      claims.Add(new Claim("name", name));

      var signing = new SigningCredentials(new SymmetricSecurityKey(new byte[32]), SecurityAlgorithms.HmacSha256);

      var jwt = new JwtSecurityToken(
        issuer: "theIssuer",
        audience: "theAudience",
        claims: claims,
        notBefore: DateTime.UtcNow,
        expires: DateTime.UtcNow + TimeSpan.FromHours(24),
        signingCredentials: signing);


      string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
      return new AccessToken { access_token = encodedJwt };
    }
  
  }
}

using KillerAPP.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerAPP.Controllers
{
  [Route("api/[controller]/[action]")]
  public class LoginController: Controller
    {
    public class Login
    {
      public string charname { get; set; }
    }
    ICharacterRepository charRepo;
    public LoginController()
    {
      charRepo = new CharacterRepository(new Connection());
    }

    [HttpPost]
    public void login([FromBody]Login login )
    {
      string name = login.charname;
      charRepo.loginCharacter(name);
    }
  }
}

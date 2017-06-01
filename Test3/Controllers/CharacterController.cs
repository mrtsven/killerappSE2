using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KillerAPP.Repositories;
using KillerAPP.Domain;

namespace KillerAPP.Controllers
{
  [Route("api/[controller]/[action]")]
  public class CharacterController : Controller
    {
      ICharacterRepository charRepo;
      public CharacterController()
      {
      charRepo = new CharacterRepository(new Connection());
      }

      [HttpPost]
      public JsonResult getNpcs()
      {
        return Json(charRepo.getNPC());
      }

      [HttpPost]
      public void create([FromBody] Character character, Class charclass, Race race)
      {
      string name = character.name;
      int chosenClass = charclass.id;
      int chosenRace = race.id;
      }
    }
}

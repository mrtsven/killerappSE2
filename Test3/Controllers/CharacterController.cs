using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KillerAPP.Repositories;
using KillerAPP.Domain;

namespace KillerAPP.Controllers
{
  public class Create {

    public string name { get; set; }
    public int race { get; set; }
    public int charclass { get; set; }
    }

  [Route("api/[controller]/[action]")]
  public class CharacterController : Controller
    {
      ICharacterRepository charRepo;
      public CharacterController()
      {
      charRepo = new CharacterRepository(new Connection());
      }
      public Character getCharacter([FromBody]Tuple <string> parameters)
      {
        return charRepo.find(parameters.Item1);
      
      } 

      [HttpPost]
      public List<Npc> getNpcs()
      {
      return charRepo.getNPC();
      }

      [HttpPost]
      public List<Class> getClass()
      {
        return charRepo.getClasses();
      }
      [HttpPost]
      public List<Race> getRace()
      {
        return charRepo.getRaces();
      }

     [HttpPost]
      public void create([FromBody] Create create)
      {
      string name = create.name;
      int chosenRace = create.race;
      int chosenClass = create.charclass;

      charRepo.createCharacter(name, chosenClass, chosenRace);

      }
    }
}

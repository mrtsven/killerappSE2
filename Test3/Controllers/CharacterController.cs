using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KillerAPP.Repositories;

namespace KillerAPP.Controllers
{
  [Route("api/[controller]/[action]")]
  public class CharacterController : Controller
    {
      ICharacterRepository charRepo;
      CharacterController()
      {
      charRepo = new CharacterRepository(new Connection());
      }

    [HttpPost]
    public JsonResult getNpcs()
    {
      return Json(charRepo.getNPC());
    }
    }
}

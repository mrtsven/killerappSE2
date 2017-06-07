using KillerAPP.Domain;
using KillerAPP.Repositories.InventoryRepo;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerAPP.Controllers
{
  //int userid = Convert.ToInt32(User.Claims.Single(c => c.Type == "userid").Value);
  [Route("api/[controller]/[action]")]
  public class InventoryController : Controller
    {
    IinventoryRepository invRepo;
    public InventoryController()
    {
      invRepo = new InvetoryRepository(new Connection());
    }

    [HttpPost]
    public List<Item> getItems()
    {
      return invRepo.getItems();
    }

    [HttpPost]
    public void buyItem([FromBody] Tuple<int, int> parameters)
    {
      invRepo.buyItem(parameters.Item1, parameters.Item2);
    }
  }
}

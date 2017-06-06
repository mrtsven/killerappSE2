using KillerAPP.Domain;
using KillerAPP.Repositories.InventoryRepo;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerAPP.Controllers
{
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
  }
}

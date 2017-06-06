using KillerAPP.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerAPP.Repositories.InventoryRepo
{
    public interface IinventoryRepository
    {
    List<Inventory> getInventory(int id);
    List<Item> getItems();
    }
}

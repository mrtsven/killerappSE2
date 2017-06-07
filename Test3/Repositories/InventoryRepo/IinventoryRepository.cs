using KillerAPP.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerAPP.Repositories.InventoryRepo
{
    public interface IinventoryRepository
    {
    List<Inventory> getArmor(int id);
    List<Inventory> getWeapon(int id);
    List<Item> getItems();
    void buyItem(int itemid, int userid);
    }
}

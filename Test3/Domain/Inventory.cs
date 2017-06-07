using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerAPP.Domain
{
    public class Inventory
    {
    public int ID { get; set; }
    public string name { get; set; }
    public int lvl_req { get; set; }
    public string type_armor { get; set; }
    public string type_weapon { get; set; }
    public int durability { get; set; }
    public string about { get; set; }

    }
}

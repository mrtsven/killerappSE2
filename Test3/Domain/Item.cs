using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KillerAPP.Domain
{
    public class Item
    {
    public int id { get; set; }
    public string name { get; set; }
    public int Lvl_Req { get; set; }
    public int durability { get; set; }
    public int gold { get; set; }
    public int encumbrance { get; set; }
    public string about { get; set; }
  }
}

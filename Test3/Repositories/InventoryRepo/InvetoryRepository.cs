using KillerAPP.Domain;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace KillerAPP.Repositories.InventoryRepo
{
    public class InvetoryRepository : IinventoryRepository
    {
    IConnection connection;

    public InvetoryRepository(IConnection connection)
    {
      this.connection = connection;
    }

    public List<Item> getItems()
    {
      List<Item> listItems = new List<Item>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT * from table_Item", connection.getConnection());
      using (SqlDataReader reader = sqlCommand.ExecuteReader())
      {
        while (reader.Read())
        {
          listItems.Add(CreateItemFromReader(reader));
        }
      }
      connection.disConnect();
      return listItems;
    }

   
    private Item CreateItemFromReader(SqlDataReader reader)
    {
      Item item = new Item
      {   
        id = Convert.ToInt32(reader["ID_Item"]),
        name = Convert.ToString(reader["name"]),
        Lvl_Req = Convert.ToInt32(reader["Lvl_Req"]),
        durability = Convert.ToInt32(reader["durability"]),
        gold = Convert.ToInt32(reader["gold"]),
        encumbrance = Convert.ToInt32(reader["encumbrance"]),
        about = Convert.ToString(reader["about"])

      };
      return item;
    }

  public List<Inventory> getInventory(int id)
    {
      List<Inventory> listItems = new List<Inventory>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT * from table_Item WHERE FK_Character = @charID", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@charID", id);

      using (SqlDataReader reader = sqlCommand.ExecuteReader())
      {
        while (reader.Read())
        {
          listItems.Add(CreateInventoryFromReader(reader));
        }
      }

      connection.disConnect();
      return listItems;
    }

    private Inventory CreateInventoryFromReader(SqlDataReader reader)
    {
      Inventory inventory = new Inventory
      {
        ID = Convert.ToInt32(reader["ID_Inventory"]),
        item_id = Convert.ToInt32(reader["FK_Item"]),
        character_id = Convert.ToInt32(reader["FK_Character"]),
        npc_id = Convert.ToInt32(reader["FK_NPC"])

      };
      return inventory;
    }

  }
}

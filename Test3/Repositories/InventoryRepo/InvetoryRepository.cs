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

    public List<Inventory> getWeapon(int id)
    {

      List<Inventory> listItems = new List<Inventory>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("getAllWeapons", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@charID", id);

      using (SqlDataReader reader = sqlCommand.ExecuteReader())
      {
        while (reader.Read())
        {
          listItems.Add(CreateWeaponInventoryFromReader(reader));
        }
      }

      connection.disConnect();
      return listItems;
    }

    private Inventory CreateWeaponInventoryFromReader(SqlDataReader reader)
    {
      Inventory inventory = new Inventory
      {
        ID = Convert.ToInt32(reader["ID_Item"]),
        name = Convert.ToString(reader["name"]),
        lvl_req = Convert.ToInt32(reader["lvl_req"]),
        type_armor = Convert.ToString(reader["type_weapon"]),
        durability = Convert.ToInt32(reader["durability"]),
        about = Convert.ToString(reader["about"])

      };
      return inventory;
    }

    public List<Inventory> getArmor(int id)
    {    

      List<Inventory> listItems = new List<Inventory>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("getAllArmor", connection.getConnection());
      sqlCommand.Parameters.AddWithValue("@charID", id);

      using (SqlDataReader reader = sqlCommand.ExecuteReader())
      {
        while (reader.Read())
        {
          listItems.Add(CreateArmorInventoryFromReader(reader));
        }
      }

      connection.disConnect();
      return listItems;
    }

    private Inventory CreateArmorInventoryFromReader(SqlDataReader reader)
    {
      Inventory inventory = new Inventory
      {
        ID = Convert.ToInt32(reader["ID_Item"]),
        name = Convert.ToString(reader["name"]),
        lvl_req = Convert.ToInt32(reader["lvl_req"]),
        type_armor = Convert.ToString(reader["type_armor"]),
        durability = Convert.ToInt32(reader["durability"]),
        about = Convert.ToString(reader["about"])

      };
      return inventory;
    }

    public void buyItem(int itemid, int userid)
    {
      try
      {
        SqlCommand sqlCommand = new SqlCommand("insert into table_inventory (FK_Item, FK_Character) VALUES (@item_id, @userid)", connection.getConnection());
        connection.Connect();
        sqlCommand.Parameters.AddWithValue("@item_id", itemid);
        sqlCommand.Parameters.AddWithValue("@userid", userid);

        sqlCommand.Connection = connection.getConnection();

        sqlCommand.ExecuteNonQuery();
      }

      catch (Exception)
      {
        throw;
      }

      finally
      {
        connection.disConnect();
      }
    }
  }
}

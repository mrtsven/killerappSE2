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
    public List<Inventory> getInventory(int id)
    {
      List<Inventory> listItems = new List<Inventory>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT * from table_Class", connection.getConnection());
      using (SqlDataReader reader = sqlCommand.ExecuteReader())
      {
        while (reader.Read())
        {
          listClass.Add(CreateInventoryFromReader(reader));
        }
      }

      connection.disConnect();
      return listClass;
    }

    private Inventory CreateInventoryFromReader(SqlDataReader reader)
    {
      Inventory inventory = new Inventory
      {
        id = Convert.ToInt32(reader["ID_Class"]),
        name = Convert.ToString(reader["name"]),
        type = Convert.ToString(reader["type"]),
        base_defence = Convert.ToInt32(reader["base_defense"]),
        base_attack = Convert.ToInt32(reader["base_attack"]),
        about = Convert.ToString(reader["about"])
      };
      return inventory;
    }
  }
}

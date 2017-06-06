using KillerAPP.Domain;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace KillerAPP.Repositories.LoginRepo
{
    public class LoginRepository : ILoginRepository
    {
    IConnection connection;
    public LoginRepository(IConnection connection)
    {
      this.connection = connection;
    }
    public bool loginCharacter(string name)
    {
      bool login = false;
      string characterName = "";

      if (name == null || name == "") return false;

      try
      {
        connection.Connect();
        SqlCommand sqlCommand = new SqlCommand("SELECT * from table_Character where name like @name", connection.getConnection());

        sqlCommand.Parameters.AddWithValue("@name", name);
        SqlDataReader reader = sqlCommand.ExecuteReader();
        if (reader.HasRows)
        {
          while (reader.Read())
          {
            characterName = reader["name"].ToString();
          }
        }
      }

      catch (Exception)
      {
        throw;
      }

      finally
      {
        connection.disConnect();
      }

      if (name == characterName)
      {
        login = true;
      }

      return login;
    }
    public Character find(string charname)
    {
      Character character = new Character();

      try
      {
        connection.Connect();
        SqlCommand sqlCommand = new SqlCommand("select * from table_character where name=@charname", connection.getConnection());
        sqlCommand.Parameters.AddWithValue("@charname", charname);
        SqlDataReader reader = sqlCommand.ExecuteReader();

        if (reader.HasRows)
        {
          while (reader.Read())
          {
            character.id = Convert.ToInt32(reader["id"]);
            character.name = reader["name"].ToString();
            character.lvl = Convert.ToInt32(reader["Lvl"]);
            character.xp = Convert.ToInt32(reader["xp"]);
            character.healthPoints = Convert.ToInt32(reader["healthPoints"]);
            character.stamina = Convert.ToInt32(reader["stamina"]);
            character.strength = Convert.ToInt32(reader["strength"]);
            character.charisma = Convert.ToInt32(reader["charisma"]);
            character.intelligence = Convert.ToInt32(reader["intelligence"]);
          }
        }
      }

      catch (Exception ex)
      {
        throw;
      }

      return character;
    }
  }
}

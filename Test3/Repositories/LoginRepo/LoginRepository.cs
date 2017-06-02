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
  }
}

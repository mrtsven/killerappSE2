using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace KillerAPP
{
  public class Connection : IConnection
  {
    public SqlConnection databaseConnection;
    public void Connect()
    {
      databaseConnection = new SqlConnection("Server=x.x.x.x;Database=x;User Id=root;Password=x;");
      try
      {
        databaseConnection.Open();
      }
      catch (Exception)
      {
        throw;
      }
    }
    public void disConnect()
    {
      databaseConnection.Close();
    }

    public SqlConnection getConnection()
    {
      return databaseConnection;
    }
  }
}

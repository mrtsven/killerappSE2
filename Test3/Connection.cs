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
      databaseConnection = new SqlConnection("Data Source=MEANKOMP;Initial Catalog=RPG_FUN2;Integrated Security=True");
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

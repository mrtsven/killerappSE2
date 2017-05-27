using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace KillerAPP
{
    public interface IConnection
    {
    void Connect();
    void disConnect();
    SqlConnection getConnection();
  }
}

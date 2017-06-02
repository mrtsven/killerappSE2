using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KillerAPP.Domain;
using System.Data.SqlClient;

namespace KillerAPP.Repositories
{
  public class CharacterRepository : ICharacterRepository
  {
    IConnection connection;
    List<Npc> npcList;

    public CharacterRepository(IConnection connection)
    {
      this.connection = connection;
    }

    public void createCharacter(string name, int Class, int race)
    {
      try
      {
        SqlCommand sqlCommand = new SqlCommand("CreateCharacter", connection.getConnection());

        connection.Connect();
        sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
        sqlCommand.Parameters.AddWithValue("@CharName", name);
        sqlCommand.Parameters.AddWithValue("@Class", Class);
        sqlCommand.Parameters.AddWithValue("@race", race);

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

    public List<Class> getClasses()
    {
      List<Class> listClass = new List<Class>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT * from table_Class", connection.getConnection());
      using (SqlDataReader reader = sqlCommand.ExecuteReader())
      {
        while (reader.Read())
        {
          listClass.Add(CreateClassFromReader(reader));
        }
      }

      connection.disConnect();
      return listClass;
    }

    private Class CreateClassFromReader(SqlDataReader reader)
    {
    Class klass = new Class
      {
        id = Convert.ToInt32(reader["ID_Class"]),
        name = Convert.ToString(reader["name"]),
        type = Convert.ToString(reader["type"]),
        base_defence = Convert.ToInt32(reader["base_defense"]),
        base_attack = Convert.ToInt32(reader["base_attack"]),
        about = Convert.ToString(reader["about"])
      };
      return klass;
    }

    public List<Npc> getNPC()
    {
      npcList = new List<Npc>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT * from table_NPC", connection.getConnection());

      
 
        using (SqlDataReader reader = sqlCommand.ExecuteReader())
        {
          while (reader.Read())
          {
          ;
            npcList.Add((CreateNpcFromReader(reader)));
          }
        }
        connection.disConnect();

      return npcList;
    }
    private Npc CreateNpcFromReader(SqlDataReader reader)
    {
      Npc npc = new Npc
      {
        id = Convert.ToInt32(reader["ID_NPC"]),
        name = Convert.ToString(reader["name"]),
        healthPoints = Convert.ToInt32(reader["healthPoints"]),
        stamina = Convert.ToInt32(reader["stamina"]),
        strength = Convert.ToInt32(reader["strength"]),
        charisma = Convert.ToInt32(reader["charisma"]),
        intelligence = Convert.ToInt32(reader["intelligence"]),
        about = Convert.ToString(reader["about"])
      };
      return npc;
    }

    public List<Race> getRaces()
    {

      List<Race> listRace = new List<Race>();
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT * from table_race", connection.getConnection());
      using (SqlDataReader reader = sqlCommand.ExecuteReader())
      {
        while (reader.Read())
        {
          listRace.Add(CreateRaceFromReader(reader));
        }
      }

      connection.disConnect();
      return listRace;
    }

    private Race CreateRaceFromReader(SqlDataReader reader)
    {
      Race race = new Race
      {
        id = Convert.ToInt32(reader["id_race"]),
        faction = Convert.ToString(reader["faction"]),
        race = Convert.ToString(reader["race"]),
        about = Convert.ToString(reader["about"])
      };
      return race;
    }
  }
}

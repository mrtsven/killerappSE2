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
    List<Character> npcList;

    public CharacterRepository(IConnection connection)
    {
      this.connection = connection;
    }

    public void createCharacter(Character name, Class Class, Race race)
    {
      try
      {
        SqlCommand sqlCommand = new SqlCommand("insert into  character_table (Name, FK_ClassID, FK_RaceID) VALUES (@name, @Class, @race)", connection.getConnection());
        connection.Connect();
        sqlCommand.Parameters.AddWithValue("@name", name);
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

    public List<Character> getNPC()
    {
      npcList = new List<Character>();
      //npcList.Add(new Character("He"));
      //npcList.Add(new Character("Woa"));
      //npcList.Add(new Character("Le"));
      //npcList.Add(new Character("Sha"));
      connection.Connect();
      SqlCommand sqlCommand = new SqlCommand("SELECT * from table_NPC", connection.getConnection());

      
 
        using (SqlDataReader reader = sqlCommand.ExecuteReader())
        {
          while (reader.Read())
          {
            Character npc = new Character(reader.GetString(1), reader.GetInt32(2));
            npcList.Add(npc);
          }
        }

      


        connection.disConnect();

      return npcList;


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

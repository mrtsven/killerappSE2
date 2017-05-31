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
    public CharacterRepository()
    {

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

    public List<Character> getNPC()
    {
      npcList = new List<Character>();
      npcList.Add(new Character("He"));
      npcList.Add(new Character("Woa"));
      npcList.Add(new Character("Le"));
      npcList.Add(new Character("Sha"));
      //connection.Connect();
      //SqlCommand sqlCommand = new SqlCommand("SELECT * from table_NPC", connection.getConnection());

      //SqlDataReader reader = sqlCommand.ExecuteReader();

      //  sqlCommand.Connection = connection.getConnection();
      //while (reader.Read())
      //{
      //  Character npc = new Character();
      //  npcList.Add(npc);
      //}

      //  connection.disConnect();

      return npcList;


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

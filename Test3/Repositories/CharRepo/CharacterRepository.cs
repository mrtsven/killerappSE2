﻿using System;
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

    public void createCharacter(string name, int race, int Class)
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
        foreach(Npc npc in npcList)
        {
        npc.lvl = (npc.charisma + npc.intelligence + npc.strength + npc.stamina) / 10;
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
            character.id = Convert.ToInt32(reader["id_character"]);
            character.name = reader["name"].ToString();
            character.lvl = Convert.ToInt32(reader["Lvl"]);
            character.xp = Convert.ToInt32(reader["xp"]);
            character.gold = Convert.ToInt32(reader["gold"]);
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

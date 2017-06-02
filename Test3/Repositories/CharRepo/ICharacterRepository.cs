using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KillerAPP.Domain;

namespace KillerAPP.Repositories
{
    interface ICharacterRepository
    {
    bool loginCharacter(string charname);
    void createCharacter(string name, int Class, int race);
    List<Npc> getNPC();
    List<Class> getClasses();
    List<Race> getRaces();

    }
}

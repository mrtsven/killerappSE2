using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KillerAPP.Domain;

namespace KillerAPP.Repositories
{
    interface ICharacterRepository
    {
    bool loginCharacter(string charname, string password);
    string createCharacter(Character character);
    }
}

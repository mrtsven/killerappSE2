﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KillerAPP.Domain;

namespace KillerAPP.Repositories
{
    interface ICharacterRepository
    {
    bool loginCharacter(string charname);
    void createCharacter(Character name, Class Class, Race race);
    List<Character> getNPC();
    }
}

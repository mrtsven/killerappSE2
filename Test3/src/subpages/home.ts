import { autoinject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

class Character {
    id: number;
    name: string;
     lvl: number;
     xp: number;
     healthPoints: number;
     stamina: number;
     strength: number;
     charisma: number;
     intelligence: number;
}

class Class {
    id: number;
    name: string;
    type: string;
    base_defence: number;
    base_attack: number;
    about: string;
}

class Race {
    id: number;
    faction: string;
    race: string;
    about: string;
}

@autoinject
export class home {
    character;
    charclass;
    races;
    constructor(private http: HttpClient, private event: EventAggregator, private router: Router) {
        this.getRaces();
    }

    async createCharacter() {
        let data: Response = await this.http.fetch('character/create', {
            body: json(this.createCharacter)
        });

        let x = await data.json();
        alert('Character:' + x.name + ' created!');

    }

    getRaces() {
        this.http.fetch('character/getrace', {
            body: json(this.races)
        })
            .then(response => response.json())
            .then(data => {
                this.races = data;
                console.log(data);
            });
    }
}
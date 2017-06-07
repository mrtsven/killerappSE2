import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { Character } from '../Character';

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
export class CreateChararacter {
    name;
    charclass;
    races;

    selectedRace: number;
    selectedClass: number;

    constructor(private http: HttpClient, private event: EventAggregator, private router: Router, private character: Character) {
        this.getRaces();
        this.getClasses();
    }

    createCharacter() {
        this.http.fetch('character/create', {
            body: json(new create(this.name, this.selectedRace, this.selectedClass))
        }).then(response => {
            swal({
                title: "Succesfully made a character",
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2000


            });
            this.router.navigateToRoute("login")
        })


        
    }

    getRaces() {
        this.http.fetch('character/getrace', {
            
        })
            .then(response => response.json())
            .then(data => {
                this.races = data;
                console.log(data);
            });
    }

    getClasses() {
        this.http.fetch('character/getclass', {
        
        })
            .then(response => response.json())
            .then(data => {
                this.charclass = data;
                console.log(data);
            });
    }
}

export class create {
    name: string;
    race: number;
    charclass: number;
    constructor(name, race, charclass) {
        this.charclass = charclass;
        this.race = race;
        this.name = name;
    }
}
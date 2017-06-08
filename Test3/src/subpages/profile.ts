import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { EventAggregator } from 'aurelia-event-aggregator';
import { AuthService } from "aurelia-authentication"
import { Router } from 'aurelia-router';
import { Character } from '../Character';
import * as jwt_decode from 'jwt-decode';

@autoinject
export class profile {
    inventoryArmor;
    inventoryWeapon;
    constructor(private http: HttpClient, private event: EventAggregator, private auth: AuthService, private router: Router, private character: Character)
    {
        this.getCharacter();
        this.getArmor();
        this.getWeapon();
    }
    

    async getCharacter() {
        let data: Response = await this.http.fetch('character/getCharacter', {
            body: json({
                "item1": jwt_decode(this.auth.getAccessToken()).name
            })
        });
        this.character = await data.json();
    }
    async getArmor() {
        let data: Response = await this.http.fetch('inventory/getarmor', {
            body: json({
                "item1": jwt_decode(this.auth.getAccessToken()).userid
            })
        });
        this.inventoryArmor = await data.json();
    }
    async getWeapon() {
 
        let data: Response = await this.http.fetch('inventory/getweapon', {
            body: json({
                "item1": jwt_decode(this.auth.getAccessToken()).userid
            })
        });
        this.inventoryWeapon = await data.json();
    }

}

import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import * as jwt_decode from 'jwt-decode';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router'

@autoinject
export class shop
   {
    items;
    constructor(private http: HttpClient, private auth: AuthService, private event: EventAggregator, private router: Router) {
        this.getItems();
    }

    getItems() {
        this.http.fetch('inventory/getitems', {
            body: json(this.items)
        })
            .then(response => response.json())
            .then(data => {
                this.items = data;
                console.log(data);
            });
    }

    buyItem(itemid:number) {
        console.log(jwt_decode(this.auth.getAccessToken()).userid)
        this.http.fetch('inventory/buyitem', {
            body: json({
                "item1": itemid,
                "item2": jwt_decode(this.auth.getAccessToken()).userid
            })
        })
            .then(response => response.json())
            .then(data => {
                this.items = data;
                console.log(data);
            });
    }
}


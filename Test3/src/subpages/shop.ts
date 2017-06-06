import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

@autoinject
export class shop
   {
    items;
    constructor(private http: HttpClient, private event: EventAggregator, private router: Router) {
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
   }


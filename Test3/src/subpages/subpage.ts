
import { autoinject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

@autoinject
export class subpage {
    npcs;
    constructor(private http: HttpClient, private event: EventAggregator, private router: Router) {
        this.getNpcs();
    }

    getNpcs() {
        this.http.fetch('character/getNpcs', {
            body: json(this.npcs)
        })
            .then(response => response.json())
            .then(data => {
                this.npcs = data;
                console.log(data);
            });
    }
}

import { autoinject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';

@autoinject
export class login {
    username;
    constructor(private http: HttpClient, private event: EventAggregator, private router: Router) {

    }

    login() {
        console.log(this.username);
        this.http.fetch('login/login', {
            body: json(this.username)
        });

    }
}
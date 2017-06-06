﻿import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework"
import { HttpClient, json } from "aurelia-fetch-client"
import { AuthService } from "aurelia-authentication"
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router'

@autoinject
export class Login {
    username = "";
    constructor(private auth: AuthService,
        private http: HttpClient,
        private router: Router,
        private event: EventAggregator) {
    }

    login() {
        this.auth.login({
            username: this.username
        }).then(response => {
            this.event.publish('signedIn', true);

            swal({
                title: "U bent succesvol ingelogd",
                type: "success",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2000
            });

            this.router.navigate("shop");
        })
            .catch(err => {
                swal({
                    title: "Inloggegevens zijn onjuist",
                    type: "warning",
                    showCancelButton: true,
                    showConfirmButton: false,
                    closeOnConfirm: true
                });
            });
    }

    logout() {
        this.auth.logout('');
    }
}
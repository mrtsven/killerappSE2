import * as swal from 'sweetalert';
import { autoinject } from "aurelia-framework";
import { HttpClient, json } from "aurelia-fetch-client";
import { EventAggregator } from 'aurelia-event-aggregator';
import { Router } from 'aurelia-router';
import { Character } from '../Character';

@autoinject
export class profile {
    constructor(private http: HttpClient, private event: EventAggregator, private router: Router, private character: Character)
    {

    }


}

import { Router, RouterConfiguration } from 'aurelia-router'
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class App {
    router: Router;
    constructor(private http: HttpClient) {
        this.configHttp();
    }


    configureRouter(config, router) {
        this.router = router;
        config.title = 'Aurelia';
        config.map([
            
            { route: ['/', 'subpage'], name: 'subpage', moduleId: 'subpages/subpage' },
            { route: ['/', 'home'], name: 'home', moduleId: 'subpages/home' },
        ]);
    }

    configHttp(): void {
        this.http.configure(config => {
            config
                .withBaseUrl('api/')
                .withDefaults({
                    method: "POST",
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                })
                .withInterceptor({
                    request(request) {
                        console.log(`Requesting ${request.method} ${request.url}`);
                        return request;
                    },
                    response(response: Response) {
                        console.log(`Received ${response.status} ${response.url}`);
                        return response;
                    }
                });
        });
    }

}
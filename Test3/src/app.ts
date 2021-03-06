import { autoinject } from 'aurelia-framework';
import { Router, RouterConfiguration, Next, Redirect, NavigationInstruction } from 'aurelia-router'
import { HttpClient } from 'aurelia-fetch-client';
import { FetchConfig } from 'aurelia-authentication';
import { Container } from 'aurelia-dependency-injection';
import { AuthService } from 'aurelia-authentication';
import { EventAggregator } from 'aurelia-event-aggregator';
import * as jwt_decode from 'jwt-decode';
import { Character } from './Character';


@autoinject
export class App {
    router: Router;
    authenticated: boolean;
    title: string;

    constructor(private http: HttpClient,
        private config: FetchConfig,
        private authService: AuthService,
        private event: EventAggregator,
        private character: Character) {
        this.configHttp();
        this.authenticated = this.authService.authenticated;
        this.title = this.authService.authenticated ? "Welkom " + jwt_decode(this.authService.getAccessToken()).name : "KVAS";
        
    }


    configureRouter(config, router) {
        this.router = router;

        let step = new AuthorizeStep(this.authService);
        config.addAuthorizeStep(step);

        config.title = 'Aurelia';
        config.map([
            {
                route: ['profile'],
                name: 'profile',
                moduleId: 'subpages/profile'
            },
            {
                route: ['subpage'],
                name: 'subpage',
                moduleId: 'subpages/subpage'
            },
            {
                route: ['create'],
                name: 'create',
                moduleId: 'subpages/create'
            },
            {
                route: ['shop'],
                name: 'shop',
                moduleId: 'subpages/shop',
                auth: true
            },
            {
                route: ['/'],
                name: 'login',
                moduleId: 'subpages/login'
            },
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

    logout() {
        return this.authService.logout()
            .then(() => {
                this.authenticated = this.authService.authenticated;
                this.router.navigate("login");
                this.title = "KVAS";

                swal({
                    title: "Logged out",
                    type: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
            });
    }
}

@autoinject
class AuthorizeStep {
    constructor(private authService: AuthService) { }

    run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
        if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
            let isLoggedIn = this.authService.isAuthenticated();

            if (!isLoggedIn) {
                return next.cancel(new Redirect('login'));
            }
        }

        return next();
    }
}
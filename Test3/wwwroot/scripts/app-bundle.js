var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "aurelia-router", "aurelia-fetch-client", "aurelia-authentication", "aurelia-authentication", "aurelia-event-aggregator", "jwt-decode"], function (require, exports, aurelia_framework_1, aurelia_router_1, aurelia_fetch_client_1, aurelia_authentication_1, aurelia_authentication_2, aurelia_event_aggregator_1, jwt_decode) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(http, config, authService, event) {
            this.http = http;
            this.config = config;
            this.authService = authService;
            this.event = event;
            this.configHttp();
            this.authenticated = this.authService.authenticated;
            this.title = this.authService.authenticated ? "Welkom " + jwt_decode(this.authService.getAccessToken()).name : "KVAS";
            if (this.authenticated) {
                alert(jwt_decode(this.authService.getAccessToken()).userid);
            }
            ;
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            var step = new AuthorizeStep(this.authService);
            config.addAuthorizeStep(step);
            config.title = 'Aurelia';
            config.map([
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
        };
        App.prototype.configHttp = function () {
            this.http.configure(function (config) {
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
                    request: function (request) {
                        console.log("Requesting " + request.method + " " + request.url);
                        return request;
                    },
                    response: function (response) {
                        console.log("Received " + response.status + " " + response.url);
                        return response;
                    }
                });
            });
        };
        App.prototype.logout = function () {
            var _this = this;
            return this.authService.logout()
                .then(function () {
                _this.authenticated = _this.authService.authenticated;
                _this.router.navigate("login");
                _this.title = "KVAS";
                swal({
                    title: "Logged out",
                    type: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
            });
        };
        return App;
    }());
    App = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient,
            aurelia_authentication_1.FetchConfig,
            aurelia_authentication_2.AuthService,
            aurelia_event_aggregator_1.EventAggregator])
    ], App);
    exports.App = App;
    var AuthorizeStep = (function () {
        function AuthorizeStep(authService) {
            this.authService = authService;
        }
        AuthorizeStep.prototype.run = function (navigationInstruction, next) {
            if (navigationInstruction.getAllInstructions().some(function (i) { return i.config.auth; })) {
                var isLoggedIn = this.authService.isAuthenticated();
                if (!isLoggedIn) {
                    return next.cancel(new aurelia_router_1.Redirect('login'));
                }
            }
            return next();
        };
        return AuthorizeStep;
    }());
    AuthorizeStep = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_2.AuthService])
    ], AuthorizeStep);
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFDLENBQUM7b0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSx5QkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLENBQUM7WUFDTCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxvQkFBQztJQUFELENBZEEsQUFjQyxJQUFBO0lBZEssYUFBYTtRQURsQiw4QkFBVTt5Q0FFMEIsb0NBQVc7T0FEMUMsYUFBYSxDQWNsQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJDb25maWd1cmF0aW9uLCBOZXh0LCBSZWRpcmVjdCwgTmF2aWdhdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xuaW1wb3J0IHsgRmV0Y2hDb25maWcgfSBmcm9tICdhdXJlbGlhLWF1dGhlbnRpY2F0aW9uJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdhdXJlbGlhLWF1dGhlbnRpY2F0aW9uJztcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XG5pbXBvcnQgKiBhcyBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuXG5cbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG4gICAgcm91dGVyOiBSb3V0ZXI7XG4gICAgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcbiAgICB0aXRsZTogc3RyaW5nO1xuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBGZXRjaENvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZXZlbnQ6IEV2ZW50QWdncmVnYXRvcikge1xuICAgICAgICB0aGlzLmNvbmZpZ0h0dHAoKTtcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkID8gXCJXZWxrb20gXCIgKyBqd3RfZGVjb2RlKHRoaXMuYXV0aFNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKSkubmFtZSA6IFwiS1ZBU1wiO1xuICAgICAgICBpZiAodGhpcy5hdXRoZW50aWNhdGVkKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KGp3dF9kZWNvZGUodGhpcy5hdXRoU2VydmljZS5nZXRBY2Nlc3NUb2tlbigpKS51c2VyaWQpO1xyXG4gICAgICAgIH07XG4gICAgfVxuXG5cclxuICAgIGNvbmZpZ3VyZVJvdXRlcihjb25maWcsIHJvdXRlcikge1xyXG4gICAgICAgIHRoaXMucm91dGVyID0gcm91dGVyO1xuXG4gICAgICAgIGxldCBzdGVwID0gbmV3IEF1dGhvcml6ZVN0ZXAodGhpcy5hdXRoU2VydmljZSk7XG4gICAgICAgIGNvbmZpZy5hZGRBdXRob3JpemVTdGVwKHN0ZXApO1xuXHJcbiAgICAgICAgY29uZmlnLnRpdGxlID0gJ0F1cmVsaWEnO1xyXG4gICAgICAgIGNvbmZpZy5tYXAoW1xuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IFsnc3VicGFnZSddLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdzdWJwYWdlJyxcbiAgICAgICAgICAgICAgICBtb2R1bGVJZDogJ3N1YnBhZ2VzL3N1YnBhZ2UnXHJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogWydjcmVhdGUnXSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnY3JlYXRlJyxcbiAgICAgICAgICAgICAgICBtb2R1bGVJZDogJ3N1YnBhZ2VzL2NyZWF0ZSdcclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiBbJ3Nob3AnXSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnc2hvcCcsXG4gICAgICAgICAgICAgICAgbW9kdWxlSWQ6ICdzdWJwYWdlcy9zaG9wJyxcbiAgICAgICAgICAgICAgICBhdXRoOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogWycvJ10sXG4gICAgICAgICAgICAgICAgbmFtZTogJ2xvZ2luJyxcbiAgICAgICAgICAgICAgICBtb2R1bGVJZDogJ3N1YnBhZ2VzL2xvZ2luJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxuXG4gICAgY29uZmlnSHR0cCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5odHRwLmNvbmZpZ3VyZShjb25maWcgPT4ge1xuICAgICAgICAgICAgY29uZmlnXG4gICAgICAgICAgICAgICAgLndpdGhCYXNlVXJsKCdhcGkvJylcbiAgICAgICAgICAgICAgICAud2l0aERlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdGZXRjaCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJlcXVlc3RpbmcgJHtyZXF1ZXN0Lm1ldGhvZH0gJHtyZXF1ZXN0LnVybH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZShyZXNwb25zZTogUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZlZCAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS51cmx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IHRoaXMuYXV0aFNlcnZpY2UuYXV0aGVudGljYXRlZDtcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcImxvZ2luXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMudGl0bGUgPSBcIktWQVNcIjtcblxuICAgICAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJMb2dnZWQgb3V0XCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHRpbWVyOiAyMDAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG5cbkBhdXRvaW5qZWN0XG5jbGFzcyBBdXRob3JpemVTdGVwIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkgeyB9XG5cbiAgICBydW4obmF2aWdhdGlvbkluc3RydWN0aW9uOiBOYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24sIG5leHQ6IE5leHQpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBpZiAobmF2aWdhdGlvbkluc3RydWN0aW9uLmdldEFsbEluc3RydWN0aW9ucygpLnNvbWUoaSA9PiBpLmNvbmZpZy5hdXRoKSkge1xuICAgICAgICAgICAgbGV0IGlzTG9nZ2VkSW4gPSB0aGlzLmF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpO1xuXG4gICAgICAgICAgICBpZiAoIWlzTG9nZ2VkSW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KCdsb2dpbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfVxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('AuthConfig',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var config = {
        providers: {
            google: {
                name: 'google',
                clientId: '833710645751-q02snmqimmijs2jdk9orckpmfdvi53dt.apps.googleusercontent.com'
            }
        }
    };
    exports.default = config;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkF1dGhDb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUEsSUFBSSxNQUFNLEdBQUc7UUFDVCxTQUFTLEVBQUU7WUFDUCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLDBFQUEwRTthQUN2RjtTQUNKO0tBQ0osQ0FBQTtJQUVELGtCQUFlLE1BQU0sQ0FBQyIsImZpbGUiOiJBdXRoQ29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGNvbmZpZyA9IHtcbiAgICBwcm92aWRlcnM6IHtcbiAgICAgICAgZ29vZ2xlOiB7XG4gICAgICAgICAgICBuYW1lOiAnZ29vZ2xlJyxcbiAgICAgICAgICAgIGNsaWVudElkOiAnODMzNzEwNjQ1NzUxLXEwMnNubXFpbW1panMyamRrOW9yY2twbWZkdmk1M2R0LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tJ1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLGtCQUFlO1FBQ2IsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUMiLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGRlYnVnOiB0cnVlLFxuICB0ZXN0aW5nOiB0cnVlXG59O1xuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

define('main',["require", "exports", "./environment", "./AuthConfig"], function (require, exports, environment_1, AuthConfig_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources')
            .plugin('aurelia-authentication', function (baseConfig) {
            baseConfig.configure(AuthConfig_1.default);
        });
        if (environment_1.default.debug) {
            aurelia.use.developmentLogging();
        }
        if (environment_1.default.testing) {
            aurelia.use.plugin('aurelia-testing');
        }
        aurelia.start().then(function () { return aurelia.setRoot(); });
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBSUEsbUJBQTBCLE9BQWdCO1FBQ3RDLE9BQU8sQ0FBQyxHQUFHO2FBQ04scUJBQXFCLEVBQUU7YUFDdkIsT0FBTyxDQUFDLFdBQVcsQ0FBQzthQUNwQixNQUFNLENBQUMsd0JBQXdCLEVBQ2hDLFVBQUMsVUFBVTtZQUNQLFVBQVUsQ0FBQyxTQUFTLENBQUMsb0JBQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBRVAsRUFBRSxDQUFDLENBQUMscUJBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUNyQyxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMscUJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUVELE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFsQkQsOEJBa0JDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBdXJlbGlhIH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vQXV0aENvbmZpZydcblxuZXhwb3J0IGZ1bmN0aW9uIGNvbmZpZ3VyZShhdXJlbGlhOiBBdXJlbGlhKSB7XG4gICAgYXVyZWxpYS51c2VcbiAgICAgICAgLnN0YW5kYXJkQ29uZmlndXJhdGlvbigpXG4gICAgICAgIC5mZWF0dXJlKCdyZXNvdXJjZXMnKVxuICAgICAgICAucGx1Z2luKCdhdXJlbGlhLWF1dGhlbnRpY2F0aW9uJyxcbiAgICAgICAgKGJhc2VDb25maWcpID0+IHtcbiAgICAgICAgICAgIGJhc2VDb25maWcuY29uZmlndXJlKGNvbmZpZyk7XG4gICAgICAgIH0pO1xuXG4gICAgaWYgKGVudmlyb25tZW50LmRlYnVnKSB7XG4gICAgICAgIGF1cmVsaWEudXNlLmRldmVsb3BtZW50TG9nZ2luZygpO1xuICAgIH1cblxuICAgIGlmIChlbnZpcm9ubWVudC50ZXN0aW5nKSB7XG4gICAgICAgIGF1cmVsaWEudXNlLnBsdWdpbignYXVyZWxpYS10ZXN0aW5nJyk7XG4gICAgfVxuXG4gICAgYXVyZWxpYS5zdGFydCgpLnRoZW4oKCkgPT4gYXVyZWxpYS5zZXRSb290KCkpO1xufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

define('resources/index',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
    }
    exports.configure = configure;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc291cmNlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFFQSxtQkFBMEIsTUFBOEI7SUFFeEQsQ0FBQztJQUZELDhCQUVDIiwiZmlsZSI6InJlc291cmNlcy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RnJhbWV3b3JrQ29uZmlndXJhdGlvbn0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuXG5leHBvcnQgZnVuY3Rpb24gY29uZmlndXJlKGNvbmZpZzogRnJhbWV3b3JrQ29uZmlndXJhdGlvbikge1xuICAvL2NvbmZpZy5nbG9iYWxSZXNvdXJjZXMoW10pO1xufVxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('subpages/create',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-event-aggregator", "aurelia-router"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Character = (function () {
        function Character() {
        }
        return Character;
    }());
    var Class = (function () {
        function Class() {
        }
        return Class;
    }());
    var Race = (function () {
        function Race() {
        }
        return Race;
    }());
    var CreateChararacter = (function () {
        function CreateChararacter(http, event, router) {
            this.http = http;
            this.event = event;
            this.router = router;
            this.getRaces();
            this.getClasses();
        }
        CreateChararacter.prototype.createCharacter = function () {
            var _this = this;
            this.http.fetch('character/create', {
                body: aurelia_fetch_client_1.json(new create(this.name, this.selectedRace, this.selectedClass))
            }).then(function (response) {
                swal({
                    title: "Succesfully made a character",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000
                });
                _this.router.navigateToRoute("login");
            });
        };
        CreateChararacter.prototype.getRaces = function () {
            var _this = this;
            this.http.fetch('character/getrace', {})
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.races = data;
                console.log(data);
            });
        };
        CreateChararacter.prototype.getClasses = function () {
            var _this = this;
            this.http.fetch('character/getclass', {})
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.charclass = data;
                console.log(data);
            });
        };
        return CreateChararacter;
    }());
    CreateChararacter = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.Router])
    ], CreateChararacter);
    exports.CreateChararacter = CreateChararacter;
    var create = (function () {
        function create(name, race, charclass) {
            this.charclass = charclass;
            this.race = race;
            this.name = name;
        }
        return create;
    }());
    exports.create = create;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,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TSIsImZpbGUiOiJzdWJwYWdlcy9jcmVhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiO1xuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxuY2xhc3MgQ2hhcmFjdGVyIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAgbHZsOiBudW1iZXI7XG4gICAgIHhwOiBudW1iZXI7XG4gICAgIGhlYWx0aFBvaW50czogbnVtYmVyO1xuICAgICBzdGFtaW5hOiBudW1iZXI7XG4gICAgIHN0cmVuZ3RoOiBudW1iZXI7XG4gICAgIGNoYXJpc21hOiBudW1iZXI7XG4gICAgIGludGVsbGlnZW5jZTogbnVtYmVyO1xyXG59XG5cbmNsYXNzIENsYXNzIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgYmFzZV9kZWZlbmNlOiBudW1iZXI7XG4gICAgYmFzZV9hdHRhY2s6IG51bWJlcjtcbiAgICBhYm91dDogc3RyaW5nO1xyXG59XG5cbmNsYXNzIFJhY2Uge1xuICAgIGlkOiBudW1iZXI7XG4gICAgZmFjdGlvbjogc3RyaW5nO1xuICAgIHJhY2U6IHN0cmluZztcbiAgICBhYm91dDogc3RyaW5nO1xyXG59XG5cclxuQGF1dG9pbmplY3RcbmV4cG9ydCBjbGFzcyBDcmVhdGVDaGFyYXJhY3RlciB7XG4gICAgbmFtZTtcbiAgICBjaGFyY2xhc3M7XG4gICAgcmFjZXM7XG5cbiAgICBzZWxlY3RlZFJhY2U6IG51bWJlcjtcbiAgICBzZWxlY3RlZENsYXNzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgZXZlbnQ6IEV2ZW50QWdncmVnYXRvciwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcikge1xyXG4gICAgICAgIHRoaXMuZ2V0UmFjZXMoKTtcbiAgICAgICAgdGhpcy5nZXRDbGFzc2VzKCk7XHJcbiAgICB9XG5cbiAgICBjcmVhdGVDaGFyYWN0ZXIoKSB7XG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnY2hhcmFjdGVyL2NyZWF0ZScsIHtcbiAgICAgICAgICAgIGJvZHk6IGpzb24obmV3IGNyZWF0ZSh0aGlzLm5hbWUsIHRoaXMuc2VsZWN0ZWRSYWNlLCB0aGlzLnNlbGVjdGVkQ2xhc3MpKVxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1Y2Nlc2Z1bGx5IG1hZGUgYSBjaGFyYWN0ZXJcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZXI6IDIwMDBcblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlVG9Sb3V0ZShcImxvZ2luXCIpXG4gICAgICAgIH0pXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICB9XG5cbiAgICBnZXRSYWNlcygpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ2NoYXJhY3Rlci9nZXRyYWNlJywge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYWNlcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XG5cbiAgICBnZXRDbGFzc2VzKCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnY2hhcmFjdGVyL2dldGNsYXNzJywge1xyXG4gICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJjbGFzcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cblxuZXhwb3J0IGNsYXNzIGNyZWF0ZSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJhY2U6IG51bWJlcjtcbiAgICBjaGFyY2xhc3M6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCByYWNlLCBjaGFyY2xhc3MpIHtcbiAgICAgICAgdGhpcy5jaGFyY2xhc3MgPSBjaGFyY2xhc3M7XG4gICAgICAgIHRoaXMucmFjZSA9IHJhY2U7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('subpages/login',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "aurelia-event-aggregator", "aurelia-router"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, aurelia_event_aggregator_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Login = (function () {
        function Login(auth, http, router, event) {
            this.auth = auth;
            this.http = http;
            this.router = router;
            this.event = event;
            this.username = "";
        }
        Login.prototype.login = function () {
            var _this = this;
            this.auth.login({
                username: this.username
            }).then(function (response) {
                _this.event.publish('signedIn', true);
                swal({
                    title: "U bent succesvol ingelogd",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000
                });
                _this.router.navigateToRoute("shop");
            })
                .catch(function (err) {
                swal({
                    title: "Inloggegevens zijn onjuist",
                    type: "warning",
                    showCancelButton: true,
                    showConfirmButton: false,
                    closeOnConfirm: true
                });
            });
        };
        Login.prototype.logout = function () {
            this.auth.logout('');
        };
        return Login;
    }());
    Login = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService,
            aurelia_fetch_client_1.HttpClient,
            aurelia_router_1.Router,
            aurelia_event_aggregator_1.EventAggregator])
    ], Login);
    exports.Login = Login;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YnBhZ2VzL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQVFBLElBQWEsS0FBSztRQUVkLGVBQW9CLElBQWlCLEVBQ3pCLElBQWdCLEVBQ2hCLE1BQWMsRUFDZCxLQUFzQjtZQUhkLFNBQUksR0FBSixJQUFJLENBQWE7WUFDekIsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBaUI7WUFKbEMsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUtkLENBQUM7UUFFRCxxQkFBSyxHQUFMO1lBQUEsaUJBeUJDO1lBeEJHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtnQkFDWixLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXJDLElBQUksQ0FBQztvQkFDRCxLQUFLLEVBQUUsMkJBQTJCO29CQUNsQyxJQUFJLEVBQUUsU0FBUztvQkFDZixnQkFBZ0IsRUFBRSxLQUFLO29CQUN2QixpQkFBaUIsRUFBRSxLQUFLO29CQUN4QixLQUFLLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUM7Z0JBRUgsS0FBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDeEMsQ0FBQyxDQUFDO2lCQUNHLEtBQUssQ0FBQyxVQUFBLEdBQUc7Z0JBQ04sSUFBSSxDQUFDO29CQUNELEtBQUssRUFBRSw0QkFBNEI7b0JBQ25DLElBQUksRUFBRSxTQUFTO29CQUNmLGdCQUFnQixFQUFFLElBQUk7b0JBQ3RCLGlCQUFpQixFQUFFLEtBQUs7b0JBQ3hCLGNBQWMsRUFBRSxJQUFJO2lCQUN2QixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFFRCxzQkFBTSxHQUFOO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUNMLFlBQUM7SUFBRCxDQXRDQSxBQXNDQyxJQUFBO0lBdENZLEtBQUs7UUFEakIsOEJBQVU7eUNBR21CLG9DQUFXO1lBQ25CLGlDQUFVO1lBQ1IsdUJBQU07WUFDUCwwQ0FBZTtPQUx6QixLQUFLLENBc0NqQjtJQXRDWSxzQkFBSyIsImZpbGUiOiJzdWJwYWdlcy9sb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXG5cbkBhdXRvaW5qZWN0XG5leHBvcnQgY2xhc3MgTG9naW4ge1xuICAgIHVzZXJuYW1lID0gXCJcIjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgZXZlbnQ6IEV2ZW50QWdncmVnYXRvcikge1xuICAgIH1cblxuICAgIGxvZ2luKCkge1xuICAgICAgICB0aGlzLmF1dGgubG9naW4oe1xuICAgICAgICAgICAgdXNlcm5hbWU6IHRoaXMudXNlcm5hbWVcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50LnB1Ymxpc2goJ3NpZ25lZEluJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlUgYmVudCBzdWNjZXN2b2wgaW5nZWxvZ2RcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZXI6IDIwMDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZVRvUm91dGUoXCJzaG9wXCIpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgc3dhbCh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIklubG9nZ2VnZXZlbnMgemlqbiBvbmp1aXN0XCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwid2FybmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlT25Db25maXJtOiB0cnVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIHRoaXMuYXV0aC5sb2dvdXQoJycpO1xuICAgIH1cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('subpages/shop',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-authentication", "jwt-decode", "aurelia-event-aggregator", "aurelia-router"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_authentication_1, jwt_decode, aurelia_event_aggregator_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var shop = (function () {
        function shop(http, auth, event, router) {
            this.http = http;
            this.auth = auth;
            this.event = event;
            this.router = router;
            this.getItems();
        }
        shop.prototype.getItems = function () {
            var _this = this;
            this.http.fetch('inventory/getitems', {
                body: aurelia_fetch_client_1.json(this.items)
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.items = data;
                console.log(data);
            });
        };
        shop.prototype.buyItem = function (itemid) {
            var _this = this;
            console.log(jwt_decode(this.auth.getAccessToken()).userid);
            this.http.fetch('inventory/buyitem', {
                body: aurelia_fetch_client_1.json({
                    "item1": itemid,
                    "item2": jwt_decode(this.auth.getAccessToken()).userid
                })
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.items = data;
                console.log(data);
            });
        };
        return shop;
    }());
    shop = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_authentication_1.AuthService, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.Router])
    ], shop);
    exports.shop = shop;
    var item = (function () {
        function item(itemid) {
            this.itemid = itemid;
        }
        return item;
    }());
    exports.item = item;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YnBhZ2VzL3Nob3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBU0EsSUFBYSxJQUFJO1FBR2IsY0FBb0IsSUFBZ0IsRUFBVSxJQUFpQixFQUFVLEtBQXNCLEVBQVUsTUFBYztZQUFuRyxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBYTtZQUFVLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUNuSCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVELHVCQUFRLEdBQVI7WUFBQSxpQkFTQztZQVJHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFO2dCQUNsQyxJQUFJLEVBQUUsMkJBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3pCLENBQUM7aUJBQ0csSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQztpQkFDakMsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDTixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFFRCxzQkFBTyxHQUFQLFVBQVEsTUFBYTtZQUFyQixpQkFhQztZQVpHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRTtnQkFDakMsSUFBSSxFQUFFLDJCQUFJLENBQUM7b0JBQ1AsT0FBTyxFQUFFLE1BQU07b0JBQ2YsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsTUFBTTtpQkFDekQsQ0FBQzthQUNMLENBQUM7aUJBQ0csSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQztpQkFDakMsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDTixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDTCxXQUFDO0lBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtJQWhDWSxJQUFJO1FBRGhCLDhCQUFVO3lDQUltQixpQ0FBVSxFQUFnQixvQ0FBVyxFQUFpQiwwQ0FBZSxFQUFrQix1QkFBTTtPQUg5RyxJQUFJLENBZ0NoQjtJQWhDWSxvQkFBSTtJQWtDakI7UUFFSSxjQUFZLE1BQU07WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN6QixDQUFDO1FBQ0wsV0FBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBTFksb0JBQUkiLCJmaWxlIjoic3VicGFnZXMvc2hvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXG5pbXBvcnQgKiBhcyBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJ1xuXG5AYXV0b2luamVjdFxyXG5leHBvcnQgY2xhc3Mgc2hvcFxyXG4gICB7XG4gICAgaXRlbXM7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLCBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICB0aGlzLmdldEl0ZW1zKCk7XHJcbiAgICB9XG5cbiAgICBnZXRJdGVtcygpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ2ludmVudG9yeS9nZXRpdGVtcycsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih0aGlzLml0ZW1zKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zID0gZGF0YTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cblxuICAgIGJ1eUl0ZW0oaXRlbWlkOm51bWJlcikge1xuICAgICAgICBjb25zb2xlLmxvZyhqd3RfZGVjb2RlKHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbigpKS51c2VyaWQpXHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdpbnZlbnRvcnkvYnV5aXRlbScsIHtcclxuICAgICAgICAgICAgYm9keToganNvbih7XG4gICAgICAgICAgICAgICAgXCJpdGVtMVwiOiBpdGVtaWQsXG4gICAgICAgICAgICAgICAgXCJpdGVtMlwiOiBqd3RfZGVjb2RlKHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbigpKS51c2VyaWRcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cblxuZXhwb3J0IGNsYXNzIGl0ZW0ge1xuICAgIGl0ZW1pZDogbnVtYmVyO1xuICAgIGNvbnN0cnVjdG9yKGl0ZW1pZCkge1xuICAgICAgICB0aGlzLml0ZW1pZCA9IGl0ZW1pZDtcclxuICAgIH1cclxufVxyXG5cclxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('subpages/subpage',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-event-aggregator", "aurelia-router"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var subpage = (function () {
        function subpage(http, event, router) {
            this.http = http;
            this.event = event;
            this.router = router;
            this.getNpcs();
        }
        subpage.prototype.getNpcs = function () {
            var _this = this;
            this.http.fetch('character/getNpcs', {
                body: aurelia_fetch_client_1.json(this.npcs)
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.npcs = data;
                console.log(data);
            });
        };
        return subpage;
    }());
    subpage = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.Router])
    ], subpage);
    exports.subpage = subpage;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YnBhZ2VzL3N1YnBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBT0EsSUFBYSxPQUFPO1FBRWhCLGlCQUFvQixJQUFnQixFQUFVLEtBQXNCLEVBQVUsTUFBYztZQUF4RSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBaUI7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ3hGLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBRUQseUJBQU8sR0FBUDtZQUFBLGlCQVNDO1lBUkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUU7Z0JBQ2pDLElBQUksRUFBRSwyQkFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDeEIsQ0FBQztpQkFDRyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2lCQUNqQyxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNOLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQWhCQSxBQWdCQyxJQUFBO0lBaEJZLE9BQU87UUFEbkIsOEJBQVU7eUNBR21CLGlDQUFVLEVBQWlCLDBDQUFlLEVBQWtCLHVCQUFNO09BRm5GLE9BQU8sQ0FnQm5CO0lBaEJZLDBCQUFPIiwiZmlsZSI6InN1YnBhZ2VzL3N1YnBhZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IGF1dG9pbmplY3QgfSBmcm9tIFwiYXVyZWxpYS1mcmFtZXdvcmtcIjtcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIjtcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdhdXJlbGlhLXJvdXRlcic7XG5cclxuQGF1dG9pbmplY3RcbmV4cG9ydCBjbGFzcyBzdWJwYWdlIHtcbiAgICBucGNzO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBldmVudDogRXZlbnRBZ2dyZWdhdG9yLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5nZXROcGNzKCk7XHJcbiAgICB9XG5cbiAgICBnZXROcGNzKCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnY2hhcmFjdGVyL2dldE5wY3MnLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5ucGNzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5wY3MgPSBkYXRhO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('text!app.html', ['module'], function(module) { module.exports = "\n<template bindable=\"router\">\r\n  <require from=\"sweetalert/dist/sweetalert.css\"></require>\r\n  <div id=\"app\">\r\n    <div class=\"strip strip__top\"></div>\r\n    <nav class=\"navbar navbar-default navbar-static-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n          <!-- Collapsed Hamburger -->\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#app-navbar-collapse\">\r\n            <span class=\"sr-only\">Toggle Navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n          <a class=\"navbar-brand hidden-xs\" href=\"/\">\r\n            ${title}\r\n          </a>\r\n        </div>\r\n        <div class=\"collapse navbar-collapse\" id=\"app-navbar-collapse\">\r\n          <!-- Right Side Of Navbar -->\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li role=\"presentation\"><a route-href=\"route: login\">Login</a></li>\r\n            <li role=\"presentation\"><a route-href=\"route: create\">Register</a></li>\r\n            <li role=\"presentation\"><a route-href=\"route: shop\" show.bind=\"authenticated\">Shop</a></li>\r\n            <li role=\"presentation\"><a route-href=\"route: subpage \" show.bind=\"authenticated\">NPC</a></li>\n            <li role=\"presentation\"><a  href=\"#\" click.delegate=\"logout()\" show.bind=\"authenticated\">Logout</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n    <router-view></router-view>\r\n  </div>\r\n  <div id=\"footer\">\r\n    <p>KVAS 2017</p>\r\n  </div>\r\n  <div class=\"strip strip__footer\"></div>\r\n</template>\r\n"; });
define('text!subpages/create.html', ['module'], function(module) { module.exports = "<template>\n  <form method=\"POST\" submit.delegate=\"createCharacter()\">\r\n    <h4>\r\n      Character name:<input type=\"text\" id=\"name\" value.bind=\"name\">\r\n      <br />\r\n      <select value.bind=\"selectedRace\">\r\n        <option>Select A Class</option>\r\n        <option repeat.for=\"class of charclass\" value.bind=\"class.id\">${class.name}</option>\r\n      </select>\n      <br />\n      <select value.bind=\"selectedClass\">\r\n        <option>Select A Race</option>\r\n        <option repeat.for=\"race of races\" value.bind=\"race.id\">${race.faction}</option>\r\n      </select>\r\n    </h4>\r\n\r\n\r\n    <button id=\"submit\" type=\"submit\" class=\"btn btn-primary\" click.delegate=\"createCharacter()\">\r\n      Create\r\n    </button>\n   </form>\r\n</template>"; });
define('text!subpages/login.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"panel-body\">\r\n    <form class=\"form-horizontal\" role=\"form\" method=\"POST\" submit.delegate=\"login()\">\r\n      <div class=\"form-group\">\r\n        <label for=\"email\" class=\"col-md-4 control-label\">Character name</label>\r\n        <div class=\"col-md-6\">\r\n          <input id=\"username\" type=\"text\" class=\"form-control\" name=\"username\" value.bind=\"username\" required autofocus>\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <div class=\"col-md-8 col-md-offset-4\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">\r\n            Login\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\n</template>\r\n"; });
define('text!subpages/shop.html', ['module'], function(module) { module.exports = "<template>\n  <table class=\"table table-hover\">\r\n    <tr>\r\n      <th>Item</th>\r\n      <th>Cost</th>\r\n      <th></th>\r\n    </tr>\r\n    <tr repeat.for=\"item of items\">\r\n      <td>${item.name}</td>\r\n      <td >${item.gold}GP</td>\r\n\r\n      <td>\r\n        <a class=\"btn btn-default\" click.delegate=\"buyItem(item.id)\" role=\"button\"><span aria-hidden=\"true\"></span> Buy</a>\r\n      </td>\r\n    </tr>\r\n  </table>\n</template>\r\n"; });
define('text!subpages/subpage.html', ['module'], function(module) { module.exports = "<template>\r\n  <ul class=\"list-group\">\r\n    <li repeat.for=\"npc of npcs\" class=\"list-group-item \">${npc.name} | ${npc.healthPoints}\r\n    </li>\r\n  </ul>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map
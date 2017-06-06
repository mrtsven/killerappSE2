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
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.title = 'Aurelia';
            config.map([
                {
                    route: ['subpage'],
                    name: 'subpage',
                    moduleId: 'subpages/subpage'
                },
                {
                    route: ['home'],
                    name: 'home',
                    moduleId: 'subpages/home'
                },
                {
                    route: ['shop'],
                    name: 'shop',
                    moduleId: 'subpages/shop'
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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QUFVO1lBQ3hELEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLGtCQUFrQixFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQWIsQ0FBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUVwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSx5QkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLENBQUM7WUFDTCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxvQkFBQztJQUFELENBZEEsQUFjQyxJQUFBO0lBZEssYUFBYTtRQURsQiw4QkFBVTt5Q0FFMEIsb0NBQVc7T0FEMUMsYUFBYSxDQWNsQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJDb25maWd1cmF0aW9uLCBOZXh0LCBSZWRpcmVjdCwgTmF2aWdhdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xuaW1wb3J0IHsgRmV0Y2hDb25maWcgfSBmcm9tICdhdXJlbGlhLWF1dGhlbnRpY2F0aW9uJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdhdXJlbGlhLWF1dGhlbnRpY2F0aW9uJztcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XG5pbXBvcnQgKiBhcyBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuXG5cbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG4gICAgcm91dGVyOiBSb3V0ZXI7XG4gICAgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcbiAgICB0aXRsZTogc3RyaW5nO1xuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBGZXRjaENvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZXZlbnQ6IEV2ZW50QWdncmVnYXRvcikge1xuICAgICAgICB0aGlzLmNvbmZpZ0h0dHAoKTtcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkID8gXCJXZWxrb20gXCIgKyBqd3RfZGVjb2RlKHRoaXMuYXV0aFNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKSkubmFtZSA6IFwiS1ZBU1wiO1xuICAgIH1cblxuXHJcbiAgICBjb25maWd1cmVSb3V0ZXIoY29uZmlnLCByb3V0ZXIpIHtcclxuICAgICAgICB0aGlzLnJvdXRlciA9IHJvdXRlcjtcclxuICAgICAgICBjb25maWcudGl0bGUgPSAnQXVyZWxpYSc7XHJcbiAgICAgICAgY29uZmlnLm1hcChbXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogWydzdWJwYWdlJ10sXG4gICAgICAgICAgICAgICAgbmFtZTogJ3N1YnBhZ2UnLFxuICAgICAgICAgICAgICAgIG1vZHVsZUlkOiAnc3VicGFnZXMvc3VicGFnZSdcclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiBbJ2hvbWUnXSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnaG9tZScsXG4gICAgICAgICAgICAgICAgbW9kdWxlSWQ6ICdzdWJwYWdlcy9ob21lJ1xyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IFsnc2hvcCddLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdzaG9wJyxcbiAgICAgICAgICAgICAgICBtb2R1bGVJZDogJ3N1YnBhZ2VzL3Nob3AnXHJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogWycvJ10sXG4gICAgICAgICAgICAgICAgbmFtZTogJ2xvZ2luJyxcbiAgICAgICAgICAgICAgICBtb2R1bGVJZDogJ3N1YnBhZ2VzL2xvZ2luJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIF0pO1xyXG4gICAgfVxuXG4gICAgY29uZmlnSHR0cCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5odHRwLmNvbmZpZ3VyZShjb25maWcgPT4ge1xuICAgICAgICAgICAgY29uZmlnXG4gICAgICAgICAgICAgICAgLndpdGhCYXNlVXJsKCdhcGkvJylcbiAgICAgICAgICAgICAgICAud2l0aERlZmF1bHRzKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdGZXRjaCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLndpdGhJbnRlcmNlcHRvcih7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QocmVxdWVzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJlcXVlc3RpbmcgJHtyZXF1ZXN0Lm1ldGhvZH0gJHtyZXF1ZXN0LnVybH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZXNwb25zZShyZXNwb25zZTogUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZWNlaXZlZCAke3Jlc3BvbnNlLnN0YXR1c30gJHtyZXNwb25zZS51cmx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXHJcbn1cbkBhdXRvaW5qZWN0XG5jbGFzcyBBdXRob3JpemVTdGVwIHtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhTZXJ2aWNlOiBBdXRoU2VydmljZSkgeyB9XG5cbiAgICBydW4obmF2aWdhdGlvbkluc3RydWN0aW9uOiBOYXZpZ2F0aW9uSW5zdHJ1Y3Rpb24sIG5leHQ6IE5leHQpOiBQcm9taXNlPGFueT4ge1xuICAgICAgICBpZiAobmF2aWdhdGlvbkluc3RydWN0aW9uLmdldEFsbEluc3RydWN0aW9ucygpLnNvbWUoaSA9PiBpLmNvbmZpZy5hdXRoKSkge1xuICAgICAgICAgICAgbGV0IGlzTG9nZ2VkSW4gPSB0aGlzLmF1dGhTZXJ2aWNlLmlzQXV0aGVudGljYXRlZCgpO1xuXG4gICAgICAgICAgICBpZiAoIWlzTG9nZ2VkSW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dC5jYW5jZWwobmV3IFJlZGlyZWN0KCdsb2dpbicpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfVxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

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
define('subpages/home',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-event-aggregator", "aurelia-router"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, aurelia_router_1) {
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
    var home = (function () {
        function home(http, event, router) {
            this.http = http;
            this.event = event;
            this.router = router;
            this.getRaces();
            this.getClasses();
        }
        home.prototype.createCharacter = function () {
            this.http.fetch('character/create', {
                body: aurelia_fetch_client_1.json(new create(this.name, this.selectedRace, this.selectedClass))
            });
        };
        home.prototype.getRaces = function () {
            var _this = this;
            this.http.fetch('character/getrace', {})
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.races = data;
                console.log(data);
            });
        };
        home.prototype.getClasses = function () {
            var _this = this;
            this.http.fetch('character/getclass', {})
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.charclass = data;
                console.log(data);
            });
        };
        return home;
    }());
    home = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.Router])
    ], home);
    exports.home = home;
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YnBhZ2VzL2hvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBTUE7UUFBQTtRQVVBLENBQUM7UUFBRCxnQkFBQztJQUFELENBVkEsQUFVQyxJQUFBO0lBRUQ7UUFBQTtRQU9BLENBQUM7UUFBRCxZQUFDO0lBQUQsQ0FQQSxBQU9DLElBQUE7SUFFRDtRQUFBO1FBS0EsQ0FBQztRQUFELFdBQUM7SUFBRCxDQUxBLEFBS0MsSUFBQTtJQUdELElBQWEsSUFBSTtRQVFiLGNBQW9CLElBQWdCLEVBQVUsS0FBc0IsRUFBVSxNQUFjO1lBQXhFLFNBQUksR0FBSixJQUFJLENBQVk7WUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFpQjtZQUFVLFdBQU0sR0FBTixNQUFNLENBQVE7WUFDeEYsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQsOEJBQWUsR0FBZjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFO2dCQUNoQyxJQUFJLEVBQUUsMkJBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzNFLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCx1QkFBUSxHQUFSO1lBQUEsaUJBU0M7WUFSRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxFQUVwQyxDQUFDO2lCQUNHLElBQUksQ0FBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBZixDQUFlLENBQUM7aUJBQ2pDLElBQUksQ0FBQyxVQUFBLElBQUk7Z0JBQ04sS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBRUQseUJBQVUsR0FBVjtZQUFBLGlCQVNDO1lBUkcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsRUFFckMsQ0FBQztpQkFDRyxJQUFJLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQWYsQ0FBZSxDQUFDO2lCQUNqQyxJQUFJLENBQUMsVUFBQSxJQUFJO2dCQUNOLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUNMLFdBQUM7SUFBRCxDQXhDQSxBQXdDQyxJQUFBO0lBeENZLElBQUk7UUFEaEIsOEJBQVU7eUNBU21CLGlDQUFVLEVBQWlCLDBDQUFlLEVBQWtCLHVCQUFNO09BUm5GLElBQUksQ0F3Q2hCO0lBeENZLG9CQUFJO0lBMENqQjtRQUlJLGdCQUFZLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUztZQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBQ0wsYUFBQztJQUFELENBVEEsQUFTQyxJQUFBO0lBVFksd0JBQU0iLCJmaWxlIjoic3VicGFnZXMvaG9tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBqc29uIH0gZnJvbSBcImF1cmVsaWEtZmV0Y2gtY2xpZW50XCI7XG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuXG5jbGFzcyBDaGFyYWN0ZXIge1xuICAgIGlkOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgICBsdmw6IG51bWJlcjtcbiAgICAgeHA6IG51bWJlcjtcbiAgICAgaGVhbHRoUG9pbnRzOiBudW1iZXI7XG4gICAgIHN0YW1pbmE6IG51bWJlcjtcbiAgICAgc3RyZW5ndGg6IG51bWJlcjtcbiAgICAgY2hhcmlzbWE6IG51bWJlcjtcbiAgICAgaW50ZWxsaWdlbmNlOiBudW1iZXI7XHJcbn1cblxuY2xhc3MgQ2xhc3Mge1xuICAgIGlkOiBudW1iZXI7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBiYXNlX2RlZmVuY2U6IG51bWJlcjtcbiAgICBiYXNlX2F0dGFjazogbnVtYmVyO1xuICAgIGFib3V0OiBzdHJpbmc7XHJcbn1cblxuY2xhc3MgUmFjZSB7XG4gICAgaWQ6IG51bWJlcjtcbiAgICBmYWN0aW9uOiBzdHJpbmc7XG4gICAgcmFjZTogc3RyaW5nO1xuICAgIGFib3V0OiBzdHJpbmc7XHJcbn1cblxyXG5AYXV0b2luamVjdFxuZXhwb3J0IGNsYXNzIGhvbWUge1xuICAgIG5hbWU7XG4gICAgY2hhcmNsYXNzO1xuICAgIHJhY2VzO1xuXG4gICAgc2VsZWN0ZWRSYWNlOiBudW1iZXI7XG4gICAgc2VsZWN0ZWRDbGFzczogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIpIHtcclxuICAgICAgICB0aGlzLmdldFJhY2VzKCk7XG4gICAgICAgIHRoaXMuZ2V0Q2xhc3NlcygpO1xyXG4gICAgfVxuXG4gICAgY3JlYXRlQ2hhcmFjdGVyKCkge1xuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ2NoYXJhY3Rlci9jcmVhdGUnLCB7XG4gICAgICAgICAgICBib2R5OiBqc29uKG5ldyBjcmVhdGUodGhpcy5uYW1lLCB0aGlzLnNlbGVjdGVkUmFjZSwgdGhpcy5zZWxlY3RlZENsYXNzKSlcbiAgICAgICAgfSk7XHJcbiAgICB9XG5cbiAgICBnZXRSYWNlcygpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ2NoYXJhY3Rlci9nZXRyYWNlJywge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYWNlcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XG5cbiAgICBnZXRDbGFzc2VzKCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnY2hhcmFjdGVyL2dldGNsYXNzJywge1xyXG4gICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJjbGFzcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cblxuZXhwb3J0IGNsYXNzIGNyZWF0ZSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJhY2U6IG51bWJlcjtcbiAgICBjaGFyY2xhc3M6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCByYWNlLCBjaGFyY2xhc3MpIHtcbiAgICAgICAgdGhpcy5jaGFyY2xhc3MgPSBjaGFyY2xhc3M7XG4gICAgICAgIHRoaXMucmFjZSA9IHJhY2U7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

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
    var login = (function () {
        function login(auth, http, router, event) {
            this.auth = auth;
            this.http = http;
            this.router = router;
            this.event = event;
            this.username = "";
        }
        login.prototype.login = function () {
            var _this = this;
            this.auth.login({
                charname: this.username
            }).then(function (response) {
                _this.event.publish('signedIn', true);
                swal({
                    title: "U bent succesvol ingelogd",
                    type: "success",
                    showCancelButton: false,
                    showConfirmButton: false,
                    timer: 2000
                });
                _this.router.navigate("shop");
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
        login.prototype.logout = function () {
            this.auth.logout('');
        };
        return login;
    }());
    login = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_authentication_1.AuthService,
            aurelia_fetch_client_1.HttpClient,
            aurelia_router_1.Router,
            aurelia_event_aggregator_1.EventAggregator])
    ], login);
    exports.login = login;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YnBhZ2VzL2xvZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQVFBLElBQWEsS0FBSztRQUVkLGVBQW9CLElBQWlCLEVBQ3pCLElBQWdCLEVBQ2hCLE1BQWMsRUFDZCxLQUFzQjtZQUhkLFNBQUksR0FBSixJQUFJLENBQWE7WUFDekIsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBaUI7WUFKbEMsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUtkLENBQUM7UUFFRCxxQkFBSyxHQUFMO1lBQUEsaUJBeUJDO1lBeEJHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTthQUMxQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsUUFBUTtnQkFDWixLQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRXJDLElBQUksQ0FBQztvQkFDRCxLQUFLLEVBQUUsMkJBQTJCO29CQUNsQyxJQUFJLEVBQUUsU0FBUztvQkFDZixnQkFBZ0IsRUFBRSxLQUFLO29CQUN2QixpQkFBaUIsRUFBRSxLQUFLO29CQUN4QixLQUFLLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUM7Z0JBRUgsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDO2lCQUNHLEtBQUssQ0FBQyxVQUFBLEdBQUc7Z0JBQ04sSUFBSSxDQUFDO29CQUNELEtBQUssRUFBRSw0QkFBNEI7b0JBQ25DLElBQUksRUFBRSxTQUFTO29CQUNmLGdCQUFnQixFQUFFLElBQUk7b0JBQ3RCLGlCQUFpQixFQUFFLEtBQUs7b0JBQ3hCLGNBQWMsRUFBRSxJQUFJO2lCQUN2QixDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFFRCxzQkFBTSxHQUFOO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekIsQ0FBQztRQUNMLFlBQUM7SUFBRCxDQXRDQSxBQXNDQyxJQUFBO0lBdENZLEtBQUs7UUFEakIsOEJBQVU7eUNBR21CLG9DQUFXO1lBQ25CLGlDQUFVO1lBQ1IsdUJBQU07WUFDUCwwQ0FBZTtPQUx6QixLQUFLLENBc0NqQjtJQXRDWSxzQkFBSyIsImZpbGUiOiJzdWJwYWdlcy9sb2dpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN3YWwgZnJvbSAnc3dlZXRhbGVydCc7XG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSBcImF1cmVsaWEtZnJhbWV3b3JrXCJcbmltcG9ydCB7IEh0dHBDbGllbnQsIGpzb24gfSBmcm9tIFwiYXVyZWxpYS1mZXRjaC1jbGllbnRcIlxuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tIFwiYXVyZWxpYS1hdXRoZW50aWNhdGlvblwiXG5pbXBvcnQgeyBFdmVudEFnZ3JlZ2F0b3IgfSBmcm9tICdhdXJlbGlhLWV2ZW50LWFnZ3JlZ2F0b3InO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXG5cbkBhdXRvaW5qZWN0XG5leHBvcnQgY2xhc3MgbG9naW4ge1xuICAgIHVzZXJuYW1lID0gXCJcIjtcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgICAgIHByaXZhdGUgZXZlbnQ6IEV2ZW50QWdncmVnYXRvcikge1xuICAgIH1cblxuICAgIGxvZ2luKCkge1xuICAgICAgICB0aGlzLmF1dGgubG9naW4oe1xuICAgICAgICAgICAgY2hhcm5hbWU6IHRoaXMudXNlcm5hbWVcbiAgICAgICAgfSkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50LnB1Ymxpc2goJ3NpZ25lZEluJywgdHJ1ZSk7XG5cbiAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlUgYmVudCBzdWNjZXN2b2wgaW5nZWxvZ2RcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZXI6IDIwMDBcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShcInNob3BcIik7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiSW5sb2dnZWdldmVucyB6aWpuIG9uanVpc3RcIixcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ3YXJuaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VPbkNvbmZpcm06IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgdGhpcy5hdXRoLmxvZ291dCgnJyk7XG4gICAgfVxyXG59Il0sInNvdXJjZVJvb3QiOiJzcmMifQ==

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('subpages/shop',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-event-aggregator", "aurelia-router"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, aurelia_router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var shop = (function () {
        function shop(http, event, router) {
            this.http = http;
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
        return shop;
    }());
    shop = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.Router])
    ], shop);
    exports.shop = shop;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YnBhZ2VzL3Nob3AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBT0EsSUFBYSxJQUFJO1FBR2IsY0FBb0IsSUFBZ0IsRUFBVSxLQUFzQixFQUFVLE1BQWM7WUFBeEUsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUFVLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUN4RixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVELHVCQUFRLEdBQVI7WUFBQSxpQkFTQztZQVJHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFO2dCQUNsQyxJQUFJLEVBQUUsMkJBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3pCLENBQUM7aUJBQ0csSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQztpQkFDakMsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDTixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDRixXQUFDO0lBQUQsQ0FqQkgsQUFpQkksSUFBQTtJQWpCUyxJQUFJO1FBRGhCLDhCQUFVO3lDQUltQixpQ0FBVSxFQUFpQiwwQ0FBZSxFQUFrQix1QkFBTTtPQUhuRixJQUFJLENBaUJiO0lBakJTLG9CQUFJIiwiZmlsZSI6InN1YnBhZ2VzL3Nob3AuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiO1xuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxuQGF1dG9pbmplY3RcclxuZXhwb3J0IGNsYXNzIHNob3BcclxuICAge1xuICAgIGl0ZW1zO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBldmVudDogRXZlbnRBZ2dyZWdhdG9yLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5nZXRJdGVtcygpO1xyXG4gICAgfVxuXG4gICAgZ2V0SXRlbXMoKSB7XHJcbiAgICAgICAgdGhpcy5odHRwLmZldGNoKCdpbnZlbnRvcnkvZ2V0aXRlbXMnLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5pdGVtcylcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgIH1cclxuXHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

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

define('text!app.html', ['module'], function(module) { module.exports = "\n<template bindable=\"router\">\r\n  <require from=\"sweetalert/dist/sweetalert.css\"></require>\r\n  <div id=\"app\">\r\n    <div class=\"strip strip__top\"></div>\r\n    <nav class=\"navbar navbar-default navbar-static-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n          <!-- Collapsed Hamburger -->\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#app-navbar-collapse\">\r\n            <span class=\"sr-only\">Toggle Navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n          <a class=\"navbar-brand hidden-xs\" href=\"/\">\r\n            ${title}\r\n          </a>\r\n        </div>\r\n        <div class=\"collapse navbar-collapse\" id=\"app-navbar-collapse\">\r\n          <!-- Right Side Of Navbar -->\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li role=\"presentation\"><a route-href=\"route: login\">Login</a></li>\r\n            <li role=\"presentation\"><a route-href=\"route: home\">Home</a></li>\r\n            <li role=\"presentation\"><a route-href=\"route: shop\">Shop</a></li>\r\n            <li role=\"presentation\"><a route-href=\"route: subpage\">NPC</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n    <router-view></router-view>\r\n  </div>\r\n  <div id=\"footer\">\r\n    <p>KVAS 2017</p>\r\n  </div>\r\n  <div class=\"strip strip__footer\"></div>\r\n</template>\r\n"; });
define('text!subpages/home.html', ['module'], function(module) { module.exports = "<template>\n  <form method=\"POST\" submit.delegate=\"createCharacter()\">\r\n    <h4>\r\n      Character name:<input type=\"text\" id=\"name\" value.bind=\"name\">\r\n      <br />\r\n      <select value.bind=\"selectedRace\">\r\n        <option>Select A Class</option>\r\n        <option repeat.for=\"class of charclass\" value.bind=\"class.id\">${class.name}</option>\r\n      </select>\n      <br />\n      <select value.bind=\"selectedClass\">\r\n        <option>Select A Race</option>\r\n        <option repeat.for=\"race of races\" value.bind=\"race.id\">${race.faction}</option>\r\n      </select>\r\n    </h4>\r\n\r\n\r\n    <button id=\"submit\" type=\"submit\" class=\"btn btn-primary\" click.delegate=\"createCharacter()\">\r\n      Create\r\n    </button>\n   </form>\r\n</template>"; });
define('text!subpages/login.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"panel-body\">\r\n    <form class=\"form-horizontal\" role=\"form\" method=\"POST\" submit.delegate=\"login()\">\r\n      <div class=\"form-group\">\r\n        <label for=\"email\" class=\"col-md-4 control-label\">E-Mail</label>\r\n        <div class=\"col-md-6\">\r\n          <input id=\"email\" type=\"email\" class=\"form-control\" name=\"email\" value.bind=\"email\" required autofocus>\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <div class=\"col-md-8 col-md-offset-4\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">\r\n            Login\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\n</template>\r\n"; });
define('text!subpages/shop.html', ['module'], function(module) { module.exports = "<template>\n  <table class=\"table table-hover\">\r\n    <tr>\r\n      <th>Item</th>\r\n      <th>Cost</th>\r\n      <th></th>\r\n    </tr>\r\n    <tr repeat.for=\"item of items\">\r\n      <td>${item.name}</td>\r\n      <td >${item.gold}GP</td>\r\n\r\n      <td>\r\n        <a class=\"btn btn-default\" role=\"button\"><span aria-hidden=\"true\"></span> Buy</a>\r\n      </td>\r\n    </tr>\r\n  </table>\n</template>\r\n"; });
define('text!subpages/subpage.html', ['module'], function(module) { module.exports = "<template>\r\n  <ul class=\"list-group\">\r\n    <li repeat.for=\"npc of npcs\" class=\"list-group-item \">${npc.name} | ${npc.healthPoints}\r\n    </li>\r\n  </ul>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map
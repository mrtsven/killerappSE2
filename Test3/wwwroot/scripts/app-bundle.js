var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "aurelia-router", "aurelia-fetch-client", "aurelia-authentication", "aurelia-authentication", "aurelia-event-aggregator", "jwt-decode", "./Character"], function (require, exports, aurelia_framework_1, aurelia_router_1, aurelia_fetch_client_1, aurelia_authentication_1, aurelia_authentication_2, aurelia_event_aggregator_1, jwt_decode, Character_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(http, config, authService, event, character) {
            this.http = http;
            this.config = config;
            this.authService = authService;
            this.event = event;
            this.character = character;
            this.configHttp();
            this.authenticated = this.authService.authenticated;
            this.title = this.authService.authenticated ? "Welkom " + jwt_decode(this.authService.getAccessToken()).name : "KVAS";
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            var step = new AuthorizeStep(this.authService);
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
            aurelia_event_aggregator_1.EventAggregator,
            Character_1.Character])
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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TUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSx5QkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLENBQUM7WUFDTCxDQUFDO1lBRUQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2xCLENBQUM7UUFDTCxvQkFBQztJQUFELENBZEEsQUFjQyxJQUFBO0lBZEssYUFBYTtRQURsQiw4QkFBVTt5Q0FFMEIsb0NBQVc7T0FEMUMsYUFBYSxDQWNsQiIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJDb25maWd1cmF0aW9uLCBOZXh0LCBSZWRpcmVjdCwgTmF2aWdhdGlvbkluc3RydWN0aW9uIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnYXVyZWxpYS1mZXRjaC1jbGllbnQnO1xuaW1wb3J0IHsgRmV0Y2hDb25maWcgfSBmcm9tICdhdXJlbGlhLWF1dGhlbnRpY2F0aW9uJztcbmltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gJ2F1cmVsaWEtZGVwZW5kZW5jeS1pbmplY3Rpb24nO1xuaW1wb3J0IHsgQXV0aFNlcnZpY2UgfSBmcm9tICdhdXJlbGlhLWF1dGhlbnRpY2F0aW9uJztcbmltcG9ydCB7IEV2ZW50QWdncmVnYXRvciB9IGZyb20gJ2F1cmVsaWEtZXZlbnQtYWdncmVnYXRvcic7XG5pbXBvcnQgKiBhcyBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnO1xuaW1wb3J0IHsgQ2hhcmFjdGVyIH0gZnJvbSAnLi9DaGFyYWN0ZXInO1xuXG5cbkBhdXRvaW5qZWN0XHJcbmV4cG9ydCBjbGFzcyBBcHAge1xyXG4gICAgcm91dGVyOiBSb3V0ZXI7XG4gICAgYXV0aGVudGljYXRlZDogYm9vbGVhbjtcbiAgICB0aXRsZTogc3RyaW5nO1xuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHByaXZhdGUgY29uZmlnOiBGZXRjaENvbmZpZyxcbiAgICAgICAgcHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgZXZlbnQ6IEV2ZW50QWdncmVnYXRvcixcbiAgICAgICAgcHJpdmF0ZSBjaGFyYWN0ZXI6IENoYXJhY3Rlcikge1xuICAgICAgICB0aGlzLmNvbmZpZ0h0dHAoKTtcbiAgICAgICAgdGhpcy5hdXRoZW50aWNhdGVkID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5hdXRoU2VydmljZS5hdXRoZW50aWNhdGVkID8gXCJXZWxrb20gXCIgKyBqd3RfZGVjb2RlKHRoaXMuYXV0aFNlcnZpY2UuZ2V0QWNjZXNzVG9rZW4oKSkubmFtZSA6IFwiS1ZBU1wiO1xuICAgICAgICBcbiAgICB9XG5cblxyXG4gICAgY29uZmlndXJlUm91dGVyKGNvbmZpZywgcm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XG5cbiAgICAgICAgbGV0IHN0ZXAgPSBuZXcgQXV0aG9yaXplU3RlcCh0aGlzLmF1dGhTZXJ2aWNlKTtcbiAgICAgICAgY29uZmlnLmFkZEF1dGhvcml6ZVN0ZXAoc3RlcCk7XG5cclxuICAgICAgICBjb25maWcudGl0bGUgPSAnQXVyZWxpYSc7XHJcbiAgICAgICAgY29uZmlnLm1hcChbXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogWydwcm9maWxlJ10sXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Byb2ZpbGUnLFxuICAgICAgICAgICAgICAgIG1vZHVsZUlkOiAnc3VicGFnZXMvcHJvZmlsZSdcclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJvdXRlOiBbJ3N1YnBhZ2UnXSxcbiAgICAgICAgICAgICAgICBuYW1lOiAnc3VicGFnZScsXG4gICAgICAgICAgICAgICAgbW9kdWxlSWQ6ICdzdWJwYWdlcy9zdWJwYWdlJ1xyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IFsnY3JlYXRlJ10sXG4gICAgICAgICAgICAgICAgbmFtZTogJ2NyZWF0ZScsXG4gICAgICAgICAgICAgICAgbW9kdWxlSWQ6ICdzdWJwYWdlcy9jcmVhdGUnXHJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByb3V0ZTogWydzaG9wJ10sXG4gICAgICAgICAgICAgICAgbmFtZTogJ3Nob3AnLFxuICAgICAgICAgICAgICAgIG1vZHVsZUlkOiAnc3VicGFnZXMvc2hvcCcsXG4gICAgICAgICAgICAgICAgYXV0aDogdHJ1ZVxyXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcm91dGU6IFsnLyddLFxuICAgICAgICAgICAgICAgIG5hbWU6ICdsb2dpbicsXG4gICAgICAgICAgICAgICAgbW9kdWxlSWQ6ICdzdWJwYWdlcy9sb2dpbidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdKTtcclxuICAgIH1cblxuICAgIGNvbmZpZ0h0dHAoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaHR0cC5jb25maWd1cmUoY29uZmlnID0+IHtcbiAgICAgICAgICAgIGNvbmZpZ1xuICAgICAgICAgICAgICAgIC53aXRoQmFzZVVybCgnYXBpLycpXG4gICAgICAgICAgICAgICAgLndpdGhEZWZhdWx0cyh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnRmV0Y2gnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC53aXRoSW50ZXJjZXB0b3Ioe1xuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0KHJlcXVlc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSZXF1ZXN0aW5nICR7cmVxdWVzdC5tZXRob2R9ICR7cmVxdWVzdC51cmx9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVxdWVzdDtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UocmVzcG9uc2U6IFJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVjZWl2ZWQgJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2UudXJsfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB0aGlzLmF1dGhTZXJ2aWNlLmF1dGhlbnRpY2F0ZWQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXCJsb2dpblwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRpdGxlID0gXCJLVkFTXCI7XG5cbiAgICAgICAgICAgICAgICBzd2FsKHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiTG9nZ2VkIG91dFwiLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB0aW1lcjogMjAwMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuXG5AYXV0b2luamVjdFxuY2xhc3MgQXV0aG9yaXplU3RlcCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBhdXRoU2VydmljZTogQXV0aFNlcnZpY2UpIHsgfVxuXG4gICAgcnVuKG5hdmlnYXRpb25JbnN0cnVjdGlvbjogTmF2aWdhdGlvbkluc3RydWN0aW9uLCBuZXh0OiBOZXh0KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgaWYgKG5hdmlnYXRpb25JbnN0cnVjdGlvbi5nZXRBbGxJbnN0cnVjdGlvbnMoKS5zb21lKGkgPT4gaS5jb25maWcuYXV0aCkpIHtcbiAgICAgICAgICAgIGxldCBpc0xvZ2dlZEluID0gdGhpcy5hdXRoU2VydmljZS5pc0F1dGhlbnRpY2F0ZWQoKTtcblxuICAgICAgICAgICAgaWYgKCFpc0xvZ2dlZEluKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQuY2FuY2VsKG5ldyBSZWRpcmVjdCgnbG9naW4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH1cbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

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

define('Character',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Character = (function () {
        function Character() {
        }
        return Character;
    }());
    exports.Character = Character;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXJhY3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFBQTtRQUFBO1FBV0EsQ0FBQztRQUFELGdCQUFDO0lBQUQsQ0FYQSxBQVdDLElBQUE7SUFYWSw4QkFBUyIsImZpbGUiOiJDaGFyYWN0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQ2hhcmFjdGVyIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsdmw6IG51bWJlcjtcbiAgICB4cDogbnVtYmVyO1xuICAgIGdvbGQ6IG51bWJlcjtcbiAgICBoZWFsdGhQb2ludHM6IG51bWJlcjtcbiAgICBzdGFtaW5hOiBudW1iZXI7XG4gICAgc3RyZW5ndGg6IG51bWJlcjtcbiAgICBjaGFyaXNtYTogbnVtYmVyO1xuICAgIGludGVsbGlnZW5jZTogbnVtYmVyO1xyXG59XG5cclxuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

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
define('subpages/create',["require", "exports", "sweetalert", "aurelia-framework", "aurelia-fetch-client", "aurelia-event-aggregator", "aurelia-router", "../Character"], function (require, exports, swal, aurelia_framework_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, aurelia_router_1, Character_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
        function CreateChararacter(http, event, router, character) {
            this.http = http;
            this.event = event;
            this.router = router;
            this.character = character;
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
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_event_aggregator_1.EventAggregator, aurelia_router_1.Router, Character_1.Character])
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,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ImZpbGUiOiJzdWJwYWdlcy9jcmVhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiO1xuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcbmltcG9ydCB7IENoYXJhY3RlciB9IGZyb20gJy4uL0NoYXJhY3Rlcic7XG5cbmNsYXNzIENsYXNzIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgYmFzZV9kZWZlbmNlOiBudW1iZXI7XG4gICAgYmFzZV9hdHRhY2s6IG51bWJlcjtcbiAgICBhYm91dDogc3RyaW5nO1xyXG59XG5cbmNsYXNzIFJhY2Uge1xuICAgIGlkOiBudW1iZXI7XG4gICAgZmFjdGlvbjogc3RyaW5nO1xuICAgIHJhY2U6IHN0cmluZztcbiAgICBhYm91dDogc3RyaW5nO1xyXG59XG5cclxuQGF1dG9pbmplY3RcbmV4cG9ydCBjbGFzcyBDcmVhdGVDaGFyYXJhY3RlciB7XG4gICAgbmFtZTtcbiAgICBjaGFyY2xhc3M7XG4gICAgcmFjZXM7XG5cbiAgICBzZWxlY3RlZFJhY2U6IG51bWJlcjtcbiAgICBzZWxlY3RlZENsYXNzOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsIHByaXZhdGUgZXZlbnQ6IEV2ZW50QWdncmVnYXRvciwgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBjaGFyYWN0ZXI6IENoYXJhY3Rlcikge1xyXG4gICAgICAgIHRoaXMuZ2V0UmFjZXMoKTtcbiAgICAgICAgdGhpcy5nZXRDbGFzc2VzKCk7XHJcbiAgICB9XG5cbiAgICBjcmVhdGVDaGFyYWN0ZXIoKSB7XG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnY2hhcmFjdGVyL2NyZWF0ZScsIHtcbiAgICAgICAgICAgIGJvZHk6IGpzb24obmV3IGNyZWF0ZSh0aGlzLm5hbWUsIHRoaXMuc2VsZWN0ZWRSYWNlLCB0aGlzLnNlbGVjdGVkQ2xhc3MpKVxuICAgICAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgICAgIHN3YWwoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1Y2Nlc2Z1bGx5IG1hZGUgYSBjaGFyYWN0ZXJcIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcInN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdGltZXI6IDIwMDBcblxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlVG9Sb3V0ZShcImxvZ2luXCIpXG4gICAgICAgIH0pXG5cclxuXHJcbiAgICAgICAgXHJcbiAgICB9XG5cbiAgICBnZXRSYWNlcygpIHtcclxuICAgICAgICB0aGlzLmh0dHAuZmV0Y2goJ2NoYXJhY3Rlci9nZXRyYWNlJywge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYWNlcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XG5cbiAgICBnZXRDbGFzc2VzKCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnY2hhcmFjdGVyL2dldGNsYXNzJywge1xyXG4gICAgICAgIFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoYXJjbGFzcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cblxuZXhwb3J0IGNsYXNzIGNyZWF0ZSB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJhY2U6IG51bWJlcjtcbiAgICBjaGFyY2xhc3M6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCByYWNlLCBjaGFyY2xhc3MpIHtcbiAgICAgICAgdGhpcy5jaGFyY2xhc3MgPSBjaGFyY2xhc3M7XG4gICAgICAgIHRoaXMucmFjZSA9IHJhY2U7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define('subpages/profile',["require", "exports", "aurelia-framework", "aurelia-fetch-client", "aurelia-event-aggregator", "aurelia-authentication", "aurelia-router", "../Character", "jwt-decode"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1, aurelia_event_aggregator_1, aurelia_authentication_1, aurelia_router_1, Character_1, jwt_decode) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var profile = (function () {
        function profile(http, event, auth, router, character) {
            this.http = http;
            this.event = event;
            this.auth = auth;
            this.router = router;
            this.character = character;
            this.getCharacter();
        }
        profile.prototype.getCharacter = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, this.http.fetch('character/getCharacter', {
                                body: aurelia_fetch_client_1.json({
                                    "item1": jwt_decode(this.auth.getAccessToken()).name
                                })
                            })];
                        case 1:
                            data = _b.sent();
                            _a = this;
                            return [4, data.json()];
                        case 2:
                            _a.character = _b.sent();
                            return [2];
                    }
                });
            });
        };
        return profile;
    }());
    profile = __decorate([
        aurelia_framework_1.autoinject,
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient, aurelia_event_aggregator_1.EventAggregator, aurelia_authentication_1.AuthService, aurelia_router_1.Router, Character_1.Character])
    ], profile);
    exports.profile = profile;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YnBhZ2VzL3Byb2ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVQSxJQUFhLE9BQU87UUFDaEIsaUJBQW9CLElBQWdCLEVBQVUsS0FBc0IsRUFBVSxJQUFpQixFQUFVLE1BQWMsRUFBVSxTQUFvQjtZQUFqSSxTQUFJLEdBQUosSUFBSSxDQUFZO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBaUI7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFhO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7WUFFakosSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFHSyw4QkFBWSxHQUFsQjs7Ozs7Z0NBQ3lCLFdBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUU7Z0NBQ2pFLElBQUksRUFBRSwyQkFBSSxDQUFDO29DQUNQLE9BQU8sRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLElBQUk7aUNBQ3ZELENBQUM7NkJBQ0wsQ0FBQyxFQUFBOzttQ0FKbUIsU0FJbkI7NEJBQ0YsS0FBQSxJQUFJLENBQUE7NEJBQWEsV0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7OzRCQUFsQyxHQUFLLFNBQVMsR0FBRyxTQUFpQixDQUFDOzs7OztTQUN0QztRQUVMLGNBQUM7SUFBRCxDQWhCQSxBQWdCQyxJQUFBO0lBaEJZLE9BQU87UUFEbkIsOEJBQVU7eUNBRW1CLGlDQUFVLEVBQWlCLDBDQUFlLEVBQWdCLG9DQUFXLEVBQWtCLHVCQUFNLEVBQXFCLHFCQUFTO09BRDVJLE9BQU8sQ0FnQm5CO0lBaEJZLDBCQUFPIiwiZmlsZSI6InN1YnBhZ2VzL3Byb2ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzd2FsIGZyb20gJ3N3ZWV0YWxlcnQnO1xuaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiO1xuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlIH0gZnJvbSBcImF1cmVsaWEtYXV0aGVudGljYXRpb25cIlxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInO1xuaW1wb3J0IHsgQ2hhcmFjdGVyIH0gZnJvbSAnLi4vQ2hhcmFjdGVyJztcbmltcG9ydCAqIGFzIGp3dF9kZWNvZGUgZnJvbSAnand0LWRlY29kZSc7XG5cbkBhdXRvaW5qZWN0XG5leHBvcnQgY2xhc3MgcHJvZmlsZSB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBwcml2YXRlIGV2ZW50OiBFdmVudEFnZ3JlZ2F0b3IsIHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgY2hhcmFjdGVyOiBDaGFyYWN0ZXIpXG4gICAge1xuICAgICAgICB0aGlzLmdldENoYXJhY3RlcigpO1xyXG4gICAgfVxuICAgIFxuXG4gICAgYXN5bmMgZ2V0Q2hhcmFjdGVyKCkge1xuICAgICAgICBsZXQgZGF0YTogUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZmV0Y2goJ2NoYXJhY3Rlci9nZXRDaGFyYWN0ZXInLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24oe1xyXG4gICAgICAgICAgICAgICAgXCJpdGVtMVwiOiBqd3RfZGVjb2RlKHRoaXMuYXV0aC5nZXRBY2Nlc3NUb2tlbigpKS5uYW1lXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXIgPSBhd2FpdCBkYXRhLmpzb24oKTtcclxuICAgIH1cblxyXG59XHJcbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

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

define('text!app.html', ['module'], function(module) { module.exports = "\n<template bindable=\"router\">\r\n  <require from=\"sweetalert/dist/sweetalert.css\"></require>\r\n  <div id=\"app\">\r\n    <div class=\"strip strip__top\"></div>\r\n    <nav class=\"navbar navbar-default navbar-static-top\">\r\n      <div class=\"container\">\r\n        <div class=\"navbar-header\">\r\n          <!-- Collapsed Hamburger -->\r\n          <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#app-navbar-collapse\">\r\n            <span class=\"sr-only\">Toggle Navigation</span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n            <span class=\"icon-bar\"></span>\r\n          </button>\r\n          <a class=\"navbar-brand hidden-xs\" href=\"/\">\r\n            ${title}\r\n          </a>\r\n        </div>\r\n        <div class=\"collapse navbar-collapse\" id=\"app-navbar-collapse\">\r\n          <!-- Right Side Of Navbar -->\r\n          <ul class=\"nav navbar-nav navbar-right\">\r\n            <li role=\"presentation\"><a route-href=\"route: login\">Login</a></li>\r\n            <li role=\"presentation\"><a route-href=\"route: create\">Register</a></li>\r\n            <li role=\"presentation\"><a route-href=\"route: shop\" show.bind=\"authenticated\">Shop</a></li>\r\n            <li role=\"presentation\"><a route-href=\"route: subpage\" show.bind=\"authenticated\">NPC</a></li>\n            <li role=\"presentation\"><a route-href=\"route: profile\" show.bind=\"authenticated\">Profile</a></li>\n            <li role=\"presentation\"><a  href=\"#\" click.delegate=\"logout()\" show.bind=\"authenticated\">Logout</a></li>\r\n          </ul>\r\n        </div>\r\n      </div>\r\n    </nav>\r\n    <router-view></router-view>\r\n  </div>\r\n  <div id=\"footer\">\r\n    <p>KVAS 2017</p>\r\n  </div>\r\n  <div class=\"strip strip__footer\"></div>\r\n</template>\r\n"; });
define('text!subpages/create.html', ['module'], function(module) { module.exports = "<template>\n  <form method=\"POST\" submit.delegate=\"createCharacter()\">\r\n    <h4>\r\n      Character name:<input type=\"text\" id=\"name\" value.bind=\"name\">\r\n      <br />\r\n      <select value.bind=\"selectedRace\">\r\n        <option>Select A Class</option>\r\n        <option repeat.for=\"class of charclass\" value.bind=\"class.id\">${class.name}</option>\r\n      </select>\n      <br />\n      <select value.bind=\"selectedClass\">\r\n        <option>Select A Race</option>\r\n        <option repeat.for=\"race of races\" value.bind=\"race.id\">${race.faction}</option>\r\n      </select>\r\n    </h4>\r\n\r\n\r\n    <button id=\"submit\" type=\"submit\" class=\"btn btn-primary\" click.delegate=\"createCharacter()\">\r\n      Create\r\n    </button>\n   </form>\r\n</template>"; });
define('text!subpages/login.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"panel-body\">\r\n    <form class=\"form-horizontal\" role=\"form\" method=\"POST\" submit.delegate=\"login()\">\r\n      <div class=\"form-group\">\r\n        <label for=\"email\" class=\"col-md-4 control-label\">Character name</label>\r\n        <div class=\"col-md-6\">\r\n          <input id=\"username\" type=\"text\" class=\"form-control\" name=\"username\" value.bind=\"username\" required autofocus>\r\n        </div>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <div class=\"col-md-8 col-md-offset-4\">\r\n          <button type=\"submit\" class=\"btn btn-primary\">\r\n            Login\r\n          </button>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\n</template>\r\n"; });
define('text!subpages/profile.html', ['module'], function(module) { module.exports = "<template>\r\n    <div class=\"container\">\r\n      <div class=\"row\">\r\n        <div class=\"col-md-8 col-md-offset-2\">\r\n          <div class=\"panel panel-primary\">\r\n            <div class=\"panel-heading\">\r\n              <span>Profiel</span>\r\n            </div>\r\n            <div class=\"panel-body\">\r\n              <form class=\"form-horizontal\">\r\n                <h4>\r\n                  Character name:${character.name}\r\n                  <br />\r\n                  Healthpoints:${character.healthPoints}\n                  <br />\n                  Race:\n                  <br />\n                  Class:\r\n                </h4>\r\n\r\n                <p>\n                  <span>Stats</span>\n                  <br />\r\n                  Stamina:${character.stamina}\r\n                  <br />\r\n                  Strength:${character.strength}\r\n                  <br />\r\n                  Intelligence:${character.intelligence}\r\n                  <br />\r\n                  Charisma:${character.charisma}\r\n                  <br />\r\n                  Gold:${character.gold}\r\n                </p>\r\n              </form>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\n</template>"; });
define('text!subpages/shop.html', ['module'], function(module) { module.exports = "<template>\n  <h2>Gold available:</h2>\n  <table class=\"table table-hover\">\r\n    <tr>\r\n      <th>Item</th>\r\n      <th>Cost</th>\r\n      <th></th>\r\n    </tr>\r\n    <tr repeat.for=\"item of items\">\r\n      <td>${item.name}</td>\r\n      <td >${item.gold}GP</td>\r\n\r\n      <td>\r\n        <a class=\"btn btn-default\" click.delegate=\"buyItem(item.id)\" role=\"button\"><span aria-hidden=\"true\"></span> Buy</a>\r\n      </td>\r\n    </tr>\r\n  </table>\n</template>\r\n"; });
define('text!subpages/subpage.html', ['module'], function(module) { module.exports = "<template>\r\n  <ul class=\"list-group\">\r\n    <li repeat.for=\"npc of npcs\" class=\"list-group-item \">NPC:${npc.name} Level: ${npc.lvl}\r\n    </li>\r\n  </ul>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map
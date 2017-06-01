var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define('app',["require", "exports", "aurelia-framework", "aurelia-fetch-client"], function (require, exports, aurelia_framework_1, aurelia_fetch_client_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App = (function () {
        function App(http) {
            this.http = http;
            this.configHttp();
        }
        App.prototype.configureRouter = function (config, router) {
            this.router = router;
            config.title = 'Aurelia';
            config.map([
                { route: ['/', 'subpage'], name: 'subpage', moduleId: 'subpages/subpage' },
                { route: ['/', 'home'], name: 'home', moduleId: 'subpages/home' },
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
        __metadata("design:paramtypes", [aurelia_fetch_client_1.HttpClient])
    ], App);
    exports.App = App;
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFLQSxJQUFhLEdBQUc7UUFFWixhQUFvQixJQUFnQjtZQUFoQixTQUFJLEdBQUosSUFBSSxDQUFZO1lBQ2hDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBR0QsNkJBQWUsR0FBZixVQUFnQixNQUFNLEVBQUUsTUFBTTtZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixNQUFNLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUN6QixNQUFNLENBQUMsR0FBRyxDQUFDO2dCQUVQLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFFO2dCQUMxRSxFQUFFLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7YUFDcEUsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELHdCQUFVLEdBQVY7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07Z0JBQ3RCLE1BQU07cUJBQ0QsV0FBVyxDQUFDLE1BQU0sQ0FBQztxQkFDbkIsWUFBWSxDQUFDO29CQUNWLE1BQU0sRUFBRSxNQUFNO29CQUNkLFdBQVcsRUFBRSxhQUFhO29CQUMxQixPQUFPLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLGtCQUFrQjt3QkFDNUIsa0JBQWtCLEVBQUUsT0FBTztxQkFDOUI7aUJBQ0osQ0FBQztxQkFDRCxlQUFlLENBQUM7b0JBQ2IsT0FBTyxZQUFDLE9BQU87d0JBQ1gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBYyxPQUFPLENBQUMsTUFBTSxTQUFJLE9BQU8sQ0FBQyxHQUFLLENBQUMsQ0FBQzt3QkFDM0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztvQkFDbkIsQ0FBQztvQkFDRCxRQUFRLFlBQUMsUUFBa0I7d0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBWSxRQUFRLENBQUMsTUFBTSxTQUFJLFFBQVEsQ0FBQyxHQUFLLENBQUMsQ0FBQzt3QkFDM0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztvQkFDcEIsQ0FBQztpQkFDSixDQUFDLENBQUM7WUFDWCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFTCxVQUFDO0lBQUQsQ0ExQ0EsQUEwQ0MsSUFBQTtJQTFDWSxHQUFHO1FBRGYsOEJBQVU7eUNBR21CLGlDQUFVO09BRjNCLEdBQUcsQ0EwQ2Y7SUExQ1ksa0JBQUciLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyLCBSb3V0ZXJDb25maWd1cmF0aW9uIH0gZnJvbSAnYXVyZWxpYS1yb3V0ZXInXG5pbXBvcnQgeyBhdXRvaW5qZWN0IH0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ2F1cmVsaWEtZmV0Y2gtY2xpZW50JztcblxuQGF1dG9pbmplY3RcclxuZXhwb3J0IGNsYXNzIEFwcCB7XHJcbiAgICByb3V0ZXI6IFJvdXRlcjtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xuICAgICAgICB0aGlzLmNvbmZpZ0h0dHAoKTtcbiAgICB9XG5cblxyXG4gICAgY29uZmlndXJlUm91dGVyKGNvbmZpZywgcm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIgPSByb3V0ZXI7XHJcbiAgICAgICAgY29uZmlnLnRpdGxlID0gJ0F1cmVsaWEnO1xyXG4gICAgICAgIGNvbmZpZy5tYXAoW1xuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHsgcm91dGU6IFsnLycsICdzdWJwYWdlJ10sIG5hbWU6ICdzdWJwYWdlJywgbW9kdWxlSWQ6ICdzdWJwYWdlcy9zdWJwYWdlJyB9LFxuICAgICAgICAgICAgeyByb3V0ZTogWycvJywgJ2hvbWUnXSwgbmFtZTogJ2hvbWUnLCBtb2R1bGVJZDogJ3N1YnBhZ2VzL2hvbWUnIH0sXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XG5cbiAgICBjb25maWdIdHRwKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmh0dHAuY29uZmlndXJlKGNvbmZpZyA9PiB7XG4gICAgICAgICAgICBjb25maWdcbiAgICAgICAgICAgICAgICAud2l0aEJhc2VVcmwoJ2FwaS8nKVxuICAgICAgICAgICAgICAgIC53aXRoRGVmYXVsdHMoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ0ZldGNoJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAud2l0aEludGVyY2VwdG9yKHtcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdChyZXF1ZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVxdWVzdGluZyAke3JlcXVlc3QubWV0aG9kfSAke3JlcXVlc3QudXJsfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcXVlc3Q7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlKHJlc3BvbnNlOiBSZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJlY2VpdmVkICR7cmVzcG9uc2Uuc3RhdHVzfSAke3Jlc3BvbnNlLnVybH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cclxufSJdLCJzb3VyY2VSb290Ijoic3JjIn0=

define('environment',["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        debug: true,
        testing: true
    };
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudmlyb25tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztJQUFBLGtCQUFlO1FBQ2IsS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUUsSUFBSTtLQUNkLENBQUMiLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIGRlYnVnOiB0cnVlLFxuICB0ZXN0aW5nOiB0cnVlXG59O1xuIl0sInNvdXJjZVJvb3QiOiJzcmMifQ==

define('main',["require", "exports", "./environment"], function (require, exports, environment_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(aurelia) {
        aurelia.use
            .standardConfiguration()
            .feature('resources');
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBR0EsbUJBQTBCLE9BQWdCO1FBQ3hDLE9BQU8sQ0FBQyxHQUFHO2FBQ1IscUJBQXFCLEVBQUU7YUFDdkIsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLHFCQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDbkMsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLHFCQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFFRCxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBZEQsOEJBY0MiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7QXVyZWxpYX0gZnJvbSAnYXVyZWxpYS1mcmFtZXdvcmsnXG5pbXBvcnQgZW52aXJvbm1lbnQgZnJvbSAnLi9lbnZpcm9ubWVudCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWd1cmUoYXVyZWxpYTogQXVyZWxpYSkge1xuICBhdXJlbGlhLnVzZVxuICAgIC5zdGFuZGFyZENvbmZpZ3VyYXRpb24oKVxuICAgIC5mZWF0dXJlKCdyZXNvdXJjZXMnKTtcblxuICBpZiAoZW52aXJvbm1lbnQuZGVidWcpIHtcbiAgICBhdXJlbGlhLnVzZS5kZXZlbG9wbWVudExvZ2dpbmcoKTtcbiAgfVxuXG4gIGlmIChlbnZpcm9ubWVudC50ZXN0aW5nKSB7XG4gICAgYXVyZWxpYS51c2UucGx1Z2luKCdhdXJlbGlhLXRlc3RpbmcnKTtcbiAgfVxuXG4gIGF1cmVsaWEuc3RhcnQoKS50aGVuKCgpID0+IGF1cmVsaWEuc2V0Um9vdCgpKTtcbn1cbiJdLCJzb3VyY2VSb290Ijoic3JjIn0=

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
        }
        home.prototype.createCharacter = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data, x;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.http.fetch('character/create', {
                                body: aurelia_fetch_client_1.json(this.createCharacter)
                            })];
                        case 1:
                            data = _a.sent();
                            return [4, data.json()];
                        case 2:
                            x = _a.sent();
                            alert('Character:' + x.name + ' created!');
                            return [2];
                    }
                });
            });
        };
        home.prototype.getRaces = function () {
            var _this = this;
            this.http.fetch('character/getrace', {
                body: aurelia_fetch_client_1.json(this.races)
            })
                .then(function (response) { return response.json(); })
                .then(function (data) {
                _this.races = data;
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
});

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN1YnBhZ2VzL2hvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLQTtRQUFBO1FBVUEsQ0FBQztRQUFELGdCQUFDO0lBQUQsQ0FWQSxBQVVDLElBQUE7SUFFRDtRQUFBO1FBT0EsQ0FBQztRQUFELFlBQUM7SUFBRCxDQVBBLEFBT0MsSUFBQTtJQUVEO1FBQUE7UUFLQSxDQUFDO1FBQUQsV0FBQztJQUFELENBTEEsQUFLQyxJQUFBO0lBR0QsSUFBYSxJQUFJO1FBSWIsY0FBb0IsSUFBZ0IsRUFBVSxLQUFzQixFQUFVLE1BQWM7WUFBeEUsU0FBSSxHQUFKLElBQUksQ0FBWTtZQUFVLFVBQUssR0FBTCxLQUFLLENBQWlCO1lBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtZQUN4RixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUVLLDhCQUFlLEdBQXJCOzs7OztnQ0FDeUIsV0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtnQ0FDM0QsSUFBSSxFQUFFLDJCQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQzs2QkFDbkMsQ0FBQyxFQUFBOzttQ0FGbUIsU0FFbkI7NEJBRU0sV0FBTSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUE7O2dDQUFqQixTQUFpQjs0QkFDekIsS0FBSyxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxDQUFDOzs7OztTQUU5QztRQUVELHVCQUFRLEdBQVI7WUFBQSxpQkFTQztZQVJHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUFtQixFQUFFO2dCQUNqQyxJQUFJLEVBQUUsMkJBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ3pCLENBQUM7aUJBQ0csSUFBSSxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFmLENBQWUsQ0FBQztpQkFDakMsSUFBSSxDQUFDLFVBQUEsSUFBSTtnQkFDTixLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FBQztRQUNYLENBQUM7UUFDTCxXQUFDO0lBQUQsQ0E1QkEsQUE0QkMsSUFBQTtJQTVCWSxJQUFJO1FBRGhCLDhCQUFVO3lDQUttQixpQ0FBVSxFQUFpQiwwQ0FBZSxFQUFrQix1QkFBTTtPQUpuRixJQUFJLENBNEJoQjtJQTVCWSxvQkFBSSIsImZpbGUiOiJzdWJwYWdlcy9ob21lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYXV0b2luamVjdCB9IGZyb20gXCJhdXJlbGlhLWZyYW1ld29ya1wiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwganNvbiB9IGZyb20gXCJhdXJlbGlhLWZldGNoLWNsaWVudFwiO1xuaW1wb3J0IHsgRXZlbnRBZ2dyZWdhdG9yIH0gZnJvbSAnYXVyZWxpYS1ldmVudC1hZ2dyZWdhdG9yJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ2F1cmVsaWEtcm91dGVyJztcblxuY2xhc3MgQ2hhcmFjdGVyIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAgbHZsOiBudW1iZXI7XG4gICAgIHhwOiBudW1iZXI7XG4gICAgIGhlYWx0aFBvaW50czogbnVtYmVyO1xuICAgICBzdGFtaW5hOiBudW1iZXI7XG4gICAgIHN0cmVuZ3RoOiBudW1iZXI7XG4gICAgIGNoYXJpc21hOiBudW1iZXI7XG4gICAgIGludGVsbGlnZW5jZTogbnVtYmVyO1xyXG59XG5cbmNsYXNzIENsYXNzIHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB0eXBlOiBzdHJpbmc7XG4gICAgYmFzZV9kZWZlbmNlOiBudW1iZXI7XG4gICAgYmFzZV9hdHRhY2s6IG51bWJlcjtcbiAgICBhYm91dDogc3RyaW5nO1xyXG59XG5cbmNsYXNzIFJhY2Uge1xuICAgIGlkOiBudW1iZXI7XG4gICAgZmFjdGlvbjogc3RyaW5nO1xuICAgIHJhY2U6IHN0cmluZztcbiAgICBhYm91dDogc3RyaW5nO1xyXG59XG5cclxuQGF1dG9pbmplY3RcbmV4cG9ydCBjbGFzcyBob21lIHtcbiAgICBjaGFyYWN0ZXI7XG4gICAgY2hhcmNsYXNzO1xuICAgIHJhY2VzO1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgcHJpdmF0ZSBldmVudDogRXZlbnRBZ2dyZWdhdG9yLCBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7XHJcbiAgICAgICAgdGhpcy5nZXRSYWNlcygpO1xyXG4gICAgfVxuXG4gICAgYXN5bmMgY3JlYXRlQ2hhcmFjdGVyKCkge1xuICAgICAgICBsZXQgZGF0YTogUmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHAuZmV0Y2goJ2NoYXJhY3Rlci9jcmVhdGUnLCB7XG4gICAgICAgICAgICBib2R5OiBqc29uKHRoaXMuY3JlYXRlQ2hhcmFjdGVyKVxuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgeCA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgICAgICBhbGVydCgnQ2hhcmFjdGVyOicgKyB4Lm5hbWUgKyAnIGNyZWF0ZWQhJyk7XG5cclxuICAgIH1cblxuICAgIGdldFJhY2VzKCkge1xyXG4gICAgICAgIHRoaXMuaHR0cC5mZXRjaCgnY2hhcmFjdGVyL2dldHJhY2UnLCB7XHJcbiAgICAgICAgICAgIGJvZHk6IGpzb24odGhpcy5yYWNlcylcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yYWNlcyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXSwic291cmNlUm9vdCI6InNyYyJ9

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

define('text!app.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\n  <h1>HEADER</h1>\n  <ul class=\"nav nav-tabs\">\r\n    <li role=\"presentation\" class=\"active\"><a route-href=\"route: home\">Home</a></li>\r\n    <li role=\"presentation\"><a route-href=\"route: subpage\">test</a></li>\r\n  </ul>\n      <div class=\"container\">\n          <router-view></router-view>\n      </div>\n\r\n</template>\n"; });
define('text!subpages/home.html', ['module'], function(module) { module.exports = "<template>\n  <form method=\"POST\" submit.delegate=\"update()\">\r\n    <h4>\r\n      Voornaam:${character.name} <input type=\"text\" id=\"name\" value.bind=\"character.name\">\r\n      <br />\r\n      <select value.bind=\"chooseClass\">\r\n        <option>Select A Class</option>\r\n        <option repeat.for=\"class of classes\" value.bind=\"class.name\">${class.name}</option>\r\n      </select>\n      <br />\n      <select value.bind=\"chooseRace\">\r\n        <option>Select A Race</option>\r\n        <option repeat.for=\"race of races\" value.bind=\"race.faction\">${race.faction}</option>\r\n      </select>\r\n    </h4>\r\n\r\n\r\n    <button id=\"submit\" type=\"submit\" class=\"btn btn-primary\">\r\n      UPDATE\r\n    </button>\n   </form>\r\n</template>"; });
define('text!subpages/subpage.html', ['module'], function(module) { module.exports = "<template>\r\n  <ul class=\"list-group\">\r\n    <li repeat.for=\"npc of npcs\" class=\"list-group-item \">${npc.name} | ${npc.healthPoints}\r\n    </li>\r\n  </ul>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map
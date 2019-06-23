(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../$$_lazy_route_resource lazy recursive":
/*!*******************************************************!*\
  !*** ../$$_lazy_route_resource lazy namespace object ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../node_modules/raw-loader/index.js!../src/app/alert-page/alert-page.component.html":
/*!**********************************************************************************!*\
  !*** ../node_modules/raw-loader!../src/app/alert-page/alert-page.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section role=\"main\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col\">\n        <h2 class=\"mt-2\">Active Alerts at <ng-template [ngIf]=\"receivedObject\"><a [routerLink]=\"['/parks', parkCode]\">{{ receivedObject.getTitle() }}</a></ng-template></h2>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col\">\n        <div class=\"container my-2\">\n          <div class=\"row\">\n            <div class=\"col\">\n              <div class=\"card-group\" *ngFor=\"let displayElement of alerts\">\n                <div class=\"card alert-warning my-2 mx-1\">\n                  <div class=\"card-header\"><h4>{{ displayElement.getTitle() }}</h4></div>\n                  <div class=\"card-body\">\n                    <p>\n                      {{ displayElement.getDescription() }}\n                    </p>\n                    <ng-template [ngIf]=\"displayElement.getUrl() !== undefined && displayElement.getUrl() !== ''\">\n                      <a [href]=\"displayElement.getUrl()\">Read more...</a>\n                    </ng-template>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "../node_modules/raw-loader/index.js!../src/app/app.component.html":
/*!****************************************************************!*\
  !*** ../node_modules/raw-loader!../src/app/app.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- Navbar -->\n<section role=\"banner\">\n  <div class=\"navbar navbar-dark bg-dark shadow-sm\">\n    <div class=\"container d-flex justify-content-between\">\n      <a routerLink=\"/\" class=\"navbar-brand d-flex align-items-center\">\n        <strong>Home</strong>\n      </a>\n      <a routerLink=\"/search/alerts\" class=\"navbar-brand d-flex align-items-center\">\n        <strong>Search</strong>\n      </a>\n      <a routerLink=\"/\" class=\"navbar-brand d-flex align-items-center\">\n        <strong>Learn</strong>\n      </a>\n    </div>\n  </div>\n</section>\n<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../node_modules/raw-loader/index.js!../src/app/event-page/event-page.component.html":
/*!**********************************************************************************!*\
  !*** ../node_modules/raw-loader!../src/app/event-page/event-page.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section role=\"main\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col\">\n        <!-- header -->\n        <h1>{{ receivedObject.getTitle() }}</h1>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col\">\n        <div class=\"container\">\n          <div class=\"row\">\n            <div class=\"col-6\">\n              <div class=\"card\">\n                <h5 class=\"card-header\">\n                  Event Info\n                </h5>\n                <div class=\"card-body\">\n                  <div *ngFor=\"let displayElement of receivedObject.getDisplayElements()\">\n                    <ng-template [ngIf]=\"displayElement.getDisplayElementType() == DISPLAY_PROPERTY\">\n                      <div class=\"col\">\n                        {{ displayElement.getTitle() }} {{ displayElement.getDescription() }}\n                      </div>\n                    </ng-template>\n                  </div>\n                </div>\n              </div>\n            </div>\n            <div class=\"col-6\">\n              <div class=\"container\">\n                <div class=\"row\" *ngFor=\"let displayElement of receivedObject.getDisplayElements()\">\n                  <ng-template [ngIf]=\"displayElement.getDisplayElementType() == DISPLAY_PARAGRAPH\">\n                    <div class=\"col\">\n                      <div class=\"card\">\n                        <h5 class=\"card-header\" [innerHTML]=\"displayElement.getTitle() | keepHtml\"></h5>\n                        <div class=\"card-body\" [innerHTML]=\"displayElement.getDescription() | keepHtml\"></div>\n                      </div>\n                    </div>\n                  </ng-template>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col\">\n        <ul class=\"list-group\" *ngFor=\"let displayElement of receivedObject.getDisplayElements()\">\n          <li class=\"list-group-item card my-2 mx-1\"\n              *ngIf=\"displayElement.getDisplayElementType() === DISPLAY_IMAGE\">\n            <img [src]=\"displayElement.getUrl()\"\n                 [alt]=\"displayElement.getDescription()\" style=\"width:50%;\"\n                 class=\"float-right\">\n            <div>\n              <p class=\"font-weight-bold mt-1 mb-0\">{{ displayElement.getTitle() }}</p>\n              <p class=\"my-1\" [innerHTML]=\"displayElement.getDescription() | keepHtml\"></p>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "../node_modules/raw-loader/index.js!../src/app/home-page/home-page.component.html":
/*!********************************************************************************!*\
  !*** ../node_modules/raw-loader!../src/app/home-page/home-page.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section role=\"main\">\n  <div class=\"container-fluid px-0\">\n    <img src=\"assets/img/park1.jpg\" width=\"100%\" />\n  </div>\n  <div class=\"container\">\n    <div class=\"row\">\n      <h1>\n        Welcome to {{ title }}!\n      </h1>\n    </div>\n    <div class=\"row\">\n      <button class=\"btn btn-primary col-2\" (click)=\"callAPI()\">Call API</button>\n      <input class=\"col-10\" [(ngModel)]=\"queryString\" type=\"text\"/>\n    </div>\n    <div class=\"row my-2\">\n      <div class=\"col container\">\n        <ul class=\"list-group\" *ngFor=\"let datum of data\">\n          <li class=\"list-group-item\">\n            <div (click)=\"goToLearnPage(datum)\">\n              <p class=\"my-0\"><b>{{ datum.getTitle() }}</b></p>\n              <p class=\"my-0\">{{ datum.getDescription() }}</p>\n            </div>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "../node_modules/raw-loader/index.js!../src/app/page-not-found/page-not-found.component.html":
/*!******************************************************************************************!*\
  !*** ../node_modules/raw-loader!../src/app/page-not-found/page-not-found.component.html ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section role=\"main\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col text-center\">\n        <div class=\"alert alert-danger\">\n          <h2>Uh-oh! Looks like the page you were looking for doesn't exist. Go back <a [routerLink]=\"['/']\">home</a>.</h2>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "../node_modules/raw-loader/index.js!../src/app/park-page/park-page.component.html":
/*!********************************************************************************!*\
  !*** ../node_modules/raw-loader!../src/app/park-page/park-page.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section role=\"main\">\n  <ng-template [ngIf]=\"park !== undefined\">\n    <div class=\"container my-2\">\n      <div class=\"row\">\n        <div class=\"col text-center\">\n          <h1>{{ park.getTitle() }}</h1>\n        </div>\n      </div>\n      <div class=\"row\">\n        <ng-template [ngIf]=\"parkAlerts.length > 0 || parkEvents.length > 0\">\n          <div class=\"col-lg-4 col-sm-12\">\n            <ng-template [ngIf]=\"parkAlerts.length > 0\">\n              <div class=\"container my-2\">\n                <div class=\"row\">\n                  <div class=\"col\">\n                    <h3><a [routerLink]=\"['/alerts', parkCode]\">Active Alerts</a></h3>\n                  </div>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col\">\n                    <div class=\"card-group\" *ngFor=\"let displayElement of parkAlerts\">\n                      <div class=\"card alert-warning my-2 mx-1\" [routerLink]=\"['/alerts', parkCode]\">\n                        <div class=\"card-header\"><h4>{{ displayElement.getTitle() }}</h4></div>\n                        <div class=\"card-body\">\n                          <p>\n                            {{ displayElement.getDescription() }}\n                          </p>\n                          <ng-template [ngIf]=\"displayElement.getUrl() !== undefined && displayElement.getUrl() !== ''\">\n                            <a [href]=\"displayElement.getUrl()\">Read more...</a>\n                          </ng-template>\n                        </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </ng-template>\n            <ng-template [ngIf]=\"parkEvents.length > 0\">\n              <div class=\"container my-2\">\n                <div class=\"row\">\n                  <div class=\"col\">\n                    <h3>Events</h3>\n                  </div>\n                </div>\n              </div>\n              <div class=\"row\">\n                <div class=\"col\">\n                  <div class=\"card-group\" *ngFor=\"let displayElement of parkEvents\">\n                    <div class=\"card my-2 mx-1\" (click)=\"store(park);store(displayElement)\" [routerLink]=\"['/event']\">\n                      <div class=\"card-header\"><h4>{{ displayElement.getTitle() }}</h4></div>\n                      <div class=\"card-body\">\n                        <p [innerHTML]=\"displayElement.getDescription() | keepHtml\"></p>\n                        <ng-template [ngIf]=\"displayElement.getUrl() !== undefined && displayElement.getUrl() !== ''\">\n                          <a [href]=\"displayElement.getUrl()\">Read more...</a>\n                        </ng-template>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n            </ng-template>\n          </div>\n        </ng-template>\n        <div class=\"col\">\n          <div class=\"container\">\n            <div class=\"card-group\" *ngFor=\"let displayElement of park.getDisplayElements()\">\n              <div class=\"card my-2 mx-1\"\n                  *ngIf=\"displayElement.getDisplayElementType() === DISPLAY_SUMMARY\">\n                <div class=\"card-header\"><h2>{{ displayElement.getTitle() }}</h2></div>\n                <div class=\"card-body\">\n                  <p [innerHTML]=\"displayElement.getDescription() | keepHtml\"></p>\n                  <ng-template [ngIf]=\"displayElement.getUrl() !== undefined && displayElement.getUrl() !== ''\">\n                    <a [href]=\"displayElement.getUrl()\">Read more...</a>\n                  </ng-template>\n                </div>\n              </div>\n            </div>\n          </div>\n          <div class=\"container my-2\">\n            <div class=\"row\">\n              <div class=\"col\">\n                <h1>Gallery</h1>\n              </div>\n            </div>\n            <div class=\"row\">\n              <div class=\"col\">\n                <ul class=\"list-group\" *ngFor=\"let displayElement of park.getDisplayElements()\">\n                  <li class=\"list-group-item card my-2 mx-1\"\n                      *ngIf=\"displayElement.getDisplayElementType() === DISPLAY_IMAGE\">\n                    <img [src]=\"displayElement.getUrl()\"\n                         [alt]=\"displayElement.getDescription()\" style=\"width:50%;\"\n                         class=\"float-right\">\n                    <div>\n                      <p class=\"font-weight-bold mt-1 mb-0\">{{ displayElement.getTitle() }}</p>\n                      <p class=\"my-1\" [innerHTML]=\"displayElement.getDescription() | keepHtml\"></p>\n                    </div>\n                  </li>\n                </ul>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </ng-template>\n</section>\n"

/***/ }),

/***/ "../node_modules/raw-loader/index.js!../src/app/search-page/search-page.component.html":
/*!************************************************************************************!*\
  !*** ../node_modules/raw-loader!../src/app/search-page/search-page.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section role=\"main\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col mt-2\">\n        <h1>Search the NPS Database</h1>\n      </div>\n    </div>\n    <div class=\"row\">\n      <div class=\"col\"></div>\n      <div class=\"col-lg-6\" id=\"nps-search-bar\">\n        <!-- Search form -->\n        <select name=\"resource\" class=\"custom-select form-control my-2\" [(ngModel)]=\"resource\">\n          <option value=\"alerts\">Alerts</option>\n          <option value=\"parks\">Parks</option>\n        </select>\n\n        <div class=\"input-group md-form form-sm my-2\">\n          <input name=\"query\" class=\"form-control\" type=\"text\" [(ngModel)]=\"query\" (keyup.enter)=\"onSubmit()\" placeholder=\"Search\" aria-label=\"Search\">\n          <div class=\"input-group-append\" [routerLink]=\"query ? ['/search', resource, query] : ['/search', resource]\">\n            <button class=\"btn btn-outline-primary input-group-text\">\n              Search <span class=\"pl-2\"><i class=\"fas fa-search\"></i></span>\n            </button>\n          </div>\n        </div>\n\n        <!-- Each resource defines its own filters -->\n        <ng-template [ngIf]=\"resource == 'parks'\">\n          <div><h4>State Filters</h4></div>\n          <select name=\"stateFilters\"\n                  class=\"custom-select form-control my-2\"\n                  (change)=\"addStateFilter(selectedState)\"\n                  [(ngModel)]=\"selectedState\">\n            <option *ngFor=\"let state of stateCodes\" value=\"{{ state }}\">{{ state }}</option>\n          </select>\n\n          <div class=\"container-fluid\">\n            <button *ngFor=\"let filter of stateFilters\" class=\"btn btn-outline-secondary mx-2 my-1\"\n                (click)=\"removeStateFilter(filter)\">\n              <span class=\"pr-2\"><i class=\"fas fa-times\"></i></span>{{filter}}\n            </button>\n          </div>\n        </ng-template>\n      </div>\n      <div class=\"col\"></div>\n    </div>\n    <div class=\"row pt-1\">\n      <div class=\"col\">\n        <ng-template [ngIf]=\"noResults == true\">\n          <div class=\"d-flex justify-content-center w-100\">\n            <p class=\"alert alert-danger flex-shrink-1\" role=\"alert\">No results were found for the given search terms.</p>\n          </div>\n        </ng-template>\n        <ng-template [ngIf]=\"waiting == true\">\n          <div class=\"text-center w-100\">\n            <div class=\"spinner-border\" role=\"status\">\n              <span class=\"sr-only\">Loading...</span>\n            </div>\n          </div>\n        </ng-template>\n        <ng-template [ngIf]=\"noResults == false && waiting == false\">\n          <div class=\"card-group\" *ngFor=\"let datum of data\">\n            <div class=\"card my-1\" [routerLink]=\"datumRouterLink(datum)\">\n              <div class=\"card-header\">\n                <h4 class=\"my-0\">{{ datum.getTitle() }}</h4>\n              </div>\n              <div class=\"card-body\">\n                <p>\n                  {{ datum.getDescription() }}\n                </p>\n              </div>\n            </div>\n          </div>\n        </ng-template>\n      </div>\n    </div>\n  </div>\n</section>\n"

/***/ }),

/***/ "../src/app/DataViewComponent.ts":
/*!***************************************!*\
  !*** ../src/app/DataViewComponent.ts ***!
  \***************************************/
/*! exports provided: ADataViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADataViewComponent", function() { return ADataViewComponent; });
// TODO: Abstract more boolean flags and control flow into this class
//  (such as the `waiting` flag for when a request is being processed)
var ADataViewComponent = /** @class */ (function () {
    function ADataViewComponent(route, router, apiClient, storeService) {
        this.route = route;
        this.router = router;
        this.apiClient = apiClient;
        this.storeService = storeService;
    }
    ADataViewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.receivedObject = this.storeService.pop(); // Will be set to undefined if none exists, which is intended
        this.paramMap$ = this.route.paramMap;
        this.paramMapSubscription = this.paramMap$.subscribe(function (x) { return _this.onParamMapChange(x); }, function (err) { return console.error("error in paramMap observable"); }, function () { return console.log("paramMap observable completed"); });
        this.fetchData();
    };
    ADataViewComponent.prototype.ngOnDestroy = function () {
        this.paramMapSubscription.unsubscribe();
    };
    ADataViewComponent.prototype.store = function (obj) {
        this.storeService.push(obj);
    };
    return ADataViewComponent;
}());



/***/ }),

/***/ "../src/app/alert-page/alert-page.component.css":
/*!******************************************************!*\
  !*** ../src/app/alert-page/alert-page.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FsZXJ0LXBhZ2UvYWxlcnQtcGFnZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "../src/app/alert-page/alert-page.component.ts":
/*!*****************************************************!*\
  !*** ../src/app/alert-page/alert-page.component.ts ***!
  \*****************************************************/
/*! exports provided: AlertPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertPageComponent", function() { return AlertPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../nps/NPSAPIQueryBuilder */ "../src/nps/NPSAPIQueryBuilder.ts");
/* harmony import */ var _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../nps/NPSDataAccessStrategy */ "../src/nps/NPSDataAccessStrategy.ts");
/* harmony import */ var _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/npsapiclient.service */ "../src/app/services/npsapiclient.service.ts");
/* harmony import */ var _services_object_store_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/object-store.service */ "../src/app/services/object-store.service.ts");
/* harmony import */ var _DataViewComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../DataViewComponent */ "../src/app/DataViewComponent.ts");








var AlertPageComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](AlertPageComponent, _super);
    function AlertPageComponent(route, router, apiClient, storeService) {
        var _this = _super.call(this, route, router, apiClient, storeService) || this;
        _this.route = route;
        _this.router = router;
        _this.apiClient = apiClient;
        _this.storeService = storeService;
        _this.alerts = [];
        return _this;
    }
    AlertPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.parkCode = this.route.snapshot.paramMap.get('parkCode');
        if (!this.receivedObject) {
            var queryBuilder = new _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_3__["default"]()
                .addParkCode(this.parkCode)
                .longText(false)
                .setLimit(5)
                .from('parks');
            var strategy = new _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_4__["NPSDataAccessStrategyBuilder"]()
                .use('batch', {
                queryBuilder: queryBuilder
            })
                .build();
            var parkSource = this.apiClient.retrieve(queryBuilder.build(), strategy);
            parkSource.addOnUpdateHandler(function (snapshot) {
                if (snapshot.length < 1) {
                    _this.router.navigateByUrl('/page-not-found');
                    return;
                }
                _this.receivedObject = snapshot[0];
            });
        }
        else {
            this.store(this.receivedObject);
        }
        _super.prototype.ngOnInit.call(this);
    };
    AlertPageComponent.prototype.onParamMapChange = function (newParamMap) {
        var parkCode = newParamMap.get('parkCode');
        if (parkCode != this.parkCode) {
            this.fetchData();
        }
    };
    AlertPageComponent.prototype.fetchData = function () {
        var _this = this;
        var queryBuilder = new _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_3__["default"]()
            .from('alerts')
            .longText(false);
        if (this.parkCode !== undefined) {
            queryBuilder.addParkCode(this.parkCode);
        }
        var strategy = new _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_4__["NPSDataAccessStrategyBuilder"]()
            .use('default')
            .build();
        var alertsSource = this.apiClient.retrieve(queryBuilder.build(), strategy);
        alertsSource.addOnUpdateHandler(function (snapshot) {
            _this.alerts = snapshot;
        });
        alertsSource.addOnCompletedHandler(function (snapshot) {
            if (snapshot.length == 0) {
                _this.noResults = true;
            }
        });
    };
    AlertPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-alert-page',
            template: __webpack_require__(/*! raw-loader!./alert-page.component.html */ "../node_modules/raw-loader/index.js!../src/app/alert-page/alert-page.component.html"),
            styles: [__webpack_require__(/*! ./alert-page.component.css */ "../src/app/alert-page/alert-page.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_5__["NPSAPIClientService"],
            _services_object_store_service__WEBPACK_IMPORTED_MODULE_6__["ObjectStoreService"]])
    ], AlertPageComponent);
    return AlertPageComponent;
}(_DataViewComponent__WEBPACK_IMPORTED_MODULE_7__["ADataViewComponent"]));



/***/ }),

/***/ "../src/app/app-routing.module.ts":
/*!****************************************!*\
  !*** ../src/app/app-routing.module.ts ***!
  \****************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _park_page_park_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./park-page/park-page.component */ "../src/app/park-page/park-page.component.ts");
/* harmony import */ var _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home-page/home-page.component */ "../src/app/home-page/home-page.component.ts");
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ "../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search-page/search-page.component */ "../src/app/search-page/search-page.component.ts");
/* harmony import */ var _alert_page_alert_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./alert-page/alert-page.component */ "../src/app/alert-page/alert-page.component.ts");
/* harmony import */ var _event_page_event_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./event-page/event-page.component */ "../src/app/event-page/event-page.component.ts");










var routes = [
    { path: 'parks/:parkCode', component: _park_page_park_page_component__WEBPACK_IMPORTED_MODULE_4__["ParkPageComponent"], pathMatch: 'full' },
    { path: 'event', component: _event_page_event_page_component__WEBPACK_IMPORTED_MODULE_9__["EventPageComponent"], pathMatch: 'full' },
    { path: 'alerts', component: _alert_page_alert_page_component__WEBPACK_IMPORTED_MODULE_8__["AlertPageComponent"] },
    { path: 'alerts/:parkCode', component: _alert_page_alert_page_component__WEBPACK_IMPORTED_MODULE_8__["AlertPageComponent"] },
    { path: 'search', component: _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_7__["SearchPageComponent"] },
    { path: 'search/:resource', component: _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_7__["SearchPageComponent"] },
    { path: 'search/:resource/:query', component: _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_7__["SearchPageComponent"] },
    { path: '', component: _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_5__["HomePageComponent"] },
    { path: '**', component: _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_6__["PageNotFoundComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot(routes)
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../src/app/app.component.css":
/*!************************************!*\
  !*** ../src/app/app.component.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "../src/app/app.component.ts":
/*!***********************************!*\
  !*** ../src/app/app.component.ts ***!
  \***********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");


var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "../node_modules/raw-loader/index.js!../src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "../src/app/app.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../src/app/app.module.ts":
/*!********************************!*\
  !*** ../src/app/app.module.ts ***!
  \********************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_window_ref_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/window-ref.service */ "../src/app/services/window-ref.service.ts");
/* harmony import */ var _services_npsmodel_daoprovider_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/npsmodel-daoprovider.service */ "../src/app/services/npsmodel-daoprovider.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _park_page_park_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./park-page/park-page.component */ "../src/app/park-page/park-page.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "../src/app/app-routing.module.ts");
/* harmony import */ var _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./home-page/home-page.component */ "../src/app/home-page/home-page.component.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "../src/app/app.component.ts");
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ "../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./search-page/search-page.component */ "../src/app/search-page/search-page.component.ts");
/* harmony import */ var _alert_page_alert_page_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./alert-page/alert-page.component */ "../src/app/alert-page/alert-page.component.ts");
/* harmony import */ var _services_object_store_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/object-store.service */ "../src/app/services/object-store.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ "../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pipes_keep_html_pipe__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pipes/keep-html.pipe */ "../src/app/pipes/keep-html.pipe.ts");
/* harmony import */ var _event_page_event_page_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./event-page/event-page.component */ "../src/app/event-page/event-page.component.ts");

















var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _park_page_park_page_component__WEBPACK_IMPORTED_MODULE_6__["ParkPageComponent"],
                _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_8__["HomePageComponent"],
                _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"],
                _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_10__["PageNotFoundComponent"],
                _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_11__["SearchPageComponent"],
                _alert_page_alert_page_component__WEBPACK_IMPORTED_MODULE_12__["AlertPageComponent"],
                _pipes_keep_html_pipe__WEBPACK_IMPORTED_MODULE_15__["EscapeHtmlPipe"],
                _event_page_event_page_component__WEBPACK_IMPORTED_MODULE_16__["EventPageComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common__WEBPACK_IMPORTED_MODULE_14__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"]
            ],
            providers: [_services_window_ref_service__WEBPACK_IMPORTED_MODULE_3__["WindowRefService"], _services_npsmodel_daoprovider_service__WEBPACK_IMPORTED_MODULE_4__["NPSModelDAOProviderService"], _services_object_store_service__WEBPACK_IMPORTED_MODULE_13__["ObjectStoreService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../src/app/event-page/event-page.component.css":
/*!******************************************************!*\
  !*** ../src/app/event-page/event-page.component.css ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2V2ZW50LXBhZ2UvZXZlbnQtcGFnZS5jb21wb25lbnQuY3NzIn0= */"

/***/ }),

/***/ "../src/app/event-page/event-page.component.ts":
/*!*****************************************************!*\
  !*** ../src/app/event-page/event-page.component.ts ***!
  \*****************************************************/
/*! exports provided: EventPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventPageComponent", function() { return EventPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _DataViewComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DataViewComponent */ "../src/app/DataViewComponent.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/npsapiclient.service */ "../src/app/services/npsapiclient.service.ts");
/* harmony import */ var _nps_NPSModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../nps/NPSModel */ "../src/nps/NPSModel.ts");
/* harmony import */ var _services_object_store_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/object-store.service */ "../src/app/services/object-store.service.ts");







var EventPageComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](EventPageComponent, _super);
    function EventPageComponent(route, router, apiClient, storeService) {
        var _this = _super.call(this, route, router, apiClient, storeService) || this;
        _this.route = route;
        _this.router = router;
        _this.apiClient = apiClient;
        _this.storeService = storeService;
        _this.DISPLAY_PROPERTY = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_5__["NPSDisplayElementType"].PROPERTY;
        _this.DISPLAY_PARAGRAPH = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_5__["NPSDisplayElementType"].SUMMARY;
        _this.DISPLAY_IMAGE = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_5__["NPSDisplayElementType"].IMAGE;
        return _this;
    }
    EventPageComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        if (this.receivedObject === undefined) {
            this.router.navigateByUrl('/page-not-found');
        }
    };
    EventPageComponent.prototype.fetchData = function () {
    };
    EventPageComponent.prototype.onParamMapChange = function (newParamMap) {
        var parkCode = newParamMap.get('parkCode');
        if (parkCode !== this.parkCode) {
            this.parkCode = parkCode;
            this.fetchData();
        }
    };
    EventPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-event-page',
            template: __webpack_require__(/*! raw-loader!./event-page.component.html */ "../node_modules/raw-loader/index.js!../src/app/event-page/event-page.component.html"),
            styles: [__webpack_require__(/*! ./event-page.component.css */ "../src/app/event-page/event-page.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_4__["NPSAPIClientService"],
            _services_object_store_service__WEBPACK_IMPORTED_MODULE_6__["ObjectStoreService"]])
    ], EventPageComponent);
    return EventPageComponent;
}(_DataViewComponent__WEBPACK_IMPORTED_MODULE_2__["ADataViewComponent"]));



/***/ }),

/***/ "../src/app/home-page/home-page.component.css":
/*!****************************************************!*\
  !*** ../src/app/home-page/home-page.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2hvbWUtcGFnZS9ob21lLXBhZ2UuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "../src/app/home-page/home-page.component.ts":
/*!***************************************************!*\
  !*** ../src/app/home-page/home-page.component.ts ***!
  \***************************************************/
/*! exports provided: HomePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageComponent", function() { return HomePageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/npsapiclient.service */ "../src/app/services/npsapiclient.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../nps/NPSAPIQueryBuilder */ "../src/nps/NPSAPIQueryBuilder.ts");
/* harmony import */ var _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../nps/NPSDataAccessStrategy */ "../src/nps/NPSDataAccessStrategy.ts");






var HomePageComponent = /** @class */ (function () {
    function HomePageComponent(npsapiClientService, router) {
        this.npsapiClientService = npsapiClientService;
        this.router = router;
        this.title = 'nps-kiosk-app';
        this.resource = "parks";
        this.queryString = "";
        this.data = [];
    }
    HomePageComponent.prototype.ngOnInit = function () {
    };
    HomePageComponent.prototype.callAPI = function () {
        var _this = this;
        var qb = new _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_4__["default"]();
        qb.from(this.resource);
        if (this.queryString !== "") {
            qb.setQueryString(this.queryString);
        }
        var strategy = (new _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__["NPSDataAccessStrategyBuilder"]())
            .use('default')
            .use('filter', {
            predicate: function (datum) {
                return datum.getUrl() !== "";
            }
        })
            .build();
        var dataSource = this.npsapiClientService.retrieve(qb.build(), strategy);
        dataSource.addOnUpdateHandler(function (snapshot) { return _this.data = snapshot; });
    };
    HomePageComponent.prototype.goToLearnPage = function (datum) {
        this.router.navigateByUrl("");
    };
    HomePageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home-page',
            template: __webpack_require__(/*! raw-loader!./home-page.component.html */ "../node_modules/raw-loader/index.js!../src/app/home-page/home-page.component.html"),
            styles: [__webpack_require__(/*! ./home-page.component.css */ "../src/app/home-page/home-page.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_2__["NPSAPIClientService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], HomePageComponent);
    return HomePageComponent;
}());



/***/ }),

/***/ "../src/app/page-not-found/page-not-found.component.css":
/*!**************************************************************!*\
  !*** ../src/app/page-not-found/page-not-found.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2Utbm90LWZvdW5kL3BhZ2Utbm90LWZvdW5kLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "../src/app/page-not-found/page-not-found.component.ts":
/*!*************************************************************!*\
  !*** ../src/app/page-not-found/page-not-found.component.ts ***!
  \*************************************************************/
/*! exports provided: PageNotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFoundComponent", function() { return PageNotFoundComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");


var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-page-not-found',
            template: __webpack_require__(/*! raw-loader!./page-not-found.component.html */ "../node_modules/raw-loader/index.js!../src/app/page-not-found/page-not-found.component.html"),
            styles: [__webpack_require__(/*! ./page-not-found.component.css */ "../src/app/page-not-found/page-not-found.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());



/***/ }),

/***/ "../src/app/park-page/park-page.component.css":
/*!****************************************************!*\
  !*** ../src/app/park-page/park-page.component.css ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhcmstcGFnZS9wYXJrLXBhZ2UuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "../src/app/park-page/park-page.component.ts":
/*!***************************************************!*\
  !*** ../src/app/park-page/park-page.component.ts ***!
  \***************************************************/
/*! exports provided: ParkPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParkPageComponent", function() { return ParkPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../nps/NPSAPIQueryBuilder */ "../src/nps/NPSAPIQueryBuilder.ts");
/* harmony import */ var _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/npsapiclient.service */ "../src/app/services/npsapiclient.service.ts");
/* harmony import */ var _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../nps/NPSDataAccessStrategy */ "../src/nps/NPSDataAccessStrategy.ts");
/* harmony import */ var _nps_NPSModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../nps/NPSModel */ "../src/nps/NPSModel.ts");
/* harmony import */ var _services_object_store_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/object-store.service */ "../src/app/services/object-store.service.ts");
/* harmony import */ var _DataViewComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../DataViewComponent */ "../src/app/DataViewComponent.ts");









var ParkPageComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](ParkPageComponent, _super);
    function ParkPageComponent(route, router, apiClient, storeService) {
        var _this = _super.call(this, route, router, apiClient, storeService) || this;
        _this.route = route;
        _this.router = router;
        _this.apiClient = apiClient;
        _this.storeService = storeService;
        // NPS Display Element Type bindings for use in the view
        _this.DISPLAY_IMAGE = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_6__["NPSDisplayElementType"].IMAGE;
        _this.DISPLAY_SUMMARY = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_6__["NPSDisplayElementType"].SUMMARY;
        _this.DISPLAY_META = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_6__["NPSDisplayElementType"].META;
        _this.park = undefined;
        _this.parkAlerts = [];
        _this.parkEvents = [];
        return _this;
    }
    ParkPageComponent.prototype.onParamMapChange = function (newMap) {
        var parkCode = newMap.get('parkCode');
        if (parkCode != this.parkCode) {
            this.parkCode = parkCode;
            this.fetchData();
        }
    };
    ParkPageComponent.prototype.fetchData = function () {
        var _this = this;
        var queryBuilder = new _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_3__["default"]();
        var strategy = new _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__["NPSDataAccessStrategyBuilder"]()
            .use('default')
            .build();
        if (!this.receivedObject) {
            var query_1 = queryBuilder
                .from('parks')
                .includeField('images')
                .addParkCode(this.parkCode)
                .longText(true)
                .build();
            var parkSource = this.apiClient.retrieve(query_1, strategy);
            parkSource.addOnUpdateHandler(function (snapshot) {
                if (snapshot.length < 1) {
                    //this.router.navigateByUrl('/page-not-found');
                }
                _this.park = snapshot[0];
                _this.store(_this.park);
            });
        }
        else {
            this.park = this.receivedObject;
        }
        var query = queryBuilder
            .reset()
            .from('alerts')
            .addParkCode(this.parkCode)
            .longText(false)
            .setLimit(5)
            .build();
        var alertsSource = this.apiClient.retrieve(query, strategy);
        alertsSource.addOnUpdateHandler(function (snapshot) {
            _this.parkAlerts = snapshot;
        });
        query = queryBuilder
            .reset()
            .from('events')
            .addParkCode(this.parkCode)
            .longText(true)
            .set('pagesize', 5)
            .includeField('images')
            .build();
        console.log(query);
        var eventsSource = this.apiClient.retrieve(query, strategy);
        eventsSource.addOnUpdateHandler(function (snapshot) {
            console.log(snapshot);
            _this.parkEvents = snapshot;
        });
    };
    ParkPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-park-page',
            template: __webpack_require__(/*! raw-loader!./park-page.component.html */ "../node_modules/raw-loader/index.js!../src/app/park-page/park-page.component.html"),
            styles: [__webpack_require__(/*! ./park-page.component.css */ "../src/app/park-page/park-page.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_4__["NPSAPIClientService"],
            _services_object_store_service__WEBPACK_IMPORTED_MODULE_7__["ObjectStoreService"]])
    ], ParkPageComponent);
    return ParkPageComponent;
}(_DataViewComponent__WEBPACK_IMPORTED_MODULE_8__["ADataViewComponent"]));



/***/ }),

/***/ "../src/app/pipes/keep-html.pipe.ts":
/*!******************************************!*\
  !*** ../src/app/pipes/keep-html.pipe.ts ***!
  \******************************************/
/*! exports provided: EscapeHtmlPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EscapeHtmlPipe", function() { return EscapeHtmlPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "../node_modules/@angular/platform-browser/fesm5/platform-browser.js");



var EscapeHtmlPipe = /** @class */ (function () {
    function EscapeHtmlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    EscapeHtmlPipe.prototype.transform = function (content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    };
    EscapeHtmlPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({ name: 'keepHtml', pure: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
    ], EscapeHtmlPipe);
    return EscapeHtmlPipe;
}());



/***/ }),

/***/ "../src/app/search-page/search-page.component.css":
/*!********************************************************!*\
  !*** ../src/app/search-page/search-page.component.css ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3NlYXJjaC1wYWdlL3NlYXJjaC1wYWdlLmNvbXBvbmVudC5jc3MifQ== */"

/***/ }),

/***/ "../src/app/search-page/search-page.component.ts":
/*!*******************************************************!*\
  !*** ../src/app/search-page/search-page.component.ts ***!
  \*******************************************************/
/*! exports provided: SearchPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SearchPageComponent", function() { return SearchPageComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/npsapiclient.service */ "../src/app/services/npsapiclient.service.ts");
/* harmony import */ var _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../nps/NPSAPIQueryBuilder */ "../src/nps/NPSAPIQueryBuilder.ts");
/* harmony import */ var _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../nps/NPSDataAccessStrategy */ "../src/nps/NPSDataAccessStrategy.ts");
/* harmony import */ var _services_object_store_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/object-store.service */ "../src/app/services/object-store.service.ts");
/* harmony import */ var _nps_Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../nps/Constants */ "../src/nps/Constants.ts");
/* harmony import */ var _DataViewComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../DataViewComponent */ "../src/app/DataViewComponent.ts");









var SearchPageComponent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](SearchPageComponent, _super);
    function SearchPageComponent(route, router, apiClient, storeService) {
        var _this = _super.call(this, route, router, apiClient, storeService) || this;
        _this.route = route;
        _this.router = router;
        _this.apiClient = apiClient;
        _this.storeService = storeService;
        _this.datumRouterLinkGenerator = function (resource) {
            return function (datum) {
                return ['/', resource, datum.getUniqueId()];
            };
        };
        // Variables for state filter
        _this.stateCodes = _nps_Constants__WEBPACK_IMPORTED_MODULE_7__["STATE_CODES"];
        // Defaults
        _this.resource = 'alerts';
        _this.query = undefined;
        _this.waiting = false;
        _this.noResults = false;
        _this.stateFilters = [];
        return _this;
    }
    SearchPageComponent.prototype.onParamMapChange = function (newMap) {
        var query = newMap.get('query');
        var resource = newMap.get('resource');
        console.log("PARAMS UPDATED", query, resource);
        if (!this.waiting) {
            this.query = query;
            this.resource = resource;
            this.fetchData();
        }
    };
    SearchPageComponent.prototype.onSubmit = function () {
        this.router.navigate([
            '/search',
            this.resource,
            this.query
        ]);
        /*
        if (!this.waiting) {
          this.fetchData();
        }*/
    };
    SearchPageComponent.prototype.fetchData = function () {
        var _this = this;
        this.waiting = true;
        this.noResults = false;
        this.data = [];
        this.datumRouterLink = this.datumRouterLinkGenerator(this.resource);
        this.storeService.pop();
        var queryBuilder = new _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_4__["default"]()
            .from(this.resource)
            .setQueryString(this.query)
            .longText(false)
            .addAllStateCodes(this.stateFilters);
        var strategyBuilder = new _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__["NPSDataAccessStrategyBuilder"]()
            .use('batch', {
            'queryBuilder': queryBuilder
        });
        var dataSource = this.apiClient.retrieve(queryBuilder.build(), strategyBuilder.build());
        dataSource.addOnUpdateHandler(function (snapshot) {
            if (snapshot.length > 0) {
                _this.waiting = false;
            }
            _this.data = snapshot;
        });
        dataSource.addOnCompletedHandler(function (snapshot) {
            _this.noResults = snapshot.length == 0;
            _this.waiting = false;
        });
    };
    SearchPageComponent.prototype.addStateFilter = function (stateCode) {
        this.stateFilters.push(stateCode);
        this.fetchData();
        console.log("Attempt to add state", stateCode);
    };
    SearchPageComponent.prototype.removeStateFilter = function (stateCode) {
        this.stateFilters = this.stateFilters.reduce(function (acc, val) {
            if (val !== stateCode) {
                acc.push(val);
            }
            return acc;
        }, []);
        this.fetchData();
        console.log("Attempt to remove state", stateCode);
    };
    SearchPageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-search-page',
            template: __webpack_require__(/*! raw-loader!./search-page.component.html */ "../node_modules/raw-loader/index.js!../src/app/search-page/search-page.component.html"),
            styles: [__webpack_require__(/*! ./search-page.component.css */ "../src/app/search-page/search-page.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_3__["NPSAPIClientService"],
            _services_object_store_service__WEBPACK_IMPORTED_MODULE_6__["ObjectStoreService"]])
    ], SearchPageComponent);
    return SearchPageComponent;
}(_DataViewComponent__WEBPACK_IMPORTED_MODULE_8__["ADataViewComponent"]));



/***/ }),

/***/ "../src/app/services/npsapiclient.service.ts":
/*!***************************************************!*\
  !*** ../src/app/services/npsapiclient.service.ts ***!
  \***************************************************/
/*! exports provided: NPSAPIClientService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPSAPIClientService", function() { return NPSAPIClientService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _nps_NPSAPIWorkerManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../nps/NPSAPIWorkerManager */ "../src/nps/NPSAPIWorkerManager.ts");
/* harmony import */ var _window_ref_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./window-ref.service */ "../src/app/services/window-ref.service.ts");
/* harmony import */ var _npsmodel_daoprovider_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./npsmodel-daoprovider.service */ "../src/app/services/npsmodel-daoprovider.service.ts");





var NPSAPIClientService = /** @class */ (function () {
    function NPSAPIClientService(windowRef, daoProvider) {
        this.windowRef = windowRef;
        this.daoProvider = daoProvider;
        if (windowRef.nativeWindow) {
            this.workerMgr = new _nps_NPSAPIWorkerManager__WEBPACK_IMPORTED_MODULE_2__["NPSAPIWorkerManager"]('assets/js/worker.js', // This is a singleton instance, so no duplicate workers are created
            windowRef.nativeWindow);
        }
        this.dao = daoProvider.getDAOBuilder()(this.workerMgr);
    }
    NPSAPIClientService.prototype.retrieve = function (query, strategy) {
        return strategy.getData(query, this.dao);
    };
    NPSAPIClientService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_window_ref_service__WEBPACK_IMPORTED_MODULE_3__["WindowRefService"], _npsmodel_daoprovider_service__WEBPACK_IMPORTED_MODULE_4__["NPSModelDAOProviderService"]])
    ], NPSAPIClientService);
    return NPSAPIClientService;
}());



/***/ }),

/***/ "../src/app/services/npsmodel-daoprovider.service.ts":
/*!***********************************************************!*\
  !*** ../src/app/services/npsmodel-daoprovider.service.ts ***!
  \***********************************************************/
/*! exports provided: NPSModelDAOProviderService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPSModelDAOProviderService", function() { return NPSModelDAOProviderService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _nps_NPSModelDAO__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../nps/NPSModelDAO */ "../src/nps/NPSModelDAO.ts");



var NPSModelDAOProviderService = /** @class */ (function () {
    function NPSModelDAOProviderService() {
    }
    NPSModelDAOProviderService.prototype.getDAOBuilder = function () {
        return function (workerMgr) { return new _nps_NPSModelDAO__WEBPACK_IMPORTED_MODULE_2__["NPSModelDAO"](workerMgr); };
    };
    NPSModelDAOProviderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], NPSModelDAOProviderService);
    return NPSModelDAOProviderService;
}());



/***/ }),

/***/ "../src/app/services/object-store.service.ts":
/*!***************************************************!*\
  !*** ../src/app/services/object-store.service.ts ***!
  \***************************************************/
/*! exports provided: ObjectStoreService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObjectStoreService", function() { return ObjectStoreService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");


var ObjectStoreService = /** @class */ (function () {
    function ObjectStoreService() {
        this.stack = [];
    }
    ObjectStoreService.prototype.isEmpty = function () {
        return this.stack.length == 0;
    };
    ObjectStoreService.prototype.clear = function () {
        this.stack = [];
    };
    ObjectStoreService.prototype.push = function (obj) {
        this.stack.push(obj);
    };
    ObjectStoreService.prototype.pop = function () {
        return this.stack.pop();
    };
    ObjectStoreService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ObjectStoreService);
    return ObjectStoreService;
}());



/***/ }),

/***/ "../src/app/services/window-ref.service.ts":
/*!*************************************************!*\
  !*** ../src/app/services/window-ref.service.ts ***!
  \*************************************************/
/*! exports provided: WindowRefService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WindowRefService", function() { return WindowRefService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");


function _window() {
    // return the global native browser window object
    return window;
}
var WindowRefService = /** @class */ (function () {
    function WindowRefService() {
    }
    Object.defineProperty(WindowRefService.prototype, "nativeWindow", {
        get: function () {
            return _window();
        },
        enumerable: true,
        configurable: true
    });
    WindowRefService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], WindowRefService);
    return WindowRefService;
}());



/***/ }),

/***/ "../src/environments/environment.ts":
/*!******************************************!*\
  !*** ../src/environments/environment.ts ***!
  \******************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "../src/main.ts":
/*!**********************!*\
  !*** ../src/main.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "../src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "../src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ "../src/nps/Constants.ts":
/*!*******************************!*\
  !*** ../src/nps/Constants.ts ***!
  \*******************************/
/*! exports provided: STATE_CODES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATE_CODES", function() { return STATE_CODES; });
var STATE_CODES = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
];


/***/ }),

/***/ "../src/nps/NPSAPIQuery.ts":
/*!*********************************!*\
  !*** ../src/nps/NPSAPIQuery.ts ***!
  \*********************************/
/*! exports provided: NPSAPIQuery, NPSAPIQueryOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPSAPIQuery", function() { return NPSAPIQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPSAPIQueryOptions", function() { return NPSAPIQueryOptions; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");

/**
 * Represents an NPS API query that can be executed.
 */
var NPSAPIQuery = /** @class */ (function () {
    /**
     * @param resource The API resource to query
     * @param params The query parameters
     * @constructor
     */
    function NPSAPIQuery(resource, params, options) {
        this.resource = resource;
        this.params = params;
        this.options = options;
    }
    /**
     * Strips down this query object into a simple object with just resource and params fields.
     * @return {{resource: *, params: *}}
     */
    NPSAPIQuery.prototype.strip = function () {
        return {
            resource: this.resource,
            params: this.params
        };
    };
    /**
     * Executes this query by sending a request to the given API worker manager.
     * @param {NPSAPIWorkerManager} workerMgr The worker manager
     * @return {Promise<NPSAPIResponse>} The response object
     */
    NPSAPIQuery.prototype.execute = function (workerMgr, paramsOverride) {
        if (paramsOverride === void 0) { paramsOverride = {}; }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var field, response;
            var _this = this;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        for (field in paramsOverride) {
                            this.params[field] = paramsOverride[field]; // Set override parameters
                        }
                        return [4 /*yield*/, (new Promise(function (resolve) {
                                workerMgr.request(_this, function (response) { return resolve(response); });
                            }))];
                    case 1:
                        response = _a.sent();
                        // @ts-ignore
                        return [2 /*return*/, response];
                }
            });
        });
    };
    NPSAPIQuery.prototype.getConfig = function () {
        return this.options;
    };
    return NPSAPIQuery;
}());

var NPSAPIQueryOptions = /** @class */ (function () {
    function NPSAPIQueryOptions() {
        this.long = false;
    }
    NPSAPIQueryOptions.prototype.setLong = function (long) {
        this.long = long;
        return this;
    };
    NPSAPIQueryOptions.prototype.getLong = function () {
        return this.long;
    };
    return NPSAPIQueryOptions;
}());



/***/ }),

/***/ "../src/nps/NPSAPIQueryBuilder.ts":
/*!****************************************!*\
  !*** ../src/nps/NPSAPIQueryBuilder.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NPSAPIQuery */ "../src/nps/NPSAPIQuery.ts");

/**
 * Factory for {@link NPSAPIQuery} objects that can be executed on the NPS API.
 */
var NPSAPIQueryBuilder = /** @class */ (function () {
    function NPSAPIQueryBuilder() {
        this.arrayToCommaDelimitedString = function (items) {
            var out = "";
            for (var i = 0; i < items.length; i++) {
                if (i < items.length - 1) {
                    out += items[i] + ",";
                }
                else {
                    out += items[i];
                }
            }
            return out;
        };
        this.reset();
    }
    /**
     * Resets this query builder to its initial state.
     * @return {NPSAPIQueryBuilder} This instance, with its fields reset
     */
    NPSAPIQueryBuilder.prototype.reset = function () {
        this.parkCodes = [];
        this.stateCodes = [];
        this.queryString = undefined;
        this.limit = 50;
        this.start = 0;
        this.options = new _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_0__["NPSAPIQueryOptions"]();
        this.fields = [];
        this.params = {};
        return this;
    };
    NPSAPIQueryBuilder.prototype.longText = function (long) {
        this.options.setLong(long);
        return this;
    };
    /**
     * Adds all park codes in the given array to the query.
     * @param {Array<String>} parkCodeArr The array of park codes to add
     * @return {NPSAPIQueryBuilder} This instance
     */
    NPSAPIQueryBuilder.prototype.addAllParkCodes = function (parkCodeArr) {
        var _this = this;
        parkCodeArr.forEach(function (parkCode) {
            if (!_this.parkCodes.includes(parkCode)) {
                _this.parkCodes.push(parkCode);
            }
        });
        return this;
    };
    /**
     * Adds a single park code to the query.
     * @param {String} parkCode The park code
     * @return {NPSAPIQueryBuilder} This instance
     */
    NPSAPIQueryBuilder.prototype.addParkCode = function (parkCode) {
        if (!this.parkCodes.includes(parkCode)) {
            this.parkCodes.push(parkCode);
        }
        return this;
    };
    NPSAPIQueryBuilder.prototype.addAllStateCodes = function (stateCodeArr) {
        var _this = this;
        stateCodeArr.forEach(function (parkCode) {
            if (!_this.stateCodes.includes(parkCode)) {
                _this.stateCodes.push(parkCode);
            }
        });
        return this;
    };
    /**
     * Sets the query string.
     * @param {String} queryString The query string
     * @return {NPSAPIQueryBuilder} This instance
     */
    NPSAPIQueryBuilder.prototype.setQueryString = function (queryString) {
        this.queryString = queryString;
        return this;
    };
    /**
     * Advances the query by one page. Makes it extremely easy to chain queries to obtain multiple pages.
     * @example
     * let qb = new NPSAPIQueryBuilder();
     * let response1 = qb.from("parks").build().execute();
     * let response2 = qb.nextPage().build().execute();
     *
     * @return {NPSAPIQueryBuilder} This instance
     */
    NPSAPIQueryBuilder.prototype.nextPage = function () {
        this.start += this.limit;
        return this;
    };
    /**
     * Sets the limit.
     * @param {int} limit The limit
     * @return {NPSAPIQueryBuilder} This instance
     * @throws {Error} if the limit is less than 0
     */
    NPSAPIQueryBuilder.prototype.setLimit = function (limit) {
        if (limit < 0) {
            throw new Error("Limit cannot be less than 0");
        }
        this.limit = limit;
        return this;
    };
    /**
     * Sets the start index.
     * @param {int} start The start index
     * @return {NPSAPIQueryBuilder} This instance
     * @throws {Error} if the start index is less than 0
     */
    NPSAPIQueryBuilder.prototype.setStart = function (start) {
        if (start < 0) {
            throw new Error("Start cannot be less than 0");
        }
        this.start = start;
        return this;
    };
    /**
     * Sets the resource from which to retrieve data.
     * @param {String} resource The resource string
     * @return {NPSAPIQueryBuilder} This instance
     */
    NPSAPIQueryBuilder.prototype.from = function (resource) {
        this.resource = resource;
        return this;
    };
    NPSAPIQueryBuilder.prototype.set = function (name, value) {
        this.params[name] = value;
        return this;
    };
    /**
     * Builds a new query object based on the current configuration.
     * @return {NPSAPIQuery} The query object
     */
    NPSAPIQueryBuilder.prototype.build = function () {
        if (this.parkCodes.length > 0) {
            this.params["parkCode"] = this.arrayToCommaDelimitedString(this.parkCodes);
        }
        if (this.stateCodes.length > 0) {
            this.params["stateCode"] = this.arrayToCommaDelimitedString(this.stateCodes);
        }
        if (this.fields.length > 0) {
            this.params["fields"] = this.arrayToCommaDelimitedString(this.fields);
        }
        this.params["limit"] = this.limit;
        this.params["start"] = this.start;
        if (this.queryString) {
            this.params["q"] = this.queryString;
        }
        return new _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_0__["NPSAPIQuery"](this.resource, this.params, this.options);
    };
    NPSAPIQueryBuilder.prototype.includeField = function (field) {
        this.fields.push(field);
        return this;
    };
    return NPSAPIQueryBuilder;
}());
/* harmony default export */ __webpack_exports__["default"] = (NPSAPIQueryBuilder);


/***/ }),

/***/ "../src/nps/NPSAPIResponse.ts":
/*!************************************!*\
  !*** ../src/nps/NPSAPIResponse.ts ***!
  \************************************/
/*! exports provided: NPSAPIResponse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPSAPIResponse", function() { return NPSAPIResponse; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");

/**
 * Model of a response received from the NPS API.
 */
var NPSAPIResponse = /** @class */ (function () {
    /**
     * @param status The status of the response
     * @param resource The resource from which the response was retrieved
     * @param start The start index of the response
     * @param limit The limit of the response
     * @param total The total number of elements in the resource
     * @param data The data of the response
     */
    function NPSAPIResponse(status, resource, start, limit, total, data) {
        this.status = status;
        this.resource = resource;
        this.start = start;
        this.limit = limit;
        this.total = total;
        this.data = data;
    }
    /**
     * Gets the total number of pages at the resource accessed.
     * @return {number}
     */
    NPSAPIResponse.prototype.totalPages = function () {
        return Math.ceil(this.total / this.limit);
    };
    /**
     * Gets the current page based on the query parameters
     * @return {number}
     */
    NPSAPIResponse.prototype.currentPage = function () {
        return this.start / this.limit;
    };
    /**
     * Gets the number of pages left based on the query parameters
     * @return {number}
     */
    NPSAPIResponse.prototype.pagesLeft = function () {
        return this.totalPages() - this.currentPage();
    };
    /**
     * Checks whether the response has an OK status.
     * @return {boolean}
     */
    NPSAPIResponse.prototype.ok = function () {
        return this.status === 'ok';
    };
    /**
     * <p>
     *     Gets the data of this response. This method should only be expected to return a defined value if this.ok()
     *     is true.
     * </p>
     * @return {Object} The data of this response
     */
    NPSAPIResponse.prototype.getData = function () {
        return this.data;
    };
    /**
     * Gets the resource that was accessed.
     * @return {String}
     */
    NPSAPIResponse.prototype.getResource = function () {
        return this.resource;
    };
    /**
     * Constructs an {@link NPSAPIResponse} object from raw data.
     * @param raw A response object as received from an {@link NPSAPIWorkerManager}.
     * @return {NPSAPIResponse} The new object
     * @throws Error if parsing the data failed
     */
    NPSAPIResponse.from = function (responseObj) {
        if (responseObj.status === undefined) {
            throw new Error("Cannot parse malformed response. Expected a 'status' property.");
        }
        // Switch to address special cases (because the 'events' resource schema is apparently documented incorrectly...)
        // TODO: Open an issue about this if they have the API code hosted on GitHub
        switch (responseObj.reqResource) {
            case 'events':
                return new NPSAPIEventResponse(responseObj.status, responseObj.reqResource, responseObj.data.pagenumber, responseObj.data.pagesize, responseObj.data.total, responseObj.data.data);
            default:
                return new NPSAPIResponse(responseObj.status, responseObj.reqResource, responseObj.data.start, responseObj.data.limit, responseObj.data.total, responseObj.data.data);
        }
    };
    return NPSAPIResponse;
}());

var NPSAPIEventResponse = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](NPSAPIEventResponse, _super);
    function NPSAPIEventResponse(status, resource, pagenumber, pagesize, total, data) {
        return _super.call(this, status, resource, pagenumber, pagesize, total, data) || this;
    }
    // Override this one method
    NPSAPIEventResponse.prototype.currentPage = function () {
        return this.start;
    };
    return NPSAPIEventResponse;
}(NPSAPIResponse));


/***/ }),

/***/ "../src/nps/NPSAPIWorkerManager.ts":
/*!*****************************************!*\
  !*** ../src/nps/NPSAPIWorkerManager.ts ***!
  \*****************************************/
/*! exports provided: NPSAPIWorkerManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPSAPIWorkerManager", function() { return NPSAPIWorkerManager; });
/* harmony import */ var _NPSAPIResponse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NPSAPIResponse */ "../src/nps/NPSAPIResponse.ts");

/**
 * <p>
 *     Creates and manages an NPS API client worker thread. This class handles message passing and receiving
 *     and accepts {@link NPSAPIQuery}s.
 * </p>
 */
var NPSAPIWorkerManager = /** @class */ (function () {
    /**
     * @param {String} clientWorkerScriptSrc The worker script to use
     */
    function NPSAPIWorkerManager(clientWorkerScriptSrc, windowRef) {
        // Setup worker if possible
        if (!windowRef.Worker) {
            throw new Error("Cannot start background API service on worker thread. " +
                "Make sure worker threads are supported on your browser.");
        }
        this.requestCounter = 0;
        this.worker = new Worker(clientWorkerScriptSrc);
        this.callbacks = [];
        // For internal use
        // register event handler for this instance's worker
        /*
         * Form of response:
         * {
         *  status: <String>
         *  id: <Int>
         *  responseData: <JSON>
         * }
         */
        this.worker.onmessage = (function (context) {
            return (function (msg) {
                var data = msg.data;
                context.resolve(data);
            });
        })(this);
    }
    /**
     * Queues a request.
     * @param {NPSAPIQuery} query The query object.
     * @param {function(NPSAPIResponse): void ?} callback An optional callback function
     */
    NPSAPIWorkerManager.prototype.request = function (query, callback) {
        this.worker.postMessage({
            action: "get",
            id: this.requestCounter,
            data: query.strip()
        });
        if (callback) {
            this.callbacks[this.requestCounter] = callback;
        }
        this.requestCounter++;
    };
    /**
     * For internal use. Resolves the given response object.
     * @param response The response object
     */
    NPSAPIWorkerManager.prototype.resolve = function (response) {
        var idx = parseInt(response.id);
        if (this.callbacks[idx]) {
            this.callbacks[parseInt(response.id)](_NPSAPIResponse__WEBPACK_IMPORTED_MODULE_0__["NPSAPIResponse"].from(response));
        }
        else {
            // error?
        }
    };
    return NPSAPIWorkerManager;
}());



/***/ }),

/***/ "../src/nps/NPSDataAccessStrategy.ts":
/*!*******************************************!*\
  !*** ../src/nps/NPSDataAccessStrategy.ts ***!
  \*******************************************/
/*! exports provided: NPSDataAccessStrategyBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPSDataAccessStrategyBuilder", function() { return NPSDataAccessStrategyBuilder; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _NPSDataSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NPSDataSource */ "../src/nps/NPSDataSource.ts");


var NPSDataAccessStrategyBuilder = /** @class */ (function () {
    function NPSDataAccessStrategyBuilder() {
        this.strategy = new DefaultNPSDataAccessStrategy();
    }
    NPSDataAccessStrategyBuilder.prototype.use = function (identifier, config) {
        if (config === void 0) { config = {}; }
        switch (identifier) {
            case "default":
                this.strategy = new DefaultNPSDataAccessStrategy();
                break;
            case "batch":
                this.strategy = new BatchNPSDataAccessStrategy(config);
                break;
            case "filter":
                this.strategy = new FilteredNPSDataAccessStrategy(config, this.strategy);
                break;
            default:
                throw new Error("Unrecognized strategy identifier");
        }
        return this;
    };
    NPSDataAccessStrategyBuilder.prototype.build = function () {
        return this.strategy;
    };
    return NPSDataAccessStrategyBuilder;
}());

var ANPSDataAccessStrategy = /** @class */ (function () {
    function ANPSDataAccessStrategy(config) {
        this.config = config;
    }
    return ANPSDataAccessStrategy;
}());
var FilteredNPSDataAccessStrategy = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](FilteredNPSDataAccessStrategy, _super);
    function FilteredNPSDataAccessStrategy(config, delegate) {
        var _this = _super.call(this, config) || this;
        if ('predicate' in config) {
            _this.predicate = config['predicate'];
        }
        _this.delegate = delegate;
        return _this;
    }
    FilteredNPSDataAccessStrategy.prototype.getData = function (query, dao) {
        var _this = this;
        var dataSource = this.delegate.getData(query, dao);
        var outDataSource = new _NPSDataSource__WEBPACK_IMPORTED_MODULE_1__["default"]();
        dataSource.addOnUpdateHandler(function (snapshot) {
            snapshot.forEach(function (item) {
                if (_this.predicate(item)) {
                    outDataSource.add(item);
                }
            });
            outDataSource.complete();
        });
        return outDataSource;
    };
    return FilteredNPSDataAccessStrategy;
}(ANPSDataAccessStrategy));
var DefaultNPSDataAccessStrategy = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](DefaultNPSDataAccessStrategy, _super);
    function DefaultNPSDataAccessStrategy() {
        return _super.call(this, {}) || this;
    }
    DefaultNPSDataAccessStrategy.prototype.getData = function (query, dao) {
        var dataSource = new _NPSDataSource__WEBPACK_IMPORTED_MODULE_1__["default"]();
        dao.retrieve(query)
            .then(function (results) {
            dataSource.addAll(results);
            dataSource.complete();
        });
        return dataSource;
    };
    return DefaultNPSDataAccessStrategy;
}(ANPSDataAccessStrategy));
var BatchNPSDataAccessStrategy = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](BatchNPSDataAccessStrategy, _super);
    function BatchNPSDataAccessStrategy(config) {
        var _this = _super.call(this, config) || this;
        _this.batches = 10;
        _this.batchSize = 5;
        if ('batchSize' in config) {
            _this.batchSize = config['batchSize'];
        }
        if ('batches' in config) {
            _this.batches = config['batches'];
        }
        if ('queryBuilder' in config) {
            _this.builder = config['queryBuilder'];
        }
        else {
            throw new Error("Batch strategy requires NPSAPIQueryBuilder instance to build paginated queries");
        }
        return _this;
    }
    BatchNPSDataAccessStrategy.prototype.getData = function (query, dao) {
        var _this = this;
        var dataSource = new _NPSDataSource__WEBPACK_IMPORTED_MODULE_1__["default"]();
        (function (dataSource) { return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](_this, void 0, void 0, function () {
            var fetchMore, i, results;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fetchMore = true;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.batches && fetchMore)) return [3 /*break*/, 4];
                        return [4 /*yield*/, dao.retrieve(this.builder.build(), { 'limit': this.batchSize })];
                    case 2:
                        results = _a.sent();
                        if (results.length === 0) {
                            fetchMore = false;
                            return [3 /*break*/, 4];
                        }
                        if (fetchMore) {
                            dataSource.addAll(results);
                        }
                        this.builder.nextPage();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        dataSource.complete();
                        return [2 /*return*/];
                }
            });
        }); })(dataSource);
        return dataSource;
    };
    return BatchNPSDataAccessStrategy;
}(ANPSDataAccessStrategy));


/***/ }),

/***/ "../src/nps/NPSDataSource.ts":
/*!***********************************!*\
  !*** ../src/nps/NPSDataSource.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * A data source object which can be dynamically written to and read from.
 */
var NPSDataSource = /** @class */ (function () {
    function NPSDataSource() {
        this.data = [];
        this.counter = 0;
        this.onUpdateCallbacks = [];
        this.onCompletedCallbacks = [];
    }
    NPSDataSource.prototype[Symbol.iterator] = function () {
        return this.getSnapshot()[Symbol.iterator]();
    };
    NPSDataSource.prototype.addOnCompletedHandler = function (fn) {
        this.onCompletedCallbacks.push(fn);
    };
    NPSDataSource.prototype.complete = function () {
        var _this = this;
        this.onCompletedCallbacks.forEach(function (fn) { return fn(_this.getSnapshotRaw()); });
    };
    /**
     * Adds a callback to the event which is fired every time this instance's data is changed.
     * @param {function(Array<{id:int, data: *}>): void} fn Callback function
     */
    NPSDataSource.prototype.addOnUpdateHandler = function (fn) {
        this.onUpdateCallbacks.push(fn);
    };
    /**
     * Fires the "on update" event.
     */
    NPSDataSource.prototype.fireOnUpdateEvent = function () {
        var _this = this;
        this.onUpdateCallbacks.forEach(function (fn) { return fn(_this.getSnapshotRaw()); });
    };
    /**
     * Wraps a datum with an ID value assigned by this data source.
     * @param item The item to wrap
     * @return {{data: *, id: number}} The wrapped datum
     */
    NPSDataSource.prototype.wrap = function (item) {
        var wrapped = {
            id: this.counter,
            data: item
        };
        this.counter += 1;
        return wrapped;
    };
    /**
     * Unwraps a datum, returning the original contents. This is the inverse of <code>wrap()</code>.
     * @param item The datum to unwrap
     * @return {*} The original item
     */
    NPSDataSource.prototype.unwrap = function (item) {
        var unwrapped = item.data;
        return unwrapped;
    };
    /**
     * Adds an item to this data source.
     * @param item The item to add
     */
    NPSDataSource.prototype.add = function (item) {
        this.data.push(this.wrap(item));
        this.fireOnUpdateEvent();
    };
    /**
     * Adds all items in the given array to this data source.
     * @param {Array} itemsArr The array of items
     */
    NPSDataSource.prototype.addAll = function (itemsArr) {
        var _this = this;
        if (itemsArr && itemsArr.length > 0) {
            this.data = this.data.concat(itemsArr.map(function (item) { return _this.wrap(item); }));
            this.fireOnUpdateEvent();
        }
    };
    /**
     * <p>
     *     Inserts the given item at the given index in this data source. This is useful to control the order in which
     *     items are displayed.
     * </p>
     * @param {int} index The index at which to insert
     * @param item The item to insert
     */
    NPSDataSource.prototype.insert = function (index, item) {
        this.data.splice(index, 0, this.wrap(item));
        this.fireOnUpdateEvent();
    };
    /**
     * Removes the item at the given index.
     * @param {int} index The index at which to remove
     */
    NPSDataSource.prototype.removeAt = function (index) {
    };
    /**
     * <p>
     *     Updates the item at the given index with the given item. This operation is a compound operation of a
     *     removal and an insertion.
     * </p>
     * @param index The index at which to update
     * @param newItem The new item to replace the old one
     */
    NPSDataSource.prototype.update = function (index, newItem) {
        this.removeAt(index);
        this.insert(index, newItem);
        this.fireOnUpdateEvent();
    };
    /**
     * Completely overwrites the data in this data source with data from the given array.
     * @param {Array} itemsArr The array to set as the new data
     */
    NPSDataSource.prototype.set = function (itemsArr) {
        var _this = this;
        this.data = itemsArr.map(function (item) { return _this.wrap(item); });
        this.fireOnUpdateEvent();
    };
    /**
     * <p>
     *     Gets a snapshot of the data in this data source. This is the principal way of reading the data.
     *     This method returns a shallow copy of the data, which is useful for saving previous states.
     * </p>
     * @return {Array} The snapshot of the data
     */
    NPSDataSource.prototype.getSnapshot = function () {
        return this.data.slice(0);
    };
    /**
     * <p>
     *     Gets a raw snapshot, where every datum has been unwrapped. Refer to the {@link wrap}() and {@link unwrap}()
     *     methods for more information on wrapping.
     * </p>
     * @return {Array} The raw snapshot of the data
     */
    NPSDataSource.prototype.getSnapshotRaw = function () {
        var _this = this;
        return this.getSnapshot().map(function (item) { return _this.unwrap(item); });
    };
    /**
     * <p>
     *     Returns a list of operations that, when applied to the given previous snapshot, will result in this
     *     instance's current state.
     * </p>
     * @param {Array} previousSnapshot The previous snapshot to compare against.
     * @return {Array} An array of discrete operations that represent all of the changes made
     */
    NPSDataSource.prototype.getDelta = function (previousSnapshot) {
        var _this = this;
        var ops = [];
        // Two ids can never swap places, because of how the counter is incremented after every addition or
        // insertion, which greatly simplifies computing deltas.
        var thisSnapshot = this.getSnapshot();
        var previousIds = previousSnapshot.map(function (item) { return item.id; });
        // @ts-ignore
        var thisIds = thisSnapshot.map(function (item) { return item.id; });
        previousIds.forEach(function (id, index) {
            if (!thisIds.includes(id)) {
                ops.push({ op: "remove", id: id });
            }
        });
        thisIds.forEach(function (id, index) {
            if (!previousIds.includes(id)) {
                ops.push({ op: "insertAt",
                    index: index,
                    data: _this.unwrap(thisSnapshot[index])
                }); // -1 encodes insert at the beginning
            }
        });
        return ops;
    };
    NPSDataSource.prototype.isEmpty = function () {
        return this.data.length === 0;
    };
    return NPSDataSource;
}());
/* harmony default export */ __webpack_exports__["default"] = (NPSDataSource);


/***/ }),

/***/ "../src/nps/NPSModel.ts":
/*!******************************!*\
  !*** ../src/nps/NPSModel.ts ***!
  \******************************/
/*! exports provided: NPSObjectBuilder, NPSDisplayElementType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPSObjectBuilder", function() { return NPSObjectBuilder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPSDisplayElementType", function() { return NPSDisplayElementType; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NPSAPIQuery */ "../src/nps/NPSAPIQuery.ts");
/* harmony import */ var _NPSResourceDescription__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./NPSResourceDescription */ "../src/nps/NPSResourceDescription.ts");

/**
 * Definitions for JavaScript class representations of data objects provided by the NPS API.
 */


var NPSObjectBuilder = /** @class */ (function () {
    function NPSObjectBuilder() {
        this.config = new _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_1__["NPSAPIQueryOptions"]();
    }
    NPSObjectBuilder.prototype.useResource = function (resource) {
        this.resource = resource;
        return this;
    };
    NPSObjectBuilder.prototype.useData = function (data) {
        this.data = data;
        return this;
    };
    NPSObjectBuilder.prototype.withQueryConfig = function (config) {
        this.config = config;
        return this;
    };
    NPSObjectBuilder.prototype.build = function () {
        return ANPSObject.from(this.resource, this.data, this.config);
    };
    return NPSObjectBuilder;
}());

var NPSDisplayElementType;
(function (NPSDisplayElementType) {
    NPSDisplayElementType[NPSDisplayElementType["SUMMARY"] = 0] = "SUMMARY";
    NPSDisplayElementType[NPSDisplayElementType["PROPERTY"] = 1] = "PROPERTY";
    NPSDisplayElementType[NPSDisplayElementType["META"] = 2] = "META";
    NPSDisplayElementType[NPSDisplayElementType["IMAGE"] = 3] = "IMAGE";
})(NPSDisplayElementType || (NPSDisplayElementType = {}));
/**
 * Abstract base class for models of data objects from the NPS API.
 */
var ANPSObject = /** @class */ (function () {
    /**
     * @param title
     * @param description
     * @param url
     */
    function ANPSObject(title, description, url, resourceName, sourceData, config) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.resourceName = resourceName;
        this.sourceData = sourceData;
        this.config = config;
    }
    ANPSObject.prototype.getDescription = function () {
        return this.description;
    };
    ANPSObject.prototype.getTitle = function () {
        return this.title;
    };
    ANPSObject.prototype.getUrl = function () {
        return this.url;
    };
    ANPSObject.prototype.getResourceDescription = function () {
        if (this.resourceName) {
            return _NPSResourceDescription__WEBPACK_IMPORTED_MODULE_2__["NPSResourceDescriptionBuilder"].get(this.resourceName);
        }
        else {
            throw new Error("Object does not have an associated resource");
        }
    };
    ANPSObject.prototype.applyPredicate = function (pred) {
        if (this.sourceData) {
            return pred(this.sourceData);
        }
        else {
            return false;
        }
    };
    ANPSObject.from = function (resource, data, config) {
        switch (resource) {
            case 'parks':
                return new NPSPark(data, config);
            case 'alerts':
                return new NPSAlert(data, config);
            case 'newsreleases':
                return new NPSNewsRelease(data, config);
            case 'events':
                return new NPSEvent(data, config);
            default:
                throw new Error('Unsupported resource');
        }
    };
    return ANPSObject;
}());
/**
 * Data model of an alert issued by the NPS.
 */
var NPSAlert = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](NPSAlert, _super);
    /**
     * @param {JSON} source Source JSON object from the API to use to construct the object
     */
    function NPSAlert(source, config) {
        var _this = _super.call(this, source.title, source.description, source.url, 'alerts', source, config) || this;
        _this.parkCode = source.parkCode;
        return _this;
    }
    NPSAlert.prototype.getUniqueId = function () {
        return this.parkCode;
    };
    NPSAlert.prototype.getDisplayElementType = function () {
        return NPSDisplayElementType.META;
    };
    NPSAlert.prototype.getDisplayElements = function () {
        return [];
    };
    return NPSAlert;
}(ANPSObject));
/**
 * Data model of a park in the NPS's database.
 */
var NPSPark = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](NPSPark, _super);
    /**
     * @param source Source JSON object from the API to use to construct the object
     */
    function NPSPark(source, config) {
        var _this = _super.call(this, source.fullName, source.description, source.url, 'parks', source, config) || this;
        _this.images = [];
        _this.displayElements = [];
        _this.parkCode = source.parkCode;
        if ('images' in source) {
            source['images'].forEach(function (imgData) {
                _this.images.push(new NPSImage(imgData, _this.config));
            });
        }
        _this.displayElements.push(new NPSDisplayParagraph("Park Summary", _this.getDescription(), _this.getUrl()));
        // if the config has the long text flag set, then we add paragraph elements
        if (_this.config.getLong()) {
            if ('weatherInfo' in source) {
                _this.displayElements.push(new NPSDisplayParagraph("Weather Info", source['weatherInfo'], undefined));
            }
            if ('directionsInfo' in source) {
                _this.displayElements.push(new NPSDisplayParagraph("Directions", source['directionsInfo'], source['directionsUrl']));
            }
        }
        // Next, add all images to the display elements list
        _this.images.forEach(function (img) { return _this.displayElements.push(img); });
        return _this;
    }
    NPSPark.prototype.getUniqueId = function () {
        return this.parkCode;
    };
    NPSPark.prototype.getDisplayElementType = function () {
        return NPSDisplayElementType.SUMMARY;
    };
    NPSPark.prototype.getDisplayElements = function () {
        return this.displayElements;
    };
    return NPSPark;
}(ANPSObject));
/**
 *
 */
var NPSNewsRelease = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](NPSNewsRelease, _super);
    function NPSNewsRelease(source, config) {
        return _super.call(this, source.title, source.abstract, source.url, 'newsreleases', source, config) || this;
    }
    NPSNewsRelease.prototype.getUniqueId = function () {
        throw new Error("Not implemented");
    };
    NPSNewsRelease.prototype.getDisplayElementType = function () {
        return NPSDisplayElementType.SUMMARY;
    };
    NPSNewsRelease.prototype.getDisplayElements = function () {
        return [];
    };
    return NPSNewsRelease;
}(ANPSObject));
var NPSImage = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](NPSImage, _super);
    function NPSImage(source, config) {
        var _this = _super.call(this, source.title + " (Credit: " + source.credit + ")", source.caption, source.url, undefined, source, config) || this;
        _this.id = source.id;
        return _this;
    }
    NPSImage.prototype.getUniqueId = function () {
        return this.id;
    };
    NPSImage.prototype.getDisplayElementType = function () {
        return NPSDisplayElementType.IMAGE;
    };
    NPSImage.prototype.getDisplayElements = function () {
        return [];
    };
    return NPSImage;
}(ANPSObject));
var NPSDisplayParagraph = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](NPSDisplayParagraph, _super);
    function NPSDisplayParagraph(title, description, url) {
        return _super.call(this, title, description, url, undefined, undefined, new _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_1__["NPSAPIQueryOptions"]) || this;
    }
    NPSDisplayParagraph.prototype.getUniqueId = function () {
        throw new Error("Unsupported Operation: getUniqueId on NPSDisplayParagraph");
    };
    NPSDisplayParagraph.prototype.getDisplayElementType = function () {
        return NPSDisplayElementType.SUMMARY;
    };
    NPSDisplayParagraph.prototype.getDisplayElements = function () {
        return [];
    };
    return NPSDisplayParagraph;
}(ANPSObject));
var NPSDisplayProperty = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](NPSDisplayProperty, _super);
    function NPSDisplayProperty(title, description) {
        return _super.call(this, title, description, undefined, undefined, undefined, new _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_1__["NPSAPIQueryOptions"]) || this;
    }
    NPSDisplayProperty.prototype.getUniqueId = function () {
        throw new Error("Unsupported Operation: getUniqueId on NPSDisplayParagraph");
    };
    NPSDisplayProperty.prototype.getDisplayElementType = function () {
        return NPSDisplayElementType.PROPERTY;
    };
    NPSDisplayProperty.prototype.getDisplayElements = function () {
        return [];
    };
    return NPSDisplayProperty;
}(ANPSObject));
var NPSEvent = /** @class */ (function (_super) {
    tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"](NPSEvent, _super);
    function NPSEvent(source, config) {
        var _this = _super.call(this, source.title, source.description, source.url, 'events', source, config) || this;
        _this.id = source.id;
        _this.displayElements = [];
        if (_this.config.getLong()) {
            var isfree = _this.sourceData['isfree'];
            if (isfree) {
                _this.displayElements.push(new NPSDisplayProperty('Free?', isfree ? 'Yes' : 'No'));
            }
            else {
                _this.displayElements.push(new NPSDisplayProperty('Fee Info:', _this.sourceData['feeinfo']));
            }
            if (_this.sourceData['contacttelephonenumber'] !== '') {
                _this.displayElements.push(new NPSDisplayProperty('Contact:', _this.sourceData['contacttelephonenumber']));
            }
            if (_this.sourceData['regresinfo'] !== '') {
                _this.displayElements.push(new NPSDisplayProperty('Registration Info:', _this.sourceData['regresinfo']));
            }
            _this.displayElements.push(new NPSDisplayParagraph('Event Summary', _this.getDescription(), _this.getUrl()));
            console.log(_this.sourceData);
            if ('images' in _this.sourceData) {
                _this.sourceData['images'].forEach(function (imgData) {
                    _this.displayElements.push(new NPSImage(imgData, _this.config));
                });
            }
        }
        return _this;
    }
    NPSEvent.prototype.getDisplayElementType = function () {
        return NPSDisplayElementType.SUMMARY;
    };
    NPSEvent.prototype.getDisplayElements = function () {
        return this.displayElements;
    };
    NPSEvent.prototype.getUniqueId = function () {
        return this.id;
    };
    return NPSEvent;
}(ANPSObject));
// TODO: Write model classes for the rest of the resources


/***/ }),

/***/ "../src/nps/NPSModelDAO.ts":
/*!*********************************!*\
  !*** ../src/nps/NPSModelDAO.ts ***!
  \*********************************/
/*! exports provided: NPSModelDAO */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPSModelDAO", function() { return NPSModelDAO; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _NPSModel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NPSModel */ "../src/nps/NPSModel.ts");


/**
 * Data Access Object implementation for the NPS API.
 */
var NPSModelDAO = /** @class */ (function () {
    function NPSModelDAO(workerMgr) {
        this.workerMgr = workerMgr;
    }
    /**
     * Asynchronously fetch {@link ANPSObject} objects using the given {@link NPSAPIQuery} object.
     * @param {NPSAPIQuery} query The query to execute
     * @param paramsOverride
     * @param {function(boolean, Array<ANPSObject>): void ?} callback Optional callback that is called when the data
     *                                                     is obtained. The first parameter is a boolean value that is
     *                                                     true if and only if the operation succeeded.
     * @return {Array<ANPSObject>} Array of model objects retrieved. It is empty if there are no results
     * @throws Error if the response could not be parsed
     */
    NPSModelDAO.prototype.retrieve = function (query, paramsOverride, callback) {
        if (paramsOverride === void 0) { paramsOverride = {}; }
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function () {
            var response, resource, data, out, objBuilder;
            return tslib__WEBPACK_IMPORTED_MODULE_0__["__generator"](this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, query.execute(this.workerMgr, paramsOverride)];
                    case 1:
                        response = _a.sent();
                        if (!response.ok()) {
                            if (callback) {
                                callback(response.ok(), null);
                            }
                            // @ts-ignore
                            //throw new Error(response.getData());
                            return [2 /*return*/, []];
                        }
                        resource = response.getResource();
                        data = response.getData();
                        out = [];
                        if (response.totalPages() == 0) {
                            return [2 /*return*/, []];
                        }
                        objBuilder = new _NPSModel__WEBPACK_IMPORTED_MODULE_1__["NPSObjectBuilder"]();
                        if (response.pagesLeft() > 0) {
                            data.forEach(function (obj) {
                                out.push(objBuilder.useResource(resource)
                                    .useData(obj)
                                    .withQueryConfig(query.getConfig())
                                    .build());
                            });
                        }
                        if (callback) {
                            callback(response.ok(), out);
                        }
                        return [2 /*return*/, out];
                }
            });
        });
    };
    return NPSModelDAO;
}());



/***/ }),

/***/ "../src/nps/NPSResourceDescription.ts":
/*!********************************************!*\
  !*** ../src/nps/NPSResourceDescription.ts ***!
  \********************************************/
/*! exports provided: NPSResourceDescriptionBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NPSResourceDescriptionBuilder", function() { return NPSResourceDescriptionBuilder; });
var NPSResourceDescriptionBuilder = /** @class */ (function () {
    function NPSResourceDescriptionBuilder() {
    }
    NPSResourceDescriptionBuilder.get = function (resourceName) {
        switch (resourceName) {
            case 'parks':
                return new NPSResourceDescription(['National Park', 'National Monument', 'Recreation Area']);
            case 'alerts':
                return new NPSResourceDescription(['Danger', 'Caution', 'Information', 'Park Closure']);
            case 'events':
                return new NPSResourceDescription([]);
        }
    };
    return NPSResourceDescriptionBuilder;
}());

var NPSResourceDescription = /** @class */ (function () {
    function NPSResourceDescription(designations) {
        this.designations = designations;
    }
    NPSResourceDescription.prototype.getDesignations = function () {
        return this.designations;
    };
    return NPSResourceDescription;
}());


/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ../src/main.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/Sam/Projects/NPSKiosk/nps-kiosk-app/src/main.ts */"../src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es5.js.map
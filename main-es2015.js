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
class ADataViewComponent {
    constructor(route, router, apiClient, storeService) {
        this.route = route;
        this.router = router;
        this.apiClient = apiClient;
        this.storeService = storeService;
    }
    ngOnInit() {
        this.receivedObject = this.storeService.pop(); // Will be set to undefined if none exists, which is intended
        this.paramMap$ = this.route.paramMap;
        this.paramMapSubscription = this.paramMap$.subscribe(x => this.onParamMapChange(x), err => console.error("error in paramMap observable"), () => console.log("paramMap observable completed"));
        this.fetchData();
    }
    ngOnDestroy() {
        this.paramMapSubscription.unsubscribe();
    }
    store(obj) {
        this.storeService.push(obj);
    }
}


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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../nps/NPSAPIQueryBuilder */ "../src/nps/NPSAPIQueryBuilder.ts");
/* harmony import */ var _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../nps/NPSDataAccessStrategy */ "../src/nps/NPSDataAccessStrategy.ts");
/* harmony import */ var _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/npsapiclient.service */ "../src/app/services/npsapiclient.service.ts");
/* harmony import */ var _services_object_store_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/object-store.service */ "../src/app/services/object-store.service.ts");
/* harmony import */ var _DataViewComponent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../DataViewComponent */ "../src/app/DataViewComponent.ts");








let AlertPageComponent = class AlertPageComponent extends _DataViewComponent__WEBPACK_IMPORTED_MODULE_7__["ADataViewComponent"] {
    constructor(route, router, apiClient, storeService) {
        super(route, router, apiClient, storeService);
        this.route = route;
        this.router = router;
        this.apiClient = apiClient;
        this.storeService = storeService;
        this.alerts = [];
    }
    ngOnInit() {
        this.parkCode = this.route.snapshot.paramMap.get('parkCode');
        if (!this.receivedObject) {
            let queryBuilder = new _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_3__["default"]()
                .addParkCode(this.parkCode)
                .longText(false)
                .setLimit(5)
                .from('parks');
            let strategy = new _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_4__["NPSDataAccessStrategyBuilder"]()
                .use('batch', {
                queryBuilder: queryBuilder
            })
                .build();
            let parkSource = this.apiClient.retrieve(queryBuilder.build(), strategy);
            parkSource.addOnUpdateHandler((snapshot) => {
                if (snapshot.length < 1) {
                    this.router.navigateByUrl('/page-not-found');
                    return;
                }
                this.receivedObject = snapshot[0];
            });
        }
        else {
            this.store(this.receivedObject);
        }
        super.ngOnInit();
    }
    onParamMapChange(newParamMap) {
        let parkCode = newParamMap.get('parkCode');
        if (parkCode != this.parkCode) {
            this.fetchData();
        }
    }
    fetchData() {
        let queryBuilder = new _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_3__["default"]()
            .from('alerts')
            .longText(false);
        if (this.parkCode !== undefined) {
            queryBuilder.addParkCode(this.parkCode);
        }
        let strategy = new _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_4__["NPSDataAccessStrategyBuilder"]()
            .use('default')
            .build();
        let alertsSource = this.apiClient.retrieve(queryBuilder.build(), strategy);
        alertsSource.addOnUpdateHandler((snapshot) => {
            this.alerts = snapshot;
        });
        alertsSource.addOnCompletedHandler((snapshot) => {
            if (snapshot.length == 0) {
                this.noResults = true;
            }
        });
    }
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _park_page_park_page_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./park-page/park-page.component */ "../src/app/park-page/park-page.component.ts");
/* harmony import */ var _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home-page/home-page.component */ "../src/app/home-page/home-page.component.ts");
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ "../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./search-page/search-page.component */ "../src/app/search-page/search-page.component.ts");
/* harmony import */ var _alert_page_alert_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./alert-page/alert-page.component */ "../src/app/alert-page/alert-page.component.ts");
/* harmony import */ var _event_page_event_page_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./event-page/event-page.component */ "../src/app/event-page/event-page.component.ts");










const routes = [
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
let AppRoutingModule = class AppRoutingModule {
};
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() { }
    ngOnInit() {
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(/*! raw-loader!./app.component.html */ "../node_modules/raw-loader/index.js!../src/app/app.component.html"),
        styles: [__webpack_require__(/*! ./app.component.css */ "../src/app/app.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], AppComponent);



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
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_window_ref_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/window-ref.service */ "../src/app/services/window-ref.service.ts");
/* harmony import */ var _services_npsmodel_daoprovider_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/npsmodel-daoprovider.service */ "../src/app/services/npsmodel-daoprovider.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "../node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _park_page_park_page_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./park-page/park-page.component */ "../src/app/park-page/park-page.component.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "../src/app/app-routing.module.ts");
/* harmony import */ var _home_page_home_page_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./home-page/home-page.component */ "../src/app/home-page/home-page.component.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "../src/app/app.component.ts");
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ "../src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var _search_page_search_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./search-page/search-page.component */ "../src/app/search-page/search-page.component.ts");
/* harmony import */ var _alert_page_alert_page_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./alert-page/alert-page.component */ "../src/app/alert-page/alert-page.component.ts");
/* harmony import */ var _services_object_store_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/object-store.service */ "../src/app/services/object-store.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ "../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _pipes_keep_html_pipe__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pipes/keep-html.pipe */ "../src/app/pipes/keep-html.pipe.ts");
/* harmony import */ var _event_page_event_page_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./event-page/event-page.component */ "../src/app/event-page/event-page.component.ts");

















let AppModule = class AppModule {
};
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _DataViewComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DataViewComponent */ "../src/app/DataViewComponent.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/npsapiclient.service */ "../src/app/services/npsapiclient.service.ts");
/* harmony import */ var _nps_NPSModel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../nps/NPSModel */ "../src/nps/NPSModel.ts");
/* harmony import */ var _services_object_store_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/object-store.service */ "../src/app/services/object-store.service.ts");







let EventPageComponent = class EventPageComponent extends _DataViewComponent__WEBPACK_IMPORTED_MODULE_2__["ADataViewComponent"] {
    constructor(route, router, apiClient, storeService) {
        super(route, router, apiClient, storeService);
        this.route = route;
        this.router = router;
        this.apiClient = apiClient;
        this.storeService = storeService;
        this.DISPLAY_PROPERTY = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_5__["NPSDisplayElementType"].PROPERTY;
        this.DISPLAY_PARAGRAPH = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_5__["NPSDisplayElementType"].SUMMARY;
        this.DISPLAY_IMAGE = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_5__["NPSDisplayElementType"].IMAGE;
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.receivedObject === undefined) {
            this.router.navigateByUrl('/page-not-found');
        }
    }
    fetchData() {
    }
    onParamMapChange(newParamMap) {
        let parkCode = newParamMap.get('parkCode');
        if (parkCode !== this.parkCode) {
            this.parkCode = parkCode;
            this.fetchData();
        }
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/npsapiclient.service */ "../src/app/services/npsapiclient.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../nps/NPSAPIQueryBuilder */ "../src/nps/NPSAPIQueryBuilder.ts");
/* harmony import */ var _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../nps/NPSDataAccessStrategy */ "../src/nps/NPSDataAccessStrategy.ts");






let HomePageComponent = class HomePageComponent {
    constructor(npsapiClientService, router) {
        this.npsapiClientService = npsapiClientService;
        this.router = router;
        this.title = 'nps-kiosk-app';
        this.resource = "parks";
        this.queryString = "";
        this.data = [];
    }
    ngOnInit() {
    }
    callAPI() {
        let qb = new _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_4__["default"]();
        qb.from(this.resource);
        if (this.queryString !== "") {
            qb.setQueryString(this.queryString);
        }
        let strategy = (new _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__["NPSDataAccessStrategyBuilder"]())
            .use('default')
            .use('filter', {
            predicate: datum => {
                return datum.getUrl() !== "";
            }
        })
            .build();
        let dataSource = this.npsapiClientService.retrieve(qb.build(), strategy);
        dataSource.addOnUpdateHandler(snapshot => this.data = snapshot);
    }
    goToLearnPage(datum) {
        this.router.navigateByUrl("");
    }
};
HomePageComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home-page',
        template: __webpack_require__(/*! raw-loader!./home-page.component.html */ "../node_modules/raw-loader/index.js!../src/app/home-page/home-page.component.html"),
        styles: [__webpack_require__(/*! ./home-page.component.css */ "../src/app/home-page/home-page.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_2__["NPSAPIClientService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], HomePageComponent);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");


let PageNotFoundComponent = class PageNotFoundComponent {
    constructor() { }
    ngOnInit() {
    }
};
PageNotFoundComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-page-not-found',
        template: __webpack_require__(/*! raw-loader!./page-not-found.component.html */ "../node_modules/raw-loader/index.js!../src/app/page-not-found/page-not-found.component.html"),
        styles: [__webpack_require__(/*! ./page-not-found.component.css */ "../src/app/page-not-found/page-not-found.component.css")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], PageNotFoundComponent);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../nps/NPSAPIQueryBuilder */ "../src/nps/NPSAPIQueryBuilder.ts");
/* harmony import */ var _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/npsapiclient.service */ "../src/app/services/npsapiclient.service.ts");
/* harmony import */ var _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../nps/NPSDataAccessStrategy */ "../src/nps/NPSDataAccessStrategy.ts");
/* harmony import */ var _nps_NPSModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../nps/NPSModel */ "../src/nps/NPSModel.ts");
/* harmony import */ var _services_object_store_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../services/object-store.service */ "../src/app/services/object-store.service.ts");
/* harmony import */ var _DataViewComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../DataViewComponent */ "../src/app/DataViewComponent.ts");









let ParkPageComponent = class ParkPageComponent extends _DataViewComponent__WEBPACK_IMPORTED_MODULE_8__["ADataViewComponent"] {
    constructor(route, router, apiClient, storeService) {
        super(route, router, apiClient, storeService);
        this.route = route;
        this.router = router;
        this.apiClient = apiClient;
        this.storeService = storeService;
        // NPS Display Element Type bindings for use in the view
        this.DISPLAY_IMAGE = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_6__["NPSDisplayElementType"].IMAGE;
        this.DISPLAY_SUMMARY = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_6__["NPSDisplayElementType"].SUMMARY;
        this.DISPLAY_META = _nps_NPSModel__WEBPACK_IMPORTED_MODULE_6__["NPSDisplayElementType"].META;
        this.park = undefined;
        this.parkAlerts = [];
        this.parkEvents = [];
    }
    onParamMapChange(newMap) {
        let parkCode = newMap.get('parkCode');
        if (parkCode != this.parkCode) {
            this.parkCode = parkCode;
            this.fetchData();
        }
    }
    fetchData() {
        let queryBuilder = new _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_3__["default"]();
        let strategy = new _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__["NPSDataAccessStrategyBuilder"]()
            .use('default')
            .build();
        if (!this.receivedObject) {
            let query = queryBuilder
                .from('parks')
                .includeField('images')
                .addParkCode(this.parkCode)
                .longText(true)
                .build();
            let parkSource = this.apiClient.retrieve(query, strategy);
            parkSource.addOnUpdateHandler((snapshot) => {
                if (snapshot.length < 1) {
                    //this.router.navigateByUrl('/page-not-found');
                }
                this.park = snapshot[0];
                this.store(this.park);
            });
        }
        else {
            this.park = this.receivedObject;
        }
        let query = queryBuilder
            .reset()
            .from('alerts')
            .addParkCode(this.parkCode)
            .longText(false)
            .setLimit(5)
            .build();
        let alertsSource = this.apiClient.retrieve(query, strategy);
        alertsSource.addOnUpdateHandler((snapshot) => {
            this.parkAlerts = snapshot;
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
        let eventsSource = this.apiClient.retrieve(query, strategy);
        eventsSource.addOnUpdateHandler((snapshot) => {
            console.log(snapshot);
            this.parkEvents = snapshot;
        });
    }
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "../node_modules/@angular/platform-browser/fesm2015/platform-browser.js");



let EscapeHtmlPipe = class EscapeHtmlPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
};
EscapeHtmlPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({ name: 'keepHtml', pure: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"]])
], EscapeHtmlPipe);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _services_npsapiclient_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/npsapiclient.service */ "../src/app/services/npsapiclient.service.ts");
/* harmony import */ var _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../nps/NPSAPIQueryBuilder */ "../src/nps/NPSAPIQueryBuilder.ts");
/* harmony import */ var _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../nps/NPSDataAccessStrategy */ "../src/nps/NPSDataAccessStrategy.ts");
/* harmony import */ var _services_object_store_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/object-store.service */ "../src/app/services/object-store.service.ts");
/* harmony import */ var _nps_Constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../nps/Constants */ "../src/nps/Constants.ts");
/* harmony import */ var _DataViewComponent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../DataViewComponent */ "../src/app/DataViewComponent.ts");









let SearchPageComponent = class SearchPageComponent extends _DataViewComponent__WEBPACK_IMPORTED_MODULE_8__["ADataViewComponent"] {
    constructor(route, router, apiClient, storeService) {
        super(route, router, apiClient, storeService);
        this.route = route;
        this.router = router;
        this.apiClient = apiClient;
        this.storeService = storeService;
        this.datumRouterLinkGenerator = (resource) => {
            return (datum) => {
                return ['/', resource, datum.getUniqueId()];
            };
        };
        // Variables for state filter
        this.stateCodes = _nps_Constants__WEBPACK_IMPORTED_MODULE_7__["STATE_CODES"];
        // Defaults
        this.resource = 'alerts';
        this.query = undefined;
        this.waiting = false;
        this.noResults = false;
        this.stateFilters = [];
    }
    onParamMapChange(newMap) {
        let query = newMap.get('query');
        let resource = newMap.get('resource');
        console.log("PARAMS UPDATED", query, resource);
        if (!this.waiting) {
            this.query = query;
            this.resource = resource;
            this.fetchData();
        }
    }
    onSubmit() {
        this.router.navigate([
            '/search',
            this.resource,
            this.query
        ]);
        /*
        if (!this.waiting) {
          this.fetchData();
        }*/
    }
    fetchData() {
        this.waiting = true;
        this.noResults = false;
        this.data = [];
        this.datumRouterLink = this.datumRouterLinkGenerator(this.resource);
        this.storeService.pop();
        let queryBuilder = new _nps_NPSAPIQueryBuilder__WEBPACK_IMPORTED_MODULE_4__["default"]()
            .from(this.resource)
            .setQueryString(this.query)
            .longText(false)
            .addAllStateCodes(this.stateFilters);
        let strategyBuilder = new _nps_NPSDataAccessStrategy__WEBPACK_IMPORTED_MODULE_5__["NPSDataAccessStrategyBuilder"]()
            .use('batch', {
            'queryBuilder': queryBuilder
        });
        let dataSource = this.apiClient.retrieve(queryBuilder.build(), strategyBuilder.build());
        dataSource.addOnUpdateHandler((snapshot) => {
            if (snapshot.length > 0) {
                this.waiting = false;
            }
            this.data = snapshot;
        });
        dataSource.addOnCompletedHandler((snapshot) => {
            this.noResults = snapshot.length == 0;
            this.waiting = false;
        });
    }
    addStateFilter(stateCode) {
        this.stateFilters.push(stateCode);
        this.fetchData();
        console.log("Attempt to add state", stateCode);
    }
    removeStateFilter(stateCode) {
        this.stateFilters = this.stateFilters.reduce((acc, val) => {
            if (val !== stateCode) {
                acc.push(val);
            }
            return acc;
        }, []);
        this.fetchData();
        console.log("Attempt to remove state", stateCode);
    }
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _nps_NPSAPIWorkerManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../nps/NPSAPIWorkerManager */ "../src/nps/NPSAPIWorkerManager.ts");
/* harmony import */ var _window_ref_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./window-ref.service */ "../src/app/services/window-ref.service.ts");
/* harmony import */ var _npsmodel_daoprovider_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./npsmodel-daoprovider.service */ "../src/app/services/npsmodel-daoprovider.service.ts");





let NPSAPIClientService = class NPSAPIClientService {
    constructor(windowRef, daoProvider) {
        this.windowRef = windowRef;
        this.daoProvider = daoProvider;
        if (windowRef.nativeWindow) {
            this.workerMgr = new _nps_NPSAPIWorkerManager__WEBPACK_IMPORTED_MODULE_2__["NPSAPIWorkerManager"]('assets/js/worker.js', // This is a singleton instance, so no duplicate workers are created
            windowRef.nativeWindow);
        }
        this.dao = daoProvider.getDAOBuilder()(this.workerMgr);
    }
    retrieve(query, strategy) {
        return strategy.getData(query, this.dao);
    }
};
NPSAPIClientService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_window_ref_service__WEBPACK_IMPORTED_MODULE_3__["WindowRefService"], _npsmodel_daoprovider_service__WEBPACK_IMPORTED_MODULE_4__["NPSModelDAOProviderService"]])
], NPSAPIClientService);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _nps_NPSModelDAO__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../nps/NPSModelDAO */ "../src/nps/NPSModelDAO.ts");



let NPSModelDAOProviderService = class NPSModelDAOProviderService {
    constructor() { }
    getDAOBuilder() {
        return (workerMgr) => new _nps_NPSModelDAO__WEBPACK_IMPORTED_MODULE_2__["NPSModelDAO"](workerMgr);
    }
};
NPSModelDAOProviderService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], NPSModelDAOProviderService);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");


let ObjectStoreService = class ObjectStoreService {
    constructor() {
        this.stack = [];
    }
    isEmpty() {
        return this.stack.length == 0;
    }
    clear() {
        this.stack = [];
    }
    push(obj) {
        this.stack.push(obj);
    }
    pop() {
        return this.stack.pop();
    }
};
ObjectStoreService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
], ObjectStoreService);



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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");


function _window() {
    // return the global native browser window object
    return window;
}
let WindowRefService = class WindowRefService {
    get nativeWindow() {
        return _window();
    }
};
WindowRefService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], WindowRefService);



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
const environment = {
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
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "../src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "../src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


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
const STATE_CODES = [
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
class NPSAPIQuery {
    /**
     * @param resource The API resource to query
     * @param params The query parameters
     * @constructor
     */
    constructor(resource, params, options) {
        this.resource = resource;
        this.params = params;
        this.options = options;
    }
    /**
     * Strips down this query object into a simple object with just resource and params fields.
     * @return {{resource: *, params: *}}
     */
    strip() {
        return {
            resource: this.resource,
            params: this.params
        };
    }
    /**
     * Executes this query by sending a request to the given API worker manager.
     * @param {NPSAPIWorkerManager} workerMgr The worker manager
     * @return {Promise<NPSAPIResponse>} The response object
     */
    execute(workerMgr, paramsOverride = {}) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            for (let field in paramsOverride) {
                this.params[field] = paramsOverride[field]; // Set override parameters
            }
            let response = yield (new Promise((resolve) => {
                workerMgr.request(this, response => resolve(response));
            }));
            // @ts-ignore
            return response;
        });
    }
    getConfig() {
        return this.options;
    }
}
class NPSAPIQueryOptions {
    constructor() {
        this.long = false;
    }
    setLong(long) {
        this.long = long;
        return this;
    }
    getLong() {
        return this.long;
    }
}


/***/ }),

/***/ "../src/nps/NPSAPIQueryBuilder.ts":
/*!****************************************!*\
  !*** ../src/nps/NPSAPIQueryBuilder.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NPSAPIQueryBuilder; });
/* harmony import */ var _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NPSAPIQuery */ "../src/nps/NPSAPIQuery.ts");

/**
 * Factory for {@link NPSAPIQuery} objects that can be executed on the NPS API.
 */
class NPSAPIQueryBuilder {
    constructor() {
        this.arrayToCommaDelimitedString = (items) => {
            let out = "";
            for (let i = 0; i < items.length; i++) {
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
    reset() {
        this.parkCodes = [];
        this.stateCodes = [];
        this.queryString = undefined;
        this.limit = 50;
        this.start = 0;
        this.options = new _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_0__["NPSAPIQueryOptions"]();
        this.fields = [];
        this.params = {};
        return this;
    }
    longText(long) {
        this.options.setLong(long);
        return this;
    }
    /**
     * Adds all park codes in the given array to the query.
     * @param {Array<String>} parkCodeArr The array of park codes to add
     * @return {NPSAPIQueryBuilder} This instance
     */
    addAllParkCodes(parkCodeArr) {
        parkCodeArr.forEach((parkCode) => {
            if (!this.parkCodes.includes(parkCode)) {
                this.parkCodes.push(parkCode);
            }
        });
        return this;
    }
    /**
     * Adds a single park code to the query.
     * @param {String} parkCode The park code
     * @return {NPSAPIQueryBuilder} This instance
     */
    addParkCode(parkCode) {
        if (!this.parkCodes.includes(parkCode)) {
            this.parkCodes.push(parkCode);
        }
        return this;
    }
    addAllStateCodes(stateCodeArr) {
        stateCodeArr.forEach((parkCode) => {
            if (!this.stateCodes.includes(parkCode)) {
                this.stateCodes.push(parkCode);
            }
        });
        return this;
    }
    /**
     * Sets the query string.
     * @param {String} queryString The query string
     * @return {NPSAPIQueryBuilder} This instance
     */
    setQueryString(queryString) {
        this.queryString = queryString;
        return this;
    }
    /**
     * Advances the query by one page. Makes it extremely easy to chain queries to obtain multiple pages.
     * @example
     * let qb = new NPSAPIQueryBuilder();
     * let response1 = qb.from("parks").build().execute();
     * let response2 = qb.nextPage().build().execute();
     *
     * @return {NPSAPIQueryBuilder} This instance
     */
    nextPage() {
        this.start += this.limit;
        return this;
    }
    /**
     * Sets the limit.
     * @param {int} limit The limit
     * @return {NPSAPIQueryBuilder} This instance
     * @throws {Error} if the limit is less than 0
     */
    setLimit(limit) {
        if (limit < 0) {
            throw new Error("Limit cannot be less than 0");
        }
        this.limit = limit;
        return this;
    }
    /**
     * Sets the start index.
     * @param {int} start The start index
     * @return {NPSAPIQueryBuilder} This instance
     * @throws {Error} if the start index is less than 0
     */
    setStart(start) {
        if (start < 0) {
            throw new Error("Start cannot be less than 0");
        }
        this.start = start;
        return this;
    }
    /**
     * Sets the resource from which to retrieve data.
     * @param {String} resource The resource string
     * @return {NPSAPIQueryBuilder} This instance
     */
    from(resource) {
        this.resource = resource;
        return this;
    }
    set(name, value) {
        this.params[name] = value;
        return this;
    }
    /**
     * Builds a new query object based on the current configuration.
     * @return {NPSAPIQuery} The query object
     */
    build() {
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
    }
    includeField(field) {
        this.fields.push(field);
        return this;
    }
}


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
/**
 * Model of a response received from the NPS API.
 */
class NPSAPIResponse {
    /**
     * @param status The status of the response
     * @param resource The resource from which the response was retrieved
     * @param start The start index of the response
     * @param limit The limit of the response
     * @param total The total number of elements in the resource
     * @param data The data of the response
     */
    constructor(status, resource, start, limit, total, data) {
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
    totalPages() {
        return Math.ceil(this.total / this.limit);
    }
    /**
     * Gets the current page based on the query parameters
     * @return {number}
     */
    currentPage() {
        return this.start / this.limit;
    }
    /**
     * Gets the number of pages left based on the query parameters
     * @return {number}
     */
    pagesLeft() {
        return this.totalPages() - this.currentPage();
    }
    /**
     * Checks whether the response has an OK status.
     * @return {boolean}
     */
    ok() {
        return this.status === 'ok';
    }
    /**
     * <p>
     *     Gets the data of this response. This method should only be expected to return a defined value if this.ok()
     *     is true.
     * </p>
     * @return {Object} The data of this response
     */
    getData() {
        return this.data;
    }
    /**
     * Gets the resource that was accessed.
     * @return {String}
     */
    getResource() {
        return this.resource;
    }
    /**
     * Constructs an {@link NPSAPIResponse} object from raw data.
     * @param raw A response object as received from an {@link NPSAPIWorkerManager}.
     * @return {NPSAPIResponse} The new object
     * @throws Error if parsing the data failed
     */
    static from(responseObj) {
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
    }
}
class NPSAPIEventResponse extends NPSAPIResponse {
    constructor(status, resource, pagenumber, pagesize, total, data) {
        super(status, resource, pagenumber, pagesize, total, data);
    }
    // Override this one method
    currentPage() {
        return this.start;
    }
}


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
class NPSAPIWorkerManager {
    /**
     * @param {String} clientWorkerScriptSrc The worker script to use
     */
    constructor(clientWorkerScriptSrc, windowRef) {
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
                let data = msg.data;
                context.resolve(data);
            });
        })(this);
    }
    /**
     * Queues a request.
     * @param {NPSAPIQuery} query The query object.
     * @param {function(NPSAPIResponse): void ?} callback An optional callback function
     */
    request(query, callback) {
        this.worker.postMessage({
            action: "get",
            id: this.requestCounter,
            data: query.strip()
        });
        if (callback) {
            this.callbacks[this.requestCounter] = callback;
        }
        this.requestCounter++;
    }
    /**
     * For internal use. Resolves the given response object.
     * @param response The response object
     */
    resolve(response) {
        let idx = parseInt(response.id);
        if (this.callbacks[idx]) {
            this.callbacks[parseInt(response.id)](_NPSAPIResponse__WEBPACK_IMPORTED_MODULE_0__["NPSAPIResponse"].from(response));
        }
        else {
            // error?
        }
    }
}


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


class NPSDataAccessStrategyBuilder {
    constructor() {
        this.strategy = new DefaultNPSDataAccessStrategy();
    }
    use(identifier, config = {}) {
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
    }
    build() {
        return this.strategy;
    }
}
class ANPSDataAccessStrategy {
    constructor(config) {
        this.config = config;
    }
}
class FilteredNPSDataAccessStrategy extends ANPSDataAccessStrategy {
    constructor(config, delegate) {
        super(config);
        if ('predicate' in config) {
            this.predicate = config['predicate'];
        }
        this.delegate = delegate;
    }
    getData(query, dao) {
        const dataSource = this.delegate.getData(query, dao);
        const outDataSource = new _NPSDataSource__WEBPACK_IMPORTED_MODULE_1__["default"]();
        dataSource.addOnUpdateHandler(snapshot => {
            snapshot.forEach(item => {
                if (this.predicate(item)) {
                    outDataSource.add(item);
                }
            });
            outDataSource.complete();
        });
        return outDataSource;
    }
}
class DefaultNPSDataAccessStrategy extends ANPSDataAccessStrategy {
    constructor() {
        super({});
    }
    getData(query, dao) {
        const dataSource = new _NPSDataSource__WEBPACK_IMPORTED_MODULE_1__["default"]();
        dao.retrieve(query)
            .then((results) => {
            dataSource.addAll(results);
            dataSource.complete();
        });
        return dataSource;
    }
}
class BatchNPSDataAccessStrategy extends ANPSDataAccessStrategy {
    constructor(config) {
        super(config);
        this.batches = 10;
        this.batchSize = 5;
        if ('batchSize' in config) {
            this.batchSize = config['batchSize'];
        }
        if ('batches' in config) {
            this.batches = config['batches'];
        }
        if ('queryBuilder' in config) {
            this.builder = config['queryBuilder'];
        }
        else {
            throw new Error("Batch strategy requires NPSAPIQueryBuilder instance to build paginated queries");
        }
    }
    getData(query, dao) {
        const dataSource = new _NPSDataSource__WEBPACK_IMPORTED_MODULE_1__["default"]();
        ((dataSource) => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let fetchMore = true;
            for (let i = 0; i < this.batches && fetchMore; i++) {
                let results = yield dao.retrieve(this.builder.build(), { 'limit': this.batchSize });
                if (results.length === 0) {
                    fetchMore = false;
                    break;
                }
                if (fetchMore) {
                    dataSource.addAll(results);
                }
                this.builder.nextPage();
            }
            dataSource.complete();
        }))(dataSource);
        return dataSource;
    }
}


/***/ }),

/***/ "../src/nps/NPSDataSource.ts":
/*!***********************************!*\
  !*** ../src/nps/NPSDataSource.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NPSDataSource; });
/**
 * A data source object which can be dynamically written to and read from.
 */
class NPSDataSource {
    constructor() {
        this.data = [];
        this.counter = 0;
        this.onUpdateCallbacks = [];
        this.onCompletedCallbacks = [];
    }
    [Symbol.iterator]() {
        return this.getSnapshot()[Symbol.iterator]();
    }
    addOnCompletedHandler(fn) {
        this.onCompletedCallbacks.push(fn);
    }
    complete() {
        this.onCompletedCallbacks.forEach(fn => fn(this.getSnapshotRaw()));
    }
    /**
     * Adds a callback to the event which is fired every time this instance's data is changed.
     * @param {function(Array<{id:int, data: *}>): void} fn Callback function
     */
    addOnUpdateHandler(fn) {
        this.onUpdateCallbacks.push(fn);
    }
    /**
     * Fires the "on update" event.
     */
    fireOnUpdateEvent() {
        this.onUpdateCallbacks.forEach(fn => fn(this.getSnapshotRaw()));
    }
    /**
     * Wraps a datum with an ID value assigned by this data source.
     * @param item The item to wrap
     * @return {{data: *, id: number}} The wrapped datum
     */
    wrap(item) {
        let wrapped = {
            id: this.counter,
            data: item
        };
        this.counter += 1;
        return wrapped;
    }
    /**
     * Unwraps a datum, returning the original contents. This is the inverse of <code>wrap()</code>.
     * @param item The datum to unwrap
     * @return {*} The original item
     */
    unwrap(item) {
        let unwrapped = item.data;
        return unwrapped;
    }
    /**
     * Adds an item to this data source.
     * @param item The item to add
     */
    add(item) {
        this.data.push(this.wrap(item));
        this.fireOnUpdateEvent();
    }
    /**
     * Adds all items in the given array to this data source.
     * @param {Array} itemsArr The array of items
     */
    addAll(itemsArr) {
        if (itemsArr && itemsArr.length > 0) {
            this.data = this.data.concat(itemsArr.map(item => this.wrap(item)));
            this.fireOnUpdateEvent();
        }
    }
    /**
     * <p>
     *     Inserts the given item at the given index in this data source. This is useful to control the order in which
     *     items are displayed.
     * </p>
     * @param {int} index The index at which to insert
     * @param item The item to insert
     */
    insert(index, item) {
        this.data.splice(index, 0, this.wrap(item));
        this.fireOnUpdateEvent();
    }
    /**
     * Removes the item at the given index.
     * @param {int} index The index at which to remove
     */
    removeAt(index) {
    }
    /**
     * <p>
     *     Updates the item at the given index with the given item. This operation is a compound operation of a
     *     removal and an insertion.
     * </p>
     * @param index The index at which to update
     * @param newItem The new item to replace the old one
     */
    update(index, newItem) {
        this.removeAt(index);
        this.insert(index, newItem);
        this.fireOnUpdateEvent();
    }
    /**
     * Completely overwrites the data in this data source with data from the given array.
     * @param {Array} itemsArr The array to set as the new data
     */
    set(itemsArr) {
        this.data = itemsArr.map(item => this.wrap(item));
        this.fireOnUpdateEvent();
    }
    /**
     * <p>
     *     Gets a snapshot of the data in this data source. This is the principal way of reading the data.
     *     This method returns a shallow copy of the data, which is useful for saving previous states.
     * </p>
     * @return {Array} The snapshot of the data
     */
    getSnapshot() {
        return this.data.slice(0);
    }
    /**
     * <p>
     *     Gets a raw snapshot, where every datum has been unwrapped. Refer to the {@link wrap}() and {@link unwrap}()
     *     methods for more information on wrapping.
     * </p>
     * @return {Array} The raw snapshot of the data
     */
    getSnapshotRaw() {
        return this.getSnapshot().map(item => this.unwrap(item));
    }
    /**
     * <p>
     *     Returns a list of operations that, when applied to the given previous snapshot, will result in this
     *     instance's current state.
     * </p>
     * @param {Array} previousSnapshot The previous snapshot to compare against.
     * @return {Array} An array of discrete operations that represent all of the changes made
     */
    getDelta(previousSnapshot) {
        let ops = [];
        // Two ids can never swap places, because of how the counter is incremented after every addition or
        // insertion, which greatly simplifies computing deltas.
        let thisSnapshot = this.getSnapshot();
        let previousIds = previousSnapshot.map(item => item.id);
        // @ts-ignore
        let thisIds = thisSnapshot.map(item => item.id);
        previousIds.forEach((id, index) => {
            if (!thisIds.includes(id)) {
                ops.push({ op: "remove", id: id });
            }
        });
        thisIds.forEach((id, index) => {
            if (!previousIds.includes(id)) {
                ops.push({ op: "insertAt",
                    index: index,
                    data: this.unwrap(thisSnapshot[index])
                }); // -1 encodes insert at the beginning
            }
        });
        return ops;
    }
    isEmpty() {
        return this.data.length === 0;
    }
}


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
/* harmony import */ var _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NPSAPIQuery */ "../src/nps/NPSAPIQuery.ts");
/* harmony import */ var _NPSResourceDescription__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NPSResourceDescription */ "../src/nps/NPSResourceDescription.ts");
/**
 * Definitions for JavaScript class representations of data objects provided by the NPS API.
 */


class NPSObjectBuilder {
    constructor() {
        this.config = new _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_0__["NPSAPIQueryOptions"]();
    }
    useResource(resource) {
        this.resource = resource;
        return this;
    }
    useData(data) {
        this.data = data;
        return this;
    }
    withQueryConfig(config) {
        this.config = config;
        return this;
    }
    build() {
        return ANPSObject.from(this.resource, this.data, this.config);
    }
}
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
class ANPSObject {
    /**
     * @param title
     * @param description
     * @param url
     */
    constructor(title, description, url, resourceName, sourceData, config) {
        this.title = title;
        this.description = description;
        this.url = url;
        this.resourceName = resourceName;
        this.sourceData = sourceData;
        this.config = config;
    }
    getDescription() {
        return this.description;
    }
    getTitle() {
        return this.title;
    }
    getUrl() {
        return this.url;
    }
    getResourceDescription() {
        if (this.resourceName) {
            return _NPSResourceDescription__WEBPACK_IMPORTED_MODULE_1__["NPSResourceDescriptionBuilder"].get(this.resourceName);
        }
        else {
            throw new Error("Object does not have an associated resource");
        }
    }
    applyPredicate(pred) {
        if (this.sourceData) {
            return pred(this.sourceData);
        }
        else {
            return false;
        }
    }
    static from(resource, data, config) {
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
    }
}
/**
 * Data model of an alert issued by the NPS.
 */
class NPSAlert extends ANPSObject {
    /**
     * @param {JSON} source Source JSON object from the API to use to construct the object
     */
    constructor(source, config) {
        super(source.title, source.description, source.url, 'alerts', source, config);
        this.parkCode = source.parkCode;
    }
    getUniqueId() {
        return this.parkCode;
    }
    getDisplayElementType() {
        return NPSDisplayElementType.META;
    }
    getDisplayElements() {
        return [];
    }
}
/**
 * Data model of a park in the NPS's database.
 */
class NPSPark extends ANPSObject {
    /**
     * @param source Source JSON object from the API to use to construct the object
     */
    constructor(source, config) {
        super(source.fullName, source.description, source.url, 'parks', source, config);
        this.images = [];
        this.displayElements = [];
        this.parkCode = source.parkCode;
        if ('images' in source) {
            source['images'].forEach(imgData => {
                this.images.push(new NPSImage(imgData, this.config));
            });
        }
        this.displayElements.push(new NPSDisplayParagraph("Park Summary", this.getDescription(), this.getUrl()));
        // if the config has the long text flag set, then we add paragraph elements
        if (this.config.getLong()) {
            if ('weatherInfo' in source) {
                this.displayElements.push(new NPSDisplayParagraph("Weather Info", source['weatherInfo'], undefined));
            }
            if ('directionsInfo' in source) {
                this.displayElements.push(new NPSDisplayParagraph("Directions", source['directionsInfo'], source['directionsUrl']));
            }
        }
        // Next, add all images to the display elements list
        this.images.forEach(img => this.displayElements.push(img));
    }
    getUniqueId() {
        return this.parkCode;
    }
    getDisplayElementType() {
        return NPSDisplayElementType.SUMMARY;
    }
    getDisplayElements() {
        return this.displayElements;
    }
}
/**
 *
 */
class NPSNewsRelease extends ANPSObject {
    constructor(source, config) {
        super(source.title, source.abstract, source.url, 'newsreleases', source, config);
    }
    getUniqueId() {
        throw new Error("Not implemented");
    }
    getDisplayElementType() {
        return NPSDisplayElementType.SUMMARY;
    }
    getDisplayElements() {
        return [];
    }
}
class NPSImage extends ANPSObject {
    constructor(source, config) {
        super(source.title + " (Credit: " + source.credit + ")", source.caption, source.url, undefined, source, config);
        this.id = source.id;
    }
    getUniqueId() {
        return this.id;
    }
    getDisplayElementType() {
        return NPSDisplayElementType.IMAGE;
    }
    getDisplayElements() {
        return [];
    }
}
class NPSDisplayParagraph extends ANPSObject {
    constructor(title, description, url) {
        super(title, description, url, undefined, undefined, new _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_0__["NPSAPIQueryOptions"]);
    }
    getUniqueId() {
        throw new Error("Unsupported Operation: getUniqueId on NPSDisplayParagraph");
    }
    getDisplayElementType() {
        return NPSDisplayElementType.SUMMARY;
    }
    getDisplayElements() {
        return [];
    }
}
class NPSDisplayProperty extends ANPSObject {
    constructor(title, description) {
        super(title, description, undefined, undefined, undefined, new _NPSAPIQuery__WEBPACK_IMPORTED_MODULE_0__["NPSAPIQueryOptions"]);
    }
    getUniqueId() {
        throw new Error("Unsupported Operation: getUniqueId on NPSDisplayParagraph");
    }
    getDisplayElementType() {
        return NPSDisplayElementType.PROPERTY;
    }
    getDisplayElements() {
        return [];
    }
}
class NPSEvent extends ANPSObject {
    constructor(source, config) {
        super(source.title, source.description, source.url, 'events', source, config);
        this.id = source.id;
        this.displayElements = [];
        if (this.config.getLong()) {
            let isfree = this.sourceData['isfree'];
            if (isfree) {
                this.displayElements.push(new NPSDisplayProperty('Free?', isfree ? 'Yes' : 'No'));
            }
            else {
                this.displayElements.push(new NPSDisplayProperty('Fee Info:', this.sourceData['feeinfo']));
            }
            if (this.sourceData['contacttelephonenumber'] !== '') {
                this.displayElements.push(new NPSDisplayProperty('Contact:', this.sourceData['contacttelephonenumber']));
            }
            if (this.sourceData['regresinfo'] !== '') {
                this.displayElements.push(new NPSDisplayProperty('Registration Info:', this.sourceData['regresinfo']));
            }
            this.displayElements.push(new NPSDisplayParagraph('Event Summary', this.getDescription(), this.getUrl()));
            console.log(this.sourceData);
            if ('images' in this.sourceData) {
                this.sourceData['images'].forEach(imgData => {
                    this.displayElements.push(new NPSImage(imgData, this.config));
                });
            }
        }
    }
    getDisplayElementType() {
        return NPSDisplayElementType.SUMMARY;
    }
    getDisplayElements() {
        return this.displayElements;
    }
    getUniqueId() {
        return this.id;
    }
}
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
class NPSModelDAO {
    constructor(workerMgr) {
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
    retrieve(query, paramsOverride = {}, callback) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let response = yield query.execute(this.workerMgr, paramsOverride);
            if (!response.ok()) {
                if (callback) {
                    callback(response.ok(), null);
                }
                // @ts-ignore
                //throw new Error(response.getData());
                return [];
            }
            let resource = response.getResource();
            let data = response.getData(); // This data is the actual API response in its entirety
            let out = [];
            if (response.totalPages() == 0) {
                return [];
            }
            let objBuilder = new _NPSModel__WEBPACK_IMPORTED_MODULE_1__["NPSObjectBuilder"]();
            if (response.pagesLeft() > 0) {
                data.forEach((obj) => {
                    out.push(objBuilder.useResource(resource)
                        .useData(obj)
                        .withQueryConfig(query.getConfig())
                        .build());
                });
            }
            if (callback) {
                callback(response.ok(), out);
            }
            return out;
        });
    }
}


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
class NPSResourceDescriptionBuilder {
    static get(resourceName) {
        switch (resourceName) {
            case 'parks':
                return new NPSResourceDescription(['National Park', 'National Monument', 'Recreation Area']);
            case 'alerts':
                return new NPSResourceDescription(['Danger', 'Caution', 'Information', 'Park Closure']);
            case 'events':
                return new NPSResourceDescription([]);
        }
    }
}
class NPSResourceDescription {
    constructor(designations) {
        this.designations = designations;
    }
    getDesignations() {
        return this.designations;
    }
}


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
//# sourceMappingURL=main-es2015.js.map
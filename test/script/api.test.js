/**
 * Unit tests for the API interface
 */

const SCRIPT_PREFIX = "../../script";

let api = require(`${SCRIPT_PREFIX}/api.js`);
let model = require(`${SCRIPT_PREFIX}/model.js`);

// NPSAPIClient tests

let apiClient = new api.NPSAPIClient("TEST");

test("Test validParams with empty object", () => {
   expect(apiClient.validParams({})).toBe(false);
});

test("Test validParams with object that only contains an api key", () => {
   expect(apiClient.validParams({
      "api_key":"<api_key>"
   })).toBe(true);
});

test("Test validParams with object that contains fields but does not contain an api key", () => {
   expect(apiClient.validParams({
      "parkCode":"acad"
   })).toBe(false);
});

test("Test validParams with object that contains api key and other fields", () => {
   expect(apiClient.validParams({
      "api_key":"<api_key>",
      "parkCode":"acad"
   })).toBe(true);
});


// NPSAPIClientInterface tests

// TODO: Construct mock data
function NPSAPIClientMock() {

   this.__proto__ = new api.NPSAPIClient("TEST");

   /**
    * Validates a URL parameters object for use with the NPS API.
    * @param {Object} params The parameters object to check.
    * @return {boolean} Whether the parameters object is valid.
    */
   this.validParams = function (params) {
      return "api_key" in params;
   };

   /**
    * Obtains the alerts issued by the NPS.
    * @param params
    * @return {Promise} A Promise that, when resolved, returns a JSON object with data
    */
   this.alerts = function (params) {
      if (!this.validParams(params)) throw new Error("Parameters object is invalid");

      return Promise.resolve({
         "data" :
             {
               "total": "451",
               "data": [
                  {
                     "title": "Spring 2019 Prescribed Fire Burning Notice",
                     "id": "00AC35B5-1DD8-B71B-0BC107516326A536",
                     "description": "Lake Roosevelt National Recreation Area may implement the following controlled burns and pile burns during the spring of 2019.",
                     "category": "Information",
                     "url": "https://www.nps.gov/laro/learn/news/lake-roosevelt-national-recreation-area-spring-2019-prescribed-fire-burning-notice.htm",
                     "parkCode": "laro"
                  },
                  {
                     "title": "No Recreational Vehicle (RV) Parking",
                     "id": "016CC9DB-1DD8-B71B-0B116D5332CAE19A",
                     "description": "Our parking lot cannot accommodate RV's or trailers. Please call the visitor center for options as we have a nearby lot for trailers to detach and are happy to help visitors in RV's plan their way to the park. RV's should NOT pull into the parking lot.",
                     "category": "Information",
                     "url": "",
                     "parkCode": "wefa"
                  }
               ],
               "limit": "1",
               "start": "1"
            }
      });
   };

   /**
    * Gets park info.
    * @param {String} parkCode The four-letter park code
    * @return {Promise} A Promise that, when resolved, returns a JSON object with data
    */
   this.parkInfo = function (parkCode, params) {
      if (!this.validParams(params)) throw new Error("Parameters object is invalid");

      return {};
   };

   /**
    * Gets all parks.
    * @return {Promise} A Promise that, when resolved returns a JSON object with data of all the parks
    */
   this.parks = function (params) {
      if (!this.validParams(params)) throw new Error("Parameters object is invalid");

      return {};
   };
}

let clientMock = new NPSAPIClientMock();
let clientInterface = new api.NPSAPIClientInterface(clientMock);

test("", (done) => {
   clientInterface.getAllAlerts(new api.NPSAPIQueryBuilder("api_key")).then((response) => {
      expect(response).toEqual([new model.NPSAlert({
         "total": "451",
         "data": [
            {
               "title": "Spring 2019 Prescribed Fire Burning Notice",
               "id": "00AC35B5-1DD8-B71B-0BC107516326A536",
               "description": "Lake Roosevelt National Recreation Area may implement the following controlled burns and pile burns during the spring of 2019.",
               "category": "Information",
               "url": "https://www.nps.gov/laro/learn/news/lake-roosevelt-national-recreation-area-spring-2019-prescribed-fire-burning-notice.htm",
               "parkCode": "laro"
            },
            {
               "title": "No Recreational Vehicle (RV) Parking",
               "id": "016CC9DB-1DD8-B71B-0B116D5332CAE19A",
               "description": "Our parking lot cannot accommodate RV's or trailers. Please call the visitor center for options as we have a nearby lot for trailers to detach and are happy to help visitors in RV's plan their way to the park. RV's should NOT pull into the parking lot.",
               "category": "Information",
               "url": "",
               "parkCode": "wefa"
            }
         ],
         "limit": "1",
         "start": "1"
      })]);
   });
});

// NPSAPIQueryBuilder tests


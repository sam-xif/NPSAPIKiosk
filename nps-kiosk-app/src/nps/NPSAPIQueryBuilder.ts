import {NPSAPIQuery, NPSAPIQueryOptions} from "./NPSAPIQuery";

/**
 * Factory for {@link NPSAPIQuery} objects that can be executed on the NPS API.
 */
export default class NPSAPIQueryBuilder {
  private parkCodes : Array<string>;
  private stateCodes : Array<string>;
  private queryString : string;
  private limit : number;
  private start : number;
  private resource : string;
  private options : NPSAPIQueryOptions;
  private fields : Array<string>;

  constructor() {
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
    this.options = new NPSAPIQueryOptions();
    this.fields = [];
    return this;
  }

  longText(long: boolean) {
    this.options.setLong(true);
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

  /**
   * Builds a new query object based on the current configuration.
   * @return {NPSAPIQuery} The query object
   */
  build() {
    let params = {};

    if (this.parkCodes.length > 0) {
      params["parkCode"] = this.arrayToCommaDelimitedString(this.parkCodes);
    }

    if (this.stateCodes.length > 0) {
      params["stateCode"] = this.arrayToCommaDelimitedString(this.stateCodes);
    }

    if (this.fields.length > 0) {
      params["fields"] = this.arrayToCommaDelimitedString(this.fields);
    }

    params["limit"] = this.limit;
    params["start"] = this.start;

    if (this.queryString) {
      params["q"] = this.queryString;
    }

    return new NPSAPIQuery(this.resource, params, this.options);
  }

  private arrayToCommaDelimitedString = (items) => {
    let out = "";
    for (let i = 0; i < items.length; i++) {
        if (i < items.length - 1) {
          out += items[i] + ",";
        } else {
          out += items[i];
        }
      }
    return out;
  };

  includeField(field) {
    this.fields.push(field);
    return this;
  }
}

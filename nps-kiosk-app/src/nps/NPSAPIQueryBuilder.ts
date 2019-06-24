import {INPSAPIQuery, NPSAPIQuery, NPSAPIQueryOptions} from "./NPSAPIQuery";

/**
 * Factory for {@link NPSAPIQuery} objects that can be executed on the NPS API.
 */
export class NPSAPIQueryBuilder {
  private parkCodes : Array<string>;
  private stateCodes : Array<string>;
  private queryString : string;
  private limit : number;
  private start : number;
  private resource : string;
  private options : NPSAPIQueryOptions;
  private fields : Array<string>;
  private params: object;

  constructor() {
    this.reset();
  }

  /**
   * Resets this query builder to its initial state.
   * @return This instance, with its fields reset
   */
  reset() {
    this.parkCodes = [];
    this.stateCodes = [];
    this.queryString = undefined;
    this.limit = 50;
    this.start = 0;
    this.options = new NPSAPIQueryOptions();
    this.fields = [];
    this.params = {};
    return this;
  }

  /**
   * Whether the queries produced by this builder should produce objects in long form.
   * Refer to {@link NPSAPIQueryOptions} for more information.
   * @param long Whether the objects should be in long form
   */
  useLongForm(long: boolean) {
    this.options.setLong(long);
    return this;
  }

  /**
   * Whether the queries produced by this builder should produce objects in search-result form
   * @param searchResultForm
   */
  useSearchResultForm(searchResultForm: boolean) {
    this.options.setUseSearchResultForm(searchResultForm);
    return this;
  }

  /**
   * Adds all park codes in the given array to the query.
   * @param parkCodeArr The array of park codes to add
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
   * @param parkCode The park code
   */
  addParkCode(parkCode) {
    if (!this.parkCodes.includes(parkCode)) {
      this.parkCodes.push(parkCode);
    }
    return this;
  }

  /**
   * <p>Adds all state codes in the given array to the query. Refer to {@link STATE_CODES}
   * in Constants.ts for the list of state codes.</p>
   * @param stateCodeArr The array of state codes to add
   */
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
   * @param queryString The query string
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
   */
  nextPage() {
    this.start += this.limit;
    return this;
  }

  /**
   * Sets the limit.
   * @param limit The limit
   * @throws {Error} if the limit is less than 0
   */
  setLimit(limit: number) {
    if (limit < 0) {
      throw new Error("Limit cannot be less than 0");
    }

    this.limit = limit;
    return this;
  }

  /**
   * Sets the start index.
   * @param start The start index
   * @throws {Error} if the start index is less than 0
   */
  setStart(start: number) {
    if (start < 0) {
      throw new Error("Start cannot be less than 0");
    }
    this.start = start;
    return this;
  }

  /**
   * Sets the resource from which to retrieve data.
   * @param resource The resource string
   */
  from(resource: string) {
    this.resource = resource;
    return this;
  }

  /**
   * Manually adds a new <code>(name,value)</code> pair to the parameters object.
   * @param name The name of the parameter
   * @param value The value of the parameter
   */
  set(name, value) {
    this.params[name] = value;
    return this;
  }

  /**
   * Builds a new query object based on the current configuration.
   * @return The query object
   */
  build(): INPSAPIQuery {
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

    return new NPSAPIQuery(this.resource, this.params, this.options);
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

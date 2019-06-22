
export default interface INPSAPIResponse {
  totalPages() : number;
  currentPage() : number;
  pagesLeft() : number;
  ok() : boolean;
  getData() : Array<object>;
  getResource() : string;
}

/**
 * Model of a response received from the NPS API.
 */
export class NPSAPIResponse implements INPSAPIResponse {
  private readonly status : string;
  private readonly resource : string;
  private readonly start : number;
  private readonly limit : number;
  private readonly total : number;
  private readonly data : Array<object>;

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
  getData() : Array<object> {
    return this.data;
  }

  /**
   * Gets the resource that was accessed.
   * @return {String}
   */
  getResource() {
    console.log(this.resource);
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

    return new NPSAPIResponse(responseObj.status,
      responseObj.reqResource,
      responseObj.data.start,
      responseObj.data.limit,
      responseObj.data.total,
      responseObj.data.data);
  }
}

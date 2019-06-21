import INPSAPIWorkerManager from './NPSAPIWorkerManager';
import INPSAPIResponse from './NPSAPIResponse';

export default interface INPSAPIQuery {
  execute(workerMgr : INPSAPIWorkerManager) : Promise<INPSAPIResponse>;
  getConfig(): NPSAPIQueryOptions
}

/**
 * Represents an NPS API query that can be executed.
 */
export class NPSAPIQuery implements INPSAPIQuery {
  private readonly resource : string;
  private readonly params: object;
  private readonly options: NPSAPIQueryOptions;

  /**
   * @param resource The API resource to query
   * @param params The query parameters
   * @constructor
   */
  constructor(resource: string, params: object, options: NPSAPIQueryOptions) {
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
  async execute(workerMgr : INPSAPIWorkerManager) : Promise<INPSAPIResponse> {
    let response = await (new Promise((resolve) => {
      workerMgr.request(this, response => resolve(response));
    }));

    // @ts-ignore
    return response;
  }

  getConfig() {
    return this.options;
  }
}

export class NPSAPIQueryOptions {
  private long: boolean = false;

  constructor() {}

  setLong(long: boolean): NPSAPIQueryOptions {
    this.long = long;
    return this;
  }

  getLong(): boolean {
    return this.long;
  }
}

import {INPSAPIWorkerManager} from './NPSAPIWorkerManager';
import {INPSAPIResponse} from './NPSAPIResponse';

/**
 * Represents a query to the NPS API.
 */
export interface INPSAPIQuery {
  /**
   * Executes this query on the given worker manager, with any parameter overrides as needed.
   * @param workerMgr The worker manager to execute on
   * @param paramsOverride Object of parameters to override
   * @return A promise containing the response
   */
  execute(workerMgr : INPSAPIWorkerManager, paramsOverride: object): Promise<INPSAPIResponse>;

  /**
   * Gets the query configuration object of this query.
   * @return The query configuration
   */
  getConfig(): NPSAPIQueryOptions
}

/**
 * Implementation of a query to the NPS API.
 */
export class NPSAPIQuery implements INPSAPIQuery {
  private readonly resource : string;
  private readonly params: object;
  private readonly options: NPSAPIQueryOptions;

  /**
   * @param resource The API resource to query
   * @param params The query parameters
   * @param options The query options to use
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

  async execute(workerMgr: INPSAPIWorkerManager, paramsOverride: object = {}) : Promise<INPSAPIResponse> {
    for (let field in paramsOverride) {
      this.params[field] = paramsOverride[field]; // Set override parameters
    }

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

/**
 * Class which contains query configuration options and flags.
 */
export class NPSAPIQueryOptions {
  private long: boolean = false;
  private useSearchResultForm: boolean = false;

  constructor() {}

  /**
   * Sets whether the response objects should be long-form (i.e. keep their sub-data).
   * @param long Whether to return objects in long form
   */
  setLong(long: boolean): NPSAPIQueryOptions {
    this.long = long;
    return this;
  }

  /**
   * Retrieves the value for whether response objects should be long form
   */
  getLong(): boolean {
    return this.long;
  }

  /**
   * <p>Sets whether the response objects should be in search-result form. Each object defines its own
   * search result format.</p>
   * @param useSearchResultForm
   */
  setUseSearchResultForm(useSearchResultForm: boolean) {
    this.useSearchResultForm = useSearchResultForm;
  }

  /**
   * Retrieves the value for whether response objects should be in search-result form
   */
  getUseSearchResultForm(): boolean {
    return this.useSearchResultForm;
  }
}

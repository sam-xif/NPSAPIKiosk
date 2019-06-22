import INPSAPIQuery from "./NPSAPIQuery";
import INPSAPIWorkerManager from "./NPSAPIWorkerManager";
import INPSAPIResponse from "./NPSAPIResponse";
import {INPSObject, NPSObjectBuilder} from "./NPSModel";

export interface INPSModelDAO {
  retrieve(query: INPSAPIQuery, callback?: any): Promise<Array<INPSObject>>;
}

/**
 * Data Access Object implementation for the NPS API.
 */
export class NPSModelDAO implements INPSModelDAO {
  private readonly workerMgr: INPSAPIWorkerManager;

  constructor(workerMgr) {
    this.workerMgr = workerMgr;
  }

  /**
   * Asynchronously fetch {@link ANPSObject} objects using the given {@link NPSAPIQuery} object.
   * @param {NPSAPIQuery} query The query to execute
   * @param {function(boolean, Array<ANPSObject>): void ?} callback Optional callback that is called when the data
   *                                                     is obtained. The first parameter is a boolean value that is
   *                                                     true if and only if the operation succeeded.
   * @return {Array<ANPSObject>} Array of model objects retrieved. It is empty if there are no results
   * @throws Error if the response could not be parsed
   */
  public async retrieve(query: INPSAPIQuery, callback?: any)
    : Promise<Array<INPSObject>> {
    let response: INPSAPIResponse = await query.execute(this.workerMgr);

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

    let objBuilder = new NPSObjectBuilder();
    if (response.pagesLeft() > 0) {
      data.forEach((obj) => {
        out.push(
          objBuilder.useResource(resource)
            .useData(obj)
            .build()
        );
      });
    }

    if (callback) {
      callback(response.ok(), out);
    }

    return out;
  }
}

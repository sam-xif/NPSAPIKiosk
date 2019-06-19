/**
 * Definitions for JavaScript class representations of data objects provided by the NPS API.
 */
import INPSAPIQuery from "./NPSAPIQuery";
import INPSAPIWorkerManager from "./NPSAPIWorkerManager";
import INPSAPIResponse from "./NPSAPIResponse";

export interface INPSModel {
  getTitle(): string;
  getDescription(): string;
  getUrl(): string;
  // TODO:  getImages(): Array<NPSImage>
}

export interface INPSModelDAO {
  retrieve(query: INPSAPIQuery, callback?: any): Promise<Array<INPSModel>>;
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
   * Asynchronously fetch {@link NPSModel} objects using the given {@link NPSAPIQuery} object.
   * @param {NPSAPIQuery} query The query to execute
   * @param {function(boolean, Array<NPSModel>): void ?} callback Optional callback that is called when the data
   *                                                     is obtained. The first parameter is a boolean value that is
   *                                                     true if and only if the operation succeeded.
   * @return {Array<NPSModel>|null} Array of model objects, or null if there are no items to be retrieved
   * @throws Error if the response could not be parsed
   */
  public async retrieve(query: INPSAPIQuery, callback?: any)
      : Promise<Array<INPSModel>> {
    let response: INPSAPIResponse = await query.execute(this.workerMgr);

    if (!response.ok()) {
      if (callback) {
        callback(response.ok(), null);
      }

      // @ts-ignore
      throw new Error(response.getData());
    }

    let resource = response.getResource();
    let data = response.getData(); // This data is the actual API response in its entirety

    let out = [];

    let models = {
      'parks' : NPSPark,
      'alerts' : NPSAlert,
      'newsreleases' : NPSNewsRelease
    };

    if (response.totalPages() == 0) {
      return null;
    }

    if (response.pagesLeft() > 0) {
      data.forEach((obj) => {
        if (!models[resource]) {
          throw new Error("Unsupported resource");
        }

        out.push(new models[resource](obj));
      });
    }

    if (callback) {
      callback(response.ok(), out);
    }

    return out;
  }
}

/**
 * Abstract base class for models of data objects from the NPS API.
 */
abstract class NPSModel implements INPSModel {
  private readonly title: string;
  private readonly description: string;
  private readonly url: string;

  /**
   * @param title
   * @param description
   * @param url
   */
  protected constructor(title: string, description: string, url: string) {
    this.title = title;
    this.description = description;
    this.url = url;
  }

  getDescription(): string {
    return this.description;
  }

  getTitle(): string {
    return this.title;
  }

  getUrl(): string {
    return this.url;
  }

  // /**
  //  * Gets a description of this NPS data object.
  //  * @return {String} A description
  //  */
  // getDescription() {
  //   //throw new Error("'getDescription()' must be implemented on a subclass of NPSModel");
  //   return this.description;
  // }
  //
  // /**
  //  * Gets a URL that links to more information about this NPS data object.
  //  * @return {String} A URL
  //  */
  // getUrl() {
  //   return this.url;
  // }
  //
  // /**
  //  * Gets a title that is fitting for this NPS data object.
  //  * @return {String} A title
  //  */
  // getTitle() {
  //   return this.title;
  // }
}

/**
 * Data model of an alert issued by the NPS.
 */
class NPSAlert extends NPSModel {
  /**
   * @param {JSON} source Source JSON object from the API to use to construct the object
   */
  constructor(source) {
    super(source.title, source.description, source.url);
  }
}

/**
 * Data model of a park in the NPS's database.
 */
class NPSPark extends NPSModel {
  /**
   * @param source Source JSON object from the API to use to construct the object
   */
  constructor(source) {
    super(source.fullName, source.description, source.url);
  }

  /**
   * Checks whether this park instances has images associated with it.
   * @return {boolean}
   */
  hasImages() {
    //return this.images !== undefined;
  }
}

/**
 *
 */
class NPSNewsRelease extends NPSModel {
  constructor(source) {
    super(source.title, source.abstract, source.url);
  }
}


// TODO: Write model classes for the rest of the resources



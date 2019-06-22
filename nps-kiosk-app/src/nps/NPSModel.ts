/**
 * Definitions for JavaScript class representations of data objects provided by the NPS API.
 */
import {NPSAPIQueryOptions} from "./NPSAPIQuery";

export class NPSObjectBuilder {
  private data: object;
  private resource: string;
  private config: NPSAPIQueryOptions;

  constructor() {
    this.config = new NPSAPIQueryOptions();
  }

  useResource(resource: string): NPSObjectBuilder {
    this.resource = resource;
    return this;
  }

  useData(data): NPSObjectBuilder {
    this.data = data;
    return this;
  }

  withQueryConfig(config: NPSAPIQueryOptions) {
    this.config = config;
    return this;
  }

  build() : INPSObject {
    return ANPSObject.from(this.resource, this.data, this.config);
  }
}

export interface INPSObject {
  // These getters are commonly used properties for easy access
  getTitle(): string;
  getDescription(): string;
  getUrl(): string;

  getDisplayElements(): Array<INPSDisplayElement>;

  /**
   * Gets a unique string associated with this object
   */
  getUniqueId(): string;
}

export enum NPSDisplayElementType {
  PARAGRAPH,
  IMAGE
}

export interface INPSDisplayElement extends INPSObject {
  getDisplayElementType(): NPSDisplayElementType;
}

/**
 * Abstract base class for models of data objects from the NPS API.
 */
abstract class ANPSObject implements INPSDisplayElement {
  private readonly title: string;
  private readonly description: string;
  private readonly url: string;
  protected readonly config: NPSAPIQueryOptions;

  /**
   * @param title
   * @param description
   * @param url
   */
  protected constructor(title: string, description: string, url: string, config: NPSAPIQueryOptions) {
    this.title = title;
    this.description = description;
    this.url = url;
    this.config = config;
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

  abstract getDisplayElements(): Array<INPSDisplayElement>;
  abstract getDisplayElementType(): NPSDisplayElementType;
  abstract getUniqueId(): string;

  static from(resource: string, data: object, config: NPSAPIQueryOptions): INPSObject {
    switch (resource) {
      case 'parks':
        return new NPSPark(data, config);
      case 'alerts':
        return new NPSAlert(data, config);
      case 'newsreleases':
        return new NPSNewsRelease(data, config);
      default:
        throw new Error('Unsupported resource');
    }
  }
}

/**
 * Data model of an alert issued by the NPS.
 */
class NPSAlert extends ANPSObject {
  private readonly id: string;
  /**
   * @param {JSON} source Source JSON object from the API to use to construct the object
   */
  constructor(source, config: NPSAPIQueryOptions) {
    super(source.title, source.description, source.url, config);
    this.id = source.id;
  }

  getUniqueId(): string {
    return this.id;
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.PARAGRAPH;
  }

  getDisplayElements(): Array<INPSDisplayElement> {
    return [];
  }
}

/**
 * Data model of a park in the NPS's database.
 */
class NPSPark extends ANPSObject {
  private readonly images: Array<INPSDisplayElement>;
  private readonly displayElements: Array<INPSDisplayElement>;
  private readonly parkCode: string;

  /**
   * @param source Source JSON object from the API to use to construct the object
   */
  constructor(source, config: NPSAPIQueryOptions) {
    super(source.fullName, source.description, source.url, config);
    this.images = [];
    this.displayElements = [];
    this.parkCode = source.parkCode;

    if ('images' in source) {
      source['images'].forEach(imgData => {
        this.images.push(new NPSImage(imgData, this.config));
      })
    }

    // First, if the config has the long text flag set, then we add paragraph elements
    this.displayElements.push(new NPSDisplayParagraph("Park Summary", this.getDescription(), this.getUrl()));

    if ('weatherInfo' in source) {
      this.displayElements.push(new NPSDisplayParagraph("Weather Info",
        source['weatherInfo'],
        undefined));
    }
    if ('directionsInfo' in source) {
      this.displayElements.push(new NPSDisplayParagraph("Directions",
        source['directionsInfo'],
        source['directionsUrl']));
    }

    // Next, add all images to the display elements list
    this.images.forEach(img => this.displayElements.push(img));
  }

  getUniqueId(): string {
    return this.parkCode;
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.PARAGRAPH;
  }

  getDisplayElements(): Array<INPSDisplayElement> {
    return this.displayElements;
  }
}

/**
 *
 */
class NPSNewsRelease extends ANPSObject {
  constructor(source, config: NPSAPIQueryOptions) {
    super(source.title, source.abstract, source.url, config);
  }

  getUniqueId(): string {
    throw new Error("Not implemented");
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.PARAGRAPH;
  }

  getDisplayElements(): Array<INPSDisplayElement> {
    return [];
  }
}

class NPSImage extends ANPSObject {
  private readonly id: string;

  constructor(source, config: NPSAPIQueryOptions) {
    super(source.title + " (Credit: " + source.credit + ")", source.caption, source.url, config);
    this.id = source.id;
  }

  getUniqueId(): string {
    return this.id;
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.IMAGE;
  }

  getDisplayElements(): Array<INPSDisplayElement> {
    return [];
  }
}

class NPSDisplayParagraph extends ANPSObject {
  constructor(title: string, description: string, url: string) {
    super(title, description, url, new NPSAPIQueryOptions);
  }

  getUniqueId(): string {
    throw new Error("Unsupported Operation: getUniqueId on NPSDisplayParagraph");
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.PARAGRAPH;
  }

  getDisplayElements(): Array<INPSDisplayElement> {
    return [];
  }
}


// TODO: Write model classes for the rest of the resources



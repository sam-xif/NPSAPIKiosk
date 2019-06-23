/**
 * Definitions for JavaScript class representations of data objects provided by the NPS API.
 */
import {NPSAPIQueryOptions} from "./NPSAPIQuery";
import {INPSResourceDescription, NPSResourceDescriptionBuilder} from "./NPSResourceDescription";

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
  applyPredicate(pred: (obj: object) => boolean): boolean;
  getResourceDescription(): INPSResourceDescription;

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
  SUMMARY,
  PROPERTY,
  META,
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
  protected readonly sourceData: object;
  protected readonly config: NPSAPIQueryOptions;
  protected readonly resourceName: string;

  /**
   * @param title
   * @param description
   * @param url
   */
  protected constructor(title: string, description: string, url: string, resourceName: string, sourceData: object, config: NPSAPIQueryOptions) {
    this.title = title;
    this.description = description;

    if (url) {
      if (url.startsWith('/')) {
        url = 'https://www.nps.gov' + url;
      }
      this.url = url;
    } else {
      this.url = url;
    }

    this.resourceName = resourceName;
    this.sourceData = sourceData;
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

  getResourceDescription(): INPSResourceDescription {
    if (this.resourceName) {
      return NPSResourceDescriptionBuilder.get(this.resourceName);
    } else {
      throw new Error("Object does not have an associated resource");
    }
  }

  applyPredicate(pred: (obj: object) => boolean): boolean {
    if (this.sourceData) {
      return pred(this.sourceData);
    } else {
      return false;
    }
  }

  static from(resource: string, data: object, config: NPSAPIQueryOptions): INPSObject {
    switch (resource) {
      case 'parks':
        return new NPSPark(data, config);
      case 'alerts':
        return new NPSAlert(data, config);
      case 'newsreleases':
        return new NPSNewsRelease(data, config);
      case 'events':
        return new NPSEvent(data, config);
      case 'campgrounds':
        return new NPSCampground(data, config);
      default:
        throw new Error('Unsupported resource');
    }
  }
}

/**
 * Data model of an alert issued by the NPS.
 */
class NPSAlert extends ANPSObject {
  private readonly parkCode: string;
  /**
   * @param {JSON} source Source JSON object from the API to use to construct the object
   */
  constructor(source, config: NPSAPIQueryOptions) {
    super(source.title, source.description, source.url, 'alerts', source, config);
    this.parkCode = source.parkCode;
  }

  getUniqueId(): string {
    return this.parkCode;
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.META;
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
    super(source.fullName, source.description, source.url, 'parks', source, config);
    this.images = [];
    this.displayElements = [];
    this.parkCode = source.parkCode;

    if ('images' in source) {
      source['images'].forEach(imgData => {
        this.images.push(new NPSImage(imgData, this.config));
      })
    }

    this.displayElements.push(new NPSDisplayParagraph("Park Summary", this.getDescription(), this.getUrl()));

    // if the config has the long text flag set, then we add paragraph elements
    if (this.config.getLong()) {
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
    }

    // Next, add all images to the display elements list
    this.images.forEach(img => this.displayElements.push(img));
  }

  getUniqueId(): string {
    return this.parkCode;
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.SUMMARY;
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
    super(source.title, source.abstract, source.url, 'newsreleases', source, config);
  }

  getUniqueId(): string {
    throw new Error("Not implemented");
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.SUMMARY;
  }

  getDisplayElements(): Array<INPSDisplayElement> {
    return [];
  }
}

class NPSImage extends ANPSObject {
  private readonly id: string;

  constructor(source, config: NPSAPIQueryOptions) {
    super(source.title + " (Credit: " + source.credit + ")", source.caption, source.url, undefined, source, config);
    console.log(this.getUrl());
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
    super(title, description, url, undefined, undefined, new NPSAPIQueryOptions);
  }

  getUniqueId(): string {
    throw new Error("Unsupported Operation: getUniqueId on NPSDisplayParagraph");
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.SUMMARY;
  }

  getDisplayElements(): Array<INPSDisplayElement> {
    return [];
  }
}

class NPSDisplayProperty extends ANPSObject {
  constructor(title: string, description: string) {
    super(title, description, undefined, undefined, undefined, new NPSAPIQueryOptions);
  }

  getUniqueId(): string {
    throw new Error("Unsupported Operation: getUniqueId on NPSDisplayParagraph");
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.PROPERTY;
  }

  getDisplayElements(): Array<INPSDisplayElement> {
    return [];
  }
}

class NPSEvent extends ANPSObject {
  private readonly id: string;
  private displayElements: Array<INPSDisplayElement>;

  constructor(source, config: NPSAPIQueryOptions) {
    super(source.title, source.description, source.url, 'events', source, config);
    this.id = source.id;
    this.displayElements = [];

    if (this.config.getLong()) {
      let isfree: boolean = this.sourceData['isfree'];

      if (isfree) {
        this.displayElements.push(new NPSDisplayProperty('Free?', isfree ? 'Yes' : 'No'));
      } else {
        this.displayElements.push(new NPSDisplayProperty('Fee Info:', this.sourceData['feeinfo']));
      }

      if (this.sourceData['contacttelephonenumber'] !== '') {
        this.displayElements.push(new NPSDisplayProperty('Contact:', this.sourceData['contacttelephonenumber']));
      }

      if (this.sourceData['regresinfo'] !== '') {
        this.displayElements.push(new NPSDisplayProperty('Registration Info:', this.sourceData['regresinfo']));
      }

      this.displayElements.push(new NPSDisplayParagraph('Event Summary',
        this.getDescription(), this.getUrl()));

      if ('images' in this.sourceData) {
        this.sourceData['images'].forEach(imgData => {
          this.displayElements.push(new NPSImage(imgData, this.config));
        });
      }
    }
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.SUMMARY;
  }

  getDisplayElements(): Array<INPSDisplayElement> {
    return this.displayElements;
  }

  getUniqueId(): string {
    return this.id;
  }
}

class NPSCampground extends ANPSObject {
  private displayElements: Array<INPSDisplayElement>;
  private id: string;

  constructor(source, config: NPSAPIQueryOptions) {
    super(source.name, source.description, undefined, 'campgrounds', source, config);
    this.id = source.id;
    this.displayElements = [];

    if (this.config.getLong()) {
      if ('regulationsoverview' in this.sourceData && this.sourceData['regulationsoverview'] !== '') {
        this.displayElements.push(new NPSDisplayParagraph('Regulations Overview', this.sourceData['regulationsoverview'],
          this.sourceData['regulationsurl'] === '' ? undefined : this.sourceData['regulationsurl']));
      }

      if ('weatheroverview' in this.sourceData && this.sourceData['weatheroverview'] !== '') {
        this.displayElements.push(new NPSDisplayParagraph('Weather Overview', this.sourceData['weatheroverview'], undefined));
      }

      if ('directionsoverview' in this.sourceData && this.sourceData['directionsoverview'] !== '') {
        this.displayElements.push(new NPSDisplayParagraph('Directions Overview', this.sourceData['directionsoverview'],
          this.sourceData['directionsurl'] === '' ? undefined : this.sourceData['directionsurl']));
      }
    }
  }
  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.SUMMARY;
  }

  getDisplayElements(): Array<INPSDisplayElement> {
    return this.displayElements;
  }

  getUniqueId(): string {
    return this.id;
  }
}


// TODO: Write model classes for the rest of the resources



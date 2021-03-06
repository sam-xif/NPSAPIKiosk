/**
 * Definitions for JavaScript class representations of data objects provided by the NPS API.
 * Essentially an ORM.
 */
import {NPSAPIQueryOptions} from "./NPSAPIQuery";
import {INPSResourceDescription, NPSResourceDescriptionBuilder} from "./NPSResourceDescription";

/**
 * Factory class for instances of {@link INPSObject}.
 */
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

/**
 * Represents an object from the NPS API.
 */
export interface INPSObject {
  /**
   * Applies the given predicate to this object's raw data source, returning its result.
   * @param pred The predicate to apply
   */
  applyPredicate(pred: (obj: object) => boolean): boolean;

  /**
   * Applies a transform function to the interal source data of this INPSObject, returning the result.
   * @param fn The transform function to apply
   * @return The result
   */
  applyTransform(fn: (obj: object) => any): any;

  /**
   * Gets a description for the resource from which this object was retrieved.
   */
  getResourceDescription(): INPSResourceDescription;

  // These getters are commonly used properties for easy access
  /**
   * Gets a title for this object.
   */
  getTitle(): string;

  /**
   *  Gets a description for this object.
   */
  getDescription(): string;

  /**
   * Gets a URL for this object.
   * @return The URL or undefined if there isn't one
   */
  getUrl(): string;

  /**
   * Gets an array of display elements for this object.
   */
  getDisplayElements(): Array<INPSDisplayElement>;

  /**
   * Gets a unique string associated with this object
   */
  getUniqueId(): string;
}

/**
 * Enumeration of display element types.
 */
export enum NPSDisplayElementType {
  SUMMARY,
  PROPERTY,
  META,
  IMAGE
}

/**
 * Represents a display element which can be used to help in rendering an {@link INPSObject}.
 */
export interface INPSDisplayElement extends INPSObject {
  /**
   * Gets the type of this display element.
   */
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
   * @param title The title of the object
   * @param description The description of the object
   * @param url The URL of the object
   * @param resourceName The resource from which the object came
   * @param sourceData The raw JSON source data
   * @param config The query configuration that was used to retrieve the object
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

  protected sourceHas(propName: string) {
    return propName in this.sourceData && this.sourceData[propName] !== '';
  }


  applyTransform(fn: (obj: object) => any): any {
    return fn(this.sourceData);
  }

  /**
   * Builds a new {@link INPSObject} instance.
   * @param resource The API resource from which the object was retrieved
   * @param data The raw JSON data to parse
   * @param config The query config that was used to retrieve the object
   */
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
      case 'lessonplans':
        return new NPSLessonPlan(data, config);
      case 'people':
        return new NPSPerson(data, config);
      case 'places':
        return new NPSPlace(data, config);
      case 'visitorcenters':
        return new NPSVisitorCenter(data, config);
      case 'articles':
        return new NPSArticle(data, config);
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

    if (this.config.getUseSearchResultForm()) {
      if (this.sourceHas('states')) {
        this.displayElements.push(new NPSDisplayProperty('States:', this.sourceData['states']));
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
 * Representation of a news release.
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

/**
 * Representation of an image from the API
 */
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

/**
 * Representation of a display paragraph for use when rendering other objects.
 */
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

/**
 * Representation of a display property for use when rendering other objects.
 */
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

/**
 * Representation of an event object.
 */
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

      if (this.sourceHas('contacttelephonenumber')) {
        this.displayElements.push(new NPSDisplayProperty('Contact:', this.sourceData['contacttelephonenumber']));
      }

      if (this.sourceHas('regresinfo')) {
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

/**
 * Representation of a campground object.
 */
class NPSCampground extends ANPSObject {
  private displayElements: Array<INPSDisplayElement>;
  private amenities: INPSObject;
  private id: string;

  constructor(source, config: NPSAPIQueryOptions) {
    super(source.name, source.description, undefined, 'campgrounds', source, config);
    this.id = source.id;
    this.displayElements = [];

    if (this.config.getLong()) {
      if (this.sourceHas('regulationsoverview')) {
        this.displayElements.push(new NPSDisplayParagraph('Regulations Overview',
          this.sourceData['regulationsoverview'],
          this.sourceData['regulationsurl'] === '' ? undefined : this.sourceData['regulationsurl']));
      }

      if (this.sourceHas('weatheroverview')) {
        this.displayElements.push(new NPSDisplayParagraph('Weather Overview',
          this.sourceData['weatheroverview'],
          undefined));
      }

      if (this.sourceHas('directionsoverview')) {
        this.displayElements.push(new NPSDisplayParagraph('Directions Overview', this.sourceData['directionsoverview'],
          this.sourceData['directionsurl'] === '' ? undefined : this.sourceData['directionsurl']));
      }

      if (this.sourceHas('amenities')) {
        this.amenities = new NPSCampgroundAmenities(this.sourceData['amenities'], config);

        // Concat all the properties from NPSCampgroundAmenities
        this.displayElements = this.displayElements.concat(this.amenities.getDisplayElements());
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

/**
 * Representation of a campground amenities sub-object.
 */
class NPSCampgroundAmenities extends ANPSObject {
  private displayElements: Array<INPSDisplayElement>;

  constructor(source, config: NPSAPIQueryOptions) {
    super('Amenities', 'campground amenities', undefined, undefined, source, config);
    this.displayElements = [];

    if (this.sourceHas('trashrecyclingcollection')) {
      this.displayElements.push(new NPSDisplayProperty('Trash and Recycling Collection?',
        this.sourceData['trashrecyclingcollection']));
    }

    if (this.sourceHas('toilets')) {
      this.displayElements.push(new NPSDisplayProperty('Toilets?',
        this.arrayToCommaDelimitedString(this.sourceData['toilets'])));
    }

    if (this.sourceHas('internetconnectivity')) {
      this.displayElements.push(new NPSDisplayProperty('Internet Connectivity?',
        this.sourceData['internetconnectivity']));
    }

    if (this.sourceHas('showers')) {
      this.displayElements.push(new NPSDisplayProperty('Showers?',
        this.arrayToCommaDelimitedString(this.sourceData['showers'])));
    }

    if (this.sourceHas('cellphonereception')) {
      this.displayElements.push(new NPSDisplayProperty('Cell Phone Reception?',
        this.sourceData['cellphonereception']));
    }

    if (this.sourceHas('laundry')) {
      this.displayElements.push(new NPSDisplayProperty('Laundry?',
        this.sourceData['laundry']));
    }

    if (this.sourceHas('amphitheater')) {
      this.displayElements.push(new NPSDisplayProperty('Amphitheater?',
        this.sourceData['amphitheater']));
    }

    if (this.sourceHas('dumpstation')) {
      this.displayElements.push(new NPSDisplayProperty('Dump Station?',
        this.sourceData['dumpstation']));
    }

    if (this.sourceHas('campstore')) {
      this.displayElements.push(new NPSDisplayProperty('Camp Store?',
        this.sourceData['campstore']));
    }

    if (this.sourceHas('stafforvolunteerhostonsite')) {
      this.displayElements.push(new NPSDisplayProperty('Staff or Volunteer Host on Site?',
        this.sourceData['stafforvolunteerhostonsite']));
    }

    if (this.sourceHas('potablewater')) {
      this.displayElements.push(new NPSDisplayProperty('Potable Water?',
        this.arrayToCommaDelimitedString(this.sourceData['potablewater'])));
    }

    if (this.sourceHas('iceavailableforsale')) {
      this.displayElements.push(new NPSDisplayProperty('Ice Available for Sale?',
        this.sourceData['iceavailableforsale']));
    }

    if (this.sourceHas('firewoodforsale')) {
      this.displayElements.push(new NPSDisplayProperty('Firewood for Sale?',
        this.sourceData['firewoodforsale']));
    }

    if (this.sourceHas('ampitheater')) {
      this.displayElements.push(new NPSDisplayProperty('Ampitheater?',
        this.sourceData['ampitheater']));
    }

    if (this.sourceHas('foodstoragelockers')) {
      this.displayElements.push(new NPSDisplayProperty('Food Storage Lockers?',
        this.sourceData['foodstoragelockers']));
    }
  }

  getDisplayElementType(): NPSDisplayElementType {
    return NPSDisplayElementType.PROPERTY;
  }

  getDisplayElements(): Array<INPSDisplayElement> {
    return this.displayElements;
  }

  getUniqueId(): string {
    throw new Error("Unsupported operation: Cannot get unique ID of NPSCampgroundAmenities");
  }

  // Same as from NPSAPIQueryBuilder
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
}

/**
 * Representation of a visitor center object.
 */
class NPSVisitorCenter extends ANPSObject {
  private displayElements: Array<INPSDisplayElement>;
  private id: string;

  constructor(source, config: NPSAPIQueryOptions) {
    super(source.name, source.description, source.url, 'visitorcenters', source, config);
    this.id = source.id;
    this.displayElements = [];

    if (this.config.getLong()) {
      if (this.sourceHas('directionsInfo')) {
        this.displayElements.push(new NPSDisplayParagraph(
          'Directions Info', this.sourceData['directionsInfo'],
          this.sourceData['directionsUrl'] == '' ? undefined : this.sourceData['directionsUrl']
        ));
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
    return "";
  }
}

/**
 * Representation of a lesson plan object.
 */
class NPSLessonPlan extends ANPSObject {
  private displayElements: Array<INPSDisplayElement>;
  private id: string;

  constructor(source, config: NPSAPIQueryOptions) {
    super(source.title, source.questionobjective, source.url, 'lessonplans', source, config);
    this.id = source.id;
    this.displayElements = [];

    if (this.config.getLong()) {
      if (this.sourceHas('subject')) {
        this.displayElements.push(new NPSDisplayProperty('Subject:', this.sourceData['subject']));
      }

      if (this.sourceHas('duration')) {
        this.displayElements.push(new NPSDisplayProperty('Duration:', this.sourceData['duration']));
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

/**
 * Representation of a person object.
 */
class NPSPerson extends ANPSObject {
  private displayElements: Array<INPSDisplayElement>;
  private id: string;

  constructor(source, config: NPSAPIQueryOptions) {
    super(source.title, source.listingdescription, source.url, 'people', source, config);
    this.id = source.id;
    this.displayElements = [];

    if (this.config.getLong()) {
      if (this.sourceHas('listingimage')) {
        if (this.sourceData['listingimage']['url'] != '') {
          this.displayElements.push(new NPSImage(this.sourceData['listingimage'], this.config));
        }
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

/**
 * Representation of a place object.
 */
class NPSPlace extends ANPSObject {
  private displayElements: Array<INPSDisplayElement>;
  private id: string;

  constructor(source, config: NPSAPIQueryOptions) {
    super(source.title, source.listingdescription, source.url, 'places', source, config);
    this.id = source.id;
    this.displayElements = [];

    if (this.config.getLong()) {
      if (this.sourceHas('listingimage')) {
        if (this.sourceData['listingimage']['url'] != '') {
          this.displayElements.push(new NPSImage(this.sourceData['listingimage'], this.config));
        }
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

/**
 * Representation of an article object.
 */
class NPSArticle extends ANPSObject {
  private displayElements: Array<INPSDisplayElement>;
  private id: string;

  constructor(source, config: NPSAPIQueryOptions) {
    super(source.title, source.listingdescription, source.url, 'articles', source, config);
    this.id = source.id;
    this.displayElements = [];

    if (this.config.getLong()) {
      if (this.sourceHas('listingimage')) {
        if (this.sourceData['listingimage']['url'] != '') {
          this.displayElements.push(new NPSImage(this.sourceData['listingimage'], this.config));
        }
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

// TODO: Abstract more common behaviors out of these models



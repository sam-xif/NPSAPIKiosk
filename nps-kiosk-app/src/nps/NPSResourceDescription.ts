/**
 * A description of an NPS API resource.
 */
export interface INPSResourceDescription {
  /**
   * Possible designations of objects from this resource.
   */
  getDesignations(): Array<string>;
}

/**
 * Factory class for {@link INPSResourceDescription} objects.
 */
export class NPSResourceDescriptionBuilder {
  /**
   * Gets the resource description from the given resource name.
   * @param resourceName The resource name
   */
  static get(resourceName: string) {
    switch (resourceName) {
      case 'parks':
        return new NPSResourceDescription(
          ['National Park', 'National Monument', 'Recreation Area']
        );
      case 'alerts':
        return new NPSResourceDescription(
          [ 'Danger', 'Caution', 'Information', 'Park Closure' ]
        );
      case 'events':
        return new NPSResourceDescription(
          []
        );
    }
  }
}

/**
 * Implementation of a resource description.
 */
class NPSResourceDescription implements INPSResourceDescription {
  private readonly designations: Array<string>;

  constructor(designations: Array<string>) {
    this.designations = designations;
  }

  getDesignations(): Array<string> {
    return this.designations;
  }
}


export interface INPSResourceDescription {
  getDesignations(): Array<string>;
}

export class NPSResourceDescriptionBuilder {
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

class NPSResourceDescription implements INPSResourceDescription {
  private readonly designations: Array<string>;

  constructor(designations: Array<string>) {
    this.designations = designations;
  }

  getDesignations(): Array<string> {
    return this.designations;
  }
}

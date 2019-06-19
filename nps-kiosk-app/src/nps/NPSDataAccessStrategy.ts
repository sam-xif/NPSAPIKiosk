import INPSAPIQuery from "./NPSAPIQuery";
import {INPSObject, INPSModelDAO} from "./NPSModel";

export interface INPSDataCollection extends Iterable<INPSObject> {}

export interface INPSDataAccessStrategy {
  getData(query: INPSAPIQuery, dao: INPSModelDAO): Promise<INPSDataCollection>;
}

export class NPSDataAccessStrategyBuilder {
  private readonly dao: INPSModelDAO;
  private strategy: INPSDataAccessStrategy;

  constructor() {
    this.strategy = new DefaultNPSDataAccessStrategy();
  }

  use(identifier: string): NPSDataAccessStrategyBuilder {
    switch (identifier) {
      case "default":
        this.strategy = new DefaultNPSDataAccessStrategy();
        break;
      default:
        throw new Error("Unrecognized strategy identifier");
    }
    return this;
  }

  build(): INPSDataAccessStrategy {
    return this.strategy;
  }
}


class DefaultNPSDataAccessStrategy implements INPSDataAccessStrategy{

  constructor() {}

  getData(query: INPSAPIQuery, dao: INPSModelDAO): Promise<INPSDataCollection> {
    return dao.retrieve(query);
  }
}

class PaginatedNPSDataAccessStrategy implements INPSDataAccessStrategy {

  constructor() {}

  getData(query: INPSAPIQuery, dao: INPSModelDAO): Promise<INPSDataCollection> {
    throw new Error("Unimplemented");
  }
}

import INPSAPIQuery from "./NPSAPIQuery";
import {INPSObject, INPSModelDAO} from "./NPSModel";
import NPSDataSource from "./NPSDataSource";

export interface INPSDataCollection extends Iterable<INPSObject> {
  hasNextSubCollection(): boolean;
  nextSubCollection(): INPSDataCollection;
  getDataSource(): NPSDataSource;
}

export interface INPSDataAccessStrategy {
  getData(query: INPSAPIQuery, dao: INPSModelDAO): Promise<INPSDataCollection>;
}

export class NPSDataAccessStrategyBuilder {
  private readonly dao: INPSModelDAO;
  private strategy: INPSDataAccessStrategy;

  constructor() {
    this.strategy = new DefaultNPSDataAccessStrategy();
  }

  use(identifier: string, config: object): NPSDataAccessStrategyBuilder {
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

abstract class ANPSDataAccessStrategy implements INPSDataAccessStrategy {
  protected readonly config: object;

  protected constructor(config: object) {
    this.config = config;
  }

  abstract getData(query: INPSAPIQuery, dao: INPSModelDAO): Promise<INPSDataCollection>;
}

class DefaultNPSDataAccessStrategy extends ANPSDataAccessStrategy {
  constructor() {
    super({});
  }

  async getData(query: INPSAPIQuery, dao: INPSModelDAO): Promise<INPSDataCollection> {
    let result: INPSObject[] = await dao.retrieve(query);
    let ds = new NPSDataSource();
    ds.addAll(result);
    return new NPSDataCollection(ds);
  }
}

class BatchNPSDataAccessStrategy extends ANPSDataAccessStrategy {
  constructor(config: object) {
    super(config);
  }

  getData(query: INPSAPIQuery, dao: INPSModelDAO): Promise<INPSDataCollection> {
    throw new Error("Unimplemented");
  }
}

class NPSDataCollection implements INPSDataCollection {
  private readonly dataSource: NPSDataSource;

  constructor(dataSource: NPSDataSource) {
    this.dataSource = dataSource;
  }

  *[Symbol.iterator](): Iterator<INPSObject> {
    throw new Error("Not implemented");
  }

  getDataSource(): NPSDataSource {
    return this.dataSource;
  }

  hasNextSubCollection(): boolean {
    return false;
  }

  nextSubCollection(): INPSDataCollection {
    return undefined;
  }
}

import INPSAPIQuery from "./NPSAPIQuery";
import {INPSModelDAO} from "./NPSModelDAO";
import NPSDataSource from "./NPSDataSource";

export interface INPSDataAccessStrategy {
  getData(query: INPSAPIQuery, dao: INPSModelDAO): NPSDataSource;
}

export class NPSDataAccessStrategyBuilder {
  private strategy: INPSDataAccessStrategy;

  constructor() {
    this.strategy = new DefaultNPSDataAccessStrategy();
  }

  use(identifier: string, config: object = {}): NPSDataAccessStrategyBuilder {
    switch (identifier) {
      case "default":
        this.strategy = new DefaultNPSDataAccessStrategy();
        break;
      case "batch":
        this.strategy = new BatchNPSDataAccessStrategy(config);
        break;
      case "filter":
        this.strategy = new FilteredNPSDataAccessStrategy(config, this.strategy);
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

  abstract getData(query: INPSAPIQuery, dao: INPSModelDAO): NPSDataSource;
}

class FilteredNPSDataAccessStrategy extends ANPSDataAccessStrategy {
  delegate: INPSDataAccessStrategy;
  predicate: any;

  constructor(config: object, delegate: INPSDataAccessStrategy) {
    super(config);
    if ('predicate' in config) {
      this.predicate = config['predicate'];
    }

    this.delegate = delegate;
  }

  getData(query: INPSAPIQuery, dao: INPSModelDAO): NPSDataSource {
    let dataSource = this.delegate.getData(query, dao);
    let outDataSource = new NPSDataSource();

    dataSource.addOnUpdateHandler(snapshot => {
      snapshot.forEach(item => {
        if (this.predicate(item)) {
          outDataSource.add(item);
        }
      });
      outDataSource.complete();
    });

    return outDataSource;
  }
}

class DefaultNPSDataAccessStrategy extends ANPSDataAccessStrategy {
  constructor() {
    super({});
  }

  getData(query: INPSAPIQuery, dao: INPSModelDAO): NPSDataSource {
    let dataSource = new NPSDataSource();
    dao.retrieve(query)
      .then((results) => {
        dataSource.addAll(results);
        dataSource.complete();
      });
    return dataSource;
  }
}

class BatchNPSDataAccessStrategy extends ANPSDataAccessStrategy {
  constructor(config: object) {
    super(config);
  }

  getData(query: INPSAPIQuery, dao: INPSModelDAO): NPSDataSource {
    throw new Error("Unimplemented");
  }
}

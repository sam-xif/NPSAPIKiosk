import {INPSAPIQuery} from "./NPSAPIQuery";
import {INPSModelDAO} from "./NPSModelDAO";
import {NPSDataSource} from "./NPSDataSource";
import {NPSAPIQueryBuilder} from "./NPSAPIQueryBuilder";

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
    const dataSource = this.delegate.getData(query, dao);
    const outDataSource = new NPSDataSource();

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
    const dataSource = new NPSDataSource();
    dao.retrieve(query)
      .then((results) => {
        dataSource.addAll(results);
        dataSource.complete();
      });
    return dataSource;
  }
}

class BatchNPSDataAccessStrategy extends ANPSDataAccessStrategy {
  private batches = 10;
  private batchSize: number = 5;
  private builder: NPSAPIQueryBuilder;

  constructor(config: object) {
    super(config);
    if ('batchSize' in config) {
      this.batchSize = config['batchSize'];
    }
    if ('numBatches' in config) {
      this.batches = config['numBatches'];
    }
    if ('queryBuilder' in config) {
      this.builder = config['queryBuilder'];
    } else {
      throw new Error("Batch strategy requires NPSAPIQueryBuilder instance to build paginated queries");
    }
  }

  getData(query: INPSAPIQuery, dao: INPSModelDAO): NPSDataSource {
    const dataSource = new NPSDataSource();
    (async (dataSource: NPSDataSource) => {
      let fetchMore = true;

      for (let i = 0; i < this.batches && fetchMore; i++) {
        let results = await dao.retrieve(this.builder.build(), {'limit': this.batchSize});
        if (results.length === 0) {
          fetchMore = false;
          break;
        }

        if (fetchMore) {
          dataSource.addAll(results);
        }

        this.builder.nextPage();
      }

      dataSource.complete();
    })(dataSource);
    return dataSource;
  }
}

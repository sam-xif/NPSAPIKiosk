import {Component, OnInit} from '@angular/core';
import NPSAPIQueryBuilder from "../nps/NPSAPIQueryBuilder";
import { NPSAPIClientService } from './npsapiclient.service';
import {INPSObject} from "../nps/NPSModel";
import {NPSDataAccessStrategyBuilder} from "../nps/NPSDataAccessStrategy";
import NPSDataSource from "../nps/NPSDataSource";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ NPSAPIClientService ]
})
export class AppComponent implements OnInit {
  title: string = 'nps-kiosk-app';
  client: NPSAPIClientService;
  resource: string = "alerts";
  queryString: string = "";
  data: Array<INPSObject> = [];

  constructor(private npsapiClientService : NPSAPIClientService) {
    this.client = npsapiClientService;
  }

  ngOnInit() {

  }

  callAPI() {
    let qb = new NPSAPIQueryBuilder();
    qb.from(this.resource);

    if (this.queryString !== "") {
      qb.setQueryString(this.queryString);
    }

    let strategy = (new NPSDataAccessStrategyBuilder())
      .use('default')
      .use('filter', {
        predicate: datum => {
          return datum.getUrl() !== "";
        }
      })
      .build();

    let dataSource: NPSDataSource = this.client.retrieve(qb.build(), strategy);
    dataSource.addOnUpdateHandler(snapshot => this.data = snapshot);
  }
}

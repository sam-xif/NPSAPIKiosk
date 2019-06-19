import {Component, OnInit} from '@angular/core';
import { NPSAPIQueryBuilder } from "./lib/client";
import { NPSAPIClientService } from './npsapiclient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ NPSAPIClientService ]
})
export class AppComponent implements OnInit {
  title = 'nps-kiosk-app';
  client;
  resource = "alerts";
  queryString = undefined;
  data = [];

  constructor(private npsapiClientService : NPSAPIClientService) {
    this.client = npsapiClientService;
  }

  ngOnInit() {

  }

  callAPI() {
    let qb = new NPSAPIQueryBuilder();
    qb.from(this.resource);

    if (this.queryString) {
      qb.setQueryString(this.queryString);
    }

    this.client.retrieve(qb.build())
      .then(result => {
        console.log(result);
        this.data = result;
      });
  }
}

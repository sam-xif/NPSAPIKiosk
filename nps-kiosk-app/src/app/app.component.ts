import {Component, OnInit} from '@angular/core';
import NPSAPIQueryBuilder from "../nps/NPSAPIQueryBuilder";
import { NPSAPIClientService } from './npsapiclient.service';
import {INPSModel} from "../nps/NPSModel";

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
  data: Array<INPSModel> = [];

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

    this.client.retrieve(qb.build())
      .then(result => {
        console.log(result);
        this.data = result;
      });
  }
}

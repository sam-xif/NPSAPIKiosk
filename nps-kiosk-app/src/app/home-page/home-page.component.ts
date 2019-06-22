import { Component, OnInit } from '@angular/core';
import {INPSObject} from "../../nps/NPSModel";
import {NPSAPIClientService} from "../services/npsapiclient.service";
import {Router} from "@angular/router";
import NPSAPIQueryBuilder from "../../nps/NPSAPIQueryBuilder";
import {NPSDataAccessStrategyBuilder} from "../../nps/NPSDataAccessStrategy";
import NPSDataSource from "../../nps/NPSDataSource";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  title: string = 'nps-kiosk-app';
  resource: string = "parks";
  queryString: string = "";
  data: Array<INPSObject> = [];

  constructor(private npsapiClientService : NPSAPIClientService, private router: Router) {}

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

    let dataSource: NPSDataSource = this.npsapiClientService.retrieve(qb.build(), strategy);
    dataSource.addOnUpdateHandler(snapshot => this.data = snapshot);
  }

  goToLearnPage(datum) {
    this.router.navigateByUrl("");
  }
}

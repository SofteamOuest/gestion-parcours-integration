import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';


@Injectable()

export class ResourceService {


  constructor() {
  }


  getResourceHeaders(): HttpHeaders {
    let headers = this.resourceCommonHeaders();
    return headers;
  }


  private resourceCommonHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Accept', 'application/json, text/plain, */*');
    return headers;

  }


  postResourceHeaders(): HttpHeaders {
    let headers = this.resourceCommonHeaders();
    headers = headers.set('Content-Type', 'application/json;charset=UTF-8');
    return headers;
  }


  putResourceHeaders(): HttpHeaders {

    let headers = this.resourceCommonHeaders();
    headers = headers.set('Content-Type', 'application/json;charset=UTF-8');
    return headers;

  }


  deleteResourceHeaders(): HttpHeaders {


    let headers = this.resourceCommonHeaders();

    headers = headers.set('Content-Type', 'application/json;charset=UTF-8');


    return headers;

  }


}

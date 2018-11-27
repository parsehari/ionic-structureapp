import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from  '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  // header for json/content-type
//  private url = 'http://mmkndmobdev.corp.mahindra.com';
//  private url = 'http://192.168.42.115';
  private url = 'http://10.174.50.137:8080/vms';
  raiseReq:any;
  tripTime:any;
  constructor(public http: Http) {
    console.log('Hello ServiceProvider Provider');
  }

  getBookingHistory(param: any, usrID: any): Observable<any> {
    var headers =  new Headers({ 'Content-Type': 'application/json' });
  //  headers.append()
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.url+param + "/" + usrID, options );
      //    return this.http.get('http://127.0.0.1:3000' + param + "?email=" + data.email + "&pwd=" + data.pwd,  {headers: this.headers});
  }

  getAllTripHistory(param: any, usrID: any): Observable<any> {
    var headers =  new Headers({ 'Content-Type': 'application/json' });
  //  headers.append()
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.url+param + "/" + usrID, options );
      //    return this.http.get('http://127.0.0.1:3000' + param + "?email=" + data.email + "&pwd=" + data.pwd,  {headers: this.headers});
  }

  getAllLocations(param: any): Observable<any> {
    var headers =  new Headers({ });
  //  headers.append()
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.url+param );
      //    return this.http.get('http://127.0.0.1:3000' + param + "?email=" + data.email + "&pwd=" + data.pwd,  {headers: this.headers});
  }

  getApprovalList(param: any, uid: any):Observable<any>{
    var headers = new Headers({});
    var options =  new RequestOptions({headers: headers});
    return this.http.get(this.url+param+'/'+uid);
  }

  raiseRequest(param: any, data: any, datastatus: any = "default"): Observable<any>{
  //  var params = "userID=" + data.userID + "&source=" + data.userID + "&destination=" + data.destination + "&purpose=" + data.purpose +"&travel_date="+ data.travel_date +"&travel_time"+ data.travel_time;
  console.log("datastatus ",datastatus);
    this.raiseReq = new FormData();
    this.raiseReq.append("userID", data.userID);
    this.raiseReq.append("source", data.source);
    this.raiseReq.append("destination", data.destination);
    this.raiseReq.append("purpose", data.purpose);
    this.raiseReq.append("travel_date", data.travel_date);
    this.raiseReq.append("travel_time", data.travel_time);
    this.raiseReq.append("status", data.status);
    this.raiseReq.append("bh_Id", data.bh_Id);
    this.raiseReq.append("emp_email", data.emp_email);
    this.raiseReq.append("emp_userName", data.emp_UserName);
    this.raiseReq.append("emp_phoneNo", data.emp_phoneNo);

    if(datastatus == "hodAction"){
      this.raiseReq.append("id", data.id);
      this.raiseReq.append("modifiedby", data.modified_by);
      this.raiseReq.append("comment", data.comment);
    }

    let headers = new Headers({ });
    let options = new RequestOptions({ headers: headers });
    console.log("in service ",this.raiseReq)
    console.log("in options ",options)
    return this.http.post(this.url + param, this.raiseReq,options);

  }

  getUsrRoleDetails(url:any, sapClinet:any, ivPernr:any, type:any): Observable<any>{
    var headers =  new Headers({});
  //  headers.append()
    let options = new RequestOptions({headers: headers});
    return this.http.get(url + "?sap-client=" + sapClinet + "&IV_PERNR=" + ivPernr + "&TYPE="+ type, options);
  }

  getDeptHeadUser(url:any): Observable<any>{
    var headers = new Headers({});
    let options = new RequestOptions({headers: headers});
    return this.http.get(url);
  }

  getDriverTripDetails(params:any): Observable<any>{
    var headers = new Headers({});
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.url+params);
  }

  tripStart(params:any,barcodeId:any,startTrip:any): Observable<any>{
    var headers = new Headers({});
    let options = new RequestOptions({headers: headers});
    this.tripTime = new FormData();
    this.tripTime.append("barcodeId", barcodeId);
    this.tripTime.append("startTrip", startTrip);
    return this.http.post(this.url +params,this.tripTime,options);
  }

}


// https://appstore.mahindra.com/saml <https://appstore.mahindra.com/saml>

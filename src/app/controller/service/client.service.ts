import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Route, Router} from '@angular/router';
import { fournisseur } from '../model/fournisseur.model';
import { reserver } from '../model/reserver.model';
import { client } from '../model/client.model';
import {PaimentDeClient} from "../model/paiment-de-client.model";
import {HeureConduite} from "../model/heure-conduite.model";

@Injectable({
  providedIn: 'root'
})
export class clientService {

  get clientInfo(): client {
    if(this._clientInfo == null){
      this._clientFound = new client();
    }
    return this._clientInfo;
  }

  set clientInfo(value: client) {
    this._clientInfo = value;
  }
  constructor(private http: HttpClient,
              private router: Router,
              ) { }

  get client(): Array<client> {
    if(this._client  ==  null){
      this._client = new Array<client>();
      this._client.forEach(cli =>{
        cli = new client();
      });
    }
    return this._client;
  }

  set client(value: Array<client>) {
    this._client = value;
  }

  get paimentsClient(): Array<PaimentDeClient> {
    if(this._paimentsClient == null){
      this._paimentsClient = new Array<PaimentDeClient>();
      this._paimentsClient.forEach(pay =>{
        pay = new PaimentDeClient();
        pay.client = new client();
      });
    }
    return this._paimentsClient;
  }

  set paimentsClient(value: Array<PaimentDeClient>) {
    this._paimentsClient = value;
  }

  get heureConduites(): Array<HeureConduite> {
    if(this._heureConduites == null){
      this._heureConduites = new Array<HeureConduite>();
      this._heureConduites.forEach(heure =>{
        heure = new HeureConduite();
        heure.client = new client();
      });
    }
    return this._heureConduites;
  }

  set heureConduites(value: Array<HeureConduite>) {
    this._heureConduites = value;
  }

  get clientSearch(): client {
    if(this._clientSearch == null){
      this._clientSearch = new client();
    }
    return this._clientSearch;
  }

  set clientSearch(value: client) {
    this._clientSearch = value;
  }

  get clientFound(): client {
    if(this._clientFound == null){
      this._clientFound = new client();
    }
    return this._clientFound;
  }

  set clientFound(value: client) {
    this._clientFound = value;
  }
  get clientAjout(): client {
    if(this._clientAjout == null){
      this._clientAjout = new client();
    }
    return this._clientAjout;
  }

  set clientAjout(value: client) {
    this._clientAjout = value;
  }
  private _client: Array<client>;
  private _clientSearch: client;
  private _clientFound: client;
  private _clientAjout: client;
  private _clientInfo: client;

  private  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};
 url = 'http://localhost:8080/autoEcole-Api/client/';
  private _paimentsClient: Array<PaimentDeClient>;
  private _heureConduites: Array<HeureConduite>;
public genererCodeClient(){
  this.clientAjout.generatedcode = (this.client.length + 1 ) + '/' + new Date().getFullYear();
}
  public findAll() {
    this.http.get<Array<client>>(this.url + 'findAll').subscribe(
      data => {
        if (data != null) {
          this.client = data;
          console.log('ha data' + data);
        }
      }, eror => {
        console.log('eroro');
      });
  }
  public ajouterUnclient() {
    this.http.post<number>(this.url +'createClient', this.clientAjout, this.options).subscribe(
      data => {
        if (data == 1) {
          console.log('ha data' + data);
        }
      }, eror => {
        console.log('eroro');
      });
  }
  public chercherUnclientParCode(code :string){
    console.log('ha code '+ code);
    this.http.get<Array<client>>(this.url+'findClientsByCode/'+ code).subscribe(
      data => {
        if (data != null ) {
          this.client = data;
          console.log('ha data' + data);
        }
      }, eror => {
        console.log('eroro');
      });
  }

  public findBYCinClient(cin: string){
    this.http.get<Array<PaimentDeClient>>('http://localhost:8080/autoEcole-Api/paimentDeClient/findByclientCin/' + cin).subscribe(
      data => {
        if (data != null ) {
          this.paimentsClient = data;
          console.log('ha data' + data);
        }
      }, eror => {
        console.log('eroro');
      });
  }

  public findBYHeureConduiteCinClient(cin: string){
    this.http.get<Array<HeureConduite>>('http://localhost:8080/autoEcole-Api/heureConduite/findByClientCin/' + cin).subscribe(
      data => {
        if (data != null ) {
          this.heureConduites = data;
          console.log('ha data' + data);
        }
      }, eror => {
        console.log('eroro');
      });
  }
  public copierClientInfo(cli: client){
    this.clientInfo = cli;
  }
}

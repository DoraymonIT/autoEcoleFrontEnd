import { Component, OnInit } from '@angular/core';
import {EtatFinanciereService} from "../../controller/service/etat-financiere.service";
import {EtatFinanciere} from "../../controller/model/etat-financiere.model";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AjouterDesDespencesGainsComponent} from "../ajouter-des-despences/ajouter-des-despences-gains.component";
import {ConfirmationService} from "primeng";

@Component({
  selector: 'app-listes-des-gains',
  templateUrl: './listes-des-gains.component.html',
  styleUrls: ['./listes-des-gains.component.css'],
  providers: [ConfirmationService]

})
export class ListesDesGainsComponent implements OnInit {

  constructor(private etatFinancierService: EtatFinanciereService,
              private dialog: MatDialog,
              private confirmationService: ConfirmationService) { }
  mois: number;
  year: number;
  cols: any;
  ngOnInit(): void {
    this.mois = (new Date().getMonth() + 1);
    this.year = (new Date().getFullYear());
    this.etatFinancierService.findAllGainsParMois(this.mois);
    this.cols = [
      { field: 'nom', header: 'Nom' },
      { field: 'monant', header: 'Montant' },
      { field: 'date', header: 'date' },
    ];
  }
  date: Date;
  chercherParDate(){
    this.etatFinancierService.findALLgainssBytypeAndDate(this.date, 'gains');
  }
  get totalGains(): number {
    return this.etatFinancierService.totalGains;
  }
  findMoisAvant(){
    this.mois = this.mois -1;
    this.etatFinancierService.findAllGainsParMoisAndAnnee(this.mois, this.year);
    console.log(this.mois, this.year);
  }
  findMoisApres(){
    this.mois = this.mois + 1;
    this.etatFinancierService.findAllGainsParMoisAndAnnee(this.mois, this.year);
    console.log(this.mois, this.year);
  }
  findyearAvant(){
    this.year = this.year -1;
    this.etatFinancierService.findAllGainsParMoisAndAnnee(this.mois, this.year);
    console.log(this.mois, this.year);
  }
  public confirm(id: number) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.etatFinancierService.deleteById(id);
      },
      reject: () => {
      }
    });
  }

  findYearApres(){
    this.year = this.year + 1;
    this.etatFinancierService.findAllGainsParMoisAndAnnee(this.mois, this.year);
    console.log(this.mois, this.year);
  }
  get listesDesGains(): Array<EtatFinanciere> {
    return this.etatFinancierService.listesDesGains;
  }
  public ajouterUngains(){
    this.etatFinancierService.ajoutergains();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.height = '50%';
    this.dialog.open(AjouterDesDespencesGainsComponent,
      dialogConfig);
  }
}

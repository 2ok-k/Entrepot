import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntrepotService} from "../services/entrepot.service";
import {Entrepot} from "../models/entrepot";
import { NgxSpinnerService } from "ngx-spinner";
import {Router} from "@angular/router";




@Component({
  selector: 'app-entrepot',
  templateUrl: './entrepot.component.html',
  styleUrls: ['./entrepot.component.css']
})
export class EntrepotComponent implements OnInit{
  entrepotForm!: FormGroup;
  editForm!: FormGroup;
  entrepotDetail: any;
  entrepotData: any = [];


  showSuccessMessage: boolean = false;
  hideSuccessMessage() {
    this.showSuccessMessage = false;
  }

  entrepotObj: Entrepot = {
    id: '',
    nomEntrepot: '',
    adresse: '',
    capacite: 0,
    typeEntrepot: '',
    description: '',
    conditionStockage: ''
  }
  constructor(
    private fb: FormBuilder,
    private entrepotService: EntrepotService,
    private spinner: NgxSpinnerService,
    private route: Router
  ) {
    this.entrepotForm = this.fb.group({
      nomEntrepot:['',Validators.required],
      adresse:['',Validators.required],
      capacite:['',Validators.required],
      typeEntrepot:['',Validators.required],
      description:['',Validators.required],
      conditionStockage:['',Validators.required]
    });
    this.editForm = this.fb.group({
      nomEntrepot:['',Validators.required],
      adresse:['',Validators.required],
      capacite:['',Validators.required],
      typeEntrepot:['',Validators.required],
      description:['',Validators.required],
      conditionStockage:['',Validators.required]
    })
  }
  ngOnInit() {
    this.getAllEntrepot();
  }
  addEntrepot(){
    const { value } = this.entrepotForm;
    console.log(value);
    this.entrepotObj.id = '';
    this.entrepotObj.nomEntrepot = value.nomEntrepot;
    this.entrepotObj.adresse = value.adresse;
    this.entrepotObj.capacite = value.capacite;
    this.entrepotObj.typeEntrepot = value.typeEntrepot;
    this.entrepotObj.description = value.description;
    this.entrepotObj.conditionStockage = value.conditionStockage;

    this.entrepotService.addEntrepot(this.entrepotObj).then((entrepot) =>{
      if (entrepot){
        //alert("Entrepot ajouté avec succès!");
        window.location.reload();
        this.showSuccessMessage = true;
        this.entrepotForm.reset();

      }
    })
  }

  getAllEntrepot(){
    this.spinner.show();
    this.entrepotService.getEntrepot().subscribe((res:Entrepot[]) => {
      console.log(res);
      this.entrepotData = res;
      this.spinner.hide();
    })
  }

  deleteEntrepot(entrepot: Entrepot){
    let decision = confirm("êtes vous sûr de supprimer cet entrepôt?");
    if (decision == true){
      this.entrepotService.deleteEntrepot(entrepot);
      this.showSuccessMessage = true;
    }
  }

  getAllDetails(entrepot: Entrepot){
    this.entrepotDetail = entrepot;
  }

  updateEntrepot(entrepot: Entrepot){
    const {value} = this.editForm;
    console.log(value);
    this.entrepotObj.id = entrepot.id;
    this.entrepotObj.nomEntrepot = value.nomEntrepot;
    this.entrepotObj.adresse = value.adresse;
    this.entrepotObj.capacite = value.capacite;
    this.entrepotObj.typeEntrepot = value.typeEntrepot;
    this.entrepotObj.description = value.description;
    this.entrepotObj.conditionStockage = value.conditionStockage;

    this.entrepotService.updateEntrepot(entrepot,this.entrepotObj).then(() => {
      alert("entrepot modifié avec succès!");
      this.showSuccessMessage = true;
    })
    this.editForm.reset()
  }
}

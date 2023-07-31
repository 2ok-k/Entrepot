import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntrepotService} from "../services/entrepot.service";
import {Entrepot} from "../models/entrepot";

@Component({
  selector: 'app-entrepot',
  templateUrl: './entrepot.component.html',
  styleUrls: ['./entrepot.component.css']
})
export class EntrepotComponent implements OnInit{
  entrepotForm!: FormGroup;

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
    private entrepotService: EntrepotService
  ) {
    this.entrepotForm = this.fb.group({
      nomEntrepot:['',Validators.required],
      adresse:['',Validators.required],
      capacite:['',Validators.required],
      typeEntrepot:['',Validators.required],
      description:['',Validators.required],
      conditionStockage:['',Validators.required]
    })
  }
  ngOnInit() {
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
        alert("Entrepot ajouté avec succès!")
      }
    })
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EntrepotService} from "../services/entrepot.service";
import {Entrepot} from "../models/entrepot";
import { NgxSpinnerService } from "ngx-spinner";
import {Router} from "@angular/router";


//declare function initDataTable() : any;
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
  };
  entrepotToDelete: Entrepot | null = null;

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
      edit_nomEntrepot:['',Validators.required],
      edit_adresse:['',Validators.required],
      edit_capacite:['',Validators.required],
      edit_typeEntrepot:['',Validators.required],
      edit_description:['',Validators.required],
      edit_conditionStockage:['',Validators.required]
    })
  }
  ngOnInit() {
    this.getAllEntrepot();
    //initDataTable();
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
        this.showSuccessMessage = true;
        window.location.reload();
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

  setEntrepotToDelete(entrepot: Entrepot) {
    this.entrepotToDelete = entrepot;
  }
  deleteEntrepot() {
    if (this.entrepotToDelete) {
      this.entrepotService.deleteEntrepot(this.entrepotToDelete).then(() => {
        this.showSuccessMessage = true;
        window.location.reload();
      });
    }
    //$('#deleteModal').modal('hide');
  }

  getAllDetails(entrepot: Entrepot){
    this.entrepotDetail = entrepot;
    this.editForm.reset({
      edit_nomEntrepot: entrepot.nomEntrepot,
      edit_adresse: entrepot.adresse,
      edit_capacite: entrepot.capacite,
      edit_typeEntrepot: entrepot.typeEntrepot,
      edit_description: entrepot.description,
      edit_conditionStockage: entrepot.conditionStockage
    });
  }

  updateEntrepot(entrepot: Entrepot){
    const {value} = this.editForm;
    const champsMisAJour: Partial<Entrepot> = {
      nomEntrepot: value.edit_nomEntrepot,
      adresse: value.edit_adresse,
      capacite: value.edit_capacite,
      typeEntrepot: value.edit_typeEntrepot,
      description: value.edit_description,
      conditionStockage: value.edit_conditionStockage
    };
    this.entrepotService.updateEntrepot(entrepot,champsMisAJour).then(() => {
      this.showSuccessMessage = true;
      window.location.reload();
    })
    this.editForm.reset()
  }
}

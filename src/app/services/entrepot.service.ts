import {Injectable, OnInit} from '@angular/core';
import {addDoc,
        deleteDoc,
        collectionData,
        doc,
        Firestore,
        updateDoc} from "@angular/fire/firestore";
import {collection} from "@firebase/firestore";
import {Entrepot} from "../models/entrepot";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EntrepotService implements OnInit{
  constructor(
    private fs: Firestore
  ) { }
  ngOnInit() {
  }

  //Méthode d'ajout
  addEntrepot(entrepot: Entrepot){
    entrepot.id = doc(collection(this.fs,'id')).id;
    return addDoc(collection(this.fs,'Entrepots'),entrepot);
  }

  //Méthode pour avoir la liste des entrepots
  getEntrepot():Observable<Entrepot[]>{
    let entrepotsRef = collection(this.fs,'Entrepots');
    return collectionData(entrepotsRef,{idField: 'id'}) as Observable<Entrepot[]>
  }

  //Méthode de suppression d'un entrepot
  deleteEntrepot(entrepot: Entrepot){
    let docRef = doc(this.fs,`Entrepots/${entrepot.id}`);
    return deleteDoc(docRef);
  }

  //Méthode de mise à jour d'un entrepot
  updateEntrepot(entrepot: Entrepot,entrepots:any){
    let docRef = doc(this.fs,`Entrepots/${entrepot.id}`);
    return updateDoc(docRef,entrepots);
  }
}

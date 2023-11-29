import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc,deleteDoc, docData, query, updateDoc, where, QueryConstraint } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseDeDatosService {

  constructor(private fbs:Firestore) { }

  //Devuelve una coleccion entera Get de todo
  getColletion(coleccion:string){
    const collectionRef=collection(this.fbs,coleccion);
    return collectionData(collectionRef,{idField:"id"})as Observable<any[]>;
  }

  //Devuelve un documento por su id Get de euno
  getDocumentById(id:string,coleccion:string){
    const documentRef=doc(this.fbs,`${coleccion}/${id}`);
    return docData(documentRef,{idField:"id"}) as Observable<any>;
  }

  //Devuelve el resultado de una consulta Get de uno o varios
  queyCollection(coleccion:string,campo:string,valor:any){
    const coleccionRef=collection(this.fbs,coleccion);
    const queryRef=query(coleccionRef,where(campo,"==",valor))
    return collectionData(queryRef,{idField:"id"})as Observable<any[]>;
  }
  queyDocument(coleccion:string,campo:string,valor:any){
    const coleccionRef=collection(this.fbs,coleccion);
    const queryRef=query(coleccionRef,where(campo,"==",valor))
    return collectionData(queryRef,{idField:"id"})as Observable<any>;
  }
  queyCollection2campos(coleccion:string,campo:string,valor:any,campo2:string,valor2:any){
    const coleccionRef=collection(this.fbs,coleccion);
    const wa:QueryConstraint[] = [where(campo,"==",valor),where(campo2,"==",valor2)];
    //operador rest añade las variables como tal y no como campos
    const queryRef=query(coleccionRef,...wa);
    return collectionData(queryRef,{idField:"id"})as Observable<any[]>;
  }
  
  queyCollectionMayor(coleccion:string,campo:string,valor:any){
    const coleccionRef=collection(this.fbs,coleccion);
    const queryRef=query(coleccionRef,where(campo,">=",valor))
    return collectionData(queryRef,{idField:"id"})as Observable<any[]>;
  }
  queyCollectionMenor(coleccion:string,campo:string,valor:any){
    const coleccionRef=collection(this.fbs,coleccion);
    const queryRef=query(coleccionRef,where(campo,"<",valor))
    return collectionData(queryRef,{idField:"id"})as Observable<any[]>;
  }

  //Crea un nuevo documento Set
  newDocument(doc:any,coleccion:string){
    const colecionRef=collection(this.fbs,coleccion);
    return addDoc(colecionRef,doc);
  }

  //Actualizar un documento Update
  updateDocument(doc1:any,coleccion:string){
    const coleccionRef=doc(this.fbs,`${coleccion}/${doc1.id}`);
    return updateDoc(coleccionRef,doc1);
  }


  //Borrar un documento Delete
  deleteDoc(id:string,coleccion:string){
    const refDocumnet=doc(this.fbs,`${coleccion}/${id}`);
    return deleteDoc(refDocumnet);
  }
}

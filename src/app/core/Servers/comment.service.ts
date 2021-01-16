import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CommentService {

  createComment(tenPhim, comment) {
    return this.firestore.collection(tenPhim).add(comment);
  }
  getPolicies(tenPhim) {
    return this.firestore.collection(tenPhim).snapshotChanges();
  }
  updatePolicy(tenPhim,comment) {
    delete comment.id;
    this.firestore.doc(`${tenPhim}/` + comment.id).update(comment);
  }
  constructor(private firestore: AngularFirestore) {}
}

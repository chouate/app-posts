import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Post } from '../../models/post';
// //@ts-ignore
// const $:any = window['$']

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent  {

  @Input() post: Post | null = null;
  postCopy : Post = null;

  @Output() savePost = new EventEmitter<Post>();
  
  @ViewChild('myModal') myModal: ElementRef;
  

  openModal(){
    if(this.post){
      this.postCopy = { ...this.post}
    }
    //@ts-ignore
    $(this.myModal.nativeElement).modal('show');
  }
  closeModal(){
    //@ts-ignore
    $(this.myModal.nativeElement).modal('hide');
  }
  
  save(): void {
    if (this.post) {
      this.savePost.emit(this.postCopy);
      this.closeModal();
    }
  }


  // open(): void {
  //   document.body.classList.add('modal-open');
  // }

  // close(): void {
  //   document.body.classList.remove('modal-open');
  //   this.post = null;
  // }

  
}

import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalPopupService } from '../modal-popup.service';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.sass']
})

export class ModalPopupComponent implements OnInit {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalPopupService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'modal') {
        this.close();
      }
    });
    this.element.style.display = 'none';
    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    console.log('open');
    this.element.style.display = 'block';
    document.body.classList.add('modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }
}

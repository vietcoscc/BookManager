import {
  Component,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  NgbModalConfig,
  NgbModal,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AlertModalComponent implements OnInit {
  @ViewChild('content') contentModal!: TemplateRef<AlertModalComponent>;

  private modalRef!: NgbModalRef;

  modalTitle: String = 'Alert';
  modalContent: String = '...';
  modalButton: String = 'Ok';
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    // config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
  }

  ngOnInit(): void { }

  open(modalContent: String = '...') {
    this.modalContent = modalContent;
    this.modalRef = this.modalService.open(this.contentModal);
    this.modalRef.result.then();
  }

  okClick() {
    console.log('okClick');
    this.modalService.dismissAll()
  }
}

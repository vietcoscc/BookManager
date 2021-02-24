import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class AlertModalComponent implements OnInit {
  modalTitle: String = 'Alert';
  modalContent: String = '...';
  modalButton: String = 'Ok';
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    // config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {}

  open(content: any) {
    this.modalService.open(content);
  }
}

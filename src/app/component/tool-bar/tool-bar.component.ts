import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.css'],
})
export class ToolBarComponent implements OnInit {

  screenName: string = ''
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {

  }

  public setScreenName(screenName: string) {
    console.log("setScreenName: " + screenName);
    this.screenName = screenName;
    this.changeDetectorRef.detectChanges()
  }
}

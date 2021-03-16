import { DialogType } from "./enum/DialogType"

export class DialogData {
  type: DialogType = DialogType.Alert
  data: any | null = null

  constructor(alert: string, type: DialogType = DialogType.Alert) {
    this.data = alert
    this.type = type
  }

}

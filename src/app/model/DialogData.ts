import { DialogType } from "./enum/DialogType"

export class DialogData {
  type: DialogType = DialogType.Alert
  data: any | null = null

  constructor(alert: string) {
    this.data = alert
  }
}

import { reduce } from "rxjs/operators"

export class Oauth2TokenRequest {
  grant_type: string = ''
  client_id: string = ''
  code: string = ''
  redirect_uri: string = ''

  constructor(grant_type: string = '', client_id: string = '', code: string = '', redirect_uri: string = '') {
    this.grant_type = grant_type;
    this.client_id = client_id;
    this.code = code;
    this.redirect_uri = redirect_uri;
  }
}

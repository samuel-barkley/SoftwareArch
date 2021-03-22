import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderServiceService {
  constructor(private http: HttpClient) {
  }

  httpOptions;

  getSignedUrl(fileType: string): Observable<ArrayBuffer> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': fileType
      })
    };
    return this.http.get('https://e72pvjn85e.execute-api.us-east-1.amazonaws.com/returnPresignedUrl', this.httpOptions);
  }

  // tslint:disable-next-line:typedef
  putFileWithUrl(file: File, url) {
    return this.http.put(url, file, {observe: 'response'});
  }

  // tslint:disable-next-line:typedef
  sendCheckSum(uuid: string, checkSum: string) {
    console.log('------in service---------');
    console.log(uuid);
    console.log(checkSum);
    console.log('------out service--------');

    const HEADERS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const BODY = {
      uuid,
      checkSum
    };
    return this.http.put('https://e72pvjn85e.execute-api.us-east-1.amazonaws.com/addUuidAndChecksum', BODY, HEADERS);
  }

  // tslint:disable-next-line:typedef
  getCheckSum(uuid: string) {
    const HEADERS = {
      headers: new HttpHeaders({
        uuid
      })
    };
    return this.http.get('https://e72pvjn85e.execute-api.us-east-1.amazonaws.com/getChecksum', HEADERS);
  }
}

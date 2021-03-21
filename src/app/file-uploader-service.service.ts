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
    this.httpOptions =
      {
        headers: new HttpHeaders({
          'Content-Type': fileType
        })
      };
    return this.http.get('https://e72pvjn85e.execute-api.us-east-1.amazonaws.com/returnPresignedUrl', this.httpOptions);
  }

  putFileWithUrl(file: File, url): Observable<ArrayBuffer> {
    return this.http.put(url, file, this.httpOptions);
  }
}

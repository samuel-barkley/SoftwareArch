import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderServiceService {
  constructor(private http: HttpClient) { }
  httpOptions;
  //headers = new HttpHeaders().set('content-type', 'image/jpeg');

  getSignedUrl(fileType: string)
  {
    this.httpOptions = 
    {
      headers: new HttpHeaders({
        "Content-Type": fileType
      })
    };
    return this.http.get('https://e72pvjn85e.execute-api.us-east-1.amazonaws.com/returnPresignedUrl', this.httpOptions);
  }

  putFileWithUrl(file: File, url)
  {
    /*
    this.httpOptions = 
    {
      headers: new HttpHeaders({
        ContentType: 'image/jpeg'
      })
    };*/
    
    return this.http.put(url, file, this.httpOptions);
    }
}

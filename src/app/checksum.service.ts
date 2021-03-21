import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChecksumService {

  constructor(private http: HttpClient) { }

  getChecksum()
  {
    
  }
}

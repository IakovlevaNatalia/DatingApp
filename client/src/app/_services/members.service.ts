import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private http = inject (HttpClient);
  baseUrl = environment.apiUrl;
  constructor() { }
}

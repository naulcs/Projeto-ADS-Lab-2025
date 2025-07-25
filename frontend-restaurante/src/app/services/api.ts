    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    import { Prato } from '../models/prato.model';

    @Injectable({
      providedIn: 'root'
    })
    export class ApiService {
      private apiUrl = 'http://localhost:3000';

      constructor(private http: HttpClient) { }

      getPratos() {
        return this.http.get<Prato[]>(`${this.apiUrl}/pratos`);
      }
    }
    
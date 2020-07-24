import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  constructor(
    private http : HttpClient
   ) { }

  url = 'http://localhost:3000/users/';

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url);
  }

  getHerodetail(id: string): Observable<Hero>{
    return this.http.get<Hero>(this.url + id);
  }

  getUpdate(list: Hero): Observable<Hero[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.put<Hero[]>(`${this.url}${list._id}/`, list, httpOptions);
  }

  getAdd(list : Hero): Observable<Hero[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    return this.http.post<Hero[]>(this.url, list, httpOptions)
  }


  deleteHero(id: number): Observable<Hero[]>{
    return this.http.delete<Hero[]>(this.url + id );
  }
}

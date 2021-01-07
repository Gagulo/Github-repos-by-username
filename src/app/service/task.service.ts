import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

import { Repository } from '../models/app.models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {}

  getUserRepos(username?: string): Observable<any> {
    return this.http.get(`https://api.github.com/users/${username}/repos`);
  }

  getBranchesUsingGET(repo: Repository): Observable<any> {
    return this.http.get(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/branches`);
  }
}

export class Utilities {
  static unsubscribeAllSubscriptions(subscriptions: Array<Subscription>): void {
    if (subscriptions) {
      subscriptions.forEach(sub => sub.unsubscribe());
    }
  }
}

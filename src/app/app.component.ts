import { Component, OnDestroy, ViewChild } from '@angular/core';

import { Branch, Repository } from './models/app.models';
import { TaskService, Utilities } from './service/task.service';
import { ModalComponent } from './modal/modal.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  username: string;
  previousUser: string;
  targetValue: boolean;
  repositoriesList: Array<Repository>;
  subscriptions: Array<Subscription>;

  @ViewChild('modal', {static: false}) modal: ModalComponent;

  constructor(private taskService: TaskService) {
    this.repositoriesList = [];
    this.subscriptions = [];
  }

  public getRepos(user: string): void {
    this.targetValue = this.username && this.username.length !== 0;
    if (this.targetValue && this.username !== this.previousUser) {
      this.previousUser = this.username;
      const subscription: Subscription = this.taskService.getUserRepos(user).subscribe(
        (repositories: Array<Repository>) =>
          this.repositoriesList = repositories
            .filter(repository => repository.fork === false),
        error => this.modal.open(3));
      this.subscriptions.push(subscription);
    } else if (this.targetValue && this.username === this.previousUser) {
      this.modal.open(2);
    } else {
      this.modal.open(1);
    }
  }

  public getBranchesList(repo: Repository): void {
    let targetRepository: Repository;
    const subscription: Subscription = this.taskService.getBranchesUsingGET(repo).subscribe(
      (branches: Array<Branch>) => {
        targetRepository = this.repositoriesList.find(target => repo.id === target.id);
        targetRepository.branches = branches;
      },
      error => this.modal.open(3));
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    Utilities.unsubscribeAllSubscriptions(this.subscriptions);
  }
}

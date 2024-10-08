import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit,OnDestroy {
  show = false;

  private subscription:Subscription = new Subscription();
  constructor(private loaderService : LoaderService) { }

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState.subscribe((state : LoaderState) => {
      this.show = state.show;
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}

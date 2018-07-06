import { Component, OnInit, Input } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from "rxjs";


@Component({
  selector: 'fifteen-time-counter',
  templateUrl: './time-counter.component.html',
  styleUrls: ['./time-counter.component.scss']
})
export class TimeCounterComponent implements OnInit {

  private seconds: number = 0;
  private subscription: Subscription;

  ngOnInit() {

  }

  get isRunning(): boolean {
    return Boolean(this.subscription);
  }

  start(): void {
    if (this.isRunning) {
      return;
    }
    this.subscription = IntervalObservable.create(1000).subscribe(() => {
      this.seconds++;
    });
  }

  stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.subscription.unsubscribe();
    this.subscription = null;
  }

  reset(): void {
    this.seconds = 0;
  }

  public getTime(): number {
    return this.seconds;
  }

  public getTimeSeconds(): number {
      return this.seconds;
  }

  public toggleState($event) {
    if ($event) {
      this.start();
    }
    else {
      this.stop();
    }
  }

}

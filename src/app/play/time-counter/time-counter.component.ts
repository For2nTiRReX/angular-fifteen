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
  private minutes: number = 0;
  private hours: number = 0;
  private time: string = "00:00:00";
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
      if (this.seconds >= 60) {
        this.seconds = 0;
        this.minutes++;
        if (this.minutes >= 60) {
          this.minutes = 0;
          this.hours++;
        }
      }
      this.time = (this.hours ? (this.hours > 9 ? this.hours : "0" + this.hours) : "00") + ":" + (this.minutes ? (this.minutes > 9 ? this.minutes : "0" + this.minutes) : "00") + ":" + (this.seconds > 9 ? this.seconds : "0" + this.seconds);
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
    this.minutes = 0;
    this.hours = 0;
    this.time = "00:00:00";
  }

  public getTime(): string {
    return this.time;
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

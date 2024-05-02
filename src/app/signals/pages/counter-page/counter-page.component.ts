import { Component, computed, Signal, signal, WritableSignal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {
  
  public counter: WritableSignal<number> = signal(10);
  public squaredCounter: Signal<number> = computed(() => this.counter() * this.counter())

  public increaseBy( value: number) {
    //this.counter.set(this.counter() + value);
    this.counter.update(current => current + value);
  }
}

import { Component, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent {

  public counter = signal<number>(10);

  public user = signal<User>({
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  });

  public fullName = computed<string>(() => `${this.user().first_name} ${this.user().last_name}`);

  public userChangedEffect = effect(() => {
    console.log(`effect => ${this.user().first_name} - ${this.counter()}`);
  });

  public increaseBy(value: number) {
    this.counter.update(current => current + value);
  }

  public onFieldUpdated(field: keyof User, value: string) {
    
    this.user.update( current => ({
      ...current,
      [field]: value
    }));
  }
}

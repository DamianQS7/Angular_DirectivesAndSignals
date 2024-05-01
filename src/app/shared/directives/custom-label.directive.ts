import { Directive, ElementRef, Inject, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective {

  private _color: string ='red';
  private _errors?: ValidationErrors | null;
  private htmlElement?: ElementRef<HTMLElement>;

  @Input()
  public set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  @Input()
  public set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  constructor(private element: ElementRef<HTMLElement>) { 
    this.htmlElement = element;

    this.htmlElement.nativeElement.innerHTML = 'Hola Mundo';
  }

  public setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  public setErrorMessage(): void {
    if (!this.htmlElement) return;
    
    if (!this._errors) {
      this.htmlElement.nativeElement.innerHTML = 'No errors';
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerHTML = 'This is a required field';
      return;
    }

    if (errors.includes('minlength')) {
      const min = this._errors!['minlength']['requiredLength'];
      const current = this._errors!['minlength']['actualLength'];
      this.htmlElement.nativeElement.innerHTML = `You need ${current}/${min} characters`;
      return;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerHTML = 'A valid email address is required';
      return;
    }
  }
}

import { AfterViewInit, ViewChild, Component, ElementRef } from '@angular/core';
import { ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { Canvas } from './Canvas';
import { CommonModule } from '@angular/common';
import { ModalService } from '@service/modal.service';

@Component({
    selector: 'app-hanged',
    imports: [
        ReactiveFormsModule, CommonModule
    ],
    templateUrl: './hanged.component.html',
    styleUrls: ['./hanged.component.css']
})
export class HangedComponent implements AfterViewInit {
  constructor(private popup: ModalService) {}
  @ViewChild('canvasRef', { static: false }) canvasRef: ElementRef =
    {} as ElementRef;

  inputControl = new UntypedFormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z]+$/),
  ]);
  inputTwoControl = new UntypedFormControl('', [
    Validators.required,
    Validators.pattern(/[A-Za-z]/),
    Validators.maxLength(1),
  ]);
  visibility: boolean = true;

  ngAfterViewInit(): void {
    if (this.canvasRef.nativeElement.getContext('2d') != null) {
      new Canvas(this.canvasRef.nativeElement.getContext('2d'));
    }
    Canvas.render();
  }
  addWord() {
    this.popup.showMessage('Palabra agregada');
    Canvas.addPalabra(this.inputControl.value);
  }
  start() {
    this.visibility = false;
    Canvas.getWord();
    this.inputControl.setValue('');
  }
  try() {
    const letter: string = this.inputTwoControl.value;
    Canvas.evaluateLetter(letter.toUpperCase());
    this.inputTwoControl.reset();
  }
  reload() {
    this.canvasRef.nativeElement.clearRect(0, 0, 320, 400);
    Canvas.render();
    this.visibility = true;
    this.inputControl.setValue('');
    Canvas.reset();
  }
  moreInfo() {
    this.popup.showMessage(
      `Opcionalmente puede agregar una nueva palabra al juego, evite los numeros o caracteres especiales.`
    );
  }
}

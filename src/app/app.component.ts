import { Component } from '@angular/core';
import {
  PrimaryButton,
  IButtonProps,
} from '@fluentui/react';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  buttonComponent = PrimaryButton;
  counter: number = 0;
  buttonProps: IButtonProps = {
    onClick: () => this.counter++,
  };}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateBuilderComponent } from './template/template-builder/template-builder/template-builder.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, TemplateBuilderComponent],
})
export class AppComponent {
  title = 'template-builder';
}

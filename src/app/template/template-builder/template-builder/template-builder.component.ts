import { Component } from '@angular/core';
import { TemplateManagerService } from '../../template-manager/template-manager.service';
import { CommonModule } from '@angular/common';
import { ComponentType } from '../model/template.model';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-builder',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './template-builder.component.html',
  styleUrl: './template-builder.component.scss',
})
export class TemplateBuilderComponent {
  template$ = this.templateManager.template$;
  ComponentType = ComponentType;

  constructor(private templateManager: TemplateManagerService) {}
}

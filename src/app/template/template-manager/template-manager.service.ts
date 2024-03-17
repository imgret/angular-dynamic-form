import { Injectable } from '@angular/core';
import {
  ComponentType,
  PTemplate,
  createComponent,
} from '../template-builder/model/template.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemplateManagerService {
  template$: Observable<Readonly<PTemplate>>;

  private template: PTemplate;
  private _template$: BehaviorSubject<PTemplate>;

  constructor() {
    this.template = new PTemplate('TemplateX', null);
    this.template.addComponent(
      createComponent(ComponentType.TEXT, 'TemplateX_Summary', {
        value: 'Placeholder text',
        fontSize: 'PARAGRAPH',
        mode: 'FIXED',
      }),
    );
    this.template.addComponent(
      createComponent(ComponentType.IMAGE, 'TemplateX_Image', {
        url: 'https://placehold.co/400',
      }),
    );

    this._template$ = new BehaviorSubject(this.template);
    this.template$ = this._template$.asObservable();
  }
}

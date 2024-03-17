import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

export class PTemplate {
  public readonly form = new FormGroup({});

  constructor(
    public title: string,
    public description: string | null = null,
    private _components: PComponent[] = [],
  ) {}

  get components(): ReadonlyArray<PComponent> {
    return this._components;
  }

  addComponent(component: PComponent) {
    this._components.push(component);
    this.form.addControl(component.identifier, component.getControl());
  }
}

export const ComponentType = {
  TEXT: 'TEXT',
  IMAGE: 'IMAGE',
} as const;

export type OComponentType = typeof ComponentType;

export type ComponentType = (typeof ComponentType)[keyof typeof ComponentType];

export abstract class PComponent<T extends ComponentType = ComponentType> {
  abstract readonly type: T;
  protected abstract readonly form: AbstractControl<unknown>;

  constructor(
    public readonly identifier: string,
    public readonly parameters: Record<string, unknown>,
  ) {}

  isTextComponent(): this is PTextComponent {
    return this instanceof PTextComponent;
  }

  isImageComponent(): this is PImageComponent {
    return this instanceof PImageComponent;
  }

  abstract getControl(): AbstractControl<unknown>;
}

type TextComponentParameters = {
  value: string;
  fontSize: 'PARAGRAPH' | 'HEADING1';
  mode: 'FIXED' | 'EDITABLE';
};

class PTextComponent extends PComponent<typeof ComponentType.TEXT> {
  override readonly type = ComponentType.TEXT;

  protected override readonly form;

  constructor(identifier: string, parameters: TextComponentParameters) {
    super(identifier, parameters);
    this.form = new FormGroup({
      value: new FormControl(parameters.value),
      fontSize: new FormControl(parameters.fontSize),
      mode: new FormControl(parameters.mode),
    });
  }

  override getControl() {
    return this.form;
  }
}

type ImageComponentParameters = {
  url: string;
};

class PImageComponent extends PComponent<typeof ComponentType.IMAGE> {
  override readonly type = ComponentType.IMAGE;

  protected override readonly form;

  constructor(identifier: string, parameters: ImageComponentParameters) {
    super(identifier, parameters);
    this.form = new FormGroup({ url: new FormControl(parameters.url) });
  }

  override getControl() {
    return this.form;
  }
}

export function createComponent(
  type: typeof ComponentType.TEXT,
  ...args: ConstructorParameters<typeof PTextComponent>
): PTextComponent;
export function createComponent(
  type: typeof ComponentType.IMAGE,
  ...args: ConstructorParameters<typeof PImageComponent>
): PImageComponent;
export function createComponent(
  type: ComponentType,
  ...[identifier, parameters]: ConstructorParameters<typeof PComponent>
): PComponent {
  if (type === ComponentType.TEXT && isTextComponentParameters(parameters)) {
    return new PTextComponent(identifier, parameters);
  }
  if (type === ComponentType.IMAGE && isImageComponentParameters(parameters)) {
    return new PImageComponent(identifier, parameters);
  }
  throw new Error(
    `Can't create a component with ${type} type and ${parameters} parameters`,
  );
}

function isTextComponentParameters(
  parameters: Record<string, unknown>,
): parameters is TextComponentParameters {
  return (
    // TODO: validate types
    'value' in parameters && 'fontSize' in parameters && 'mode' in parameters
  );
}

function isImageComponentParameters(
  parameters: Record<string, unknown>,
): parameters is ImageComponentParameters {
  // TODO: validate types
  return 'url' in parameters;
}

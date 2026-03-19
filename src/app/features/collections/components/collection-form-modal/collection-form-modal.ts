import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-collection-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './collection-form-modal.html',
  styleUrl: './collection-form-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionFormModal {
  private readonly dialogRef = inject(DialogRef<{ name: string; tag: string }>);
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    tag: ['', Validators.required],
  });

  readonly tagOptions = ['production', 'staging', 'development'];

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.getRawValue() as { name: string; tag: string });
  }

  cancel(): void {
    this.dialogRef.close();
  }
}

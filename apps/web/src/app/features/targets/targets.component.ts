import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Target } from '@api-resp-differ/api-client';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TargetCardComponent } from './target-card/target-card.component';
import { TargetsService } from './targets.service';

@Component({
  selector: 'app-targets',
  imports: [ReactiveFormsModule, ModalComponent, TargetCardComponent],
  templateUrl: './targets.component.html',
  styleUrl: './targets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TargetsComponent implements OnInit {
  private readonly targetsService = inject(TargetsService);
  private readonly fb = inject(FormBuilder);

  readonly targets = signal<Target[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly submitting = signal(false);

  private readonly createModal = viewChild.required<ModalComponent>('createModal');
  private readonly editModal = viewChild.required<ModalComponent>('editModal');

  private editingId = signal<string | null>(null);

  readonly createForm = this.fb.nonNullable.group({
    url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    tag: [''],
    color: [''],
  });

  readonly editForm = this.fb.nonNullable.group({
    url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    tag: [''],
    color: [''],
  });

  async ngOnInit(): Promise<void> {
    await this.loadTargets();
  }

  private async loadTargets(): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    try {
      const result = await this.targetsService.getAll();
      this.targets.set(result);
    } catch {
      this.error.set('Failed to load targets.');
    } finally {
      this.loading.set(false);
    }
  }

  openCreateModal(): void {
    this.createForm.reset();
    this.createModal().open();
  }

  async submitCreate(): Promise<void> {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    try {
      const { url, tag, color } = this.createForm.getRawValue();
      const created = await this.targetsService.create({
        url,
        tag: tag || undefined,
        color: color || undefined,
      });
      this.targets.update((list) => [created, ...list]);
      this.createModal().close();
    } catch {
      this.error.set('Failed to create target.');
    } finally {
      this.submitting.set(false);
    }
  }

  openEditModal(target: Target): void {
    this.editingId.set(target.id);
    this.editForm.reset({
      url: target.url,
      tag: target.tag ?? '',
      color: target.color ?? '',
    });
    this.editModal().open();
  }

  async submitEdit(): Promise<void> {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    const id = this.editingId();
    if (!id) return;

    this.submitting.set(true);
    try {
      const { url, tag, color } = this.editForm.getRawValue();
      const updated = await this.targetsService.update(id, {
        url,
        tag: tag || undefined,
        color: color || undefined,
      });
      this.targets.update((list) => list.map((t) => (t.id === id ? updated : t)));
      this.editModal().close();
    } catch {
      this.error.set('Failed to update target.');
    } finally {
      this.submitting.set(false);
    }
  }

  async deleteTarget(id: string): Promise<void> {
    try {
      await this.targetsService.remove(id);
      this.targets.update((list) => list.filter((t) => t.id !== id));
    } catch {
      this.error.set('Failed to delete target.');
    }
  }
}

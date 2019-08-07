import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromTreeReducer from '../../store/tree-item.reducer';
import * as fromTreeSelectors from '../../store/tree-item.selectors';
import { filter, tap } from 'rxjs/operators';
import { ITreeItem } from '../../store/tree-item.model';
import { TreeItemsService } from '../../services/tree-items.service';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeItemComponent implements OnInit {
  @Input() id: string;

  model: ITreeItem;
  definition: ITreeItem | undefined = undefined;

  constructor(
    private store: Store<fromTreeReducer.ITreeState>,
    private treeService: TreeItemsService, // necessary to instantiate service
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscribeToChanges();
  }

  private subscribeToChanges() {
    this.store
      .pipe(
        select(fromTreeSelectors.selectTreeItemById(), { id: this.id }),
        filter((definition: ITreeItem) => definition !== this.definition),
        tap((definition: ITreeItem) => (this.definition = definition))
      )
      .subscribe((definition: ITreeItem) => {
        console.log('\tsub in', `[${this.id}]`, definition);
        this.cdr.markForCheck();
      });
  }
}

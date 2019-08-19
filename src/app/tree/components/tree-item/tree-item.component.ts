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
import { ITreeItem, TreeItemTypes } from '../../store/tree-item.model';
import { TreeItemsService } from '../../services/tree-items.service';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeItemComponent implements OnInit {
  @Input() id: string;

  definition: ITreeItem | undefined = undefined;
  TreeItemTypes = TreeItemTypes;

  get childIds(): string[] {
    return this.definition.childIds;
  }

  get children(): ITreeItem[] {
    return this.treeService.getItemChildren(this.id);
  }

  // TODO: check why triggered multiple times - optimize with _activeChildIndex private var
  get activeChildIndex(): number {
    return this.treeService.getActiveChildIndex(this.id);
    // return (this.definition && this.definition.state.activeChildIndex) || 0;
  }

  get activeChildId(): string {
    return this.treeService.getActiveChildId(this.id);
    // return this.childIds[this.activeChildIndex];
  }

  get activeChild(): ITreeItem {
    return this.treeService.getActiveChild(this.id);
    // return this.children[this.activeChildIndex];
  }

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

  // TODO: how to handle resizing all the nested components down to bottom?
  onTabChange(event: MatTabChangeEvent) {
    console.log('Tab was changed - resize inner children here', event);
    this.treeService.updateItemState(this.id, {
      activeChildIndex: event.index
    });
    const allActiveChildren = this.treeService.traverseAllActiveChildren(
      this.id
    ); // handles nested children
    console.log(this.id, 'allActiveChildren', allActiveChildren);
  }
}

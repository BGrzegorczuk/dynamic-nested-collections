import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromTreeReducer from './store/tree-item.reducer';
import * as fromTreeSelectors from './store/tree-item.selectors';
import { LoadTreeItems } from './store/tree-item.actions';
import { treeItemsDB } from './DB/fakeDB';
import { ITreeItem } from './store/tree-item.model';
import { TreeItemsService } from './services/tree-items.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent implements OnInit {
  rootItems: ITreeItem[];

  constructor(
    private store: Store<fromTreeReducer.ITreeState>,
    private treeService: TreeItemsService // necessary to instantiate service
  ) {}

  ngOnInit() {
    this.store
      .pipe(
        select(fromTreeSelectors.selectAll),
        map((items: ITreeItem[]) =>
          items.filter((item: ITreeItem) => !item.parentId)
        ),
        filter((items: ITreeItem[]) => !!items.length)
      ).subscribe((items: ITreeItem[]) => {
        this.rootItems = items;
        console.log('rootItems', this.rootItems);
      });

    // fake API request
    this.store.dispatch(new LoadTreeItems({ treeItems: treeItemsDB as ITreeItem[] }));
  }
}

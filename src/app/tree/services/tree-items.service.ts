import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Dictionary, Update } from '@ngrx/entity';

import { remove } from 'lodash';

import { ITreeState } from '../store/tree-item.reducer';
import * as fromTreeActions from '../store/tree-item.actions';
import * as fromTreeSelectors from '../store/tree-item.selectors';
import { ITreeItem } from '../store/tree-item.model';

@Injectable()
export class TreeItemsService {
  treeEntities: Dictionary<ITreeItem> = {};

  constructor(private store: Store<ITreeState>) {
    (window as any).TreeItemsService = this;
    this.store
      .pipe(select(fromTreeSelectors.selectEntities))
      .subscribe(
        (entities: Dictionary<ITreeItem>) => (this.treeEntities = entities)
      );
  }

  updateItemContent(itemId: string, changes: Partial<ITreeItem>) {
    const item = this.treeEntities[itemId];

    if (!item) {
      return alert('Item does not exist!');
    }

    this.store.dispatch(
      new fromTreeActions.UpdateTreeItem({
        treeItem: {
          id: itemId,
          changes: {
            content: {
              ...item.content,
              ...changes
            }
          }
        }
      })
    );
  }

  // TODO: handle moving to root item (null parentId)
  moveItem(movedItemId, newParentId) {

    const movedEntity = this.treeEntities[movedItemId];
    const moveToRoot = newParentId === null;
    const moveFromRoot = movedEntity.parentId === null;
    const newParentEntity = this.treeEntities[newParentId]; // TODO: does not handle null
    const oldParentEntity = this.treeEntities[movedEntity.parentId]; // TODO: does not handle null

    console.log('moveItem', movedItemId, newParentId);
    console.log('\ttreeEntities', this.treeEntities);

    // TODO: check following conditions:
    //  - particular item can be "moved" to the same parent only once (uniqueness)
    //  - check if moved item exists in given parent
    //  - avoid circularity
    const operationInvalid = (
      newParentEntity.childIds.indexOf(movedItemId) >= 0 ||
      (oldParentEntity && oldParentEntity.childIds.indexOf(movedItemId) < 0)
    );

    if (operationInvalid) {
      return alert('Operation Invalid');
    }

    const updatedTreeItems: Update<ITreeItem>[] = [
      {
        id: movedItemId,
        changes: {
          parentId: newParentId
        }
      },
      {
        id: newParentId,
        changes: {
          childIds: [
            ...newParentEntity.childIds,
            movedItemId
          ]
        }
      }
    ];

    // remove moved item from old parent children, if necessary
    if (oldParentEntity) {
      updatedTreeItems.push({
        id: oldParentEntity.id,
        changes: {
          childIds: remove([...oldParentEntity.childIds], (cid) => cid !== movedItemId)
        }
      })
    }

    this.store.dispatch(
      new fromTreeActions.UpdateTreeItems({
        treeItems: updatedTreeItems
      })
    );
  }
}

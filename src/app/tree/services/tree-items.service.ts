import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Dictionary, Update } from '@ngrx/entity';

import { remove } from 'lodash';

import { ITreeState } from '../store/tree-item.reducer';
import * as fromTreeActions from '../store/tree-item.actions';
import * as fromTreeSelectors from '../store/tree-item.selectors';
import { ITreeItem, ITreeItemState } from '../store/tree-item.model';

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

  updateItemState(itemId: string, stateChanges: Partial<ITreeItemState>) {
    const item = this.treeEntities[itemId];

    if (!item) {
      return alert('Item does not exist!');
    }

    this.store.dispatch(
      new fromTreeActions.UpdateTreeItem({
        treeItem: {
          id: itemId,
          changes: {
            state: {
              ...item.state,
              ...stateChanges
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
    const operationInvalid =
      newParentEntity.childIds.indexOf(movedItemId) >= 0 ||
      (oldParentEntity && oldParentEntity.childIds.indexOf(movedItemId) < 0);

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
          childIds: [...newParentEntity.childIds, movedItemId]
        }
      }
    ];

    // remove moved item from old parent children, if necessary
    if (oldParentEntity) {
      updatedTreeItems.push({
        id: oldParentEntity.id,
        changes: {
          childIds: remove(
            [...oldParentEntity.childIds],
            cid => cid !== movedItemId
          )
        }
      });
    }

    this.store.dispatch(
      new fromTreeActions.UpdateTreeItems({
        treeItems: updatedTreeItems
      })
    );
  }

  /* Returns all visible item down the tree, to the very bottom */
  traverseAllChildren(itemId: string): ITreeItem[] {
    const treeEntities = this.treeEntities;
    const firstItem = treeEntities[itemId];
    const allChildren = [];

    // tslint:disable-next-line:variable-name
    function _getChildren(parentItem: ITreeItem) {
      for (const id of parentItem.childIds) {
        const item = treeEntities[id];
        allChildren.push(item);
        _getChildren(item);
      }

      return allChildren;
    }

    return _getChildren(firstItem);
  }

  /* Returns all visible item down the tree, to the very bottom */
  traverseAllActiveChildren(itemId: string): ITreeItem[] {
    const treeEntities = this.treeEntities;
    const firstItem = treeEntities[itemId];
    const activeChildren = [];
    const getActiveChildFn = this.getActiveChild.bind(this);

    // tslint:disable-next-line:variable-name
    function _getActiveChildren(parentItem: ITreeItem) {
      const activeChild = getActiveChildFn(parentItem.id);

      if (activeChild) {
        activeChildren.push(activeChild);
        return _getActiveChildren(activeChild);
      } else {
        return activeChildren;
      }
    }

    return _getActiveChildren(firstItem);
  }

  getItemChildren(itemId: string) {
    const childIds = this.treeEntities[itemId].childIds;
    return childIds.map(id => this.treeEntities[id]);
  }

  getActiveChildIndex(parentItemId: string): number {
    const parentItem = this.treeEntities[parentItemId];
    return parentItem.state.activeChildIndex || 0;
  }

  getActiveChildId(parentItemId: string): string {
    return this.getActiveChild(parentItemId).id;
  }

  getActiveChild(parentItemId: string) {
    const parentItem = this.treeEntities[parentItemId];
    const activeChildIndex = this.getActiveChildIndex(parentItemId);
    const childItemId = parentItem.childIds[activeChildIndex];
    return this.treeEntities[childItemId];
  }
}

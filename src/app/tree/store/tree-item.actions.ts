import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ITreeItem } from './tree-item.model';

export enum TreeItemActionTypes {
  LoadTreeItems = '[TreeItem] Load TreeItems',
  AddTreeItem = '[TreeItem] Add TreeItem',
  UpsertTreeItem = '[TreeItem] Upsert TreeItem',
  AddTreeItems = '[TreeItem] Add TreeItems',
  UpsertTreeItems = '[TreeItem] Upsert TreeItems',
  UpdateTreeItem = '[TreeItem] Update TreeItem',
  UpdateTreeItems = '[TreeItem] Update TreeItems',
  DeleteTreeItem = '[TreeItem] Delete TreeItem',
  DeleteTreeItems = '[TreeItem] Delete TreeItems',
  ClearTreeItems = '[TreeItem] Clear TreeItems'
}

export class LoadTreeItems implements Action {
  readonly type = TreeItemActionTypes.LoadTreeItems;

  constructor(public payload: { treeItems: ITreeItem[] }) {}
}

export class AddTreeItem implements Action {
  readonly type = TreeItemActionTypes.AddTreeItem;

  constructor(public payload: { treeItem: ITreeItem }) {}
}

export class UpsertTreeItem implements Action {
  readonly type = TreeItemActionTypes.UpsertTreeItem;

  constructor(public payload: { treeItem: ITreeItem }) {}
}

export class AddTreeItems implements Action {
  readonly type = TreeItemActionTypes.AddTreeItems;

  constructor(public payload: { treeItems: ITreeItem[] }) {}
}

export class UpsertTreeItems implements Action {
  readonly type = TreeItemActionTypes.UpsertTreeItems;

  constructor(public payload: { treeItems: ITreeItem[] }) {}
}

export class UpdateTreeItem implements Action {
  readonly type = TreeItemActionTypes.UpdateTreeItem;

  constructor(public payload: { treeItem: Update<ITreeItem> }) {}
}

export class UpdateTreeItems implements Action {
  readonly type = TreeItemActionTypes.UpdateTreeItems;

  constructor(public payload: { treeItems: Update<ITreeItem>[] }) {}
}

export class DeleteTreeItem implements Action {
  readonly type = TreeItemActionTypes.DeleteTreeItem;

  constructor(public payload: { id: string }) {}
}

export class DeleteTreeItems implements Action {
  readonly type = TreeItemActionTypes.DeleteTreeItems;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearTreeItems implements Action {
  readonly type = TreeItemActionTypes.ClearTreeItems;
}

export type TreeItemActions =
 LoadTreeItems
 | AddTreeItem
 | UpsertTreeItem
 | AddTreeItems
 | UpsertTreeItems
 | UpdateTreeItem
 | UpdateTreeItems
 | DeleteTreeItem
 | DeleteTreeItems
 | ClearTreeItems;

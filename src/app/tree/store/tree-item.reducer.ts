import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ITreeItem } from './tree-item.model';
import { TreeItemActions, TreeItemActionTypes } from './tree-item.actions';

export const treeItemsFeatureKey = 'treeItems';

export interface ITreeState extends EntityState<ITreeItem> {
  // additional entities state properties
}

export const adapter: EntityAdapter<ITreeItem> = createEntityAdapter<ITreeItem>();

export const initialTreeState: ITreeState = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialTreeState,
  action: TreeItemActions
): ITreeState {
  switch (action.type) {
    case TreeItemActionTypes.AddTreeItem: {
      return adapter.addOne(action.payload.treeItem, state);
    }

    case TreeItemActionTypes.UpsertTreeItem: {
      return adapter.upsertOne(action.payload.treeItem, state);
    }

    case TreeItemActionTypes.AddTreeItems: {
      return adapter.addMany(action.payload.treeItems, state);
    }

    case TreeItemActionTypes.UpsertTreeItems: {
      return adapter.upsertMany(action.payload.treeItems, state);
    }

    case TreeItemActionTypes.UpdateTreeItem: {
      return adapter.updateOne(action.payload.treeItem, state);
    }

    case TreeItemActionTypes.UpdateTreeItems: {
      return adapter.updateMany(action.payload.treeItems, state);
    }

    case TreeItemActionTypes.DeleteTreeItem: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TreeItemActionTypes.DeleteTreeItems: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case TreeItemActionTypes.LoadTreeItems: {
      return adapter.addAll(action.payload.treeItems, state);
    }

    case TreeItemActionTypes.ClearTreeItems: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

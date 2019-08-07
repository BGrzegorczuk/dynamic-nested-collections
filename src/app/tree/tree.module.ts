import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { TreeComponent } from './tree.component';
import * as fromTreeReducer from './store/tree-item.reducer';
import { TreeItemComponent } from './components/tree-item/tree-item.component';
import { TreeItemsService } from './services/tree-items.service';

@NgModule({
  declarations: [TreeComponent, TreeItemComponent],
  exports: [TreeComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromTreeReducer.treeItemsFeatureKey,
      fromTreeReducer.reducer
    )
  ],
  providers: [TreeItemsService]
})
export class TreeModule {}

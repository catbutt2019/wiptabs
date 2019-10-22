import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
      
            path: 'tab1',
            loadChildren: '../tab1/tab1.module#Tab1PageModule'
       
      },
    
          {
            path: 'tab2',
            loadChildren: '../tab2/tab2.module#Tab2PageModule'
          },
  
      {
            path: 'tab3',
            loadChildren: '../tab3/tab3.module#Tab3PageModule'
      },
          {
            path: 'tab4',
            loadChildren: '../tab4/tab4.module#Tab4PageModule'
      },
          {
         path: 'details/:id', 
         loadChildren: '../details/details.module#DetailsPageModule' 
      },
         { path: 'details-feed/:id',
          loadChildren: '../details-feed/details-feed.module#DetailsFeedPageModule' 
        }

    
    ]
  } 
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}

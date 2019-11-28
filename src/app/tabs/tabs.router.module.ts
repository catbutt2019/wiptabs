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
      { path: 'follow-projects', 
        loadChildren: '../follow-projects/follow-projects.module#FollowProjectsPageModule' },
          {
         path: 'details/:id', 
         loadChildren: '../details/details.module#DetailsPageModule' 
      },
         { path: 'details-feed/:id',
          loadChildren: '../details-feed/details-feed.module#DetailsFeedPageModule' 
      },
         { path: 'edit-profile', 
         loadChildren: '../edit-profile/edit-profile.module#EditProfilePageModule'
      },

         { path: 'details-wipped/:id', 
         loadChildren: '../details-wipped/details-wipped.module#DetailsWippedPageModule' 
         },

         { path: 'users-profile', 
         loadChildren: '../users-profile/users-profile.module#UsersProfilePageModule' }
         ,
         { path: 'favorites',
          loadChildren: '../favorites/favorites.module#FavoritesPageModule' },

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

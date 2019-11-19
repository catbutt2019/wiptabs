import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  posts:  Array<any>;
  sub
  postsWipping
  ajax

  constructor(
    private aff: AngularFireFunctions,
    public toastController: ToastController
    ) {
   
  }
  ngOnInit() {
    this.tabTwoFeedInit();
    }

    async  doSomething() {
      const toast = await this.toastController.create({
        message: 'Added to favorites.',
        duration: 2000
      });
      toast.present();
    }

    tabTwoFeedInit (){    
      const getFeed = this.aff.httpsCallable('getFeed')
      this.ajax = getFeed({}).subscribe(data=> {
        console.log(data)
        this.posts =  data 
          })  
      }
  
   
    tabTwoFeed (event){    
      const getFeed = this.aff.httpsCallable('getFeed')
      this.ajax = getFeed({}).subscribe(data=> {
        console.log(data)
        this.posts =  data
          })  

          setTimeout(()=>{
            event.target.complete();
          },2000);
      }



      
  
    ngOnDestroy() {
      this.sub.unsubscribe()
    }

   
  

}
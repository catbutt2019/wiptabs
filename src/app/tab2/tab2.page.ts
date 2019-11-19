import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions'


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

  constructor(private aff: AngularFireFunctions) {
   
  }
  ngOnInit() {
    this.tabTwoFeedInit();
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

    doSomething() {
      console.log('doubletapped!')
    }
  

}
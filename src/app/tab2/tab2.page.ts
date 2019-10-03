import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions'


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  posts =[];
  sub
  postsWipping
  ajax

  constructor(private aff: AngularFireFunctions) {}
  ngOnInit() {
  
    const getFeed = this.aff.httpsCallable('getFeed')
    this.ajax = getFeed({}).subscribe(data=> {
      console.log(data)
      this.posts = data
        })

     
  
      
    }
      //coment
  
    ngOnDestroy() {
      this.sub.unsubscribe()
    }
  

}
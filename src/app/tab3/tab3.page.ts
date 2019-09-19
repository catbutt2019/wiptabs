import { Component } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions'

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  posts
  sub
  constructor(private aff: AngularFireFunctions) {}
  ngOnInit() {

    const getWipping = this.aff.httpsCallable('getWipping')
    this.posts = getWipping({}).subscribe(data=> {
      console.log(data)
     this.posts = data
        })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}

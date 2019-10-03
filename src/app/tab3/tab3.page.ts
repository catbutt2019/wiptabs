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
  ajax
  constructor(private aff: AngularFireFunctions) {}
  ngOnInit() {

    const getFeed = this.aff.httpsCallable('getWipping')
    this.ajax = getFeed({}).subscribe(data=> {
      console.log(data)
      this.posts = data
        })

  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}

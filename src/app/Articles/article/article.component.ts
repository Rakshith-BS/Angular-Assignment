import { ArticleService } from './../article.service';
import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { FormControl, FormGroup, NgForm } from '@angular/forms';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  allArticles: Article[];
  check;
  continuedTrip = false;

  articleForm = new FormGroup({
    start: new FormControl(''),
    end: new FormControl('')
  });

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.getAllArticles();
  }

  getAllArticles(){
    this.articleService.getAllArticles().subscribe(res => {
      this.allArticles = res;
      // this.createRoute();
    });
  }

  onSubmit(form: NgForm) {
    this.articleService.createArticle(form).subscribe(res => {
      this.getAllArticles();
      this.articleForm.reset();
    });
  }

  createRoute(curr, index) {
   if(index > 0){
    if(curr.start === this.allArticles[index-1].end){
      return false;
    }else if((curr.start === this.allArticles[index-1].start) && ( curr.end === this.allArticles[index-1].end)){
      return false;
    }else {
      return true;
    }
   }else {
     return false;
   }
  }

}

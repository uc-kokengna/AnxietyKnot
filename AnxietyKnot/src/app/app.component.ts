import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from "./post.model";
import { Subject, Subscription } from "rxjs";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'AnxietyKnot';
  posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private postsSub!: Subscription;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getPosts();
    this.postsSub = this.getPostUpdateListener()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  getPosts() {
    this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postData) => {
      this.posts = postData.posts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

}


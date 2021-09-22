import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from "./post.model";
import { Subject, Subscription } from "rxjs";
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';

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
    this.http.get<{message: string; posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map((post: { title: any; content: any; _id: any; }) => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe(transformedPosts => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: "", title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>("http://localhost:3000/api/posts", post)
      .subscribe(responseData => {
        const id = responseData.postId;
        post.id = id;
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

  onDelete(postId: string) {
    this.deletePost(postId);
  }

  deletePost(postId: string) {
    this.http.delete("http://localhost:3000/api/posts/" + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

}


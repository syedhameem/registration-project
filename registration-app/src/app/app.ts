import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  user = {
    name: '',
    email: '',
    mobile: '',
    age: null,
    date_of_birth: '',
    gender: ''
  };

  message = '';
  errorMessage = '';

  constructor(private http: HttpClient) {}

  registerUser() {

    this.message = '';
    this.errorMessage = '';

    this.http.post(
      'https://advances-pub-implemented-investment.trycloudflare.com/api/register',
      this.user
    ).subscribe({

      next: (response: any) => {

        this.message = response.message;

        this.user = {
          name: '',
          email: '',
          mobile: '',
          age: null,
          date_of_birth: '',
          gender: ''
        };

      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          error.error?.message ||
          'Registration failed. Please try again.';

      }

    });
  }
}
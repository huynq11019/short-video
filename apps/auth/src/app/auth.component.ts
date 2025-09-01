import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { createClient } from '@supabase/supabase-js';
import { setToken, authEventBus, AUTH_EVENTS } from '@short-video/shared-utils';

const supabaseUrl = 'SUPABASE_URL';
const supabaseKey = 'SUPABASE_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

@Component({
  selector: 'app-root',
  template: `
    <h2>Login</h2>
    <form [formGroup]="loginForm" (ngSubmit)="login()">
      <input type="email" formControlName="email" placeholder="Email" required />
      <input type="password" formControlName="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>

    <h2>Register</h2>
    <form [formGroup]="registerForm" (ngSubmit)="register()">
      <input type="email" formControlName="email" placeholder="Email" required />
      <input type="password" formControlName="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p>{{message}}</p>
  `
})
export class AuthComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  message = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: [''],
      password: [''],
    });
    this.registerForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  async login() {
    const { email, password } = this.loginForm.value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data?.session) {
      setToken(data.session.access_token);
      authEventBus.emit(AUTH_EVENTS.AUTH_CHANGED, data.session.user);
      this.message = 'Logged in';
    } else if (error) {
      this.message = error.message;
    }
  }

  async register() {
    const { email, password } = this.registerForm.value;
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (data?.session) {
      setToken(data.session.access_token);
      authEventBus.emit(AUTH_EVENTS.AUTH_CHANGED, data.session.user);
      this.message = 'Registered';
    } else if (error) {
      this.message = error.message;
    }
  }
}

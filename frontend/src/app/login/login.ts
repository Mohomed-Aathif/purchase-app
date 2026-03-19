import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {

  const body = {
    API_Action: "GetLoginData",
    Device_Id: "D001",
    Sync_Time: "",
    Company_Code: this.email,
    API_Body: {
      Username: this.email,
      Pw: this.password
    }
  };

  this.api.login(body).subscribe((res: any) => {

    console.log(res);

    // ✅ CORRECT PATH
    const locations = res?.Response_Body?.[0]?.User_Locations;

    if (locations && locations.length > 0) {

      localStorage.setItem('user', JSON.stringify(res));

      // save to backend
      this.api.saveLocations(locations).subscribe();

      // navigate
      this.router.navigate(['/purchase']);

    } else {
      alert('Login failed');
    }

  }, (err: any) => {
    console.error(err);
    alert('API error');
  });
}}
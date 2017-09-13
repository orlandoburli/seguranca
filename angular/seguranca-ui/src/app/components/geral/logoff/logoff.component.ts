import { Router } from '@angular/router';
import { LoginService } from './../../../security/login.service';
import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent implements OnInit, AfterContentInit {

  constructor(
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    console.log("on init");
  }

  ngAfterContentInit() {
    console.log("Logoff");
    this.loginService.logoff();
    this.router.navigate(['/login']);
  }
}

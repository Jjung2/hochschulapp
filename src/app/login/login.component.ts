import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  isValidated = false;
  validationSummury = "";
  userList = [];
  persons: any;
  constructor() {}

  ngOnInit() {}

  //submit click event
  onSubmit() {
    debugger;
    var validationResult = this.onValidate();
    var SimpleCrypto = require("simple-crypto-js").default;
    var _secretKey = "yaac";
    var simpleCrypto = new SimpleCrypto(_secretKey);
    if (this.isValidated) {
      var user = {
        email: this.email,
        password: this.password
      };
      var result = localStorage.getItem("userData");
      if (result == undefined || result == null) {
        // localStorage.setItem('userData',JSON.stringify(user) )
        alert("Wrong username or password");
      } else {
        debugger;
        var grabbedUserList = JSON.parse(localStorage.getItem("userData"));
        this.persons = grabbedUserList.find(x => x.email == this.email);
        if (user.password != simpleCrypto.decrypt(this.persons.password)) {
          alert("Wrong username or password");
        } else {
          localStorage.setItem(
            "logedInUser",
            simpleCrypto.encrypt(this.email)
          );
          alert("login successfully");
          window.location.href=''
        }
      }
    } else {
      this.validationSummury = validationResult;
    }
  }

  // validate form
  onValidate() {
    if (this.email == "") {
      this.isValidated = false;
      return "please enter valid email";
    } else if (this.password == "") {
      this.isValidated = false;
      return "please enter valid password";
    } else {
      this.isValidated = true;
      return null;
    }
  }
}

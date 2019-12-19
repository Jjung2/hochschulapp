import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"]
})
export class SignUpComponent implements OnInit {
  email = "";
  password = "";
  confirmPassword = "";
  isValidated = false;
  validationSummury = "";
  userList=[];
  constructor() {}

  ngOnInit() {}

  //button click event
  onSubmit() {
    var validationResult = this.onValidate();
    if (this.isValidated) {
      var SimpleCrypto = require("simple-crypto-js").default;
      var _secretKey = "yaac";
      var simpleCrypto = new SimpleCrypto(_secretKey);
      var user = {
        email: this.email,
        password: simpleCrypto.encrypt(this.password)
      };
      var result=localStorage.getItem('userData');
      if(result==undefined||result==null)
      {
          localStorage.setItem('userData',JSON.stringify(user) )
          alert('Signup successfully');
      }
      else{
        debugger;
        var grabbedUserList=JSON.parse(localStorage.getItem('userData'));
        this.userList.push(grabbedUserList);
        this.userList.push(user);

        localStorage.setItem('userData',JSON.stringify(this.userList) )

        alert('Signup successfully');
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
    } else if (this.confirmPassword != this.password) {
      this.isValidated = false;
      return "password not matched.";
    } else {
      this.isValidated = true;
      return null;
    }
  }
}

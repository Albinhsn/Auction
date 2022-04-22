package Auctionista.Controllers;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import Auctionista.Dto.UserDto;
import Auctionista.Entities.User;

import Auctionista.Services.UserService;

@RestController
public class RegistrationController {

    @Autowired
    UserService userService;

    
    @CrossOrigin
    @PostMapping("/registration/user")
    //Don't send back user, instead just status code, if succesfull send another req to get _id from email used in input 
    public User registerUserAccount(
        @RequestBody  @Valid UserDto userDto,
        HttpServletRequest request,
        Errors errors) 
    {
        return userService.registerNewUserAccount(userDto);
    }

    @GetMapping("/registration/email")
    public User changeEmail(
        @RequestParam String email,
        @RequestParam String matchingEmail,
        @RequestParam String userId
    ){
        return userService.changeEmail(userId, email, matchingEmail);
    }

    @GetMapping("/registration/password")
    public void changePassword(
        @RequestParam String userId,
        @RequestParam String password,
        @RequestParam String matchingPassword
    ){   
        userService.changePassword(userId, password, matchingPassword);
    }

}

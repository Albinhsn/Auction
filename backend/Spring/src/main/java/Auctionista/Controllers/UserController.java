package Auctionista.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import Auctionista.Entities.User;
import Auctionista.Services.UserService;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/user")
public class UserController {
    

    @Autowired
    private UserService userService;


    @CrossOrigin
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

 
    @CrossOrigin
    @PostMapping("/user/registration")
    public User registerUser(){
        return userService.registerUser();
    }
    
}

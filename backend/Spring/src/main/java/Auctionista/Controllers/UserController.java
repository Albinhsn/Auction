package Auctionista.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
    @GetMapping("/login")
    public String validateLogin(
        @RequestParam String email,
        @RequestParam String password
    ){
        return userService.validateLogin(email, password);
    }
    
    @CrossOrigin
    @PostMapping("/login/google")
    public String handleGoogleLogin(
        @RequestBody User user
        ){
            return userService.handleGoogleLogin(user);
    }
 
    
    @CrossOrigin
    @GetMapping("/id")
    public String getUserFromObjectId(
        @RequestParam String _id
    ){
        
        return userService.getUserFromObjectId(_id);
    }
}

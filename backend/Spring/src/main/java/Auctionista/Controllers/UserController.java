package Auctionista.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Auctionista.Entities.User;
import Auctionista.Services.UserService;



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
    public String getUsernameFromObjectId(
        @RequestParam String _id
    ){
        return userService.getUsernameFromObjectId(_id);
    }

    @CrossOrigin
    @GetMapping("/favorite")
    public boolean checkFavorite(
        @RequestParam String userId,
        @RequestParam String auctionId
    ){
        return userService.checkFavorite(userId, auctionId);
    }

    @CrossOrigin
    @GetMapping("/update/favorite")
    public boolean updateFavorite(
        @RequestParam String userId,
        @RequestParam String auctionId
    ){
        userService.updateFavorite(userId, auctionId);
        return true;
    }


    @CrossOrigin
    @GetMapping("/update/watchlist")
    public boolean updateWatchlist(
        @RequestParam String userId,
        @RequestParam String auctionId
    ){
        userService.updateWatchlist(userId, auctionId);
        return true;
    }

    @CrossOrigin
    @GetMapping(value="/user")
    public User getUserFromObjectId(
        @RequestParam String userId
    ){
        return userService.getUserFromObjectId(userId);
    }
}

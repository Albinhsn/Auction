package Auctionista.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import Auctionista.Entities.User;
import Auctionista.Services.UserService;
import Auctionista.Utils.JwtUtil;



@RestController
@RequestMapping("/user")
public class UserController {
    

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // @GetMapping("/login")
    // public String validateLogin(
    //     @RequestParam String email,
    //     @RequestParam String password
    // ){
    //     return userService.validateLogin(email, password);
    // }
    
    @PostMapping("/login/google")
    public String handleGoogleLogin(
        @RequestBody User user
        ){
            return userService.handleGoogleLogin(user);
    }
 
    @GetMapping("/id")
    public String getUsernameFromObjectId(
        @RequestParam String _id
    ){
        return userService.getUsernameFromObjectId(_id);
    }

    @GetMapping("/favorite")
    public boolean checkFavorite(
        @RequestParam String token,
        @RequestParam String auctionId
    ){
        
        String username = jwtUtil.getUsernameFromToken(token);
        String userId = userService.getObjectIdFromEmail(username);
        System.out.println(userId);
        return userService.checkFavorite(userId, auctionId);
    }

    @GetMapping("/update/favorite")
    public boolean updateFavorite(
        @RequestParam String token,
        @RequestParam String auctionId
    ){
        String email = jwtUtil.getUsernameFromToken(token);
        String userId = userService.getObjectIdFromEmail(email);
        userService.updateFavorite(userId, auctionId);
        return true;
    }

    @GetMapping("/update/watchlist")
    public boolean updateWatchlist(
        @RequestParam String token,
        @RequestParam String auctionId
    ){
        String email = jwtUtil.getUsernameFromToken(token);
        String userId = userService.getObjectIdFromEmail(email);
        userService.updateWatchlist(userId, auctionId);
        return true;
    }

    @GetMapping(value="/user")
    public User getUserFromObjectId(
        @RequestParam String userId
    ){
        
        return userService.getUserFromObjectId(userId);
    }
}

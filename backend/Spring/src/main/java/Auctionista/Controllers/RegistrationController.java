package Auctionista.Controllers;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import Auctionista.Dto.UserDto;
import Auctionista.Entities.User;
import Auctionista.Errors.UserAlreadyExistException;
import Auctionista.Services.UserService;

@RestController
public class RegistrationController {

    @Autowired
    UserService userService;

    

    @PostMapping("/user/registration")
    public User registerUserAccount(
            @RequestBody  @Valid UserDto userDto,
            HttpServletRequest request,
            Errors errors) {
        try {
            return userService.registerNewUserAccount(userDto);

        } catch (UserAlreadyExistException uaeEx) {
            System.out.println("uaeEx thrown");
            return null;
        }
    }



}

package Auctionista.Controllers;


import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import Auctionista.Dto.UserDto;
import Auctionista.Entities.User;
import Auctionista.Errors.UserAlreadyExistException;
import Auctionista.Services.UserService;

@RestController
public class RegistrationController {

    @Autowired
    UserService userService;

    @GetMapping("/user/registration")
    public String showRegistrationform(WebRequest request, Model model) {
        UserDto userDto = new UserDto();
        model.addAttribute("user", userDto);
        return "registration";
    }

    @PostMapping("/user/registration")
    public User registerUserAccount(
            @RequestBody @Valid UserDto userDto,
            HttpServletRequest request,
            Errors errors) {
        try {
            System.out.println("GOT");
            return userService.registerNewUserAccount(userDto);

        } catch (UserAlreadyExistException uaeEx) {
            System.out.println("\nThrew uaeEx\n");
            return null;
        }

    }

}

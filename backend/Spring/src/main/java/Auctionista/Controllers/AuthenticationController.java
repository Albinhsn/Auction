package Auctionista.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import Auctionista.Dto.AuthenticateUserDto;
import Auctionista.Utils.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private JwtUtil jwUtil;

    

    @PostMapping("/authenticate")
    public String authenticateUser(
        @RequestBody AuthenticateUserDto authenticateUserDto
    ){
        
        
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticateUserDto.getEmail(), authenticateUserDto.getPassword())
            );            
        } catch (BadCredentialsException e) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Kontot med inmatad information finns inte");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticateUserDto.getEmail());
        final String token = jwUtil.generateToken(userDetails);
        
        return token;
    }
}

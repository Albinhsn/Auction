package Auctionista.Services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import Auctionista.Dto.AuthenticateUserDto;
import Auctionista.Repositories.AuthenticationRepo;

@Service
public class MyUserDetailsService implements UserDetailsService{
    
    @Autowired
    AuthenticationRepo authenticationRepo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        AuthenticateUserDto authenticateUserDto = authenticationRepo.validateUser(email);
        User user = new User(authenticateUserDto.getEmail(), authenticateUserDto.getPassword(), new ArrayList<>());
        return user;
    }
}

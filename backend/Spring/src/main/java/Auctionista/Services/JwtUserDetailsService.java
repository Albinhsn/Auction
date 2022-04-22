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
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    AuthenticationRepo authRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        AuthenticateUserDto authUser = authRepo.findUserByEmail(username);
        User user = new User(authUser.getEmail(), authUser.getPassword(), new ArrayList<>());
        System.out.println(user.getUsername() + user.getPassword());
        return user;
    }
    
    

}

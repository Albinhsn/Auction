package Auctionista.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Auctionista.Entities.User;
import Auctionista.Repositories.UserRepo;


@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;
    

    public List<User> getAllUsers(){
        System.out.println("GOT");
        return userRepo.getAllUsers();
    }
}

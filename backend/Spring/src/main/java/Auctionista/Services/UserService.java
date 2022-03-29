package Auctionista.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Auctionista.Entities.User;
import Auctionista.Repositories.UserRepo;


@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepo userRepo;
    

    public List<User> getAllUsers(){
        return userRepo.getAllUsers();
    }


    
}

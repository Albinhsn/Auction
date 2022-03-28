package Auctionista.Repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import Auctionista.Entities.User;

public interface UserRepo extends MongoRepository<User, String>{
    
    
}

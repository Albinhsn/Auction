package Auctionista.Repositories;

import java.util.List;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
//import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.stereotype.Repository;

import Auctionista.Entities.User;

@Repository
public interface UserRepo extends MongoRepository<User, String>{

    @Query(value="{Id: 1}")
    List<User> getAllUsers();
 
    @Query(value="{Email: ?0}")
    User findByEmail(String email);


    User registerUser();
}


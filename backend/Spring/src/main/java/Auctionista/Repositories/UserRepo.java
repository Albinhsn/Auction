package Auctionista.Repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.stereotype.Repository;

import Auctionista.Entities.User;

@Repository
public interface UserRepo extends MongoRepository<User, ObjectId>{

    @Query(value="{}")
    List<User> getAllUsers();
 
    @Query(value="{email: ?0}")
    User findByEmail(String email);


    @Query(value="{username: ?0}")
    User findByUsername(String username);

    @Aggregation(pipeline={
        "{'$match': {email: ?0, password: ?1}}",
        "{'$project': {_id: 1}}"
    })
    String validateLogin(String email, String password);
}


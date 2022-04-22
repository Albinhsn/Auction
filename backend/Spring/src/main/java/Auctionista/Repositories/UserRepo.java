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


    @Aggregation(pipeline = {
        "{'$match': {_id: ObjectId('?0')}}",
        "{'$project': {username: 1, _id:0}}"
    })
    String getUsernameFromObjectId(String _id);
    
    @Aggregation(pipeline = {
        "{'$match': {_id: ObjectId('?0'), favorites: ObjectId('?1')}}"
    })
    List<User> checkFavorite(String userId, String auctionId);

    @Query(value="{_id: ?0}")
    User getUserFromObjectId(String userId);


    @Aggregation(pipeline = {
        "{'$match': {_id: ?0}}",
        "{'$set': {favorites: {$cond: [{$in: ['?1', '$favorites']},{ $setDifference: ['$favorites', ['?1']]},{ $concatArrays: ['$favorites', ['?1']]}]}}}"
    })
    User updateFavorite(String userId, String auctionId);

    @Aggregation(pipeline = {
        "{'$match': {_id: ?0}}",
        "{'$set': {watchlist: {$cond: [{$in: ['?1', '$watchlist']},{ $setDifference: ['$watchlist', ['?1']]},{ $concatArrays: ['$watchlist', ['?1']]}]}}}"
    })
    User updateWatchlist(String userId, String auctionId);

    @Aggregation(pipeline = {
        "{'$match': {email: ?0}}"
    })
    User getUserFromEmail(String email);

    @Aggregation(pipeline = {
        "{'$match': {email: ?0}}",
        "{'$project': {_id: 1}}"
    })
    String getObjectIdFromEmail(String username); 
}   


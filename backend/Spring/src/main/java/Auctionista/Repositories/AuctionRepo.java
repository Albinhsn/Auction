package Auctionista.Repositories;

import java.util.Date;
import java.util.List;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.stereotype.Repository;

import Auctionista.Entities.Auction;

@Repository
public interface AuctionRepo extends MongoRepository<Auction, String>{
    
    
    
    @Query(value="{state:'Pågående'}")
    List<Auction> getAllCurrentAuctions();

    
    

    @Aggregation(pipeline = {
        "{'$project': {state: 1, name: 1, images: 1, auctionType:1, minimumBid: 1, 'bidHistory.bid': 1, endDate: 1, purchasePrice: 1}}",
        "{'$addFields': {highestBid: {$max: [{$last: '$bidHistory.bid'}, '$minimumBid']}, images: {$first: '$images'}}}",
        "{'$project': {state: 1, name: 1, images: 1, auctionType: 1, endDate: 1, highestBid: 1, purchasePrice: 1}}",
        "{'$match': {state: 'Pågående', minimumBid: {$ne: 0}, auctionType: {'$nin': ['Holländsk', 'Schweizisk']}}}",
        "{'$sort': {highestBid: 1 }}",
        "{'$limit': 5}"
    })
    List<Auction> getAuctionsByBidAscLimited();

    @Aggregation(pipeline = {
        "{'$project': {state: 1, name: 1, images: 1, auctionType:1, minimumBid: 1, 'bidHistory.bid': 1, endDate: 1, purchasePrice: 1}}",
        "{'$addFields': {highestBid: {$max: [{$last: '$bidHistory.bid'}, '$minimumBid']}, images: {$first: '$images'}}}",
        "{'$project': {state: 1, name: 1, images: 1, auctionType: 1, endDate: 1, highestBid: 1, purchasePrice: 1}}",
        "{'$match': {state: 'Pågående', purchasePrice: {$ne: 0},auctionType: {'$ne': 'Schweizisk'}}}",
        "{'$sort': {purchasePrice: 1 }}",
        "{'$limit': 5}"
    })
    List<Auction> getAuctionsByPurchaseAscLimited();

    @Aggregation(pipeline = {
        "{'$project': {state: 1, name: 1, images: 1, auctionType:1, minimumBid: 1, 'bidHistory.bid': 1, endDate: 1, purchasePrice: 1}}",
        "{'$addFields': {highestBid: {$max: [{$last: '$bidHistory.bid'}, '$minimumBid']}, images: {$first: '$images'}}}",
        "{'$project': {state: 1, name: 1, images: 1, auctionType: 1, endDate: 1, highestBid: 1, purchasePrice: 1}}",
        "{'$match': {state: 'Pågående'}}",
        "{'$sort': {endDate: 1 }}",
        "{'$limit': 5}"
    })
    List<Auction> getAuctionsByRemainingTimeAscLimited();

    
    @Aggregation(pipeline = {
        "{'$match': {_id: ?0}}",
        "{'$lookup': { from: 'users', localField: 'seller', foreignField: '_id', as: 'seller'}}",
        "{'$addFields': { seller:{$first: '$seller.username'}}}",
        "{'$lookup': {from: 'users',localField: 'winner',foreignField: '_id',as: 'winner'}}",
        "{'$addFields': {winner: {$first: '$winner.username'}, highestBid: {$max: [{$last: '$bidHistory.bid'}, '$minimumBid']}}}",
    })
    Auction getAuctionByObjectId(String _id);

    @Aggregation(pipeline = {
        "{'$match': {_id: ObjectId('?0')}}",
        "{'$set': {bidHistory: { $concatArrays: ['$bidHistory', [{_id: ObjectId('?1'), bidderId: ?2, bid: ?3, time: ?4}]]}}}"
    })
    Auction makeBid(String auctionId, String bidId, String userId, int bid, Date date);

    @Aggregation(pipeline = {
        "{'$match': {_id: ObjectId('?0')}}",
        "{'$set': {winner: ObjectId(?1), state: 'Slut', endDate: ?2}}"
    })
    Auction makePurchase(String auctionId, String userId, Date date);


    @Aggregation(pipeline = {
        "{'$addFields': {userId: ObjectId('?0')}}",
        "{'$lookup': { from: 'users', localField: 'seller', foreignField: '_id', as: 'seller'}}",
        "{'$addFields': { seller:{$first: '$seller.username'}}}",
        "{'$lookup': { from: 'users',localField: 'userId',foreignField: '_id',as: 'user'}}",
        "{'$unwind': {path: '$user'}}",
        "{'$addFields': {user: '$user.favorites'}}",
        "{'$unwind': {path: '$user'}}",
        "{'$addFields': {user: {$toObjectId: '$user'}}}",
        "{'$match': {$expr: {$eq: ['$_id', '$user']}}}",
        "{'$project': {  name: 1,tags: 1,images: 1,condition: 1,auctionType: 1,description: 1,minimumBid: 1,seller: 1,bidHistory: 1,state: 1,winner: 1,purchasePrice: 1,startDate : 1,endDate: 1}}}"
    })
    List<Auction> getFavoritesById(String authId);
}

package Auctionista.Repositories;

import java.util.List;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.stereotype.Repository;

import Auctionista.Entities.Auction;

@Repository
public interface AuctionRepo extends MongoRepository<Auction, ObjectId>{
    
    
    
    @Query(value="{State:'Pågående'}")
    List<Auction> getAllCurrentAuctions();

    @Query(value="{}")
    List<Auction> getAuctionsIncluding();
    

    @Aggregation(pipeline = {
        "{'$match': {State: 'Pågående', AuctionType: {$nin: ['Schweizisk', 'Holländsk']}}}",
        "{'$sort': {MinimumBid: 1 }}",
        "{'$limit': 5}"
    })
    List<Auction> getAuctionsByBidAscLimited();

    @Aggregation(pipeline = {
            "{'$match': {State: 'Pågående', AuctionType: {'$ne': 'Holländsk'}}}",
            "{'$sort': {PurchasePrice: 1 }}",
            "{'$limit': 5}"
    })
    List<Auction> getAuctionsByPurchaseAscLimited();

    @Aggregation(pipeline = {
            "{'$match': {State: 'Pågående'}}",
            "{'$sort': {EndDate: 1 }}",
            "{'$limit': 5}"
    })
    List<Auction> getAuctionsByRemainingTimeAscLimited();

}

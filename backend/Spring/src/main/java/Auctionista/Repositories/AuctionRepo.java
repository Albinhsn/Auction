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
    
    
    
    @Query(value="{state:'Pågående'}")
    List<Auction> getAllCurrentAuctions();

    @Query(value="{}")
    List<Auction> getAuctionsIncluding();
    

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
}

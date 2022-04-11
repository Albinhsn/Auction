package Auctionista.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import Auctionista.Entities.Auction;

import Auctionista.Services.AuctionService;




@RestController
@RequestMapping("/auction")
public class AuctionController {
    

    @Autowired
    private AuctionService auctionService;


    
    @GetMapping("/state")
    public List<Auction> getAllCurrentAuctions(){
        return auctionService.getAllCurrentAuctions();
    }

    
    @GetMapping("/bid/asc")
    public List<Auction> getAuctionsByBidAscLimited(){
        return auctionService.getAuctionsByBidAscLimited();
    }
    
    
    @GetMapping("/purchase/asc")
    public List<Auction> getAuctionsByPurchaseAscLimited() {
        return auctionService.getAuctionsByPurchaseAscLimited();
    }

    
    @GetMapping("/time/asc")
    public List<Auction> getAuctionsByRemainingTimeAscLimited() {
        return auctionService.getAuctionsByRemainingTimeAscLimited();
    }

    
    @GetMapping(value="/objectid")
    public Auction getAuctionByObjectId(
        @RequestParam String _id) {
        return auctionService.getAuctionByObjectId(_id);
    }
    
    @GetMapping(value="/bid")
    public Auction makeBid(
        @RequestParam String userId,
        @RequestParam String auctionId,
        @RequestParam int bid
    ){
        return auctionService.makeBid(bid, userId, auctionId);
    }

    @GetMapping(value="/purchase")
    public Auction makePurchase(
        @RequestParam String userId,
        @RequestParam String auctionId
    ){
        return auctionService.makePurchase(userId, auctionId);
    }

    @GetMapping(value="/favorites")
    public List<Auction> getFavoritesById(
        @RequestParam String authId
    ){
        return auctionService.getFavoritesById(authId);
    }

    @GetMapping(value="/user")
    public List<Auction> getUserAuctions(
        @RequestParam String userId
    ){
        return auctionService.getUserAuctions(userId);
    }
}   

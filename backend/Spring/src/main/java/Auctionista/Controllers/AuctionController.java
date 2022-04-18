package Auctionista.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import Auctionista.Dto.AuctionDto;
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

    @GetMapping(value="/search")
    public List<Auction> getAuctionsBySearch(
        @RequestParam String search
    ){
        return auctionService.getAuctionsBySearch(search);
    }

    @PostMapping(value="/create")
    public String postAuction(
        @RequestBody AuctionDto auctionDto
    ){
        System.out.println("Name: " + auctionDto.getName());
        System.out.println("Condition: " + auctionDto.getCondition());
        System.out.println("Description: " + auctionDto.getDescription());
        System.out.println("MinimumBid: " + auctionDto.getMinimumBid());
        System.out.println("PurchasePrice: " + auctionDto.getPurchasePrice());
        System.out.println("Seller: " + auctionDto.getSeller());
        System.out.println("State: " + auctionDto.getState());
        System.out.println("Winner: " + auctionDto.getWinner());
        System.out.println("BidHistory: " + auctionDto.getBidHistory());
        System.out.println(auctionDto.getImages());
        System.out.println("AuctionType: " + auctionDto.getAuctionType());
        System.out.println("StartDate: " + auctionDto.getStartDate());
        System.out.println("EndDate" + auctionDto.getEndDate());
        System.out.println("Tags: " + auctionDto.getTags());

        return auctionService.postAuction(auctionDto);
    }
}   

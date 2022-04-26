package Auctionista.Controllers;

import java.util.List;

import javax.validation.Valid;

import org.bson.types.ObjectId;
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
import Auctionista.Services.UserService;
import Auctionista.Utils.JwtUtil;




@RestController
@RequestMapping("/auction")
public class AuctionController {
    

    @Autowired
    private AuctionService auctionService;

    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtUtil jwtUtil;


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
        @RequestParam String token,
        @RequestParam String auctionId,
        @RequestParam int bid
    ){
        
    
        String email = jwtUtil.getUsernameFromToken(token);
        String userId = userService.getObjectIdFromEmail(email);
        return auctionService.makeBid(bid, userId, auctionId);
    }

    @GetMapping(value="/purchase")
    public Auction makePurchase(
        @RequestParam String token,
        @RequestParam String auctionId
    ){
        String email = jwtUtil.getUsernameFromToken(token);
        String userId = userService.getObjectIdFromEmail(email);
        return auctionService.makePurchase(userId, auctionId);
    }

    @GetMapping(value="/favorites")
    public List<Auction> getFavoritesById(
        @RequestParam String token
    ){
        
        String email = jwtUtil.getUsernameFromToken(token);
        String userId = userService.getObjectIdFromEmail(email);
        return auctionService.getFavoritesById(userId);
    }

    @GetMapping(value="/user")
    public List<Auction> getUserAuctions(
        @RequestParam String token
    ){
        String email = jwtUtil.getUsernameFromToken(token);
        String userId = userService.getObjectIdFromEmail(email);
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
        @RequestBody @Valid AuctionDto auctionDto
    ){
        String email = jwtUtil.getUsernameFromToken(auctionDto.getSeller());
        String userId = userService.getObjectIdFromEmail(email);
        auctionDto.setSeller(userId);        
        return auctionService.postAuction(auctionDto);
    }
}   

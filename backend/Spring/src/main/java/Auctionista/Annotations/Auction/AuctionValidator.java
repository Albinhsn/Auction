package Auctionista.Annotations.Auction;

import java.util.Arrays;
import java.util.List;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import Auctionista.Dto.AuctionDto;
import Auctionista.Entities.Bid;
import Auctionista.Entities.Tags;

public class AuctionValidator implements ConstraintValidator<ValidAuction, Object>{
    

    private boolean flag;
    @Override
    public void initialize(ValidAuction constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        return (validateAuction(obj));
    }
    //Validate minimumbid, purchasePrice, tags
    public boolean validateAuction(Object obj){
        AuctionDto auctionDto = (AuctionDto) obj;
        if(
            !validateString(auctionDto.getCondition())
        ){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Vänlig mata in gottyckligt skick");
        }  
        if(!validateString(auctionDto.getName())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Vänlig mata in gottyckligt namn");
        }    
        if(!validateString(auctionDto.getSeller())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Fel authid");
        } 
        if(!validateBidHistory(auctionDto.getBidHistory())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Fel bidhistory");
        }
        if(!validateString(auctionDto.getAuctionType())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Fel auktionstyp");
        }
        if(!validateState(auctionDto.getState())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Fel state");
        }
        if(!validateMinimumBid(auctionDto.getMinimumBid(), auctionDto.getAuctionType())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Fel minimumbid");
        }
        if(!validatePurchasePrice(auctionDto.getPurchasePrice(), auctionDto.getAuctionType(), auctionDto.getMinimumBid())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Fel purchaseprice");
        }
        if(!validateTags(auctionDto.getTags())){
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Fel tags");
        }
        return true;
        

        
    }

    public boolean validateMinimumBid(int minimumBid, String auctionType){
        
        if(minimumBid > 0 && !auctionType.equals("Engelsk")){
            return false;
        }
        if(minimumBid < 0){
            return false;
        }
        return true;
    }

    public boolean validatePurchasePrice(int purchasePrice, String auctionType, int minimumBid){
        if(purchasePrice > 0 && (!auctionType.equals("Engelsk") || !auctionType.equals("Holländsk"))){
            return false;
        }
        if(purchasePrice < 0 || minimumBid>purchasePrice){
            return false;
        }
        return true;
    }

    public boolean validateTags(Tags tags){
        if(
            tags.getBrand().equals("") ||
            tags.getType().equals("") ||
            tags.getLens().equals("") ||
            tags.getResolution().equals("") ||
            tags.getImageSensorSize().equals("") ||
            tags.getWeatherProof().equals("") ||
            tags.getVideoFormat().equals("") || 
            tags.getAngledScreen().equals("") ||
            !validateStringArray(tags.getMemoryCards()) ||
            !validateStringArray(tags.getWirelessConnection())
        )
            {
                return false;
            }        
        return true;
    }

    public boolean validateStringArray(String[] arr){
        List<String> memorycards = Arrays.asList(arr);
        flag = false;
        memorycards.forEach(memorycard -> {
            if(memorycard.equals("")){
                flag = true;
            }
        });
        if(flag){
            return false;
        }
        return true;
    }

    public boolean validateString(String str){
        if(str == null || str.equals("")){
            return false;
        }
        return true;
    }

    public boolean validateBidHistory(List<Bid> bidHistory){
        if(bidHistory == null || bidHistory.size() != 0){
            return false;
        }
        return true;
    }
    public boolean validateState(String state){
        
        if(state.equals("Pågende")){
            return false;
        }
        return true;
    }


    
   
}

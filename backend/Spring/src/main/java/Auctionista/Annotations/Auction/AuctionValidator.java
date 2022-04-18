package Auctionista.Annotations.Auction;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class AuctionValidator implements ConstraintValidator<ValidAuction, Object>{
    
    @Override
    public void initialize(ValidAuction constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object obj, ConstraintValidatorContext context) {
        return (validateAuction(obj));
    }

    public boolean validateAuction(Object obj){
        //Validate name
        //Validate auctionType
        //Validate bidHistory
        //Validate description
        //Validate endDate and startDate
        //reformat and validate images
        //Validate minimumBid / purchasePrice
        //validate seller 
        //Validate state
        //Validate tags

        
        return false;
    }

    public boolean validateName(String name){
        return false;
    }
    
   
}

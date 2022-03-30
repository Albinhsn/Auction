package Auctionista.Entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {
    
    


    //private String Name;
    private String email;
    //private String Password;
    //private int[] Favorites;
    //private List<WatchItem> watchlist;


    
    public User(String email){
        this.email = email;
    }

    


    /**
     * @return String return the email
     */
    public String getEmail() {
        return email;
    }

    /**
     * @param email the email to set
     */
    public void setEmail(String email) {
        this.email = email;
    }

}

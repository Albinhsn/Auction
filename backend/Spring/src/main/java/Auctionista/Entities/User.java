package Auctionista.Entities;


import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {
    
    

    private ObjectId _id;

    private String username;
    private String email;
    private String password;
    private int[] favorites;
    private List<WatchItem> watchlist;


    public User(String username, String email, String password, int[] favorites, List<WatchItem> watchlist){
        this._id = new ObjectId();
        this.username = username;
        this.email = email;
        this.password = password;
        this.favorites = favorites;
        this.watchlist = watchlist;
    }
    


    


    

    /**
     * @return ObjectId return the _id
     */
    public ObjectId get_id() {
        return _id;
    }

    /**
     * @param _id the _id to set
     */
    public void set_id(ObjectId _id) {
        this._id = _id;
    }

    /**
     * @return String return the username
     */
    public String getUsername() {
        return username;
    }

    /**
     * @param username the username to set
     */
    public void setUsername(String username) {
        this.username = username;
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

    /**
     * @return String return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * @return int[] return the favorites
     */
    public int[] getFavorites() {
        return favorites;
    }

    /**
     * @param favorites the favorites to set
     */
    public void setFavorites(int[] favorites) {
        this.favorites = favorites;
    }

    /**
     * @return List<WatchItem> return the watchlist
     */
    public List<WatchItem> getWatchlist() {
        return watchlist;
    }

    /**
     * @param watchlist the watchlist to set
     */
    public void setWatchlist(List<WatchItem> watchlist) {
        this.watchlist = watchlist;
    }

}

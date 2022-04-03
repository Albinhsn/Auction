package Auctionista.Entities;


import java.util.List;


import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {
    
    
    private String _id;

    private String username;
    private String email;
    private String password;
    private List<String> favorites;
    private List<String> watchlist;


    


    


    public String get_id() {
        return this._id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<String> getFavorites() {
        return this.favorites;
    }

    public void setFavorites(List<String> favorites) {
        this.favorites = favorites;
    }

    public List<String> getWatchlist() {
        return this.watchlist;
    }

    public void setWatchlist(List<String> watchlist) {
        this.watchlist = watchlist;
    }


    


}

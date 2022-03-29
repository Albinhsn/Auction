package Auctionista.Entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public class User {
    
    @Id
    private ObjectId _id;
    private int Id;

    private String Name;
    private String Email;
    private String Password;
    private int[] Favorites;
    //private List<WatchItem> watchlist;



    

    public ObjectId get_id() {
        return this._id;
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

    public int getId() {
        return this.Id;
    }

    public void setId(int Id) {
        this.Id = Id;
    }

    public String getName() {
        return this.Name;
    }

    public void setName(String Name) {
        this.Name = Name;
    }

    public String getEmail() {
        return this.Email;
    }

    public void setEmail(String Email) {
        this.Email = Email;
    }

    public String getPassword() {
        return this.Password;
    }

    public void setPassword(String Password) {
        this.Password = Password;
    }

    public int[] getFavorites() {
        return this.Favorites;
    }

    public void setFavorites(int[] Favorites) {
        this.Favorites = Favorites;
    }


}

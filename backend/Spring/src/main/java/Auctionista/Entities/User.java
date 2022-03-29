package Auctionista.Entities;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document("users")
public class User {
    
    @Id
    private ObjectId _id;
    private int id;

    private String name;
    private String email;
    private String password;
    private int[] favorites;
    private List<WatchItem> watchlist;


    public User(ObjectId _id, int id, String name, String email, String password, int[] favorites, List<WatchItem> watchlist) {
        this._id = _id;
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.favorites = favorites;
        this.watchlist = watchlist;
    }

    public ObjectId get_Id(){
        return this._id;
    }

    public void set_Id(ObjectId _id){
        this._id = _id;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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

    public int[] getFavorites() {
        return this.favorites;
    }

    public void setFavorites(int[] favorites) {
        this.favorites = favorites;
    }

    public List<WatchItem> getWatchlist() {
        return this.watchlist;
    }

    public void setWatchlist(List<WatchItem> watchlist) {
        this.watchlist = watchlist;
    }

}

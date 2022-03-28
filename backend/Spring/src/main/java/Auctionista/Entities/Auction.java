package Auctionista.Entities;

import java.util.Date;
import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document("auctions")
public class Auction {


    @Id
    private ObjectId _id;

    private int Id;
    private String Name;
    private String State;
    private List<Bid> BidHistory;
    private String Condition;
    private int PurchasePrice;
    private int MinimumBid;
    private int Seller;
    private int Winner;
    private String[] Images;
    private String Description;
    private String AuctionType;
    private Tags Tags;
    private Date StartDate;
    private Date EndDate;



    public Auction(ObjectId _id, int Id, String Name, String State, List<Bid> BidHistory, String Condition, int PurchasePrice, int MinimumBid, int Seller, int Winner, String[] Images, String Description, String AuctionType, Tags Tags, Date StartDate, Date EndDate) {
        this._id = _id;
        this.Id = Id;
        this.Name = Name;
        this.State = State;
        this.BidHistory = BidHistory;
        this.Condition = Condition;
        this.PurchasePrice = PurchasePrice;
        this.MinimumBid = MinimumBid;
        this.Seller = Seller;
        this.Winner = Winner;
        this.Images = Images;
        this.Description = Description;
        this.AuctionType = AuctionType;
        this.Tags = Tags;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
    }
    

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

    public String getState() {
        return this.State;
    }

    public void setState(String State) {
        this.State = State;
    }

    public List<Bid> getBidhistory() {
        return this.BidHistory;
    }

    public void setBidhistory(List<Bid> BidHistory) {
        this.BidHistory = BidHistory;
    }

    public String getCondition() {
        return this.Condition;
    }

    public void setCondition(String Condition) {
        this.Condition = Condition;
    }

    public int getPurchasePrice() {
        return this.PurchasePrice;
    }

    public void setPurchasePrice(int PurchasePrice) {
        this.PurchasePrice = PurchasePrice;
    }

    public int getMinimumBid() {
        return this.MinimumBid;
    }

    public void setMinimumBid(int MinimumBid) {
        this.MinimumBid = MinimumBid;
    }

    public int getSeller() {
        return this.Seller;
    }

    public void setSeller(int Seller) {
        this.Seller = Seller;
    }

    public int getWinner() {
        return this.Winner;
    }

    public void setWinner(int Winner) {
        this.Winner = Winner;
    }

    public String[] getImages() {
        return this.Images;
    }

    public void setImages(String[] Images) {
        this.Images = Images;
    }

    public String getDescription() {
        return this.Description;
    }

    public void setDescription(String Description) {
        this.Description = Description;
    }

    public String getAuctionType() {
        return this.AuctionType;
    }

    public void setAuctionType(String AuctionType) {
        this.AuctionType = AuctionType;
    }

    public Tags getTags() {
        return this.Tags;
    }

    public void setTags(Tags Tags) {
        this.Tags = Tags;
    }

    public Date getStartDate() {
        return this.StartDate;
    }

    public void setStartDate(Date StartDate) {
        this.StartDate = StartDate;
    }

    public Date getEndDate() {
        return this.EndDate;
    }

    public void setEndDate(Date EndDate) {
        this.EndDate = EndDate;
    }


}

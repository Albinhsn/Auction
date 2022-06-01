using AuctionMicroService.Models;
using MongoDB.Bson;

namespace AuctionMicroService.Helpers
{
    public class AuctionValidationHelpers
    {
        public string ValidateAuction(AuctionPostModel auction)
        {
            
            if (auction.Name == "")
            {
                return "Vänligen fyll i namn";
            }
            if(auction.AuctionType == "")
            {
                return "Vänligen välj en typ av auktion";
            }            
            if (auction.Volume == 0)
            {
                return "Vänligen fyll i volym";
            }
            if (auction.Weight == 0)
            {
                return "Vänligen välj vikt";
            }
            if (auction.Condition == "")
            {
                return "Vänligen välj i skick";
            }
            if(auction.SellerToken == "")
            {
                return "wtf";
            }
            if(auction.AuctionType == "Engelsk" && auction.MinimumBid <= 0)
            {
                return "Vänligen ange minsta bud";
            }
            if(auction.AuctionType == "Engelsk " && auction.MinimumBid + 10 >= auction.PurchasePrice)
            {
                return "Vänligen ange högre utköpspris än minsta bud";
            }
            if(auction.AuctionType == "Holländsk" && auction.PurchasePrice <= 0)
            {
                return "Vänligen ange godtyckligt start pris";
            }
           



            return "";
        }

        public AuctionPostModel ValidateImages(AuctionPostModel model)
        {
            
            if(model.Images == null ||model.Images.Count == 0)
            {
                model.Images = new List<string>();
                model.Images.Add("628feb5a7771e2d5f99c6ecb");
            }

            return model;
        }
    }
}

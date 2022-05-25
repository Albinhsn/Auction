using EmailService.Models;

namespace EmailService.Helpers
{
    public class MessageHelper
    {

        public Message createWonAuctionMessage(Auction auction, User user)
        {

            return new Message(

                user.Email,
                $"Vunnen auktion av {auction.AuctionName}",
                $"Grattis!\nDu vann auktionen av '{auction.AuctionName}' för {auction.Price}kr"
                );
        }

        public Message createMadeBidMessage(Auction auction, User user)
        {
            return new Message(

                user.Email,
                $"Du la ett bud på {auction.AuctionName}",
                $"Du la ett bud på auktionen '{auction.AuctionName}' för {auction.Price}kr"
                );
        }
        public Message createMadePurchaseMessage(Auction auction, User user)
        {
            return new Message(

                user.Email,
                $"Du köpte {auction.AuctionName}",
                $"Du köpte ut auktionen '{auction.AuctionName}' för {auction.Price}kr"
                );
        }

        public Message createWatchlistPurchaseMadeEmail(Auction auction, User user)
        {
            return new Message(
                user.Email,
                $"Såld auktion av {auction.AuctionName}",
                $"En användare köpte '{auction.AuctionName}' för {auction.Price}"
                );
        }
        public Message createWatchlistBidMadeEmail(Auction auction, User user)
        {
            return new Message(
                user.Email,
                $"Bud på auktion av {auction.AuctionName}",
                $"En användare la ett bud på '{auction.AuctionName}' för {auction.Price}"
                );
        }
        public Message createSoldAuctionMessage(Auction auction, User user)
        {
            return new Message(
                user.Email,
                $"Såld auktion: {auction.AuctionName}",
                $"Din auktion: '{auction.AuctionName}' blev precis såld för {auction.Price}kr"
                );
        }
        public Message createWatchlistTimeRemainingMessage(Auction auction, User user)
        {
            return new Message(

                user.Email,
                $"2h kvar av: {auction.AuctionName}",
                $"Auktionen '{auction.AuctionName}' har nu 2 timmar kvar och högsta budet är {auction.Price}kr"
                );
        }
        public Message createWatchlistBidMadeMessage(Auction auction, User user)
        {
            return new Message(

                user.Email,
                $"Bud lagt på {auction.AuctionName}",
                $"Auktionen '{auction.AuctionName}' fick nu ett högsta bud av {auction.Price}kr"
                );
        }

    }

}

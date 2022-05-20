using EmailService.EmailConfig;
using Microsoft.AspNetCore.Mvc;


namespace EmailService.Controllers
{

    [ApiController]
    [Route("/api/email/[controller]")]
    public class EmailController : ControllerBase
    {

        private readonly EmailsService _emailService;

        public EmailController(EmailsService emailService) =>
            _emailService = emailService;

        [HttpPost("/api/[controller]/won")]
        public void WonAuction(Auction auction)
        {
            
           _emailService.sendWonAuctionEmail(auction);
            
        }

        [HttpPost("/api/[controller]/bid")]
        public void MadeBid(Auction auction)
        {
            _emailService.sendMadeBidEmail(auction);

        }

        [HttpPost("/api/[controller]/purchase")]
        public void MadePurchase(Auction auction)
        {
            _emailService.sendPurchaseMadeEmail(auction);

        }

        [HttpPost("/api/[controller]/watchlist/bid")]
        public void WatchlistBidMade(Auction auction)
        {
            _emailService.sendWatchlistBidMadeEmail(auction);

        }
        [HttpPost("/api/[controller]/watchlist/time")]
        public void WatchlistTimeRemaining(Auction auction)
        {
            _emailService.sendWatchlistTimeRemainingMadeEmail(auction);

        }
        [HttpPost("/api/[controller]/sold")]
        public void SoldAuction(Auction auction)
        {
            _emailService.sendSoldAuctionEmail(auction);

        }
    }
}

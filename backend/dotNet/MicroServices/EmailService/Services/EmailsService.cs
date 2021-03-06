using EmailService.EmailConfig;
using EmailService.Helpers;
using EmailService.Models;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MongoDB.Driver;

namespace EmailService.Services
{
    public class EmailsService
    {
        private readonly IOptions<EmailConfiguration> _config;
        private readonly MessageHelper messageHelper = new();
        private readonly IMongoCollection<User> _collection;
        public EmailsService(IOptions<EmailConfiguration> emailConfig)
        {

            MongoClient client = new("mongodb+srv://Admin:dGFoNQuOP1nKNPI5@auctionista.9ue7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
            var db = client.GetDatabase("Email");

            _collection = db.GetCollection<User>("Users");
            _config = emailConfig;
        }
        public void DeleteUser(User user)
        {
            _collection.DeleteOneAsync(x => x.Email == user.Email);
        }
        public void CreateUser(User user)
        {
            _collection.InsertOne(user);
        }
        public void UpdateUser(User user)
        {
            _collection.ReplaceOneAsync(x => x.Id == user.Id, user);
        }
        public async void sendWonAuctionEmail(Auction auction)
        {
            User user = await _collection.Find(x => x.Id == auction.UserId).FirstOrDefaultAsync();
            Message message = messageHelper.createWonAuctionMessage(auction, user);
            SendEmail(message);
        }
        public async void sendPurchasedWatchlistEmails(List<Auction> auctions)
        {
            foreach(var auction in auctions)
            {
                User user = await _collection.Find(x => x.Id == auction.UserId).FirstOrDefaultAsync();
                Message message = messageHelper.createWatchlistPurchaseMadeEmail(auction, user);
                SendEmail(message);
            }
        }
        public async void sendBidWatchlistEmails(List<Auction> auctions)
        {
            foreach (var auction in auctions)
            {
                User user = await _collection.Find(x => x.Id == auction.UserId).FirstOrDefaultAsync();
                Message message = messageHelper.createWatchlistBidMadeEmail(auction, user);
                SendEmail(message);
            }
        }

        public async void sendMadeBidEmail(Auction auction)
        {
            User user = await _collection.Find(x => x.Id == auction.UserId).FirstOrDefaultAsync();
            Message message = messageHelper.createMadeBidMessage(auction, user);
            SendEmail(message);
        }

        public void sendWinnerSellerEmail(List<Auction> auctions)
        {
            sendWonAuctionEmail(auctions[0]);
            sendSoldAuctionEmail(auctions[1]);
        }
        
        public async void sendWatchlistBidMadeEmail(Auction auction)
        {
            User user = await _collection.Find(x => x.Id == auction.UserId).FirstOrDefaultAsync();
            Message message = messageHelper.createWatchlistBidMadeMessage(auction, user);
            SendEmail(message);
        }

        public async void sendPurchaseMadeEmail(Auction auction)
        {
            User user = await _collection.Find(x => x.Id == auction.UserId).FirstOrDefaultAsync();

            Message message = messageHelper.createMadePurchaseMessage(auction, user);
            SendEmail(message);
        }
        public async void sendWatchlistTimeRemainingMadeEmail(Auction auction)
        {
            User user = await _collection.Find(x => x.Id == auction.UserId).FirstOrDefaultAsync();
            Message message = messageHelper.createWatchlistTimeRemainingMessage(auction, user);
            SendEmail(message);
        }

        public async void sendSoldAuctionEmail(Auction auction)
        {
            User user = await _collection.Find(x => x.Id == auction.UserId).FirstOrDefaultAsync();
            Message message = messageHelper.createSoldAuctionMessage(auction, user);
            SendEmail(message);
        }
        public void SendEmail(Message message)
        {
            MimeMessage emailMessage = CreateEmailMessage(message);
            
            Send(emailMessage);
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(MailboxAddress.Parse(_config.Value.From));
            emailMessage.To.Add(MailboxAddress.Parse(message.To));

            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Content };
            return emailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            //using (var client = new SmtpClient())
            //{
            //    try
            //    {
            //        client.Connect(_config.Value.SmtpServer, _config.Value.Port, true);
            //        client.AuthenticationMechanisms.Remove("XOAUTH2");
            //        client.Authenticate(_config.Value.UserName, _config.Value.Password);
            //        Console.WriteLine(mailMessage.To);
            //        client.Send(mailMessage);
            //    }
            //    catch
            //    {
            //        //TODO THROW SOMETHING USEFUL 
            //        throw;
            //    }
            //    finally
            //    {
            //        client.Disconnect(true);
            //        client.Dispose();
            //    }
            //}
        }
    }
}

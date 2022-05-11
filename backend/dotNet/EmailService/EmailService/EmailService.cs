using EmailService.EmailConfig;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace EmailService
{
    public class EmailService
    {
        private readonly IOptions<EmailConfiguration> _config;
        private readonly MessageHelper messageHelper = new();
        public EmailService(IOptions<EmailConfiguration> emailConfig) {
            
            _config = emailConfig;
        }


        public void sendWonAuctionEmail(Auction auction)
        {
            Message message = messageHelper.createWonAuctionMessage(auction);
            SendEmail(message);
        }

        public void sendMadeBidEmail(Auction auction)
        {
            Message message = messageHelper.createMadeBidMessage(auction);
            SendEmail(message);
        }

        public void sendWatchlistBidMadeEmail(Auction auction)
        {
            Message message = messageHelper.createWatchlistBidMadeMessage(auction);
            SendEmail(message);
        }

        public void sendPurchaseMadeEmail(Auction auction)
        {
            Message message = messageHelper.createMadePurchaseMessage(auction);
            SendEmail(message);
        }
        public void sendWatchlistTimeRemainingMadeEmail(Auction auction)
        {
            Message message = messageHelper.createWatchlistTimeRemainingMessage(auction);
            SendEmail(message);
        }

        public void sendSoldAuctionEmail(Auction auction)
        {
            Message message = messageHelper.createSoldAuctionMessage(auction);
            SendEmail(message);
        }
        public void SendEmail(Message message)
        {
            var emailMessage = CreateEmailMessage(message);
            Send(emailMessage);
        }

        private MimeMessage CreateEmailMessage(Message message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress(_config.Value.From));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Content };
            return emailMessage;
        }

        private void Send(MimeMessage mailMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_config.Value.SmtpServer, _config.Value.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    client.Authenticate(_config.Value.UserName, _config.Value.Password);

                    client.Send(mailMessage);
                }
                catch
                {
                    //TODO THROW SOMETHING USEFUL 
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }
        }
    }
}

using MimeKit;

namespace EmailService.Models
{
    public class Message
    {
        public string To { get; set; }
        public string Subject { get; set; }

        public string Content { get; set; }

        public Message(string to, string subject, string content)
        {
            To = to;
            //To.AddRange(to.Select(x => new MailboxAddress(x)));
            Subject = subject;
            Content = content;

        }
    }
}

package Auctionista.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuctionController {
    

    @GetMapping("/hello")
    public String helloWorld(){
        return "Hello World!";
    }
}

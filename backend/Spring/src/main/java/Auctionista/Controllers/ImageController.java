package Auctionista.Controllers;

import java.io.File;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;
import Auctionista.Services.ImageService;

@RestController
@RequestMapping("/images")
public class ImageController {
    
    @Autowired
    private ImageService imageService;

    @GetMapping("/image/{id}")
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable String id) throws IOException{
        
        //ImageFile imageFile = imageService.uploadFile();
        
        // return ResponseEntity.ok()
        // .contentType(MediaType.parseMediaType(imageFile.getFileType()))
        // .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + imageFile.getFilename() + "\"")
        // .body(new ByteArrayResource(imageFile.getFile()));
        return null;
    }

    @PostMapping("/upload")
    public String uploadImage(
        @RequestParam File file
    )  
    throws IOException{
        imageService.upImageFile(file);
        return null;
    }
}


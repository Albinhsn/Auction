package Auctionista.Controllers;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;

import Auctionista.Entities.ImageFile;
import Auctionista.Services.ImageService;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @GetMapping("/image/{fileId}")
    public ResponseEntity<ByteArrayResource> getImage(@PathVariable String fileId) throws IOException {

        ImageFile imageFile = imageService.getImageById(fileId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(imageFile.getFileType()))
                .body(new ByteArrayResource(imageFile.getFile()));

    }

    @PostMapping("/upload")
    public String uploadImage(
            @RequestParam("file") MultipartFile file) throws IOException {
        return imageService.uploadImage(file);
    }
}

package com.sdp.dvaralbackendsecurity.service;


import com.sdp.dvaralbackendsecurity.model.HallImages;
import com.sdp.dvaralbackendsecurity.model.Halls;
import com.sdp.dvaralbackendsecurity.repo.ImageRepository;
import com.sdp.dvaralbackendsecurity.utils.ImageUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;


    public HallImages uploadImage(MultipartFile files, Halls halls) throws IOException {

        HallImages hallImages = new HallImages();
        hallImages.setImageName(files.getOriginalFilename());
        hallImages.setData(ImageUtil.compressImage(files.getBytes()));
        hallImages.setHalls(halls);

        return imageRepository.save(hallImages);

    }


    public List<HallImages> getImagesByHallId(Long hallId) {
        log.info("Fetching images for hallId: {}", hallId);

        List<HallImages> images = imageRepository.findByHalls_HallID(hallId);

        if (images.isEmpty()) {
            log.warn("No images found for hallId: {}", hallId);
        }

        return images.stream()
                .map(image -> {
                    try {
                        return HallImages.builder()
                                .imageID(image.getImageID())
                                .imageName(image.getImageName())
                                .data(ImageUtil.decompressImage(image.getData()))
                                .halls(image.getHalls())
                                .build();
                    } catch (Exception e) {
                        log.error("Failed to decompress image data for imageID: {}", image.getImageID(), e);
                        return null;
                    }
                })
                .collect(Collectors.toList());
    }
}

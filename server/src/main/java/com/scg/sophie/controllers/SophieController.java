package com.scg.sophie.controllers;

import java.io.IOException;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scg.sophie.models.PdfRequest;
import com.scg.sophie.services.SophieService;

@RestController
@RequestMapping("/pdf")
public class SophieController {

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generatePdf(@RequestBody PdfRequest pdfRequest) throws IOException {

        byte[] pdfBytes = SophieService.generatePdf(pdfRequest);
        // Log the received payload to check if it's correct
        System.out.println("Received Payload: " + pdfRequest);
        System.out.println("Grid name: " + pdfRequest.getGridName());
        System.out.println("Frame length: " + pdfRequest.getFrameLength());
        // System.out.println("matrix: " + pdfRequest.getMatrix());

        String pdfName = pdfRequest.getGridName() + ".pdf";

        // Set the content type and disposition for a PDF download
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/pdf");
        // set custom pdf name

        headers.add("Content-Disposition", "attachment; filename=\"" + pdfName + "\"");
        //

        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }

}

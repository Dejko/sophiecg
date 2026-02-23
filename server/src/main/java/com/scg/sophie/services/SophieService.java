package com.scg.sophie.services;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.stereotype.Service;

import com.scg.sophie.models.GridMatrix;
import com.scg.sophie.models.Patch;
import com.scg.sophie.models.PdfRequest;

@Service
public class SophieService {

    public static byte[] generatePdf(PdfRequest pdfRequest) throws IOException {
        // Extract data from the JSON payload
        String gridName = pdfRequest.getGridName();
        float frameLength = pdfRequest.getFrameLength();
        float substrateWidth = pdfRequest.getSubstrateWidth();

        List<List<Patch>> patchData = pdfRequest.getMatrix();
        int rows = patchData.size();
        int cols = (rows > 0) ? patchData.get(0).size() : 0;

        GridMatrix gridMatrix = new GridMatrix(rows, cols, patchData);
        // gridMatrix.displayMatrix();

        PDDocument document = new PDDocument();
        PDPage page = new PDPage(new PDRectangle(frameLength, substrateWidth));
        document.addPage(page);
        PDPageContentStream contentStream = new PDPageContentStream(document, page);

        gridMatrix.drawMatrix(document, page, contentStream);

        // Begin writing the content stream
        contentStream.beginText();
        contentStream.setFont(new PDType1Font(Standard14Fonts.FontName.HELVETICA), 14); // Correct font reference
        contentStream.newLineAtOffset(50, 750); // Set the position of the text

        // Add some text content (you can add more content here as needed)
        contentStream.showText("Grid Name: " + gridName);
        contentStream.newLineAtOffset(0, -20); // Move to next line
        contentStream.showText("Frame Length: " + frameLength);
        contentStream.newLineAtOffset(0, -20);
        contentStream.showText("PDF generated using SophieCG!");

        // End the content stream
        contentStream.endText();
        contentStream.close();

        // Save the document to a byte array output stream
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        document.save(byteArrayOutputStream);

        // Close the document
        document.close();
        // Return the byte array containing the PDF content
        return byteArrayOutputStream.toByteArray();
    }

}

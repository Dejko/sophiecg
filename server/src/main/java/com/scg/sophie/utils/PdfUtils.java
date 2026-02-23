package com.scg.sophie.utils;

import org.apache.pdfbox.cos.COSArray;
import org.apache.pdfbox.cos.COSDictionary;
import org.apache.pdfbox.cos.COSFloat;
import org.apache.pdfbox.cos.COSInteger;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.pdmodel.common.function.PDFunctionType2;

public class PdfUtils {

    // Conversion factor from mm to points
    private static final float MM_TO_POINTS = (float) 2.83465;
    private static final float DPI = (float) 96;

    // Static method to convert mm to points
    public static float convertMmToPoints(float variable) {
        return variable * MM_TO_POINTS;
    }

    // Conversion method from HTML canvas to PDF document coordinates
    public static double convertCanvasToPdf(float canvasValue) {
        return (canvasValue / DPI) * 72;

    }

    // Tint transformation method

    public static COSDictionary createFunctionDict() {
        COSDictionary functionDict = new COSDictionary();
        functionDict.setInt(COSName.FUNCTION_TYPE, 2);
        return functionDict;
    }

    public static COSDictionary createFunctionDictWithDomain() {
        COSDictionary functionDict = createFunctionDict();
        COSArray domain = new COSArray();
        domain.add(COSInteger.ZERO);
        domain.add(COSInteger.ONE);
        functionDict.setItem(COSName.DOMAIN, domain);
        return functionDict;
    }

    public static void configureFunctionDict(COSDictionary functionDict) {
        // C0 (output when tint = 0) — usually white/no ink
        COSArray c0 = new COSArray();
        c0.add(new COSFloat(0f)); // C
        c0.add(new COSFloat(0f)); // M
        c0.add(new COSFloat(0f)); // Y
        c0.add(new COSFloat(0f)); // K
        functionDict.setItem(COSName.C0, c0);

        // C1 (output when tint = 1) — full orange ink, approximate CMYK value
        COSArray c1 = new COSArray();
        c1.add(new COSFloat(0f)); // C
        c1.add(new COSFloat(0.5f)); // M
        c1.add(new COSFloat(1f)); // Y
        c1.add(new COSFloat(0f)); // K
        functionDict.setItem(COSName.C1, c1);

    }

}

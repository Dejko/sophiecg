package com.scg.sophie.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.apache.pdfbox.pdmodel.common.COSObjectable;
import org.apache.pdfbox.pdmodel.common.function.PDFunctionType4;
import org.apache.pdfbox.pdmodel.graphics.color.*;

import com.scg.sophie.models.Patch;

import org.apache.pdfbox.cos.*;

public class DeviceNColorSpaceBuilder {

    private final List<String> inkNames = new ArrayList<>();
    private PDColorSpace alternateColorSpace = PDDeviceCMYK.INSTANCE;
    private PDFunctionType4 tintTransformFunction;

    public DeviceNColorSpaceBuilder setInkSet(String... inks) {
        inkNames.clear();
        inkNames.addAll(Arrays.asList(inks));
        return this;
    }

    public DeviceNColorSpaceBuilder setAlternateColorSpace(PDColorSpace altSpace) {
        this.alternateColorSpace = altSpace;
        return this;
    }

    public DeviceNColorSpaceBuilder generateDefaultTintTransform() throws IOException {
        if (inkNames.size() < 1) {
            throw new IllegalArgumentException("Ink set must contain at least one ink");
        }

        // Define standard CMYK channels (first 4 inks)
        StringBuilder ps = new StringBuilder();
        ps.append("{\n");
        ps.append("  % Input stack: ").append(String.join(" ", inkNames)).append("\n");

        // C = baseC
        ps.append("  dup 0 get "); // C

        if (inkNames.contains("Green"))
            ps.append(" dup ").append(inkNames.indexOf("Green")).append(" get 0.4 mul add\n");
        if (inkNames.contains("Violet"))
            ps.append(" dup ").append(inkNames.indexOf("Violet")).append(" get 0.3 mul add\n");

        // M = baseM
        ps.append("  dup 1 get "); // M
        if (inkNames.contains("Orange"))
            ps.append(" dup ").append(inkNames.indexOf("Orange")).append(" get 0.3 mul add\n");
        if (inkNames.contains("Violet"))
            ps.append(" dup ").append(inkNames.indexOf("Violet")).append(" get 0.3 mul add\n");

        // Y = baseY
        ps.append("  dup 2 get "); // Y
        if (inkNames.contains("Orange"))
            ps.append(" dup ").append(inkNames.indexOf("Orange")).append(" get 0.5 mul add\n");
        if (inkNames.contains("Green"))
            ps.append(" dup ").append(inkNames.indexOf("Green")).append(" get 0.4 mul add\n");

        // K = baseK
        ps.append("  dup 3 get\n");

        ps.append("  pop\n".repeat(inkNames.size())); // Clear stack
        ps.append("}");

        COSStream cosStream = new COSStream();
        cosStream.createOutputStream().write(ps.toString().getBytes());
        this.tintTransformFunction = new PDFunctionType4(cosStream);
        return this;
    }

    public PDDeviceN build() throws IOException {
        if (inkNames.isEmpty()) {
            throw new IllegalStateException("No inks defined. Use setInkSet().");
        }
        if (tintTransformFunction == null) {
            generateDefaultTintTransform();
        }

        String[] inkSet = inkNames.toArray(new String[0]);

        PDDeviceN deviceN = new PDDeviceN();
        deviceN.setColorantNames(Arrays.asList(inkSet));
        deviceN.setAlternateColorSpace(alternateColorSpace);
        deviceN.setTintTransform(tintTransformFunction);

        return deviceN;
    }

}

package com.scg.sophie.models;

import java.util.List;

import com.scg.sophie.utils.PdfUtils;

public class PdfRequest {
    private String gridName;
    private float frameLength; // Document height in mm
    private float substrateWidth; // Document width in mm
    private int sideMargin; // Margin in mm
    private int frontOffset; // Offset in mm
    private int patchLength; // Patch length in mm
    private int patchHeight; // Patch height in mm
    private int patchGap; // Patch gap in mm

    private List<List<Patch>> matrix; // 2D array of SophiColorPatch

    private List<String> inkSet;

    // Getter and Setter for gridName
    public String getGridName() {
        return gridName;
    }

    public void setGridName(String gridName) {
        this.gridName = gridName;
    }

    // Getter and Setter for frameLength (converted to points)
    public float getFrameLength() {
        return PdfUtils.convertMmToPoints(frameLength);
    }

    public void setFrameLength(float frameLength) {
        this.frameLength = frameLength;
    }

    // Getter and Setter for substrateWidth (converted to points)
    public float getSubstrateWidth() {
        return PdfUtils.convertMmToPoints(substrateWidth);
    }

    public void setSubstrateWidth(float substrateWidth) {
        this.substrateWidth = substrateWidth;
    }

    // Getter and Setter for sideMargin (converted to points)
    public float getSideMargin() {
        return PdfUtils.convertMmToPoints(sideMargin);
    }

    public void setSideMargin(int sideMargin) {
        this.sideMargin = sideMargin;
    }

    // Getter and Setter for frontOffset (converted to points)
    public float getFrontOffset() {
        return PdfUtils.convertMmToPoints(frontOffset);
    }

    public void setFrontOffset(int frontOffset) {
        this.frontOffset = frontOffset;
    }

    // Getter and Setter for patchLength (converted to points)
    public float getPatchLength() {
        return PdfUtils.convertMmToPoints(patchLength);
    }

    public void setPatchLength(int patchLength) {
        this.patchLength = patchLength;
    }

    // Getter and Setter for patchHeight (converted to points)
    public float getPatchHeight() {
        return PdfUtils.convertMmToPoints(patchHeight);
    }

    public void setPatchHeight(int patchHeight) {
        this.patchHeight = patchHeight;
    }

    // Getter and Setter for patchGap (converted to points)
    public float getPatchGap() {
        return PdfUtils.convertMmToPoints(patchGap);
    }

    public void setPatchGap(int patchGap) {
        this.patchGap = patchGap;
    }

    public List<List<Patch>> getMatrix() {
        return matrix;
    }

    public void setMatrix(List<List<Patch>> matrix) {
        this.matrix = matrix;
    }

    // Getter and Setter for inkSet
    public List<String> getInkSet() {
        return inkSet;
    }

    public void setInkSet(List<String> inkSet) {
        this.inkSet = inkSet;
    }

}

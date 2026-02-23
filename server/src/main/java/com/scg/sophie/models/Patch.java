package com.scg.sophie.models;

import java.util.Map;

import com.scg.sophie.utils.PdfUtils;

public class Patch {

    private int row;
    private String _row;
    private int col;
    private String[] inkSet;
    private Map<String, Float> inkValues;
    private Cell cell;
    private Coords coords;

    // Constructor for Patch class
    public Patch(int row, String _row, int col, String[] inkSet, Map<String, Float> inkValues, Cell cell,
            Coords coords) {
        this.row = row;
        this._row = _row;
        this.col = col;
        this.inkSet = inkSet;
        this.inkValues = inkValues;
        this.cell = cell;
        this.coords = coords;
    }

    // Getters and Setters for all fields
    public int getRow() {
        return row;
    }

    public void setRow(int row) {
        this.row = row;
    }

    public String getRowLabel() {
        return _row;
    }

    public void setRowLabel(String rowLabel) {
        this._row = rowLabel;
    }

    public int getCol() {
        return col;
    }

    public void setCol(int col) {
        this.col = col;
    }

    public String[] getInkSet() {
        return inkSet;
    }

    public void setInkSet(String[] inkSet) {
        this.inkSet = inkSet;
    }

    public Map<String, Float> getInkValues() {
        return inkValues;
    }

    public void setInkValues(Map<String, Float> inkValues) {
        this.inkValues = inkValues;
    }

    public Cell getCell() {
        return cell;
    }

    public void setCell(Cell cell) {
        this.cell = cell;
    }

    public Coords getCoords() {
        return coords;
    }

    public void setCoords(Coords coords) {
        this.coords = coords;
    }

    // Nested Cell class
    public static class Cell {
        private float length; // In mm
        private float height; // In mm
        private float gap; // In mm

        // Constructor
        public Cell(float length, float height, float gap) {
            this.length = PdfUtils.convertMmToPoints(length);
            this.height = PdfUtils.convertMmToPoints(height);
            this.gap = PdfUtils.convertMmToPoints(gap);
        }

        // Getters and Setters
        public float getLength() {
            return length;
        }

        public void setLength(int length) {
            this.length = PdfUtils.convertMmToPoints(length);
        }

        public float getHeight() {
            return height;
        }

        public void setHeight(int height) {
            this.height = PdfUtils.convertMmToPoints(height);
        }

        public float getGap() {
            return gap;
        }

        public void setGap(int gap) {
            this.gap = PdfUtils.convertMmToPoints(gap);
        }
    }

    // Nested Coords class
    public static class Coords {
        private float x;
        private float x1;
        private float y;
        private float y2;

        // Constructor
        public Coords(float x, float x1, float y, float y2) {
            this.x = (float) PdfUtils.convertCanvasToPdf(x);
            this.x1 = (float) PdfUtils.convertCanvasToPdf(x1);
            this.y = (float) PdfUtils.convertCanvasToPdf(y);
            this.y2 = (float) PdfUtils.convertCanvasToPdf(y2);
        }

        // Getters and Setters
        public double getX() {
            return x;
        }

        public void setX(float x) {
            this.x = x;
        }

        public double getX1() {
            return x1;
        }

        public void setX1(float x1) {
            this.x1 = x1;
        }

        public double getY() {
            return y;
        }

        public void setY(float y) {
            this.y = y;
        }

        public double getY2() {
            return y2;
        }

        public void setY2(float y2) {
            this.y2 = y2;
        }
    }
}

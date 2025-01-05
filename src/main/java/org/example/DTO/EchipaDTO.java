package org.example.DTO;

public class EchipaDTO {
    private int idEchipa;
    private String denumire;

    public EchipaDTO() {
    }

    // Getters și Setters
    public int getIdEchipa() {
        return idEchipa;
    }

    public void setIdEchipa(int idEchipa) {
        this.idEchipa = idEchipa;
    }

    public String getDenumire() {
        return denumire;
    }

    public void setDenumire(String denumire) {
        this.denumire = denumire;
    }

    // toString
    @Override
    public String toString() {
        return "EchipaDTO{" +
                "idEchipa=" + idEchipa +
                ", denumire='" + denumire + '\'' +
                '}';
    }
}

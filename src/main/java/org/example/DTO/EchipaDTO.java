package org.example.DTO;

public class EchipaDTO {
    private int idEchipa;
    private String denumire;
    private boolean arhivata;

    // Constructor implicit
    public EchipaDTO() {
    }

    // Getter și setter pentru `arhivata`
    public boolean isArhivata() {
        return arhivata;
    }

    public void setArhivata(boolean arhivata) {
        this.arhivata = arhivata; // Actualizează atributul cu valoarea primită
    }

    // Getter și setter pentru `idEchipa`
    public int getIdEchipa() {
        return idEchipa;
    }

    public void setIdEchipa(int idEchipa) {
        this.idEchipa = idEchipa;
    }

    // Getter și setter pentru `denumire`
    public String getDenumire() {
        return denumire;
    }

    public void setDenumire(String denumire) {
        this.denumire = denumire;
    }

    // Metoda toString
    @Override
    public String toString() {
        return "EchipaDTO{" +
                "idEchipa=" + idEchipa +
                ", denumire='" + denumire + '\'' +
                ", arhivata=" + arhivata +
                '}';
    }
}

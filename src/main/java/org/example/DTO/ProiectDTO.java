package org.example.DTO;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.util.Date;

public class ProiectDTO {
    @Min(value = 1, message = "ID-ul proiectului trebuie să fie mai mare ca 0")
    private int id;

    @NotNull(message = "Denumirea proiectului este obligatorie")
    private String denumire;

    private String descriere;
    private String status;

    @Future(message = "Data de început trebuie să fie o dată din viitor")
    private Date dataIncepere;

    private Date dataFinalizare;

    private UtilizatorDTO lider;



    public ProiectDTO() {
    }

    // Getters și Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDenumire() {
        return denumire;
    }

    public void setDenumire(String denumire) {
        this.denumire = denumire;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDataIncepere() {
        return dataIncepere;
    }

    public void setDataIncepere(Date dataIncepere) {
        this.dataIncepere = dataIncepere;
    }

    public Date getDataFinalizare() {
        return dataFinalizare;
    }

    public void setDataFinalizare(Date dataFinalizare) {
        this.dataFinalizare = dataFinalizare;
    }

    public UtilizatorDTO getLider() {
        return lider;
    }

    public void setLider(UtilizatorDTO lider) {
        this.lider = lider;
    }

    // Validare
    @AssertTrue(message = "Data finalizării trebuie să fie după data începerii")
    public boolean isValid() {
        return dataFinalizare != null && dataIncepere != null && dataFinalizare.after(dataIncepere);
    }

    // toString
    @Override
    public String toString() {
        return "ProiectDTO{" +
                "id=" + id +
                ", denumire='" + denumire + '\'' +
                ", descriere='" + descriere + '\'' +
                ", status='" + status + '\'' +
                ", dataIncepere=" + dataIncepere +
                ", dataFinalizare=" + dataFinalizare +
                ", lider=" + lider +
                '}';
    }
}

package org.example.DTO;

import java.util.Date;

public class UtilizatorCursDTO {
    private Long id;
    private UtilizatorDTO utilizatorId;
    private Integer cursId;
    private boolean completat;
    private int progres;
    private Date dataInrolare;
    private Date dataFinalizare;

    public UtilizatorCursDTO() {
    }

    public UtilizatorCursDTO(Long id, UtilizatorDTO utilizatorId, Integer cursId, boolean completat, int progres, Date dataInrolare, Date dataFinalizare) {
        this.id = id;
        this.utilizatorId = utilizatorId;
        this.cursId = cursId;
        this.completat = completat;
        this.progres = progres;
        this.dataInrolare = dataInrolare;
        this.dataFinalizare = dataFinalizare;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UtilizatorDTO getUtilizatorId() {
        return utilizatorId;
    }

    public void setUtilizatorId(UtilizatorDTO utilizatorId) {
        this.utilizatorId = utilizatorId;
    }

    public Integer getCursId() {
        return cursId;
    }

    public void setCursId(Integer cursId) {
        this.cursId = cursId;
    }

    public boolean isCompletat() {
        return completat;
    }

    public void setCompletat(boolean completat) {
        this.completat = completat;
    }

    public int getProgres() {
        return progres;
    }

    public void setProgres(int progres) {
        this.progres = progres;
    }

    public Date getDataInrolare() {
        return dataInrolare;
    }

    public void setDataInrolare(Date dataInrolare) {
        this.dataInrolare = dataInrolare;
    }

    public Date getDataFinalizare() {
        return dataFinalizare;
    }

    public void setDataFinalizare(Date dataFinalizare) {
        this.dataFinalizare = dataFinalizare;
    }
}

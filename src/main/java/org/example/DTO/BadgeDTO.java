package org.example.DTO;

public class BadgeDTO {
    private Integer id;
    private String titlu;
    private String descriere;
    private int dificultate;
    private CursDTO cursId;

    public BadgeDTO() {
    }

    public BadgeDTO(Integer id, String titlu, String descriere, int dificultate, CursDTO cursId) {
        this.id = id;
        this.titlu = titlu;
        this.descriere = descriere;
        this.dificultate = dificultate;
        this.cursId = cursId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitlu() {
        return titlu;
    }

    public void setTitlu(String titlu) {
        this.titlu = titlu;
    }

    public String getDescriere() {
        return descriere;
    }

    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    public int getDificultate() {
        return dificultate;
    }

    public void setDificultate(int dificultate) {
        this.dificultate = dificultate;
    }

    public CursDTO getCursId() {
        return cursId;
    }

    public void setCursId(CursDTO cursId) {
        this.cursId = cursId;
    }
}

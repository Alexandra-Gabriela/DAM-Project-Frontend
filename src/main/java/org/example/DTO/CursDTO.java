package org.example.DTO;

public class CursDTO {
    private Integer id;
    private String titlu;
    private String descriere;
    private int durataOre;
    private UtilizatorDTO adminId;

    public CursDTO() {
    }

    public CursDTO(Integer id, String titlu, String descriere, int durataOre, UtilizatorDTO adminId) {
        this.id = id;
        this.titlu = titlu;
        this.descriere = descriere;
        this.durataOre = durataOre;
        this.adminId = adminId;
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

    public int getDurataOre() {
        return durataOre;
    }

    public void setDurataOre(int durataOre) {
        this.durataOre = durataOre;
    }

    public UtilizatorDTO getAdminId() {
        return adminId;
    }

    public void setAdminId(UtilizatorDTO adminId) {
        this.adminId = adminId;
    }
}

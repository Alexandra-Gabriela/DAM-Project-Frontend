package org.example.DTO;

import java.util.List;

public class DepartamentDTO {
    private int id;
    private String numeDepartament;
    private int managerId; // ID-ul managerului
    private String managerNume; // Numele managerului
    private List<Integer> angajatiIds; // Lista de ID-uri ale angajaților

    // Getters și Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNumeDepartament() {
        return numeDepartament;
    }

    public void setNumeDepartament(String numeDepartament) {
        this.numeDepartament = numeDepartament;
    }

    public int getManagerId() {
        return managerId;
    }

    public void setManagerId(int managerId) {
        this.managerId = managerId;
    }

    public String getManagerNume() {
        return managerNume;
    }

    public void setManagerNume(String managerNume) {
        this.managerNume = managerNume;
    }

    public List<Integer> getAngajatiIds() {
        return angajatiIds;
    }

    public void setAngajatiIds(List<Integer> angajatiIds) {
        this.angajatiIds = angajatiIds;
    }

    @Override
    public String toString() {
        return "DepartamentDTO{" +
                "id=" + id +
                ", numeDepartament='" + numeDepartament + '\'' +
                ", managerId=" + managerId +
                ", managerNume='" + managerNume + '\'' +
                ", angajatiIds=" + angajatiIds +
                '}';
    }
}

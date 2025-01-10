package org.example.DTO;

import java.util.Objects;

public class UtilizatorDTO {
    private int userId;
    private String nume;
    private TipUtilizator tipUtilizator;
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UtilizatorDTO() {
    }

    // Getters și Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getNume() {
        return nume;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public TipUtilizator getTipUtilizator() {
        return tipUtilizator;
    }

    public void setTipUtilizator(TipUtilizator tipUtilizator) {
        this.tipUtilizator = tipUtilizator;
    }

    // equals și hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UtilizatorDTO that = (UtilizatorDTO) o;
        return userId == that.userId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }

    // toString
    @Override
    public String toString() {
        return nume;
    }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.usa.Controlador.custom;

import com.usa.Modelo.Client;

/**
 *
 * @author starp
 */
public class CountClient {
    
     private Long totalClient;
    private Client client;

    public CountClient(Long totalClient, Client client) {
        this.totalClient = totalClient;
        this.client = client;
    }

    public Long getTotalClient() {
        return totalClient;
    }

    public void setTotalClient(Long totalClient) {
        this.totalClient = totalClient;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    
    
}

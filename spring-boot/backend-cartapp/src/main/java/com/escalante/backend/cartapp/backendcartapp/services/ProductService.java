package com.escalante.backend.cartapp.backendcartapp.services;
import java.util.List;

import com.escalante.backend.cartapp.backendcartapp.model.entities.Product;

public interface ProductService {

    public List<Product> findAll();
}

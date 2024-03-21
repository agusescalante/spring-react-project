package com.escalante.backend.cartapp.backendcartapp.repositories;

import org.springframework.data.repository.CrudRepository;
import com.escalante.backend.cartapp.backendcartapp.model.entities.Product;


public interface ProductRepository extends CrudRepository<Product, Long> {
   
}

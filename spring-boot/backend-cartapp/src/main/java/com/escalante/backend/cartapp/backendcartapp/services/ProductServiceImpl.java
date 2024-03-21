package com.escalante.backend.cartapp.backendcartapp.services;

import com.escalante.backend.cartapp.backendcartapp.model.entities.Product;
import com.escalante.backend.cartapp.backendcartapp.repositories.ProductRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional(readOnly = true)
    public List<Product> findAll(){
        return (List<Product>) productRepository.findAll();
    }
}

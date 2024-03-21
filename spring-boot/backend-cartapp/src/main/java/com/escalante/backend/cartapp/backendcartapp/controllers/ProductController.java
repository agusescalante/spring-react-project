package com.escalante.backend.cartapp.backendcartapp.controllers;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import com.escalante.backend.cartapp.backendcartapp.services.ProductService;
import com.escalante.backend.cartapp.backendcartapp.model.entities.Product;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;

   
    @GetMapping("/products")
    public List<Product> list(){
        return productService.findAll();
    }
}

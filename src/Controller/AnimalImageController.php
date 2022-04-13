<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\ImageAnimal;
use Symfony\Component\HttpFoundation\Request;

class AnimalImageController
{
    
    public function __invoke(Animal $animal, Request $request): ImageAnimal
    {  
        $image = new ImageAnimal();
        $featured = $request->request->get('featured') === "false" ? 0 : 1;
        $uploadFile = $request->files->get('file');
        $image->setAnimal($animal);
        $image->setFeatured($featured);
        $image->setImageFile($uploadFile);
        return $image;
    }
}
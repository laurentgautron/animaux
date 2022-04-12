<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\ImageAnimal;
use Symfony\Component\HttpFoundation\Request;

class AnimalImageController
{
    public function __invoke(Animal $animal, Request $request)
    {
        $image = new ImageAnimal();
        $uploadFile = $request->files->get('file');
        $image->setAnimal($animal);
        $image->setFeatured(false);
        $image->setImageFile($uploadFile);
        return $image;
    }
}
<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\ImageAnimal;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class AnimalImageController extends AbstractController
{
    public function __invoke(Animal $animal, Request $request)
    {
        $image = new ImageAnimal($animal);
        $file = $request->files->get('file');
        $image->setImageFile($file);
        dd($image);
    }
}
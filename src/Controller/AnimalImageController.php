<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\ImageAnimal;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class AnimalImageController extends AbstractController
{
    public function __invoke(Animal $animal, Request $request, EntityManagerInterface $em)
    {
        $image = new ImageAnimal();
        $file = $request->files->get('file');
        $image->setImageFile($file);
        $image->setCreatedAt(new \DateTimeImmutable());
        $image->setAnimal($animal);
        // $em->persist($image);
        // $em->flush();
        dd($image);
    }
}
<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\ImageAnimal;
use App\Repository\ImageAnimalRepository;
use Doctrine\ORM\EntityManagerInterface;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class AnimalImageController extends AbstractController
{
    public function __construct(
        private ImageAnimalRepository $imageAnimalRepository,
        private EntityManagerInterface $em
        )
    {
        
    }
    
    public function __invoke(Animal $animal, Request $request): ImageAnimal
    {  
        $image = new ImageAnimal();
        
        $featured = $request->request->get('featured') === "false" ? 0 : 1;
        $uploadFile = $request->files->get('file');
        $this->changeFeatured($animal, $featured, $image);
        $image->setAnimal($animal);
        $image->setFeatured($featured);
        $image->setImageFile($uploadFile);
        return $image;
    }

    public function changeFeatured(Animal $animal, Int $featured, ImageAnimal $image)
    {
        //dd(isset($image->featured));
        $imageActualyFeatured = $this->imageAnimalRepository
                                     ->findBy([
                                         "animal" => $animal->getId(),
                                         "featured" => true
                                        ]);
        if (!empty($imageActualyFeatured) && $featured === 1) {
            $imageActualyFeatured[0]->setFeatured(0);
            $this->em->persist($imageActualyFeatured[0]);
            $this->em->flush();
        }
    }
}
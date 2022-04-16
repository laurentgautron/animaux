<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\ImageAnimal;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\ImageAnimalRepository;
use phpDocumentor\Reflection\Types\Boolean;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

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
        if ($featured === 1) {
            $this->changeFeatured($animal, $featured, $image);
        }
        $image->setAnimal($animal);
        $image->setFeatured($featured);
        $image->setImageFile($uploadFile);
        return $image;
    }

    public function changeFeatured(Animal $animal, Bool $featured, ImageAnimal $image)
    {
        //dd('au debut du change featured');
        $imageActualyFeatured = $this->imageAnimalRepository
                                     ->findBy([
                                         "animal" => $animal->getId(),
                                         "featured" => true
                                        ]);
        if (!empty($imageActualyFeatured)) {
            $imageActualyFeatured[0]->setFeatured(0);
            $this->em->persist($imageActualyFeatured[0]);
        }
        //dd($image->getFeatured());
        if ($image->getFeatured() !== null) {
            //dd('bonjour image');
            $image->setFeatured(1);
            $this->em->persist($image);
        }
        $this->em->flush();
    }

    #[Route("featured/image/{id}", name: "app_change_featured")]
    public function changeFeaturedCollection(ImageAnimal $image): Response
    {
        $this->changeFeatured($image->getAnimal(), 1, $image);
        return $this->json(true);
    }
}